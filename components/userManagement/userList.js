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
  Select,
  Form,
} from "antd";
import userManagementCss from "../../styles/userManagment.module.css";
import { FiFilter, FiSearch } from "react-icons/fi";
import { PlusOutlined } from "@ant-design/icons";
import CommonModal from "../common/CommonModal";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [organizationModal, setOrganizationModal] = useState(false);

  const fetchUserData = () => {
    fetch("https://randomuser.me/api/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data?.results[0]);
        console.log(data?.results[0]?.email);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const dataSource = [
    {
      key: "1",
      name: "Ashish Baghel",
      email: "Test@gmail.com",
      user_type: "Business",
      address: "Active",
      addedDate: "20/06/2019",
      organization: "NucleusTeq",
      role: "Biz-Master-Admin",
      action: "Edit",
    },
    {
      key: "2",
      name: "Mike",
      email: "Test@gmail.com",
      user_type: "Business",
      address: "Active",
      addedDate: "20/06/2019",
      organization: "NucleusTeq",
      role: "Biz-Master-Admin",
      action: "Edit",
    },
    {
      key: "3",
      name: "Mike",
      email: "Test@gmail.com",
      user_type: "Business",
      address: "Active",
      addedDate: "20/06/2019",
      organization: "NucleusTeq",
      role: "Biz-Master-Admin",
      action: "Edit",
    },
    {
      key: "4",
      name: "Mike",
      email: "Test@gmail.com",
      user_type: "Business",
      address: "Active",
      addedDate: "20/06/2019",
      organization: "NucleusTeq",
      role: "Biz-Master-Admin",
      action: "Edit",
    },
    {
      key: "5",
      name: "Mike",
      email: "Test@gmail.com",
      user_type: "Business",
      address: "Active",
      addedDate: "20/06/2019",
      organization: "NucleusTeq",
      role: "Biz-Master-Admin",
      action: "Edit",
    },
  ];

  return (
    <div className={userManagementCss.main}>
      <h1>
        Account & Settings / <u>Roles & Permissions</u>{" "}
      </h1>
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
              className={userManagementCss.input}
              placeholder="Find By Name"
              suffix={
                <img src="/user_management/search.svg" alt="SearchIcon" />
              }
            />

            <Select
              onChange={(e) => {
                const delayDebounceFn = setTimeout(() => {
                  setSearch(e.target.value);
                }, 1000);
                return () => clearTimeout(delayDebounceFn);
              }}
              className="custom-select"
              options={[
                {
                  value: "Organization",
                  label: "Organization",
                },
                {
                  value: "Name/ID",
                  label: "Name/ID",
                },
              ]}
              style={{ width: "166px" }}
              placeholder={
                <Row>
                  <Col span={4}>
                    <img src="/user_management/filter.svg" alt="Filter" />
                  </Col>
                  <Col
                    span={20}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    Filter{" "}
                  </Col>
                </Row>
              }
              suffixIcon={
                <img src="/user_management/drop-down.svg" alt="dropdown" />
              }
            />
          </Space>
        </Col>

        <Col span="12" align={"right"}>
          <Space direction="horizontal" size={"large"}>
            <button
              className={userManagementCss.button}
              onClick={() => {
                setOrganizationModal(true);
              }}
            >
              <img
                src="/user_management/plus.svg"
                alt="plus"
                style={{ marginRight: "10px" }}
              />
              Add Organization
            </button>
            <button className={userManagementCss.button}>
              <img
                src="/user_management/plus.svg"
                alt="plus"
                style={{ marginRight: "10px" }}
              />
              Add User
            </button>
          </Space>
        </Col>
      </Row>
      <Card className="demoCard">
        <Row>
          <Col span={24}>
            <Table
              dataSource={dataSource}
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
                  title: "Organization",
                  dataIndex: "organization",
                  key: "organization",
                },
                {
                  title: "Action",
                  dataIndex: "action",
                  key: "action",
                },
              ]}
            />
          </Col>
        </Row>
      </Card>
      <CommonModal
        title="Add Organization"
        visible={organizationModal}
        footer={null}
        onCancel={() => {
          setOrganizationModal(false);
        }}
        content={
          <div>
            <Form>
              <Form.Item
                name="organization"
                rules={[
                  { required: true, message: "Organization name is required" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Organization Name"
                />
              </Form.Item>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Primary Contact First Name"
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Primary Contact Last Name"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input style={{ width: "100%" }} placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                name="role"
                rules={[{ required: true }]}
                style={{ display: "inline-block", width: "calc(50% - 12px)" }}
              >
                <Input placeholder="Role" />
              </Form.Item>
              <Form.Item
                name="contact"
                rules={[{ required: true }]}
                style={{
                  display: "inline-block",
                  width: "50%",
                  marginLeft: "12px",
                }}
              >
                <Input placeholder="Contact Number" />
              </Form.Item>
              <Form.Item
                name="domain"
                rules={[
                  { required: true, message: "Allowed domains is required" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Allowed Domains"
                />
              </Form.Item>
              <Form.Item label=" " colon={false}>
                <Button
                  className={userManagementCss.button}
                  onClick={() => {
                    setOrganizationModal(false);
                  }}
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        }
      />
    </div>
  );
};

export default UserList;
