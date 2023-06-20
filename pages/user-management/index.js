import React from "react";
import UserList from "../../components/userManagement/userList";
import userManagementCss from "../../styles/userManagment.module.css";
const index = () => {
  return (
    <div>
      <UserList userManagementCss={userManagementCss}/>
    </div>
  );
};

export default index;
