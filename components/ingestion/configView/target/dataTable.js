// import { Modal, Spin, Table, Tooltip } from "antd";
// import React, { useEffect, useState } from "react";
// const DataTable = ({ ingestionCss, tableData }) => {
//   const [spinning, setSpinning] = useState(true);
//   const [tableDatas, setTableDatas] = useState([]);
//   const [tableColumns, setTableColumns] = useState([]);
//   const [page, setPage] = useState(1);

//   const getPreviewData = async () => {
//     setSpinning(true);
//     // const previewData = await fetch_retry_get(
//     //   `${PREVIEWDATA}${nodeId}/preview`
//     // );
//     if (tableData?.length) {
//       const checkKey = Object.keys(tableData[0]);
//       const tableColumn = [...checkKey].map((e) => {
//         return {
//           title: e,
//           dataIndex: e,
//           key: e,
//           render: (record) => {
//             if (typeof record == "object") {
//               const recordString = JSON.stringify(record);

//               if (recordString?.length > 50) {
//                 return (
//                   <span>
//                     {recordString.substring(0, 50)}...
//                     <a
//                       onClick={() => {
//                         Modal.info({
//                           title: e,
//                           content: (
//                             <div
//                               style={{ height: "70vh", overflowX: "scroll" }}
//                             >
//                               <pre>
//                                 <code>
//                                   {JSON.stringify(
//                                     { record: record, record1: record },
//                                     null,
//                                     4
//                                   )}
//                                 </code>
//                               </pre>
//                             </div>
//                           ),
//                           okText: "Ok",
//                           cancelText: "No",
//                           onOk: () => {},
//                           cancelButtonProps: { style: { display: "none" } },
//                           width: "80%",
//                           destroyOnClose: true,
//                           centered: true,
//                         });
//                       }}
//                     >
//                       Show Data
//                     </a>
//                   </span>
//                 );
//               } else {
//                 return <span>{recordString}</span>;
//               }
//             } else {
//               if (record?.length > 50) {
//                 return (
//                   <span>
//                     {record.substring(0, 50)}
//                     <Tooltip
//                       placement="left"
//                       title={record}
//                       // style={{ width: "50vw" }}
//                     >
//                       ...
//                       <a> Read More</a>
//                     </Tooltip>
//                   </span>
//                 );
//               } else {
//                 return <span>{record}</span>;
//               }
//             }
//           },
//         };
//       });
//       setTableColumns([...tableColumn]);
//     }

//     setTableDatas(tableData?.length ? [...tableData] : []);
//     setSpinning(false);
//   };

//   useEffect(() => {
//     getPreviewData();
//   }, [tableData]);

//   return (
//     <div>
//       <Table
//         dataSource={tableDatas}
//         columns={tableColumns}
//         scroll={{ x: "max-content" }}
//         loading={{
//           indicator: (
//             <div>
//               <Spin />
//             </div>
//           ),
//           spinning: spinning,
//         }}
//         size={"small"}
//         pagination={{
//           onChange(current) {
//             // alert(current)
//             setPage(current);
//           },
//           defaultPageSize: 10,
//           hideOnSinglePage: true,
//         }}
//       />
//     </div>
//   );
// };

// export default DataTable;

// // import React, { useState, useEffect } from "react";
// // import { Divider, Radio, Table } from "antd";
// // const { Column, ColumnGroup } = Table;

