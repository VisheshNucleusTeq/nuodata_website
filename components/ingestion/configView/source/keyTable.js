// import React from 'react';

// const KeyTable = () => {
//     return (
//         <div>
//             KeyTable
//         </div>
//     );
// };

// export default KeyTable;

import React, { useState } from "react";
import { Divider, Radio, Table } from "antd";
const columns = [
  {
    title: "Native Name",
    dataIndex: "native_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Native Type",
    dataIndex: "native_type ",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Native Precision",
    dataIndex: "native_precision",
  },
  {
    title: "Precision",
    dataIndex: "precision",
  },

  {
    title: "Native Scale",
    dataIndex: "native_scale",
  },
  {
    title: "Scale",
    dataIndex: "scale",
  },
  {
    title: "Origin",
    dataIndex: "origin",
  },
];
const data = Array(20)
  .fill(undefined)
  .map((e, i) => {
    return {
      key: i + 1,
      native_name:
        (Math.random() + 1).toString(36).substring(7) + "_CustomerNumber",
      name: "CustomerNumber",
      native_type: "String",
      type: "String",
      native_precision: Math.round(256 * (Math.random() + 1)),
      precision: Math.round(256 * (Math.random() + 1)),
      native_scale: 0,
      scale: 0,
      origin: "my_computer",
    };
  });

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    // disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};
const KeyTable = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <div>
      {/* <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider /> */}

      <Table
        scroll={{ x: 800 }}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default KeyTable;
