import React, { useEffect, useState } from "react";
import {
  RUNPIPELINESTATUS,
  RUNPIPELINELOGS,
} from "../../../network/apiConstants";
import { fetch_retry_get } from "../../../network/api-manager";
import { Row, Col, Button, Tag } from "antd";
// import {socket} from "../../socket";
// import { socket } from "../../../socket";
import useSocketConnectionStatus from "../../../hooks/useSocketConnectionStatus";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
const JobRunDetails = ({ pipelineId, pipelineData, setPipelineData }) => {
  const { isConnected, socket } = useSocketConnectionStatus();
  const [data, setData] = useState({});
  const [downloadLink, setDownloadLink] = useState({});
  const [refreshData, setRefreshData] = useState(Math.random());

  const changeDateFormat = (date) => {
    //start_time
    // end_time
    const dt = new Date(date);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return `${padL(dt.getMonth() + 1)}/${padL(
      dt.getDate()
    )}/${dt.getFullYear()} ${padL(dt.getHours())}:${padL(
      dt.getMinutes()
    )}:${padL(dt.getSeconds())}`;
  };

  const getRecord = async () => {
    const data = await fetch_retry_get(`${RUNPIPELINESTATUS}${pipelineId}`);
    if (data.success) {
      const modelData = { ...data?.data };
      // setData({
      //   ...modelData,
      //   start_time: changeDateFormat(modelData?.start_time),
      //   end_time: changeDateFormat(modelData?.end_time),
      // });
    }
    const runLinkData = await fetch_retry_get(
      `${RUNPIPELINELOGS}${pipelineId}`
    );
    if (runLinkData.success) {
      setDownloadLink(runLinkData?.data);
    }
  };

  const getJobStatus = (status) => {
    let color = "#808080";
    let icon = "";
    switch (status) {
      case "SUBMITTED":
        color = "#3498db";
        break;
      case "PENDING":
        color = "#f39c12";
        break;
      case "SCHEDULED":
        color = "#27ae60";
        icon = <ClockCircleOutlined />;
        break;
      case "RUNNING":
        color = "#2c3e50";
        icon = <LoadingOutlined spin={true} />;
        break;
      case "SUCCESS":
        color = "#2ecc71";
        icon = <CheckCircleOutlined />;
        break;
      case "FAILED":
        color = "#e74c3c";
        icon = <CloseCircleOutlined />;
        break;
      case "CANCELLING":
        color = "#e67e22";
        icon = <CloseCircleOutlined spin={true} />;
        break;
      case "CANCELLED":
        color = "#95a5a6";
        icon = <CloseCircleOutlined />;
        break;
      default:
        break;
    }

    return (
      <Tag color={color}>
        {icon}&nbsp;{status}
      </Tag>
    );

    // switch (status) {
    //   case "SUCCESS":
    //     return <Tag color="green">SUCCESS</Tag>;
    //     break;
    //   case "RUNNING":
    //     return <Tag color="yellow">RUNNING</Tag>;
    //     break;
    //   default:
    //     return <Tag color="">{status}</Tag>;
    //     break;
    // }
  };

  const getRuntimeLinks = async () => {
    const runLinkData = await fetch_retry_get(
      `${RUNPIPELINELOGS}${pipelineId}`
    );
    if (runLinkData.success) {
      setDownloadLink(runLinkData?.data);
    }
  };

  useEffect(() => {
    getRecord();
    getRuntimeLinks();
  }, [pipelineId]);

  useEffect(() => {
    const eventData = {
      message: changeDateFormat(new Date()),
      exe_doc_id: pipelineId,
    };
    socket.emit("request_job_status", eventData);
    socket.on("job_run_status", (data) => {
      const modelData = { ...JSON.parse(data) };
      setData({
        ...modelData,
        start_time: modelData?.start_time ? changeDateFormat(modelData?.start_time) :null,
        end_time: modelData?.end_time ? changeDateFormat(modelData?.end_time) : null
      });

      const pipelineDataData = pipelineData?.map((e) => {
        return {
          ...e,
          last_job_run: {
            ...e?.last_job_run,
            job_status:
              e?.last_job_run?.exe_id == pipelineId
                ? modelData?.job_status
                : e?.last_job_run?.job_status,
          },
        };
      });

      pipelineDataData && setPipelineData(pipelineDataData);
    });
  }, [refreshData, isConnected, socket?.connected]);

  useEffect(() => {
    !socket?.connected && socket.connect();
  }, []);

  return (
    <>
      <>
        {Object.keys(data).map((e) => {
          return (
            <Row key={Math.random()}>
              <Col
                span={12}
                style={{
                  border: "1px solid gray",
                  height: "5vh",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                &nbsp;{" "}
                {e
                  .split("_")
                  .map((str) => {
                    return str.charAt(0).toUpperCase() + str.slice(1);
                  })
                  .join(" ")}
              </Col>
              {data[e] ? (
                <Col
                  span={12}
                  style={{
                    border: "1px solid gray",
                    height: "5vh",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  &nbsp;{" "}
                  {e != "job_status" ? (
                    data[e]
                  ) : (
                    <span>{getJobStatus(data[e])}</span>
                  )}
                </Col>
              ) : (
                <Col
                  span={12}
                  style={{
                    border: "1px solid gray",
                    height: "5vh",
                    display: "flex",
                    alignItems: "center",
                  }}
                >&nbsp;{" "}NA</Col>
              )}
            </Row>
          );
        })}
        {Object.keys(downloadLink).map((e) => {
          return (
            <Row key={Math.random()}>
              <Col
                span={12}
                style={{
                  border: "1px solid gray",
                  height: "5vh",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                &nbsp; {e.toUpperCase()}
              </Col>
              <Col
                span={12}
                style={{
                  border: "1px solid gray",
                  height: "5vh",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                &nbsp;{" "}
                <a target="_blank" download href={downloadLink[e]}>
                  <Button>{e}</Button>
                </a>
              </Col>
            </Row>
          );
        })}
      </>
    </>
  );
};

export default JobRunDetails;
