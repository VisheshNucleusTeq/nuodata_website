import React, { useEffect, useRef, useState } from "react";
import {
  fetch_retry_put,
  fetch_retry_get,
} from "../../../../network/api-manager";
import { CREATENODE } from "../../../../network/apiConstants";
import { loderShowHideAction } from "../../../../Redux/action";
import { useDispatch } from "react-redux";
import { Col, Row, Space, message, Select, Table, Button, Modal } from "antd";
import { NODEMETADATA } from "../../../../network/apiConstants";
import { DeleteOutlined } from "@ant-design/icons";
const JoinCondition = ({
  ingestionCss,
  nodeId,
  sourceData,
  setSourceData,
  pipeline,
  edgeData,
}) => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [joinType, setJoinType] = useState("");
  const [joinCondition, setJoinCondition] = useState("simple");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [masterSource, setMasterSource] = useState({});
  const [detailsSource, setDetailsSource] = useState({});

  const [masterMeta, setMasterMeta] = useState({});
  const [detailsMeta, setDetailsMeta] = useState({});

  const [joinData, setJoinData] = useState([
    { master: "", operator: "", detail: "" },
  ]);

  const setOldNewValue = (
    transformation_properties,
    property_name,
    property_value
  ) => {
    const sourceIndex = transformation_properties.findIndex(
      (item) => item.property_name === property_name
    );
    if (sourceIndex < 0) {
      transformation_properties.push({
        property_name: property_name,
        property_value: property_value,
      });
    } else {
      transformation_properties[sourceIndex] = {
        property_name: property_name,
        property_value: property_value,
      };
    }
    return transformation_properties;
  };

  const updateJoin = async () => {
    dispatch(loderShowHideAction(true));
    var transformation_properties = sourceData?.transformation_properties;

    const joinTypeData = transformation_properties.filter((e) => {
      return e?.property_name == "join_type";
    });

    if (joinTypeData && joinTypeData.length) {
      setJoinType(joinTypeData[0].property_value);
    }

    const joinConditionTypeData = transformation_properties.filter((e) => {
      return e?.property_name == "join_condition_type";
    });

    if (joinConditionTypeData && joinConditionTypeData.length) {
      setJoinCondition(joinConditionTypeData[0].property_value);
    }

    const joinConditionData = transformation_properties.filter((e) => {
      return e?.property_name == "join_condition";
    });

    if (joinConditionData && joinConditionData.length) {
      const singleArr = joinConditionData[0].property_value.split(" AND ");
      const joinDataArr = singleArr.map((e) => {
        if (e.split(" ").length == 3) {
          return {
            master: e?.split(" ")[0]?.split(".").length
              ? e?.split(" ")[0]?.split(".")[1]
              : "",
            operator: e.split(" ")[1],
            detail: e?.split(" ")[2]?.split(".").length
              ? e?.split(" ")[2]?.split(".")[1]
              : "",
          };
        }
      });
      setJoinData(joinDataArr);
    }

    const joinMasterData = edgeData.filter(
      (e) =>
        e?.target_node_id == nodeId && e?.ui_details?.targetHandle == "Master"
    );
    const joinDetailsData = edgeData.filter(
      (e) =>
        e?.target_node_id == nodeId && e?.ui_details?.targetHandle == "Details"
    );

    if (joinMasterData && joinMasterData.length) {
      const masterData = await fetch_retry_get(
        `${CREATENODE}/${joinMasterData[0]?.source_node_id}`
      );
      if (masterData?.success) {
        setMasterSource(masterData?.data);
      }

      const masterMetadata = await fetch_retry_get(
        `${NODEMETADATA}${joinMasterData[0]?.source_node_id}/metadata`
      );
      if (masterMetadata?.success) {
        setMasterMeta(masterMetadata?.data);
      }

      transformation_properties = setOldNewValue(
        transformation_properties,
        "master_table",
        joinMasterData[0]?.source_node_id
      );
    }

    if (joinDetailsData && joinDetailsData.length) {
      const detailData = await fetch_retry_get(
        `${CREATENODE}/${joinDetailsData[0]?.source_node_id}`
      );
      if (detailData?.success) {
        setDetailsSource(detailData?.data);
      }

      const detailMetadata = await fetch_retry_get(
        `${NODEMETADATA}${joinDetailsData[0]?.source_node_id}/metadata`
      );
      if (detailMetadata?.success) {
        setDetailsMeta(detailMetadata?.data);
      }

      transformation_properties = setOldNewValue(
        transformation_properties,
        "detail_table",
        joinDetailsData[0]?.source_node_id
      );
    }

    const result = await fetch_retry_put(`${CREATENODE}/${nodeId}`, {
      ...sourceData,
      transformation_properties: transformation_properties,
    });
    setSourceData({
      ...sourceData,
      transformation_properties: transformation_properties,
    });
    if (result?.success) {
      // message.success(result?.data?.message);
    }
    dispatch(loderShowHideAction(false));
  };

  const updateFilterData = async (type) => {
    var transformation_properties = sourceData?.transformation_properties;

    const masterTable = masterSource?.transformation_properties.filter((e) => {
      return e?.property_name == "source_table";
    });
    const detailTable = detailsSource?.transformation_properties.filter((e) => {
      return e?.property_name == "source_table";
    });

    if (
      masterTable &&
      masterTable.length &&
      detailTable &&
      detailTable.length
    ) {
      transformation_properties = setOldNewValue(
        transformation_properties,
        "join_type",
        joinType
      );

      transformation_properties = setOldNewValue(
        transformation_properties,
        "join_condition_type",
        joinCondition
      );

      let isValid = true;
      const joinDataArr = joinData.map((e) => {
        if (e?.master && e?.operator && e?.detail) {
          // return `${masterTable[0]?.property_value}.${e?.master} ${e?.operator} ${detailTable[0]?.property_value}.${e?.detail}`;
          return `master.${e?.master} ${e?.operator} detail.${e?.detail}`;
        } else {
          isValid = false;
        }
      });

      if (isValid) {
        dispatch(loderShowHideAction(true));
        transformation_properties = setOldNewValue(
          transformation_properties,
          "join_condition",
          joinDataArr.join(" AND ")
        );

        const result = await fetch_retry_put(`${CREATENODE}/${nodeId}`, {
          ...sourceData,
          transformation_properties,
        });
        if (result?.success) {
          message.success(result?.data?.message);
        }
        dispatch(loderShowHideAction(false));
      } else {
        message.error("Invalid Join Conditions");
      }
    } else {
      message.error("Invalid Join Conditions");
    }
  };

  useEffect(() => {
    updateJoin();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [joinData]);

  return (
    <>
      <Modal
        title="New Input Parameter"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        Form
      </Modal>
      <Row>
        <Col span={24} style={{ backgroundColor: "#eceeef", padding: ".8vw" }}>
          <Space>
            <span>
              <b>Master:</b>&nbsp; {masterSource?.transformation_name}
            </span>{" "}
            <span>
              <b>Detail:</b>&nbsp; {detailsSource?.transformation_name}
            </span>
          </Space>
        </Col>
        <Col span={24} style={{ padding: ".8vw", marginTop: "2vh" }}>
          <Row>
            <Col span={3} style={{ display: "flex", alignItems: "center" }}>
              <b>Join Type:</b>
            </Col>
            <Col span={8}>
              <Select
                style={{ width: "100%" }}
                onChange={(e) => {
                  setJoinType(e);
                }}
                tokenSeparators={[","]}
                options={[
                  { label: "JOIN", value: "JOIN" },
                  { label: "LEFT JOIN", value: "LEFT JOIN" },
                  { label: "RIGHT JOIN", value: "RIGHT JOIN" },
                  { label: "FULL JOIN", value: "FULL JOIN" },
                ]}
                value={joinType}
              />
            </Col>
            <Col span={2}></Col>
            <Col span={3} style={{ display: "flex", alignItems: "center" }}>
              <b>Join Condition:</b>
            </Col>
            <Col span={8}>
              <Select
                style={{ width: "100%" }}
                onChange={(e) => {
                  setJoinCondition(e);
                }}
                tokenSeparators={[","]}
                options={[
                  { label: "Simple", value: "simple" },
                  { label: "Completely Parameterized", value: "entire" },
                ]}
                value={joinCondition}
              />
            </Col>
          </Row>
        </Col>

        {joinCondition == "simple" && (
          <Col span={24}>
            <Row>
              <Col
                span={24}
                style={{
                  backgroundColor: "#eceeef",
                  padding: ".6vw",
                  marginTop: "1vh",
                }}
              >
                <Row>
                  <Col
                    span={12}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Join Conditions
                  </Col>
                  <Col
                    span={12}
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <Button
                      onClick={() => {
                        setJoinData([
                          ...joinData,
                          { master: "", operator: "", detail: "" },
                        ]);
                      }}
                      style={{ borderRadius: "20px" }}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Table
                  columns={[
                    {
                      title: "Master",
                      dataIndex: "master",
                      width: "30%",
                      render: (item, record, index) => {
                        return (
                          <>
                            <Select
                              key={(Math.random() + 1)
                                .toString(36)
                                .substring(7)}
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                const joinDataArr = [...joinData];
                                joinDataArr[index].master = e;
                                setJoinData(joinDataArr);
                              }}
                              value={record?.master}
                              options={
                                masterMeta && masterMeta?.fields
                                  ? [
                                      ...masterMeta?.fields?.map((e) => {
                                        return {
                                          label: e?.name,
                                          value: e?.name,
                                        };
                                      }),
                                    ]
                                  : []
                              }
                            />
                          </>
                        );
                      },
                    },
                    {
                      title: "Operator",
                      dataIndex: "operator",
                      width: "30%",
                      render: (item, record, index) => {
                        return (
                          <>
                            <Select
                              key={(Math.random() + 1)
                                .toString(36)
                                .substring(7)}
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                const joinDataArr = [...joinData];
                                joinDataArr[index].operator = e;
                                setJoinData(joinDataArr);
                              }}
                              value={record?.operator}
                              options={[
                                { label: "=", value: "=" },
                                { label: "!=", value: "!=" },
                                { label: "<", value: "<" },
                                { label: ">", value: ">" },
                                { label: "<=", value: "<=" },
                                { label: ">=", value: ">=" },
                              ]}
                            />
                          </>
                        );
                      },
                    },
                    {
                      title: "Detail",
                      dataIndex: "detail",
                      width: "30%",
                      render: (item, record, index) => {
                        return (
                          <>
                            <Select
                              key={(Math.random() + 1)
                                .toString(36)
                                .substring(7)}
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                const joinDataArr = [...joinData];
                                joinDataArr[index].detail = e;
                                setJoinData(joinDataArr);
                              }}
                              value={record?.detail}
                              options={
                                detailsMeta && detailsMeta?.fields
                                  ? [
                                      ...detailsMeta?.fields?.map((e) => {
                                        return {
                                          label: e?.name,
                                          value: e?.name,
                                        };
                                      }),
                                    ]
                                  : []
                              }
                            />
                          </>
                        );
                      },
                    },
                    {
                      // title: "Detail",
                      dataIndex: "detail",
                      width: "10%",
                      render: (item, record, index) => {
                        return (
                          <>
                            <DeleteOutlined
                              disabled
                              style={{
                                color:
                                  joinData.length > 1 ? "red" : "lightgray",
                              }}
                              onClick={() => {
                                let joinDataArr = [...joinData];
                                setJoinData(
                                  joinDataArr.filter((e, i) => i != index)
                                );
                                // delete joinDataArr[index]
                                // setJoinData([...joinDataArr])
                              }}
                            />
                          </>
                        );
                      },
                    },
                  ]}
                  dataSource={[...joinData]}
                  bordered
                  pagination={false}
                />
              </Col>
            </Row>
          </Col>
        )}

        {joinCondition == "entire" && (
          <Col span={24} style={{ padding: ".8vw", marginTop: "2vh" }}>
            <Row>
              <Col span={3} style={{ display: "flex", alignItems: "center" }}>
                <b>Parameter: </b>
              </Col>
              <Col span={6}>
                <Select
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  tokenSeparators={[","]}
                  options={
                    [
                      // { label: "JOIN", value: "join" },
                      // { label: "LEFT JOIN", value: "left_join" },
                      // { label: "RIGHT JOIN", value: "right_join" },
                      // { label: "SFULL JOIN", value: "sfull_join" },
                    ]
                  }
                />
              </Col>
              <Col span={1}></Col>
              <Col span={3} style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  New Parameter
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        <br />
        <br />
        <br />
        <Col span={24} style={{ height: "8%" }}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Space>
              <Button
                type="primary"
                className={ingestionCss.defineSave}
                onClick={() => {
                  updateFilterData("save");
                }}
              >
                Save & exit
              </Button>
              <Button
                type="primary"
                className={ingestionCss.defineSaveAndBuild}
                onClick={() => {
                  updateFilterData("preview");
                }}
              >
                Save & Preview
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
      <div ref={scrollRef} />
    </>
  );
};
// Parameter

export default JoinCondition;
