import React from "react";
import EventManagement from "../../components/eventManagement";
import eventManagementCss from "../../styles/eventManagement.module.css"
const Event_management = () => {
  return (
    <>
      <title>NuoData | Event Management</title>
      <EventManagement eventManagementCss={eventManagementCss} />
    </>
  );
};

export default Event_management;
