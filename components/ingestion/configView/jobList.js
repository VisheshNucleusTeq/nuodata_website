import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button, Table, Tag, Tooltip, Descriptions, Row, Col } from "antd";
import {
  RUNPIPELINELIST,
  RUNPIPELINELOGS,
} from "../../../network/apiConstants";
import { fetch_retry_get } from "../../../network/api-manager";

import { EyeOutlined } from "@ant-design/icons";

const JobList = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const pipelineData = useSelector((state) => state?.pipeline?.pipeline);
  const [runList, setRunList] = useState([]);
  const [detailId, setDetailId] = useState(null);
  const [downloadLink, setDownloadLink] = useState({});

  const changeDateFormat = (date) => {
    const dt = new Date(date);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return `${padL(dt.getMonth() + 1)}/${padL(
      dt.getDate()
    )}/${dt.getFullYear()} ${padL(dt.getHours())}:${padL(
      dt.getMinutes()
    )}:${padL(dt.getSeconds())}`;
  };

  const getJobStatus = (status) => {
    switch (status) {
      case "SUCCESS":
        return <Tag color="green">SUCCESS</Tag>;
        break;
      case "RUNNING":
        return <Tag color="yellow">RUNNING</Tag>;
        break;
      default:
        return <Tag color="">{status}</Tag>;
        break;
    }
  };

  const getRunList = async (id) => {
    const runListData = await fetch_retry_get(`${RUNPIPELINELIST}${id}`);
    setRunList(runListData?.data);
  };

  const getRuntimeLinks = async (id) => {
    const runLinkData = await fetch_retry_get(`${RUNPIPELINELOGS}${id}`);
    setDownloadLink(runLinkData?.data);
  };

  useEffect(() => {
    getRunList(query?.pipeline ? query?.pipeline : pipelineData);
  }, [query?.pipeline, pipelineData]);

  useEffect(() => {
    if (detailId) {
      getRuntimeLinks(detailId?.exe_id);
    }
  }, [detailId]);

  return (
    <>
      {/* {detailId} */}
      {detailId ? (
        <>
          <Button
            onClick={() => {
              setDetailId(null);
            }}
          >
            Back
          </Button>

          
          <br />
          <br />
          {Object.keys(detailId).map((e) => {
            return (
              <Row>
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
                <Col
                  span={12}
                  style={{
                    border: "1px solid gray",
                    height: "5vh",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  &nbsp; {detailId[e]}
                </Col>
              </Row>
            );
          })}
          {Object.keys(downloadLink).map((e) => {
            return (
              <Row>
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
      ) : (
        <Table
          pagination={{
            defaultPageSize: 5,
            //   showSizeChanger: true,
            //   pageSizeOptions: ["10", "20", "30"],
          }}
          key={runList.length}
          rowKey="projectId"
          columns={[
            {
              title: "Job Run Id",
              dataIndex: "job_run_id",
              key: "job_run_id",
            },
            {
              title: "Start Time",
              key: "start_time",
              render: (_, record) => (
                <span>{changeDateFormat(record.start_time)}</span>
              ),
            },
            {
              title: "End Time",
              key: "end_time",
              render: (_, record) => (
                <span>{changeDateFormat(record.start_time)}</span>
              ),
            },
            {
              title: "Elapsed Time",
              dataIndex: "elapsed_time",
              key: "elapsed_time",
            },
            {
              title: "Job Status",
              key: "job_status",
              render: (_, record) => (
                <span>{getJobStatus(record.job_status)}</span>
              ),
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Tooltip
                  placement="top"
                  title={"View Details"}
                  key={(Math.random() + 1).toString(36).substring(7)}
                >
                  <a
                    onClick={() => {
                      console.log(record);
                      setDetailId(record);
                    }}
                  >
                    <EyeOutlined />
                  </a>
                </Tooltip>
              ),
            },
          ]}
          dataSource={runList} //job_status
        />
      )}
    </>
  );
};

export default JobList;
