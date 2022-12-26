import React, { useEffect, useReducer, useState } from "react";
import { Layout, Divider, Avatar, Menu } from "antd";
const { Header, Content } = Layout;

import { BellOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";

import {useSelector} from "react-redux"


const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Logout
      </a>
    ),
  },
];

const HeaderView = ({ layoutCss, ref }) => {
  const [userDetails, setUserDetails] = useState();
  const [Volumestate, setVolumestate] = useState();
  

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    setUserDetails(authData);
  }, []);

  return (
    <Header ref={ref} className={layoutCss.mainLayoutHeader}>
      <div style={{ float: "left" }}>
        {userDetails && userDetails?.firstName && (
          <h1>Welcome {userDetails?.firstName}! </h1>
        )}
      </div>

      <div style={{ float: "right" }}>
        <Menu mode="horizontal">
          <Menu.Item key="1">
            <BellOutlined style={{ fontSize: "18px" }} />
          </Menu.Item>
          <Menu.Item key="2">
            <QuestionCircleOutlined style={{ fontSize: "18px" }} />
          </Menu.Item>
          <Menu.Item key="3">
            <Divider style={{ "backgroundColor": "gray" }} type="vertical" />
          </Menu.Item>
          <Menu.Item key="4">
            {userDetails && userDetails?.firstName && (
              <Dropdown menu={{ items }}>
                <Space>
                  {userDetails?.firstName} &nbsp;
                  <Avatar src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" />
                  <DownOutlined />
                </Space>
              </Dropdown>
            )}
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default HeaderView;
