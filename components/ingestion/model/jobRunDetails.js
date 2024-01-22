import React, { useEffect, useState } from "react";
import {
  RUNPIPELINESTATUS,
  RUNPIPELINELOGS,
} from "../../../network/apiConstants";
import { fetch_retry_get } from "../../../network/api-manager";
import { Row, Col, Button, Tag } from "antd";
const JobRunDetails = ({ pipelineId }) => {
  const [data, setData] = useState({});
  const [downloadLink, setDownloadLink] = useState({});

  const getRecord = async () => {
    const data = await fetch_retry_get(`${RUNPIPELINESTATUS}${pipelineId}`);
    if (data.success) {
      setData(data?.data);
    }
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

  const getRuntimeLinks = async () => {
    const runLinkData = await fetch_retry_get(
      `${RUNPIPELINELOGS}${pipelineId}`
    );
    setDownloadLink(runLinkData?.data);
  };

  useEffect(() => {
    getRecord();
    getRuntimeLinks();
  }, [pipelineId]);

  return (
    <>
      <>
        {Object.keys(data).map((e) => {
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
                &nbsp;{" "}
                {e != "job_status" ? (
                  data[e]
                ) : (
                  <span>{getJobStatus(data[e])}</span>
                )}
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
    </>
  );
};

export default JobRunDetails;
