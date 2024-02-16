import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loderShowHideAction } from "../../../../Redux/action";
import {
  fetch_retry_get,
  fetch_retry_put,
} from "../../../../network/api-manager";
import {
  CREATENODE,
  NODEMETADATA,
  SORTFUNTYPES,
} from "../../../../network/apiConstants";

function SortCondition({ ingestionCss, sourceData, nodeId }) {
  const [tableData, setTableData] = useState({});
  const [sortConditions, setSortConditions] = useState([]);
  const [sortOrderOptions, setSortOrderOptions] = useState([]);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const dispatch = useDispatch();

  const getNodeRecord = async (nodeId) => {
    const oldRecordSchema = await fetch_retry_get(
      `${NODEMETADATA}${nodeId}/metadata`
    );
    if (
      (oldRecordSchema?.data?.sample_data &&
        oldRecordSchema?.data?.sample_data.length) ||
      (oldRecordSchema?.data?.fields && oldRecordSchema?.data?.fields.length)
    ) {
      setTableData(oldRecordSchema?.data);
    }
  };

  const getNodeSortConditions = async (nodeId) => {
    const oldRecordSchema = await fetch_retry_get(`${NODEMETADATA}${nodeId}`);
    if (oldRecordSchema?.data?.transformation_type === "Sorter") {
      if (
        oldRecordSchema?.data?.transformation_properties[0]?.property_name ==
        "order_by_condition"
      ) {
        const property_value =
          oldRecordSchema?.data?.transformation_properties[0]?.property_value ??
          "";
        if (property_value !== "") {
          const conditionsArray = property_value
            .split(",")
            .map((conditionString) => {
              const arr = conditionString.split(" ");
              const field = arr[0];
              const sortOrder = arr.slice(1).join(" "); // Join elements starting from index 1 with a space
              return { field, sortOrder };
            });
          setSortConditions(conditionsArray);
        }
      }
    }
  };

  const handleUpdateNodeRecord = async () => {
    dispatch(loderShowHideAction(true));
    let property_value = sortConditions
      .map((obj) => {
        if (obj?.field && obj?.sortOrder)
          return `${obj?.field ?? ""} ${obj?.sortOrder ?? ""}`.trim();
      })
      .join(",");
    while (property_value.endsWith(",")) {
      property_value = property_value.slice(0, -1);
    }
    let transformation_properties = [];
    transformation_properties.push({
      property_name: "order_by_condition",
      property_value: property_value,
    });
    const result = await fetch_retry_put(`${CREATENODE}/${nodeId}`, {
      ...sourceData,
      transformation_properties,
    });
    if (result?.success) {
      message.success(result?.data?.message);
      setIsOptionSelected(false);
    }
    dispatch(loderShowHideAction(false));
  };
  const getSortOrderOptions = async () => {
    const options = await fetch_retry_get(`${SORTFUNTYPES}`);
    if (
      options?.data &&
      options?.data?.elements &&
      options?.data?.elements?.length
    ) {
      const expData = options?.data?.elements.map((e) => {
        return {
          value: e?.value,
          label: e?.value,
        };
      });
      setSortOrderOptions(expData);
    }
  };
  useEffect(() => {
    getNodeRecord(nodeId);
    getNodeSortConditions(nodeId);
    getSortOrderOptions();
  }, []);

  const handleAddSortCondition = (conditionData) => {
    const newConditions = [...sortConditions];
    if (!newConditions.some((item) => item.field === conditionData)) {
      newConditions.push({ field: conditionData });
      setSortConditions(newConditions);
      setIsOptionSelected(false);
    }
  };

  return (
    <>
      <Row
        style={{
          border: "1px solid #D9D9D9",
          background: "var(--styler-05, #F3F4F5)",
          flexShrink: 0,
          padding: "10px",
        }}
      >
        <Col span={4} style={{ display: "flex", alignItems: "center" }}>
          <h1
            style={{
              color: "#313131",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "16px",
              fontSize: "14px",
            }}
          >
            {"Sort Conditions"}
          </h1>
        </Col>
        <Col span={20} style={{ justifyContent: "end", display: "flex" }}>
          <Button
            className={ingestionCss.addBtn}
            onClick={() => {
              handleAddSortCondition("");
            }}
          >
            Add
          </Button>
        </Col>
      </Row>
      <Col span={24} style={{ marginBottom: "16px" }}>
        {sortConditions.length > 0 && (
          <Row>
            <Col span={24}>
              <Row
                align="middle"
                className={ingestionCss.GroupByRow}
                style={{ height: "40px" }}
              >
                <Col span={7}>
                  <h1
                    style={{
                      color: "#313131",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "16px",
                      fontSize: "12px",
                      paddingLeft: "10px",
                    }}
                  >
                    Field
                  </h1>
                </Col>
                <Col offset={1} span={7}>
                  <h1
                    style={{
                      color: "#313131",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "16px",
                      fontSize: "12px",
                      paddingLeft: "10px",
                    }}
                  >
                    Sort Order
                  </h1>
                </Col>
              </Row>
            </Col>
            {sortConditions.map((condition, index) => (
              <Col span={24}>
                <Row
                  align="middle"
                  key={index}
                  className={ingestionCss.GroupByRow}
                >
                  <Col span={7}>
                    <Select
                      style={{ width: "100%" }}
                      name={"sortCondition"}
                      className={ingestionCss.inputSelect}
                      placeholder="Enter sort condition"
                      optionFilterProp="children"
                      showSearch
                      onChange={(conditionData) => {
                        const newConditions = [...sortConditions];
                        if (
                          !newConditions.some(
                            (item) => item.condition === conditionData
                          )
                        ) {
                          newConditions[index].field = conditionData;
                          setSortConditions(newConditions);
                          setIsOptionSelected(true);
                        }
                      }}
                      value={condition.field}
                    >
                      {tableData?.fields &&
                        tableData?.fields.length &&
                        tableData?.fields.map((e) => {
                          const isOptionExist = sortConditions.some(
                            (item) => item.field === e.name
                          );
                          return (
                            <Select.Option
                              key={e.name}
                              value={e.name}
                              disabled={isOptionExist}
                            >
                              {e?.name}
                            </Select.Option>
                          );
                        })}{" "}
                    </Select>
                  </Col>
                  <Col offset={1} span={7}>
                    <Select
                      style={{ width: "100%" }}
                      name={"sortCondition"}
                      className={ingestionCss.inputSelect}
                      placeholder="Enter sort condition"
                      optionFilterProp="children"
                      onChange={(sortOrder) => {
                        const newConditions = [...sortConditions];
                        newConditions[index].sortOrder = sortOrder;
                        setSortConditions(newConditions);
                        setIsOptionSelected(true);
                      }}
                      value={condition.sortOrder}
                      options={sortOrderOptions}
                    ></Select>
                  </Col>
                  <Col offset={8} span={1}>
                    <Button
                      className={ingestionCss.GroupByDltBtn}
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        const newConditions = sortConditions.filter(
                          (_, ind) => ind !== index
                        );
                        if (sortConditions.length > 1) {
                          setIsOptionSelected(true);
                        }
                        setSortConditions(newConditions);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        )}
        <Row align={"end"} className={ingestionCss.GroupBySbmtGrp}>
          <Col className={ingestionCss.expBtnGrp}>
            <Button
              className={`${ingestionCss.expSubmitBtn} ${ingestionCss.saveBtn}`}
              onClick={handleUpdateNodeRecord}
              disabled={!isOptionSelected}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default SortCondition;
