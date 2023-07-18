import { Button, Col, Image, Row, Switch, Modal, Pagination } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { GETEVENT, UPDATEEVENT } from "../../network/apiConstants";
import { fetch_retry_get, fetch_retry_put } from "../../network/api-manager";
import { loderShowHideAction } from "../../Redux/action";
import { useQuery, useQueryClient } from "react-query";
import EventUsersList from "./eventUsersList";

const EventList = ({
  eventManagementCss,
  setTabType,
  setUpdateData,
  pastEvents,
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [eventId, setEventId] = useState(null);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const getData = async () => {
    const data = await fetch_retry_get(
      `${GETEVENT}pageNo/${page}/records/${pageSize}?pastEvents=${pastEvents}`
    );
    if (data.success) {
      setEventData(data.data?.eventDetails);
      return data;
    } else {
      setEventData([]);
      return [];
    }
  };

  const {
    status,
    data: eventDataArr,
    refetch,
  } = useQuery(["EVENT_DATA", pastEvents, page, pageSize], () => getData(), {
    refetchOnWindowFocus: false,
    enabled: true,
    staleTime: 10 * (60 * 1000),
  });

  useEffect(() => {
    dispatch(loderShowHideAction(true));
    if (status === "success") {
      dispatch(loderShowHideAction(false));
      if (eventDataArr?.success) {
        setEventData(eventDataArr.data);
      } else {
        setEventData([]);
      }
    }
  }, [status, eventDataArr]);

  const updateEventStatus = async (status, eventId) => {
    dispatch(loderShowHideAction(true));
    await fetch_retry_put(`${UPDATEEVENT}${eventId}/status/${status}`);
    await refetch();
    dispatch(loderShowHideAction(false));
    queryClient.refetchQueries({
      queryKey: ["EVENT_DATA", pastEvents == "true" ? "false" : "true"],
    });
  };

  return (
    <>
      <Modal
        title="Registered Users"
        open={modelOpen}
        onOk={() => {
          setModelOpen(false);
        }}
        onCancel={() => {
          setModelOpen(false);
        }}
        okText={"Delete"}
        okButtonProps={{
          style: { display: "none" },
        }}
        width={"90vw"}
        cancelText={"Close"}
        destroyOnClose
      >
        <EventUsersList
          eventManagementCss={eventManagementCss}
          eventId={eventId}
        />
      </Modal>

      <div style={{ marginTop: "4vh" }} className={eventManagementCss.listDiv}>
        {eventData?.eventDetails?.map((e, i) => {
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
                        setUpdateData(e);
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
                              {e?.eventHeading}
                            </span>
                            &nbsp; &nbsp;
                            <span>
                              <Switch
                                key={(Math.random() + 1)
                                  .toString(36)
                                  .substring(7)}
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
                                  updateEventStatus(
                                    ee ? "ACTIVE" : "INACTIVE",
                                    e?.eventId
                                  );
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
                      <Button
                        onClick={() => {
                          setEventId(e?.eventId);
                          setModelOpen(true);
                        }}
                        type="primary"
                        // danger
                        className={eventManagementCss.deleteBtn}
                      >
                        <EyeOutlined />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
      <Row>
        <Col span={24} className={eventManagementCss.paginationCss}>
          <Pagination
            current={page + 1}
            total={eventData?.totalCount}
            defaultPageSize={pageSize}
            hideOnSinglePage
            onChange={(page, pageSize) => {
              setPage(page - 1);
              setPageSize(pageSize);
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default EventList;
