import React from "react";
import { Space, Table, Tag, Image } from "antd";
import { useState } from "react";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

const Rollout = ({ dataModernizationCss }) => {
  const [selectedRowKeys1, setSelectedRowKeys1] = useState([]);
  const [selectedRowKeys2, setSelectedRowKeys2] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div style={{ marginTop: "4%" }}>
        <Table
          showHeader={false}
          rowSelection={{
            selectedRowKeys1,
            onChange: (e) => {
              setSelectedRowKeys1(e);
            },
          }}
          className="demo"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              render: (text) => {
                return <b>{text}</b>;
              },
            },
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
              render: (text) => {
                return <b>{text}</b>;
              },
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Space size="middle">
                  <a>
                    <EditOutlined />
                  </a>
                  <a>
                    <EyeOutlined />
                  </a>
                </Space>
              ),
            },
          ]}
          dataSource={Array(5)
            .fill(undefined)
            .map((e, i) => {
              return {
                key: "1",
                name: "Enterprise_Marketing_Workflow " + (i + 1),
                type: "Workflow",
              };
            })}
        />
      </div>

      <div style={{ marginTop: "1%" }}>
        <Table
          rowSelection={{
            type: "radio",
            selectedRowKeys2,
            onChange: (e) => {
              setSelectedRowKeys2(e);
            },
          }}
          className="demo"
          columns={[
            {
              title: "Image",
              dataIndex: "image",
              key: "image",
              render: (text) => <Image width={"2.5vw"} src={text} />,
            },

            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              render: (text) => <b>{text}</b>,
            },

            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (text) => <b style={{color : text == "active" ? "green" : "red"}}>{text}</b>,
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Space size="middle">
                  <a>
                    <EditOutlined />
                  </a>
                  <a>
                    <EyeOutlined />
                  </a>
                </Space>
              ),
            },
          ]}
          dataSource={[
            {
              key: "1",
              image: "https://www.brighttalk.com/wp-content/uploads/2019/07/Databricks-logo-1-300x300.png",
              name : "Databricks Prod",
              status : "active"
            },
            {
              key: "2",
              image: "https://th.bing.com/th/id/R.129919c4cf34d739b91e27ef6d38ced6?rik=aEIOT10FXgzPtQ&riu=http%3a%2f%2fblog.adnansiddiqi.me%2fwp-content%2fuploads%2f2018%2f09%2fairflow_logo.png&ehk=azFC2KmBUTIsC%2fZwT1oZygUIH%2fY071RvD1IYuY47A8k%3d&risl=&pid=ImgRaw&r=0",
              name : "Airflow Prod",
              status : "active"
            },
            {
              key: "3",
              image: "https://th.bing.com/th/id/OIP.fu9flrtLv-kXaGGhP8pNYgAAAA?pid=ImgDet&rs=1",
              name : "Snowflake Prod",
              status : "inactive"
            },
          ]}
        />
      </div>
    </>
  );
};

export default Rollout;