// // import create from "@ant-design/icons/lib/components/IconFont";
// // var columnData = "";
// // const DataTable = ({ ingestionCss, tableData }) => {
// //   const [columns, setColumns] = useState([]);
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     if (tableData.length) {
// //       setData(tableData);
// //     }
// //   }, [tableData]);

// //   return (
// //     <div>
// //       <Table dataSource={data} scroll={{ x: 400 }}>
// //         {Object.keys(tableData[0]).map((e) => {
// //           if (Array.isArray(tableData[0][e])) {
// //             // return (
// //             //     <ColumnGroup title={e}>
// //             //       {(tableData[0] && tableData[0][e]) && Object.keys(tableData[0][e][0]).map((ee) => {
// //             //         if (typeof tableData[0][ee] == "object") {
// //             //         } else {
// //             //           return <Column title={ee} dataIndex={ee} key={ee} />;
// //             //         }
// //             //       })}
// //             //     </ColumnGroup>
// //             //   );
// //           } else if (typeof tableData[0][e] == "object") {
// //             // return (
// //             //   <ColumnGroup title={e}>
// //             //     {(tableData[0] && tableData[0][e]) && Object.keys(tableData[0][e]).map((ee) => {
// //             //       if (typeof tableData[0][ee] == "object") {
// //             //       } else {
// //             //         return <Column title={ee} dataIndex={ee} key={ee} />;
// //             //       }
// //             //     })}
// //             //   </ColumnGroup>
// //             // );
// //           } else {
// //             return <Column title={e} dataIndex={e} key={e} />;
// //           }
// //         })}
// //       </Table>
// //     </div>
// //   );
// // };

// // export default DataTable;

// // import React, { useState, useEffect } from "react";
// // import { Divider, Radio, Table } from "antd";
// // const { Column, ColumnGroup } = Table;

// // import create from "@ant-design/icons/lib/components/IconFont";
// // var columnData = "";
// // const DataTable = ({ ingestionCss, tableData }) => {
// //   const [columns, setColumns] = useState([]);
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     if (tableData && tableData.length) {
// //       setData(tableData);
// //     }
// //   }, [tableData]);

// //   return (
// //     <div>
// //       <Table dataSource={data} scroll={{ x: 400 }}>
// //         {tableData && tableData.length && Object.keys(tableData[0]).map((e) => {
// //           if (Array.isArray(tableData[0][e])) {
// //             // return (
// //             //     <ColumnGroup title={e}>
// //             //       {(tableData[0] && tableData[0][e]) && Object.keys(tableData[0][e][0]).map((ee) => {
// //             //         if (typeof tableData[0][ee] == "object") {
// //             //         } else {
// //             //           return <Column title={ee} dataIndex={ee} key={ee} />;
// //             //         }
// //             //       })}
// //             //     </ColumnGroup>
// //             //   );
// //           } else if (typeof tableData[0][e] == "object") {
// //             // return (
// //             //   <ColumnGroup title={e}>
// //             //     {(tableData[0] && tableData[0][e]) && Object.keys(tableData[0][e]).map((ee) => {
// //             //       if (typeof tableData[0][ee] == "object") {
// //             //       } else {
// //             //         return <Column title={ee} dataIndex={ee} key={ee} />;
// //             //       }
// //             //     })}
// //             //   </ColumnGroup>
// //             // );
// //           } else {
// //             return <Column title={e} dataIndex={e} key={e} />;
// //           }
// //         })}
// //       </Table>
// //     </div>
// //   );
// // };

// // export default DataTable;

import { Modal, Spin, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { fetch_retry_get } from "../../../../network/api-manager";
import { PREVIEWDATA } from "../../../../network/apiConstants";
const DataTable = ({ ingestionCss, nodeId }) => {
  const [spinning, setSpinning] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [page, setPage] = useState(1);

  const getPreviewData = async () => {
    setSpinning(true);
    const previewData = await fetch_retry_get(
      `${PREVIEWDATA}${nodeId}/preview`
    );
    if (previewData?.data?.sample_data?.length) {
      const checkKey = Object.keys(previewData?.data?.sample_data[0]);
      const tableColumn = [...checkKey].map((e) => {
        return {
          title: e,
          dataIndex: e,
          key: e,
          render: (record) => {
            if (typeof record == "object") {
              const recordString = JSON.stringify(record);

              if (recordString?.length > 50) {
                return (
                  <span>
                    {recordString.substring(0, 50)}...
                    <a
                      onClick={() => {
                        Modal.info({
                          title: e,
                          content: (
                            <div
                              style={{ height: "70vh", overflowX: "scroll" }}
                            >
                              <pre>
                                <code>
                                  {JSON.stringify(
                                    { record: record, record1: record },
                                    null,
                                    4
                                  )}
                                </code>
                              </pre>
                            </div>
                          ),
                          okText: "Ok",
                          cancelText: "No",
                          onOk: () => {},
                          cancelButtonProps: { style: { display: "none" } },
                          width: "80%",
                          destroyOnClose: true,
                          centered: true,
                        });
                      }}
                    >
                      Show Data
                    </a>
                  </span>
                );
              } else {
                return <span>{recordString}</span>;
              }
            } else {
              if (record?.length > 50) {
                return (
                  <span>
                    {record.substring(0, 50)}
                    <Tooltip
                      placement="left"
                      title={record}
                    >
                      ...
                      <a> Read More</a>
                    </Tooltip>
                  </span>
                );
              } else {
                return <span>{record}</span>;
              }
            }
          },
        };
      });
      setTableColumns([...tableColumn]);
    }
    setTableData(
      previewData?.data?.sample_data?.length
        ? [...previewData?.data?.sample_data]
        : []
    );
    setSpinning(false);
  };

  useEffect(() => {
    getPreviewData();
  }, [nodeId]);

  return (
    <div>
      <Table
        dataSource={tableData}
        columns={tableColumns}
        scroll={{ x: "max-content" }}
        loading={{
          indicator: (
            <div>
              <Spin />
            </div>
          ),
          spinning: spinning,
        }}
        size={"small"}
        pagination={{
          onChange(current) {
            // alert(current)
            setPage(current);
          },
          defaultPageSize: 10,
          hideOnSinglePage: true,
        }}
      />
    </div>
  );
};

export default DataTable;
