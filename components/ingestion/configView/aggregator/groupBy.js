import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Radio, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { fetch_retry_get, fetch_retry_put } from "../../../../network/api-manager";
import { CREATENODE, NODEMETADATA } from "../../../../network/apiConstants";
import { useDispatch } from "react-redux";
import { loderShowHideAction } from "../../../../Redux/action";

function GroupBy({ ingestionCss, sourceData, nodeId }) {
    const [tableData, setTableData] = useState({});
    const [groupByFieldData, setGroupByFieldData] = useState([]);
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
    const getNodeGroupByFields = async (nodeId) => {
        const oldRecordSchema = await fetch_retry_get(`${NODEMETADATA}${nodeId}`);
        if (oldRecordSchema?.data?.transformation_type === "Aggregator") {
            if (oldRecordSchema?.data?.transformation_properties[0]?.property_name == "group_by") {
                const property_value = oldRecordSchema?.data?.transformation_properties[0]?.property_value ?? "";
                if (property_value !== "")
                    setGroupByFieldData(property_value.split(",").map(field => ({ field })))
            }
        }
    }

    const handleUpdateNodeRecord = async () => {
        dispatch(loderShowHideAction(true));
        const property_value = groupByFieldData.map(obj => obj.field).join(",");
        let transformation_properties = [];
        transformation_properties.push({
            property_name: "group_by",
            property_value: property_value
        });
        const result = await fetch_retry_put(`${CREATENODE}/${nodeId}`, {
            ...sourceData,
            transformation_properties,
        });
        if (result?.success) {
            message.success(result?.data?.message);
        }
        dispatch(loderShowHideAction(false));

    }
    useEffect(() => {
        getNodeRecord(nodeId);
        getNodeGroupByFields(nodeId)
    }, []);

    const handleAddGroupByField = (fieldData) => {
        const newData = [...groupByFieldData];
        if (!newData.some(item => item.field === fieldData)) {
            newData.push({ field: fieldData });
            setGroupByFieldData(newData);
        }
    }


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
                <Col span={2} style={{ display: "flex", alignItems: "center" }}>
                    <h1
                        style={{
                            color: "#313131",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "16px",
                            fontSize: "14px",
                        }}
                    >
                        {"Group by:"}
                    </h1>
                </Col>
            </Row>
            {/* <Row>
                <Radio.Group
                    className={ingestionCss.radioStyle}
                    defaultValue={"Not_Parameterized"}
                >
                    <Radio value={"Not_Parameterized"}>Not Parameterized</Radio>
                    <Radio value={"Completely_Parameterized"}>
                        Completely Parameterized
                    </Radio>
                </Radio.Group>
            </Row> */}
            <Col span={24} style={{ marginBottom: "16px" }}>
                <Row
                    style={{
                        border: "1px solid #D9D9D9",
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
                                fontSize: "12px",
                            }}
                        >
                            {"Group by Fields"}
                        </h1>
                    </Col>
                    <Col span={20} style={{ justifyContent: "end", display: "flex" }}>
                        <Button className={ingestionCss.addBtn} onClick={() => { handleAddGroupByField("") }}>
                            Add
                        </Button>
                    </Col>
                </Row >
                <Row>
                    {groupByFieldData.map((e, i) => (
                        <Col span={24}  >
                            <Row justify="space-between" align="middle" key={e} className={ingestionCss.GroupByRow}>
                                <Col span={6}>
                                    <Select
                                        style={{ width: "100%" }}
                                        name={"filterType"}
                                        className={ingestionCss.inputSelect}
                                        placeholder="fieldName"
                                        optionFilterProp="children"
                                        showSearch
                                        onChange={(fieldData) => {
                                            const newData = [...groupByFieldData];
                                            if (!newData.some(item => item.field === fieldData)) {
                                                newData[i] = { field: fieldData };
                                                setGroupByFieldData(newData);
                                            }
                                        }}
                                        value={e.field}
                                    >
                                        {tableData?.fields &&
                                            tableData?.fields.length &&
                                            tableData?.fields.map((e) => {
                                                const isOptionSelected = groupByFieldData.some(item => item.field === e.name);
                                                return (
                                                    <Select.Option key={e.name} value={e.name} disabled={isOptionSelected}>
                                                        {e?.name}
                                                    </Select.Option>
                                                );
                                            })}{" "}
                                    </Select>
                                </Col>
                                <Col span={1}>
                                    <Button
                                        className={ingestionCss.GroupByDltBtn}
                                        icon={<DeleteOutlined />}
                                        onClick={() => {
                                            const newData = groupByFieldData.filter((_, index) => index !== i);
                                            setGroupByFieldData(newData);
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    ))}
                </Row>
                <Row align={"end"} className={ingestionCss.GroupBySbmtGrp}>
                    <Col className={ingestionCss.expBtnGrp}>
                        <Button
                            className={`${ingestionCss.expSubmitBtn} ${ingestionCss.saveBtn}`}
                            onClick={handleUpdateNodeRecord}
                            disabled={groupByFieldData.some(item => item.field === "")}
                        >
                            Save
                        </Button>
                    </Col>
                </Row >
            </Col >
        </>
    );
}

export default GroupBy;
