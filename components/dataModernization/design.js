import { useState, useEffect } from "react";
import { Table, Space, Modal, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { SetTabTypeAction } from "../../Redux/action";
import { fetch_retry_get } from "../../network/api-manager";
import { TARGET } from "../../network/apiConstants";

export default function Design({ dataModernizationCss }) {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modelData, setModelData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const getDesignData = async () => {
    setLoading(true);

    const data = await fetch_retry_get(
      `${TARGET}${query.id ? query.id : projectDetails.projectId}`
    );

    setLoading(false);
    if (data.success) {
      setData(data?.data);
    } else {
      message.error(data?.error ? [data?.error] : "Something went wrong.");
    }
  };

  useEffect(() => {
    getDesignData();
  }, [query.id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <pre>{JSON.stringify(modelData)}</pre>
      </Modal>
      <div className={dataModernizationCss.designMain}>
        <Table
          pagination={false}
          className="demo"
          columns={[
            {
              title: "File",
              dataIndex: "file",
              key: "file",
            },
            {
              title: "Workflows",
              dataIndex: "workflows",
              key: "workflows",
            },
            {
              title: "Mappings",
              dataIndex: "mappings",
              key: "mappings",
            },
            {
              title: "Transformations",
              dataIndex: "transformations",
              key: "transformations",
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => <a>Detail</a>,
            },
          ]}
          dataSource={[
            {
              file: "Informatica1.xml",
              workflows: "2",
              mappings: "8",
              transformations: "24",
            },
          ]}
          scroll={{ x: true }}
        />
      </div>
      <div className={dataModernizationCss.designMain}>
        {/* {data.length} */}
        <Table
          pagination={false}
          className="demo"
          scroll={{ x: true }}
          columns={[
            {
              title: "Transformation Area",
              dataIndex: "tableName",
              key: "tableName",
            },
            {
              title: "Attribute/Column",
              dataIndex: "columnName",
              key: "columnName",
            },
            {
              title: "Type",
              dataIndex: "columnType",
              key: "columnType",
            },
            {
              title: "Data Source",
              dataIndex: "sourceTableName",
              key: "sourceTableName",
            },
            {
              title: "Target Table Plan",
              dataIndex: "tableName",
              key: "tableName",
            },
            {
              title: "Target Attribute Name",
              key: "targetAttributeName",
              render: (_, record) => {
                return (
                  <Button
                    onClick={() => {
                      setModelData(record);
                      showModal()
                    }}
                    type="default"
                    className={dataModernizationCss.targetAttributeName}
                  >
                    {record.columnName}
                  </Button>
                );
              },
            },
            {
              title: "Target Type",
              dataIndex: "columnType",
              key: "columnType",
            },
            {
              title: "Dependency & Lineage",
              dataIndex: "dependencyAndLineage",
              key: "dependencyAndLineage",
              render: (_, record) => {
                return <p>NA</p>;
              },
            },
          ]}
          dataSource={data}
          // dataSource={[
          //   {
          //     transformationArea: "AcctNbr_table1",
          //     attributeColumn: "Acct_Name",
          //     type: "String",
          //     dataSource: "Sql_bridge",
          //     targetTablePlan: "AcctNbr_table1",
          //     targetAttributeName: "BTN",
          //     targetType: "String",
          //     dependencyAndLineage: "This attribute is used at 34 other places",
          //   },
          // ]}
        />
      </div>

      <div className={dataModernizationCss.nextExitBtn}>
        {/* <Button
          type="primary"
          danger
          className={dataModernizationCss.nextBtn}
          htmlType="submit"
          onClick={() => {
            dispatch(SetTabTypeAction("Design"));
          }}
          style={{ marginRight: "2%" }}
        >
          Design Workflow <ArrowRightOutlined />
        </Button> */}

        <Button
          type="primary"
          danger
          className={dataModernizationCss.nextBtn}
          htmlType="submit"
          onClick={() => {
            dispatch(SetTabTypeAction("Transform"));
          }}
        >
          Transform <ArrowRightOutlined />
        </Button>
        <Button
          type="primary"
          danger
          className={dataModernizationCss.exitBtn}
          onClick={() => {
            router.push(`/dashboard`);
          }}
        >
          Save & Exit
        </Button>
      </div>
    </>
  );
}
