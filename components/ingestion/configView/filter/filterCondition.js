import { Row, Col, Space, Select, Input, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { NODEMETADATA, CREATENODE } from "../../../../network/apiConstants";
import {
  fetch_retry_get,
  fetch_retry_put,
} from "../../../../network/api-manager";
import { loderShowHideAction } from "../../../../Redux/action";

const FilterCondition = ({ nodeId, sourceData, ingestionCss }) => {
  const dispatch = useDispatch();

  const [formSubmit, setFormSubmit] = useState(false);
  const [filterType, setFilterType] = useState("SIMPLE");
  const [fieldsData, setFieldsData] = useState([]);
  const [filterData, setFilterData] = useState([
    {
      field: "",
      type: "",
      value: "",
      key: (Math.random() + 1).toString(36).substring(7),
    },
  ]);
  const [filterValue, setFilterValue] = useState("");

  const fetchNodeMetadata = async (nodeId) => {
    const nodeMetaData = await fetch_retry_get(`${NODEMETADATA}${nodeId}`);
    setFieldsData(
      nodeMetaData?.data?.fields.map((e) => {
        return {
          value: e?.name,
          label: e?.name,
        };
      })
    );
  };

  const updateFilterData = async () => {
    dispatch(loderShowHideAction(true));
    let valid = true;
    let filterConditionValue = [];
    let filterString = "";
    if (filterType == "SIMPLE") {
      filterData.map((e) => {
        if (!e.field || !e.type || !e.value) {
          valid = false;
        }
        filterConditionValue.push(`${e.field} ${e.type} ${e.value}`);
      });
      filterString = filterConditionValue.join(" AND ");
    } else {
      filterString = filterValue;
    }

    let transformation_properties = sourceData?.transformation_properties;

    const whereConditionIndex = transformation_properties.findIndex(
      (item) => item.property_name === "where_condition"
    );
    if (whereConditionIndex < 0) {
      transformation_properties.push({
        property_name: "where_condition",
        property_value: filterString,
      });
    } else {
      transformation_properties[whereConditionIndex] = {
        property_name: "where_condition",
        property_value: filterString,
      };
    }

    const filterTypeIndex = transformation_properties.findIndex(
      (item) => item.property_name === "filter_type"
    );
    if (filterTypeIndex < 0) {
      transformation_properties.push({
        property_name: "filter_type",
        property_value: filterType,
      });
    } else {
      transformation_properties[filterTypeIndex] = {
        property_name: "filter_type",
        property_value: filterType,
      };
    }

    if (valid) {
      const result = await fetch_retry_put(`${CREATENODE}/${nodeId}`, {
        ...sourceData,
        transformation_properties,
      });
      if (result?.success) {
        message.success(result?.data?.message);
      } else {
        message.error("Something went wrong");
      }
    } else {
      setFormSubmit(true);
      message.error("Please fill all required fields");
    }
    dispatch(loderShowHideAction(false));
  };

  useEffect(() => {
    if (nodeId) {
      fetchNodeMetadata(nodeId);
    }
  }, [nodeId]);

  useEffect(() => {
    const filterTypeIndex = sourceData?.transformation_properties.filter(
      (item) => item.property_name === "filter_type"
    );
    if(filterTypeIndex && filterTypeIndex.length){
      if(filterTypeIndex[0]?.property_value == "SIMPLE"){
        const whereConditionIndex = sourceData?.transformation_properties.filter(
          (item) => item.property_name === "where_condition"
        );
        if(whereConditionIndex && whereConditionIndex.length){
          const whereCondition  = whereConditionIndex[0]?.property_value.split(" AND ");
          const whereConditionArr = []
          whereCondition.map((singleConditoin) => {
            const filterDataArr = singleConditoin.split(" ");
            whereConditionArr.push({
              field: filterDataArr[0],
              type: filterDataArr[1],
              value: filterDataArr[2],
              key: (Math.random() + 1).toString(36).substring(7),
            })
          })
          console.log(whereConditionArr)
          setFilterData(whereConditionArr)
        }
      }else{
        const whereConditionIndex = sourceData?.transformation_properties.filter(
          (item) => item.property_name === "where_condition"
        );
        console.log(whereConditionIndex)
        if(whereConditionIndex && whereConditionIndex.length){
          setFilterValue(whereConditionIndex[0]?.property_value)
        }

      }
      setFilterType(filterTypeIndex[0]?.property_value)
    }
  }, [sourceData]);

  return (
    <div>
      <Row justify={"center"}>
        <Col span={22}>
          <Space style={{ display: "flex", alignItems: "center" }}>
            <span>
              <b>Filter Type</b>
            </span>
            <Select
              style={{ width: "20vw" }}
              name={"filterType"}
              className="inputSelect"
              placeholder="Filter Type"
              optionFilterProp="children"
              value={filterType}
              options={[
                {
                  value: "SIMPLE",
                  label: "Simple",
                },
                {
                  value: "ADVANCE",
                  label: "Advance",
                },
              ]}
              onChange={(e) => {
                setFilterType(e);
              }}
            />
          </Space>
        </Col>
        <br />
        <br />
        <br />
        <Col span={22}>
          <Row>
            <Col span={12}>
              <b>Filter Conditions</b>
            </Col>
            <Col span={12}>
              {filterType == "SIMPLE" && (
                <Button
                  style={{ float: "right" }}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={() => {
                    setFilterData([
                      ...filterData,
                      {
                        field: "",
                        type: "",
                        value: "",
                        key: (Math.random() + 1).toString(36).substring(7),
                      },
                    ]);
                  }}
                />
              )}
            </Col>
          </Row>
        </Col>
        <br />
        <br />

        {filterType == "SIMPLE" &&
          filterData.map((e, i) => {
            return (
              <>
                <Col span={22} style={{ marginBottom: "1vh" }} key={e.key}>
                  <Row>
                    <Col span={7}>
                      <Select
                        style={{ width: "95%" }}
                        name={"filterType"}
                        className="inputSelect"
                        placeholder="Key"
                        optionFilterProp="children"
                        initialvalues={"SIMPLE"}
                        options={[...fieldsData]}
                        onChange={(fieldData) => {
                          const dataArr = JSON.parse(
                            JSON.stringify(filterData)
                          );
                          dataArr[i].field = fieldData;
                          setFilterData([...dataArr]);
                        }}
                        defaultValue={e?.field}
                      />
                      {formSubmit && !filterData[i].field && (
                        <p style={{ color: "red" }}>Key is required.</p>
                      )}
                    </Col>

                    <Col span={7}>
                      <Select
                        style={{ width: "95%" }}
                        name={"filterType"}
                        className="inputSelect"
                        placeholder="Type"
                        optionFilterProp="children"
                        initialvalues={"SIMPLE"}
                        options={["=", "<", "<=", ">", ">=", "!="].map((e) => {
                          return {
                            value: e,
                            label: e,
                          };
                        })}
                        onChange={(typeData) => {
                          const dataArr = JSON.parse(
                            JSON.stringify(filterData)
                          );
                          dataArr[i].type = typeData;
                          setFilterData([...dataArr]);
                        }}
                        defaultValue={e?.type}
                      />
                      {formSubmit && !filterData[i].type && (
                        <p style={{ color: "red" }}>type is required.</p>
                      )}
                    </Col>
                    <Col span={7}>
                      <Input
                        placeholder="Value"
                        value={e?.value}
                        style={{ width: "95%" }}
                        className="input"
                        key={e.key + "value"}
                        onChange={(valueData) => {
                          const dataArr = JSON.parse(
                            JSON.stringify(filterData)
                          );
                          dataArr[i].value = valueData.target.value;
                          setFilterData([...dataArr]);
                        }}
                      />
                      {formSubmit && !filterData[i].value && (
                        <p style={{ color: "red" }}>Value is required.</p>
                      )}
                    </Col>
                    <Col span={3}>
                      <Button
                        disabled={filterData.length == 1}
                        style={{ float: "right" }}
                        type="primary"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => {
                          let dataArr = [];
                          filterData.forEach((data, j) => {
                            if (i != j) {
                              dataArr.push(data);
                            }
                          });
                          setFilterData(dataArr);
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </>
            );
          })}
        {filterType == "ADVANCE" && (
          <Col span={22} style={{ marginBottom: "1vh" }} key={"sqlCondition"}>
            <Input.TextArea
            value={filterValue}
              rows={4}
              placeholder="Filter Condition"
              onChange={(e) => {
                setFilterValue(e.target.value);
              }}
            />
            {formSubmit && !filterValue && (
              <p style={{ color: "red" }}>Filter condition is required.</p>
            )}
          </Col>
        )}
        <br />
        <br />
        <br />
        <Col span={22} style={{ height: "8%" }}>
          <Button
            type="primary"
            htmlType="submit"
            className={ingestionCss.submitBtn}
            onClick={updateFilterData}
          >
            Submit Condition
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterCondition;
