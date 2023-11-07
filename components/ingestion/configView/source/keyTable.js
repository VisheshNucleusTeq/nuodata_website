import React, { useState } from "react";
import { Divider, Radio, Table } from "antd";

const KeyTable = ({metadata}) => {
  const columns = [
    
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,

    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Precision",
      dataIndex: "precision",
    },
    {
      title: "Scale",
      dataIndex: "scale",
    },
  ];
  
  const [data, setData] = useState(metadata)

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default KeyTable;
