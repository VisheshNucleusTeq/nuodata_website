import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Divider,
  Button,
  Popconfirm,
  message,
  AutoComplete,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  Loading3QuartersOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  fetch_retry_post,
  fetch_retry_get,
  fetch_retry_put,
  fetch_retry_delete,
} from "../../../network/api-manager";
import {
  ADDDATABASEVARIABLE,
  UPDATEDATABASEVARIABLE,
  GETDATABASEVARIABLE,
  GETPROJECTDATABASEVARIABLE,
  DELETEVERIABLE,
} from "../../../network/apiConstants";

import { loderShowHideAction } from "../../../Redux/action";
import { useRef } from "react";

const veriable = ({
  childData,
  fileId,
  projectId,
  setAddDataBase,
  isVeriableAddSubmit,
  setIsVeriableAddSubmit,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const [selectedTable, setSelectedTable] = useState([]);
  const [veriableRecord, setVeriableRecord] = useState([]);
  const [projectVeriableRecord, setProjectVeriableRecord] = useState([]);

  const getOptions = (sourceTitle, tableType, childData, index) => {
    return [...childData]?.filter((e) => e.tableType == tableType).length
      ? {
          label: (
            <>
              <p style={{ color: "#0c3246" }}>
                <b>{sourceTitle}</b>
              </p>
            </>
          ),
          options: [
            ...childData
              ?.filter((e) => e.tableType == tableType)
              ?.map((e) => {
                return {
                  label: `${e?.tableName} (${e?.tableType})`,
                  value: e?.tableId,
                  className: selectedTable.includes(e?.tableId)
                    ? "selectabc"
                    : "",
                };
              }),
          ],
          optionFilterProp: "children",
        }
      : {};
  };

  useEffect(() => {
    form.setFieldValue("databaseName", "V_DEFAULT_DB");
    form.setFieldValue("databaseValue", "nuodata_default");
    form.setFieldValue("tableIds", [
      ...childData
        .filter((e) => !selectedTable.includes(e?.tableId))
        ?.map((e) => e?.tableId),
    ]);
  }, [selectedTable]);

  const onVariableSubmit = async (data) => {
    const updateData = data?.db_variable.filter((e) => {
      return e?.variableId ? true : false;
    });
    const addData = data?.db_variable.filter((e) => {
      return e?.variableId ? false : true;
    });

    if (data?.databaseName && data?.databaseValue && data?.tableIds) {
      if (data?.variableId && data?.variableId > 0) {
        updateData.push({
          databaseName: data?.databaseName,
          databaseValue: data?.databaseValue,
          tableIds: data?.tableIds,
          variableId: data?.variableId,
        });
      } else {
        addData.push({
          databaseName: data?.databaseName,
          databaseValue: data?.databaseValue,
          tableIds: data?.tableIds,
        });
      }
    }

    if (updateData && updateData.length) {
      const resultUpdate = await fetch_retry_put(
        `${UPDATEDATABASEVARIABLE}${fileId}`,
        updateData
      );
      dispatch(loderShowHideAction(false));
      if (resultUpdate.success) {
        message.success(resultUpdate?.data?.message);
        setAddDataBase(false);
      } else {
        message.error(resultUpdate.error);
      }
    }

    if (addData && addData.length) {
      const resultAdd = await fetch_retry_post(
        `${UPDATEDATABASEVARIABLE}${fileId}`,
        addData
      );
      dispatch(loderShowHideAction(false));
      if (resultAdd.success) {
        message.success(resultAdd?.data?.message);
        setAddDataBase(false);
      } else {
        message.error(resultAdd.error);
      }
    }
  };

  const getVariableRecord = async () => {
    const result = await fetch_retry_get(`${GETDATABASEVARIABLE}${fileId}`, {});
    if (result.success && result?.data?.length) {
      const oldData = result?.data.filter((e) => {
        return e.databaseName != "V_DEFAULT_DB";
      });

      setVeriableRecord(
        oldData.length
          ? oldData
          : [
              {
                databaseName: "",
                databaseValue: "",
                tableIds: [],
                variableId: 0,
              },
            ]
      );
      let tableIds = [];
      result?.data
        ?.filter((e) => {
          if (e?.databaseName != "V_DEFAULT_DB") {
            return true;
          } else {
            form.setFieldValue("variableId", e.variableId);
            return false;
          }
        })
        ?.map((e) => {
          tableIds = [...tableIds, ...e.tableIds];
        });
      setSelectedTable(tableIds);
    } else {
      setVeriableRecord([
        {
          databaseName: "",
          databaseValue: "",
          tableIds: [],
          variableId: 0,
        },
      ]);
    }
  };

  const getProjectVariableRecord = async () => {
    const result = await fetch_retry_get(
      `${GETPROJECTDATABASEVARIABLE}${projectId}`,
      {}
    );
    if (result.success && result?.data?.length) {
      setProjectVeriableRecord(result?.data);
    } else {
      setProjectVeriableRecord([]);
    }
  };

  const addUpdateVeriable = async () => {
    try {
      const data = await form.validateFields();
      dispatch(loderShowHideAction(true));
      await onVariableSubmit(data);
    } catch (error) {
      setTimeout(() => {
        const element = document.getElementsByClassName(
          "ant-form-item-explain-error"
        )[0];
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }
      }, 1000);
      dispatch(loderShowHideAction(false));
    }
  };

  const deleteVeriable = async (id) => {
    // setTimeout(()=>{
    //   alert(id)

    // },2000)
    await fetch_retry_delete(`${DELETEVERIABLE}${id}`);
    getVariableRecord();
    getProjectVariableRecord();
  };

  useEffect(() => {
    if (isVeriableAddSubmit === "YES") {
      addUpdateVeriable();
    }
    setIsVeriableAddSubmit("NO");
  }, [isVeriableAddSubmit]);

  useEffect(() => {
    getVariableRecord();
    getProjectVariableRecord();
  }, [fileId]);

  return (
    <div style={{ height: "70vh", overflowY: "scroll" }}>
      {veriableRecord.length > 0 ? (
        <Form form={form} layout={"vertical"} onFinish={onVariableSubmit}>
          <>
            <Row>
              <Col span={24} style={{ padding: "0vw 1vw 0vw 1vw" }}>
                <Form.Item
                  label="Variable Id"
                  name={"variableId"}
                  style={{ display: "none" }}
                >
                  <Input placeholder="input placeholder" defaultValue={0} />
                </Form.Item>
              </Col>
              <Col span={12} style={{ padding: "0vw 1vw 0vw 1vw" }}>
                <Form.Item
                  label={
                    <div>
                      Database Variable Name{" "}
                      <Tooltip
                        title={`A default variable with name "V_DEFAULT_DB" will be created with an editable value field (containing database name) which will be used for creating support tables and 'sql user define functions' to run this workflow.`}
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </div>
                  }
                  name={"databaseName"}
                  rules={[
                    {
                      required: true,
                      message: "Database variable name is required.",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    placeholder="input placeholder"
                    defaultValue={"V_DEFAULT_DB"}
                    disabled
                    onChange={() => {
                      form.setFieldValue("databaseName", "V_DEFAULT_DB");
                    }}
                    style={{ color: "gray" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12} style={{ padding: "0vw 1vw 0vw 1vw" }}>
                <Form.Item
                  label="Value"
                  name={"databaseValue"}
                  rules={[
                    {
                      required: true,
                      message: "Value is required.",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    placeholder="input placeholder"
                    defaultValue={"nuodata_default"}
                  />
                </Form.Item>
              </Col>
              <Col span={24} style={{ padding: "0vw 1vw 0vw 1vw" }}>
                <Form.Item
                  label="Tables"
                  name={"tableIds"}
                  style={{ pointerEvents: "none" }}
                >
                  <Select
                    className="inputSelectMultiple"
                    mode="multiple"
                    showSearch
                    placeholder="Select Tables"
                    options={[
                      ...childData
                        // .filter((e) => !selectedTable.includes(e?.tableId))
                        ?.map((e) => {
                          return {
                            label: `${e?.tableName} (${e?.tableType})`,
                            value: e?.tableId,
                          };
                        }),
                    ]}
                    optionFilterProp="children"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
          </>

          <Form.List name="db_variable" initialValue={veriableRecord}>
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <Row>
                      <Col span={24} style={{ padding: "0vw 1vw 0vw 1vw" }}>
                        {/* {form.getFieldsValue()?.db_variable[index]?.variableId} */}
                        <Form.Item
                          label="Variable Id"
                          name={[field.name, "variableId"]}
                          style={{ display: "none" }}
                        >
                          <Input
                            className="inputSelect"
                            placeholder="input placeholder"
                            defaultValue={0}
                            value={0}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12} style={{ padding: "0vw 1vw 0vw 1vw" }}>
                        <Form.Item
                          label="Database Variable Name"
                          name={[field.name, "databaseName"]}
                          rules={[
                            {
                              required: true,
                              message: "Database variable name is required.",
                            },
                          ]}
                        >
                          <AutoComplete
                            disabled={
                              form.getFieldsValue()?.db_variable &&
                              form.getFieldsValue()?.db_variable[index]
                                ?.databaseName === "V_DEFAULT_DB"
                            }
                            className="inputSelect"
                            placeholder="input here"
                            options={projectVeriableRecord.map((e) => {
                              return {
                                value: e?.databaseName,
                                label: e?.databaseName,
                              };
                            })}
                            onSelect={(selectedData) => {
                              const findSelecter = projectVeriableRecord.find(
                                (e) => {
                                  return selectedData === e?.databaseName;
                                }
                              );

                              if (findSelecter) {
                                const fields = form.getFieldsValue();
                                const { db_variable } = fields;
                                Object.assign(db_variable[index], {
                                  databaseValue: findSelecter?.databaseValue,
                                });
                                form.setFieldsValue({ db_variable });
                              }
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12} style={{ padding: "0vw 1vw 0vw 1vw" }}>
                        <Form.Item
                          label="Value"
                          name={[field.name, "databaseValue"]}
                          rules={[
                            {
                              required: true,
                              message: "Value is required.",
                            },
                          ]}
                        >
                          <AutoComplete
                            className="inputSelect"
                            placeholder="input here"
                            options={projectVeriableRecord.map((e) => {
                              return {
                                value: e?.databaseValue,
                                label: e?.databaseValue,
                              };
                            })}
                            onSelect={(selectedData) => {
                              const findSelecter = projectVeriableRecord.find(
                                (e) => {
                                  return selectedData === e?.databaseValue;
                                }
                              );

                              if (findSelecter) {
                                const fields = form.getFieldsValue();
                                const { db_variable } = fields;
                                Object.assign(db_variable[index], {
                                  databaseName: findSelecter?.databaseName,
                                });
                                form.setFieldsValue({ db_variable });
                              }
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24} style={{ padding: "0vw 1vw 0vw 1vw" }}>
                        <Form.Item
                          label="Tables"
                          name={[field.name, "tableIds"]}
                          rules={[
                            {
                              required: true,
                              message: "Database table is required.",
                            },
                          ]}
                        >
                          <Select
                            className="inputSelectMultiple"
                            mode="multiple"
                            showSearch
                            placeholder="Select Tables"
                            optionFilterProp="children"
                            options={[
                              getOptions(
                                "Source Tables",
                                "source",
                                childData,
                                field.name
                              ),
                              getOptions(
                                "Target Tables",
                                "target",
                                childData,
                                field.name
                              ),
                              getOptions(
                                "Source and Target Tables",
                                "source_and_target",
                                childData,
                                field.name
                              ),
                            ]}
                            onDeselect={(e) => {
                              setSelectedTable(
                                selectedTable.filter((ee) => ee != e)
                              );
                            }}
                            onChange={(e) => {
                              setSelectedTable([
                                ...new Set([...selectedTable, ...e]),
                              ]);
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24} style={{ padding: "0vw 1vw 0vw 1vw" }}>
                        <Form.Item>
                          <Row justify={"end"}>
                            {fields.length === index + 1 ? (
                              <Col span={6} style={{ padding: "1vw" }}>
                                <Button
                                  type="primary"
                                  htmlType="button"
                                  onClick={() => {
                                    add();
                                    setTimeout(() => {
                                      myRef?.current?.scrollIntoView({
                                        behavior: "smooth",
                                      });
                                    }, 0);
                                  }}
                                  style={{
                                    width: "100%",
                                    backgroundColor: "#0c3246",
                                    border: "#0c3246",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <PlusOutlined /> Add New Variable
                                </Button>
                              </Col>
                            ) : null}
                            {fields.length > 0 ? (
                              <Col span={6} style={{ padding: "1vw" }}>
                                <Popconfirm
                                  title="Confirmmation"
                                  description="Are you sure to delete this user?"
                                  onConfirm={() => {
                                    const formValues = form.getFieldValue();
                                    if (
                                      formValues?.db_variable[field.name]
                                        ?.tableIds?.length
                                    ) {
                                      let difference = selectedTable.filter(
                                        (x) =>
                                          formValues?.db_variable[
                                            field.name
                                          ]?.tableIds.indexOf(x) === -1
                                      );
                                      setSelectedTable(difference);
                                    }
                                    remove(field.name);

                                    if (
                                      formValues?.db_variable[index]?.variableId
                                    ) {
                                      deleteVeriable(
                                        formValues?.db_variable[index]
                                          ?.variableId
                                      );
                                    }
                                  }}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <Button
                                    danger
                                    type="primary"
                                    style={{
                                      width: "100%",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <DeleteOutlined />{" "}
                                    {form.getFieldsValue() &&
                                    form.getFieldsValue()?.db_variable &&
                                    form.getFieldsValue()?.db_variable[index]
                                      ?.variableId
                                      ? "Delete"
                                      : "Remove"}
                                  </Button>
                                </Popconfirm>
                              </Col>
                            ) : null}
                          </Row>
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                </div>
              );
            }}
          </Form.List>

          <p ref={myRef}></p>

          {/* <Row justify={"center"}>
            <Col span={12}>
              <Button
                type="primary"
                style={{
                  width: "100%",
                  backgroundColor: "#e74860",
                  border: "#e74860",
                  borderRadius: "10px",
                }}
                htmlType="submit"
              >
                Submit
              </Button>
            </Col>
          </Row> */}

          {/* <Input type="submit" value={"Submit"} /> */}
        </Form>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <Loading3QuartersOutlined
            spin
            style={{ fontSize: "4vw", color: "#e74860" }}
          />
        </div>
      )}
    </div>
  );
};

export default veriable;
