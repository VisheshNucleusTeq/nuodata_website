import { Table, Space, Tooltip, Button } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";

import {
  SetTabTypeAction,
  SetProjectTransformDetailsAction,
} from "../../Redux/action";

export default function Design({ dataModernizationCss }) {
  const dispatch = useDispatch();

  return (
    <>
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
        />
      </div>
      <div className={dataModernizationCss.designMain}>
        <Table
          pagination={false}
          className="demo"
          columns={[
            {
              title: "Transformation Area",
              dataIndex: "transformationArea",
              key: "transformationArea",
            },
            {
              title: "Attribute/Column",
              dataIndex: "attributeColumn",
              key: "attributeColumn",
            },
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
            },
            {
              title: "Data Source",
              dataIndex: "dataSource",
              key: "dataSource",
            },
            {
              title: "Target Table Plan",
              dataIndex: "targetTablePlan",
              key: "targetTablePlan",
            },
            {
              title: "Target Attribute Name",
              key: "targetAttributeName",
              render: (_, record) => {
                return (
                  // <div className={`${dataModernizationCss.defineStep} ${dataModernizationCss.defineStepSelect}`}>
                  //   Acct_name
                  // </div>
                  <Button
                    type="default"
                    className={dataModernizationCss.targetAttributeName}
                  >
                    Acct_name
                  </Button>
                );
              },
            },
            {
              title: "Target Type",
              dataIndex: "targetType",
              key: "targetType",
            },
            {
              title: "Dependency & Lineage",
              dataIndex: "dependencyAndLineage",
              key: "dependencyAndLineage",
            },
          ]}
          dataSource={[
            {
              transformationArea: "AcctNbr_table1",
              attributeColumn: "Acct_Name",
              type: "String",
              dataSource: "Sql_bridge",
              targetTablePlan: "AcctNbr_table1",
              targetAttributeName: "BTN",
              targetType: "String",
              dependencyAndLineage: "This attribute is used at 34 other places",
            },
          ]}
        />
      </div>

      <div className={dataModernizationCss.nextExitBtn}>
        <Button
          type="primary"
          danger
          className={dataModernizationCss.nextBtn}
          htmlType="submit"
          onClick={() => {
            // dispatch(SetProjectTransformDetailsAction({ analyzeDetailsId }));
            dispatch(SetTabTypeAction("Design"));
          }}
          style={{ marginRight: "2%" }}
        >
          Design Workflow <ArrowRightOutlined />
        </Button>

        <Button
          type="primary"
          danger
          className={dataModernizationCss.nextBtn}
          htmlType="submit"
          onClick={() => {
            // dispatch(SetProjectTransformDetailsAction({ analyzeDetailsId }));
            dispatch(SetTabTypeAction("Design"));
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
