import React, { useState, useEffect } from "react";
import { Divider, Radio, Table } from "antd";
const { Column, ColumnGroup } = Table;

import create from "@ant-design/icons/lib/components/IconFont";
var columnData = "";
const DataTable = ({ ingestionCss, tableData }) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (tableData && tableData.length) {
      setData(tableData);
    }
  }, [tableData]);

  return (
    <div>
      <Table dataSource={data} scroll={{ x: 400 }}>
        {tableData && tableData.length && Object.keys(tableData[0]).map((e) => {
          if (Array.isArray(tableData[0][e])) {
            // return (
            //     <ColumnGroup title={e}>
            //       {(tableData[0] && tableData[0][e]) && Object.keys(tableData[0][e][0]).map((ee) => {
            //         if (typeof tableData[0][ee] == "object") {
            //         } else {
            //           return <Column title={ee} dataIndex={ee} key={ee} />;
            //         }
            //       })}
            //     </ColumnGroup>
            //   );
          } else if (typeof tableData[0][e] == "object") {
            // return (
            //   <ColumnGroup title={e}>
            //     {(tableData[0] && tableData[0][e]) && Object.keys(tableData[0][e]).map((ee) => {
            //       if (typeof tableData[0][ee] == "object") {
            //       } else {
            //         return <Column title={ee} dataIndex={ee} key={ee} />;
            //       }
            //     })}
            //   </ColumnGroup>
            // );
          } else {
            return <Column title={e} dataIndex={e} key={e} />;
          }
        })}
      </Table>
    </div>
  );
};

export default DataTable;
