import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Card,
  Row,
  Col,
  Input,
  Select,
  Modal,
  Badge,
  Tag,
} from "antd";

import {
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import AddUser from "./addUser";
import AddOrganization from "./addOrganization";
import { GETUSERLIST, GETORGANIZATION } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";

const UserList = ({ userManagementCss }) => {
  const [search, setSearch] = useState("");
  const [orgId, setOrgId] = useState(0);
  const [showAddModel, setShowAddModel] = useState(false);
  const [addType, setAddType] = useState("");
  const [userData, setUserData] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [updateUserData, setUpdateUserData] = useState({});

  const getOrganization = async () => {
    const data = await fetch_retry_get(`${GETORGANIZATION}`);
    setOrganization([
      {
        value: 0,
        label: <span style={{ color: "#e74860" }}>All Data</span>,
      },
      ...data?.data?.map((e) => {
        return {
          value: e?.orgId,
          label: e?.orgName,
        };
      }),
    ]);
  };

  const getUserList = async () => {
    const data = await fetch_retry_get(
      `${GETUSERLIST}${orgId}/?search=${search}`
    );
    setUserData(data?.data);
  };

  useEffect(() => {
    getOrganization();
  }, []);

  useEffect(() => {
    getUserList();
  }, [search, orgId]);

  return (
    <div className={userManagementCss.main}>
      <Modal
        title={addType === "user" ? "Add User" : "Add Organization"}
        open={showAddModel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        closeIcon={<CloseCircleOutlined />}
        onCancel={() => {
          setUpdateUserData({});
          setAddType(null);
          setShowAddModel(false);
        }}
        destroyOnClose={true}
      >
        {addType === "user" && (
          <AddUser
            userManagementCss={userManagementCss}
            setShowAddModel={setShowAddModel}
            setAddType={setAddType}
            updateUserData={updateUserData}
            getUserList={getUserList}
          />
        )}
        {addType === "organization" && (
          <AddOrganization
            userManagementCss={userManagementCss}
            setShowAddModel={setShowAddModel}
            setAddType={setAddType}
            getOrganization={getOrganization}
          />
        )}
      </Modal>

      <h1>User Management</h1>
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
                <SearchOutlined
                  style={{ fontSize: "1.2vw", color: "#a9a9a9" }}
                />
              }
            />
            <Select
              onChange={(e) => {
                setOrgId(e);
              }}
              className={userManagementCss.inputSelectSearch}
              options={organization}
              placeholder={
                <span style={{ fontSize: "1.2vw" }}>
                  <FilterOutlined
                    style={{ fontSize: "1.2vw", color: "#a9a9a9" }}
                  />{" "}
                  Organization
                </span>
              }
              suffixIcon={
                <DownOutlined style={{ fontSize: "1.2vw", color: "#a9a9a9" }} />
              }
            />
          </Space>
        </Col>

        <Col span="12" align={"right"}>
          <Space direction="horizontal" size={"large"}>
            <Button
              className={userManagementCss.button}
              onClick={() => {
                setUpdateUserData({});
                setAddType("organization");
                setShowAddModel(true);
              }}
            >
              <span style={{ fontSize: "1.2vw" }}>
                <PlusOutlined /> Add Organization
              </span>
            </Button>

            <Button
              className={userManagementCss.button}
              onClick={() => {
                setUpdateUserData({});
                setAddType("user");
                setShowAddModel(true);
              }}
            >
              <span style={{ fontSize: "1.2vw" }}>
                <PlusOutlined /> Add User
              </span>
            </Button>
          </Space>
        </Col>
      </Row>
      <Card className="demoCard">
        <Row>
          <Col span={24}>
            <Table
              scroll={{
                x: "100vw",
              }}
              rowKey={"userId"}
              dataSource={userData?.sort((a, b) => b.userId - a.userId)}
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                  key: "name",
                  render: (_, record) => (
                    <span>{`${record.firstName} ${record.lastName}`}</span>
                  ),
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
                  title: "Job Title",
                  dataIndex: "jobTitle",
                  key: "jobTitle",
                },
                {
                  title: "Organization",
                  dataIndex: "orgName",
                  key: "orgName",
                },
                {
                  title: "Role",
                  dataIndex: "roleName",
                  key: "roleName",
                },
                {
                  title: "User Type",
                  dataIndex: "userType",
                  key: "userType",
                },
                {
                  title: "Modules",
                  dataIndex: "modules",
                  key: "modules",
                  render: (_, record) =>
                    record?.modules?.length
                      ? record?.modules.map((e) => {
                          return (
                            <Tag color="blue" key={e}>
                              {e}
                            </Tag>
                          );
                        })
                      : "NA",
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                  render: (_, record) =>
                    record.status === "active" ? (
                      <Badge count={"Active"} color="green" />
                    ) : (
                      <Badge count={"Inactive"} color="red" />
                    ),
                },
                {
                  title: "Action",
                  key: "operation",
                  fixed: "right",
                  width: 100,
                  render: (_, record) => (
                    <a
                      onClick={() => {
                        setUpdateUserData(record);
                        setAddType("user");
                        setShowAddModel(true);
                      }}
                      style={{ color: "#e74860" }}
                    >
                      Edit
                    </a>
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserList;
