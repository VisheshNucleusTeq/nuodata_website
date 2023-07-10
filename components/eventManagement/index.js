import React, { useState } from "react";
import { Row, Col } from "antd";
import AddEvent from "./addEvent";
import EventList from "./eventList";
const EventManagement = ({ eventManagementCss }) => {
  const [tabType, setTabType] = useState("Add Event");

  return (
    <div className={eventManagementCss.main}>
      <h1>Add/Edit Events</h1>

      <div className={eventManagementCss.defineSteps}>
        <Row align="middle" className={eventManagementCss.defineStepsRow}>
          {["Add Event", "Past Events", "Manage Events"].map((data, i) => {
            return (
              <Col
                key={(Math.random() + 1).toString(36).substring(7)}
                onClick={() => {
                  setTabType(data);
                }}
                xs={12}
                sm={7}
                md={7}
                lg={7}
                xl={7}
                xxl={7}
                className={`${eventManagementCss.defineStep} ${
                  tabType == data && eventManagementCss.defineStepSelect
                }`}
              >
                {data}
              </Col>
            );
          })}
        </Row>
      </div>

      {tabType === "Add Event" && (
        <AddEvent
          eventManagementCss={eventManagementCss}
          setTabType={setTabType}
        />
      )}
      {tabType === "Past Events" && (
        <EventList
          eventManagementCss={eventManagementCss}
          setTabType={setTabType}
        />
      )}
      {tabType === "Manage Events" && (
        <EventList
          eventManagementCss={eventManagementCss}
          setTabType={setTabType}
        />
      )}
    </div>
  );
};

export default EventManagement;
