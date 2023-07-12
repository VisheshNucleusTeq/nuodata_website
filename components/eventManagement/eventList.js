import { Button, Col, Image, Row, Switch, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { GETEVENT, UPDATEEVENT } from "../../network/apiConstants";
import {
  fetch_retry_get,
  fetch_retry_put_with_file,
} from "../../network/api-manager";
import { loderShowHideAction } from "../../Redux/action";
import { useQuery } from "react-query";

const EventList = ({ eventManagementCss, setTabType, setUpdateData, pastEvents }) => {
  const dispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const [eventData, setEventData] = useState([]);

  const getData = async () => {
    const data = await fetch_retry_get(`${GETEVENT}${pastEvents}`);
    if (data.success) {
      setEventData(data.data);
      return data;
    } else {
      setEventData([]);
      return [];
    }
  };

  const { status, data: eventDataArr, refetch } = useQuery(
    ["EVENT_DATA", pastEvents],
    () => getData(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      staleTime: 10 * (60 * 1000),
    }
  );

  useEffect(() => {
    dispatch(loderShowHideAction(true));
    if (status === "success") {
      dispatch(loderShowHideAction(false));
      if (eventDataArr?.success) {
        setEventData(eventDataArr.data);
      } else {
        setEventData([]);
        search === "" ?? message.error([eventDataArr?.error]);
      }
    }
  }, [status, eventDataArr]);

  const updateEventStatus = async (updateData, eventId) => {
    refetch()
    // console.log(status, eventId);
    // ${process.env.BASE_URL}
    // const resData = await fetch_retry_put_with_file(
    //   `${UPDATEEVENT}${eventId}`,
    //   updateData
    // );
  };

  return (
    <>
      <Modal
        title="Delete Confirmation"
        open={modelOpen}
        onOk={() => {
          setModelOpen(false);
        }}
        onCancel={() => {
          setModelOpen(false);
        }}
        okText={"Delete"}
        okButtonProps={{
          style: { backgroundColor: "red", border: "1px solid red" },
        }}
      >
        Are you sure you want to delete this event
      </Modal>

      <div style={{ marginTop: "4vh" }} className={eventManagementCss.listDiv}>
        {eventData.map((e, i) => {
          return (
            <div className={eventManagementCss.listData}>
              <Row>
                <Col span={6}>
                  <div className={eventManagementCss.imageDiv}>
                    <Image
                      src={e?.image}
                      height={"19.8vh"}
                      width={"100%"}
                      preview={false}
                    />
                    <p
                      onClick={() => {
                        setUpdateData(e)
                        setTabType("Add Event");
                      }}
                    >
                      <EditOutlined />
                    </p>
                  </div>
                </Col>
                <Col span={18}>
                  <Row>
                    <Col span={23}>
                      <Row style={{ margin: "1vh" }}>
                        <Col span={24}>
                          <h2>
                            <span className={eventManagementCss.eventTitle}>
                              {e?.eventHeading} {e?.status}
                            </span>{" "}
                            &nbsp; &nbsp;
                            <span>
                              <Switch
                                checkedChildren="Active"
                                unCheckedChildren={e?.status}
                                defaultChecked={e?.status === "active"}
                                style={{
                                  backgroundColor:
                                    e?.status === "active"
                                      ? "green"
                                      : e?.status === "expired"
                                      ? "orange"
                                      : "red",
                                }}
                                disabled={e?.status === "expired"}
                                onChange={(ee) => {
                                  let updateData = {
                                    ...e,
                                    status: ee ? "active" : "inactive",
                                  };
                                  delete updateData.image;
                                  updateEventStatus(updateData, e?.eventId);
                                }}
                              />
                            </span>
                          </h2>
                          <p>{e?.content}</p>
                        </Col>
                        <Col span={24}></Col>
                      </Row>
                    </Col>
                    <Col span={1}>
                      {/* <Button
                          onClick={() => {
                            setModelOpen(true);
                          }}
                          type="primary"
                          danger
                          className={eventManagementCss.deleteBtn}
                        >
                          <DeleteOutlined />
                        </Button> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EventList;
