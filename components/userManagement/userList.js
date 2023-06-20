import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Tooltip,
  Button,
  message,
  Card,
  Row,
  Col,
  Input,
} from "antd";

const UserList = ({ userManagementCss }) => {
  const fetchUserData = () => {
    fetch("https://randomuser.me/api/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data?.results[0]);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Card className="demoCard">
      <Row>
        <Col span={24}>
          <Table
            dataSource={[
              {
                key: "1",
                name: "Mike",
                age: 32,
                address: "10 Downing Street",
              },
              {
                key: "2",
                name: "John",
                age: 42,
                address: "10 Downing Street",
              },
            ]}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "User type",
                dataIndex: "user_type",
                key: "userType",
              },
              {
                title: "Status",
                dataIndex: "address",
                key: "address",
              },
              {
                title: "Added Date",
                dataIndex: "addedDate",
                key: "addedDate",
              },
              {
                title: "Billable",
                dataIndex: "billable",
                key: "billable",
              },
              {
                title: "Action",
                dataIndex: "action",
                key: "action",
              },
            ]}
          />
          ;
        </Col>
      </Row>
    </Card>
  );
};

export default UserList;
