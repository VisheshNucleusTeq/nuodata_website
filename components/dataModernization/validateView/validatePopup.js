import React from "react";
import { Row, Col, Table, Select, Space, Input, Tree } from "antd";
import {
  FileAddOutlined,
  EyeOutlined,
  SyncOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const dataSource = Array(20)
  .fill(undefined)
  .map((e, i) => {
    return {
      key: 1 + i,
      select: i + " Mike",
      input: 32 + i,
      action: "10 Downing Street",
    };
  });

const columns = [
  {
    title: "Select",
    dataIndex: "select",
    key: "select",
    render: (value, row, index) => {
      return (
        <Select
          placeholder="Status"
          options={[
            {
              value: "notStarted",
              label: "Not Started",
            },
            {
              value: "passed",
              label: "Passed",
            },
            {
              value: "failed",
              label: "Failed",
            },
          ]}
          // defaultValue={"notStarted"}
          style={{ width: "100%" }}
        />
      );
    },
  },
  {
    title: "Input",
    dataIndex: "input",
    key: "input",
    render: (value, row, index) => {
      return <Input.TextArea style={{ width: "100%" }} rows={1} placeholder={"Comments"}/>;
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (value, row, index) => {
      return (
        <Space>
          <a>
            <FileAddOutlined style={{ fontSize: "2.5vh" }} />
          </a>
          <a>
            <EyeOutlined style={{ fontSize: "2.5vh" }} />
          </a>
          <a>
            <SyncOutlined style={{ fontSize: "2.5vh" }} />
          </a>
        </Space>
      );
    },
  },
];

const ValidatePopup = () => {
  const [treeData, setTreeData] = useState([
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  children: [
                    { title: "m_ma_event_MOV", key: "13660_13661_0" },
                    {
                      title: "m_Services_Margin_Rate_Pre_ACTUAL",
                      key: "13658_13659_1",
                    },
                    { title: "m_ma_dc_cost_adj_ctrl", key: "13656_13657_2" },
                    { title: "m_ma_ob_freight_ctrl", key: "13654_13655_3" },
                    { title: "m_MA_Sales_Pre_AMS_UPD", key: "13652_13653_4" },
                    { title: "m_ma_event_DEF_ALLOW", key: "13650_13651_5" },
                    { title: "m_USR_MA_DC_COST_CTRL", key: "13648_13649_6" },
                    { title: "m_ma_sales_pre_TRUNC", key: "13646_13647_7" },
                    { title: "m_ma_event_CASH_DISCOUNT", key: "13644_13645_8" },
                    { title: "m_ma_event_DC_COST_EST", key: "13642_13643_9" },
                    { title: "m_MA_Event_SERVICES", key: "13640_13641_10" },
                    { title: "m_ma_sales_pre_SQL", key: "13638_13639_11" },
                    { title: "m_ma_event_RX", key: "13636_13637_12" },
                    { title: "m_ma_event_EMS", key: "13634_13635_13" },
                    {
                      title: "m_ma_sales_trans_upc_SQL_DELETE",
                      key: "13632_13633_14",
                    },
                    { title: "m_MA_Event_AMS_Pre", key: "13630_13631_15" },
                    { title: "m_ma_fiscal_mo_ctrl", key: "13628_13629_16" },
                    { title: "m_ma_event_DC_COST_ADJ", key: "13626_13627_17" },
                    { title: "m_ma_event_pre_EMS", key: "13624_13625_18" },
                    { title: "m_ma_movement_pre", key: "13622_13623_19" },
                    {
                      title: "m_Services_Margin_Rate_ACTUAL",
                      key: "13620_13621_20",
                    },
                    { title: "m_MA_Event_AMS", key: "13618_13619_21" },
                    { title: "m_ma_stu_chg_pre_TRUNC", key: "13616_13617_22" },
                    {
                      title: "m_Services_Margin_Rate_ESTIMATE",
                      key: "13614_13615_23",
                    },
                    { title: "m_USR_MA_DEF_ALLOW_CTRL", key: "13612_13613_24" },
                    { title: "m_ma_event_ROYALTIES", key: "13610_13611_25" },
                    { title: "m_ma_stu_chg_pre_SQL", key: "13608_13609_26" },
                    {
                      title: "m_ma_sales_trans_upc_SQL_INSERT",
                      key: "13606_13607_27",
                    },
                    { title: "m_ma_movement_day", key: "13604_13605_28" },
                    {
                      title: "m_ma_cash_discounts_ctrl_ACT",
                      key: "13602_13603_29",
                    },
                    { title: "m_ma_event_OB_FREIGHT", key: "13600_13601_30" },
                    { title: "m_USR_MA_MOVEMENT_CTRL", key: "13598_13599_31" },
                    {
                      title: "m_ma_cash_discounts_ctrl_EST",
                      key: "13596_13597_32",
                    },
                    {
                      title: "m_ma_cash_discounts_ctrl_OVRD",
                      key: "13594_13595_33",
                    },
                    {
                      title: "m_USR_MA_CASH_DISCOUNT_OVRD_CTRL",
                      key: "13592_13593_34",
                    },
                  ],
                  title: "Mappings",
                },
              ],
              title: "wf_Margin_Adjustment",
              key: "13591_0_35",
            },
          ],
          title: "Workflows",
        },
        {
          children: [
            { title: "m_ma_event_MOV", key: "13660_13661_36" },
            {
              title: "m_Services_Margin_Rate_Pre_ACTUAL",
              key: "13658_13659_37",
            },
            { title: "m_ma_dc_cost_adj_ctrl", key: "13656_13657_38" },
            { title: "m_ma_ob_freight_ctrl", key: "13654_13655_39" },
            { title: "m_MA_Sales_Pre_AMS_UPD", key: "13652_13653_40" },
            { title: "m_ma_event_DEF_ALLOW", key: "13650_13651_41" },
            { title: "m_USR_MA_DC_COST_CTRL", key: "13648_13649_42" },
            { title: "m_ma_sales_pre_TRUNC", key: "13646_13647_43" },
            { title: "m_ma_event_CASH_DISCOUNT", key: "13644_13645_44" },
            { title: "m_ma_event_DC_COST_EST", key: "13642_13643_45" },
            { title: "m_MA_Event_SERVICES", key: "13640_13641_46" },
            { title: "m_ma_sales_pre_SQL", key: "13638_13639_47" },
            { title: "m_ma_event_RX", key: "13636_13637_48" },
            { title: "m_ma_event_EMS", key: "13634_13635_49" },
            { title: "m_ma_sales_trans_upc_SQL_DELETE", key: "13632_13633_50" },
            { title: "m_MA_Event_AMS_Pre", key: "13630_13631_51" },
            { title: "m_ma_fiscal_mo_ctrl", key: "13628_13629_52" },
            { title: "m_ma_event_DC_COST_ADJ", key: "13626_13627_53" },
            { title: "m_ma_event_pre_EMS", key: "13624_13625_54" },
            { title: "m_ma_movement_pre", key: "13622_13623_55" },
            { title: "m_Services_Margin_Rate_ACTUAL", key: "13620_13621_56" },
            { title: "m_MA_Event_AMS", key: "13618_13619_57" },
            { title: "m_ma_stu_chg_pre_TRUNC", key: "13616_13617_58" },
            { title: "m_Services_Margin_Rate_ESTIMATE", key: "13614_13615_59" },
            { title: "m_USR_MA_DEF_ALLOW_CTRL", key: "13612_13613_60" },
            { title: "m_ma_event_ROYALTIES", key: "13610_13611_61" },
            { title: "m_ma_stu_chg_pre_SQL", key: "13608_13609_62" },
            { title: "m_ma_sales_trans_upc_SQL_INSERT", key: "13606_13607_63" },
            { title: "m_ma_movement_day", key: "13604_13605_64" },
            { title: "m_ma_cash_discounts_ctrl_ACT", key: "13602_13603_65" },
            { title: "m_ma_event_OB_FREIGHT", key: "13600_13601_66" },
            { title: "m_USR_MA_MOVEMENT_CTRL", key: "13598_13599_67" },
            { title: "m_ma_cash_discounts_ctrl_EST", key: "13596_13597_68" },
            { title: "m_ma_cash_discounts_ctrl_OVRD", key: "13594_13595_69" },
            {
              title: "m_USR_MA_CASH_DISCOUNT_OVRD_CTRL",
              key: "13592_13593_70",
            },
          ],
          title: "Mappings",
        },
      ],
      title: "wf_Margin_Adjustment",
      key: "defaultExpandedKey",
    },
  ]);
  const [treeDataDefault, setTreeDataDefault] = useState(treeData);
  const [search, setSearch] = useState("");

  const filter = (array, text) => {
    const getNodes = (result, object) => {
      if (object.title.toLowerCase().includes(text.toLowerCase())) {
        result.push({ ...object, className: text ? "demo123" : "" });
        return result;
      }
      if (Array.isArray(object.children)) {
        const children = object.children.reduce(getNodes, []);
        if (children.length) result.push({ ...object, children });
      }
      return result;
    };
    return array.reduce(getNodes, []);
  };

  return (
    <>
      <Row>
        <Col span={6} style={{ backgroundColor: "#0c3246", height: "85vh" }}>
          <Input
            placeholder="Search"
            onKeyUp={(e) => {
              setSearch(e.target.value);
              const filterData = filter(treeDataDefault, e.target.value);
              setTreeData(filterData.length ? filterData : []);
            }}
            style={{ height: "5vh", border: "1px solid #0c3246" }}
          />
          {treeData.length > 0 || search.length > 0 ? (
            <>
              {search == "" ? (
                <>
                  <Tree
                    className="treeCss"
                    defaultExpandedKeys={["defaultExpandedKey"]}
                    style={{
                      color: "#FFF",
                      paddingTop: "2vh",
                      backgroundColor: "#0c3246",
                      height: "80vh",
                      overflowY: "scroll",
                    }}
                    showLine
                    onSelect={(e) => {
                      alert(e);
                    }}
                    treeData={treeData}
                  />
                </>
              ) : (
                <>
                  <span></span>
                  <Tree
                    className="treeCss"
                    defaultExpandAll={true}
                    defaultExpandParent={true}
                    style={{
                      color: "#FFF",
                      paddingTop: "2vh",
                      backgroundColor: "#0c3246",
                      height: "80vh",
                      overflowY: "scroll",
                    }}
                    showLine
                    onSelect={(e) => {
                      alert(e);
                    }}
                    treeData={treeData}
                  />
                </>
              )}
            </>
          ) : (
            <center>
              <LoadingOutlined
                style={{ color: "#e74860", fontSize: "4vh", marginTop: "4vh" }}
              />
            </center>
          )}
        </Col>

        <Col span={18} style={{ height: "85vh", padding: "1vw" }}>
          <Table
            showHeader={false}
            pagination={false}
            dataSource={dataSource}
            columns={columns}
            style={{ height: "83vh", overflow: "scroll" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default ValidatePopup;
