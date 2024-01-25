import { Button, Col, Row, Space, Table, Tag, Tooltip } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetch_retry_get } from "../../../network/api-manager";
import {
  RUNPIPELINELIST,
  RUNPIPELINELOGS,
} from "../../../network/apiConstants";

import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";
const JobList = () => {
  const { query } = useRouter();
  const pipelineData = useSelector((state) => state?.pipeline?.pipeline);
  const [runList, setRunList] = useState([]);
  const [detailId, setDetailId] = useState(null);
  const [downloadLink, setDownloadLink] = useState({});
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    const runListData = await fetch_retry_get(`${RUNPIPELINELIST}${id}`);
    setRunList(runListData?.data);
    if (detailId) {
      const selectedData = runListData?.data.find((e) => {
        return e?.exe_id == detailId?.exe_id;
      });
      if (selectedData && selectedData?.exe_id) {
        setDetailId(selectedData);
      } else {
        setLoader(false);
      }
    } else {
      setLoader(false);
    }
  };

  const getRuntimeLinks = async (id) => {
    const runLinkData = await fetch_retry_get(`${RUNPIPELINELOGS}${id}`);
    setDownloadLink(runLinkData?.data);
    setLoader(false);
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
      <Row>
        <Col span={24}>
          <Space style={{ float: "right" }}>
            {detailId ? (
              <Button
                onClick={() => {
                  setDetailId(null);
                }}
              >
                Back
              </Button>
            ) : null}
            {/* <Button
              onClick={() => {
                getRunList(query?.pipeline ? query?.pipeline : pipelineData);
              }}
              disabled={loader}
            >
              {loader && <LoadingOutlined />} Refresh
            </Button> */}
          </Space>
        </Col>
      </Row>
      <br />
      <br />
      {detailId ? (
        <>
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
                  &nbsp;{" "}
                  {e != "job_status" ? (
                    detailId[e]
                  ) : (
                    <span>{getJobStatus(detailId[e])}</span>
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
      ) : (
        <Table
          pagination={{
            defaultPageSize: 5,
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
                      setDetailId(record);
                    }}
                  >
                    <EyeOutlined />
                  </a>
                </Tooltip>
              ),
            },
          ]}
          dataSource={runList}
        />
      )}
    </>
  );
};

export default JobList;
