import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { Table, Space, message, Card, Row, Col, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { EVENTUSERS } from "../../network/apiConstants";
import { loderShowHideAction } from "../../Redux/action";
import { fetch_retry_get } from "../../network/api-manager";

const EventUsersList = ({ eventManagementCss, eventId }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const getEventUsers = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData?.orgId) {
      const data = await fetch_retry_get(
        `${EVENTUSERS}${eventId}?search=${search}`
      );
      dispatch(loderShowHideAction(false));
      if (data.success) {
        setData(data.data);
        return data;
      } else {
        setData([]);
      }
    }
  };

  const { status, data: eventUsers } = useQuery(
    ["EVENT_USER_DATA", eventId, search],
    () => getEventUsers(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      staleTime: 1, //10 * (60 * 1000),
    }
  );

  useEffect(() => {
    dispatch(loderShowHideAction(true));
    if (status === "success") {
      dispatch(loderShowHideAction(false));
      if (eventUsers?.success) {
        setData(eventUsers.data);
      } else {
        setData([]);
      }
    }
  }, [status, eventUsers]);

  return (
    <>
      <Row style={{ marginBottom: "24px" }}>
        <Col span="12">
          <Space direction="horizontal" size={"large"}>
            <Input
              onChange={(e) => {
                const delayDebounceFn = setTimeout(() => {
                  setSearch(e.target.value);
                }, 1000);
                return () => clearTimeout(delayDebounceFn);
              }}
              className={eventManagementCss.input}
              placeholder="Search"
              suffix={
                <SearchOutlined
                  style={{ fontSize: "1.2vw", color: "#a9a9a9" }}
                />
              }
            />
          </Space>
        </Col>
        <Col span={11} style={{ float: "right", textAlign: "end" }}>
          <p style={{ color: "#0c3246", fontWeight: "bold" }}>
            Registered Users Count :
            <span style={{ color: "#e74860" }}> {data?.usersCount}</span>
          </p>
        </Col>
      </Row>
      <Card className="demoCard">
        <Row>
          <Col span={24}>
            <Table
              scroll={{
                y: "40vh",
              }}
              rowKey={"userId"}
              dataSource={data?.userDetails?.sort(
                (a, b) => b.userId - a.userId
              )}
              columns={[
                {
                  title: "Name",
                  dataIndex: "userName",
                  key: "userName",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                  key: "email",
                },

                {
                  title: "Mobile No.",
                  dataIndex: "mobileNo",
                  key: "mobileNo",
                },

                {
                  title: "Organization",
                  dataIndex: "orgName",
                  key: "orgName",
                },
                {
                  title: "Designation",
                  dataIndex: "designation",
                  key: "designation",
                },
              ]}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default EventUsersList;
