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
                      // style={{ width: "50vw" }}
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
