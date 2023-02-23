import React from "react";
import { Space, Table, Tag } from "antd";
import { useState } from "react";

const Rollout = ({ dataModernizationCss }) => {
    
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ marginTop: "4%" }}>
      <Table
      rowSelection={rowSelection}
        className="demo"
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
          },
          {
            title: "Address",
            dataIndex: "address",
            key: "address",
          },
          {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            render: (_, { tags }) => (
              <>
                {tags.map((tag) => {
                  let color = tag.length > 5 ? "geekblue" : "green";
                  if (tag === "loser") {
                    color = "volcano";
                  }
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </>
            ),
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
              </Space>
            ),
          },
        ]}
        dataSource={[
          {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
          },
          {
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["loser"],
          },
          {
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sydney No. 1 Lake Park",
            tags: ["cool", "teacher"],
          },
        ]}
      />
    </div>
  );
};

export default Rollout;
