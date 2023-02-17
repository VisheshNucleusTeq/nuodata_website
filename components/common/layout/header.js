import React, { useEffect, useReducer, useState } from "react";
import { Layout, Divider, Avatar, Menu } from "antd";
const { Header, Content } = Layout;
import { useRouter } from "next/router";
import { BellOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { UserDetailsAction } from "../../../Redux/action";

const HeaderView = ({ layoutCss, ref }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState();
  const [Volumestate, setVolumestate] = useState();
  const [items] = useState([
    {
      key: "1",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => {
            localStorage.clear();
            dispatch(UserDetailsAction(false));
            router.push("/");
          }}
        >
          Logout
        </a>
      ),
    },
  ]);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    setUserDetails(authData);
  }, []);

  return (
    <Header ref={ref} className={layoutCss.mainLayoutHeader}>
      <div style={{ float: "left" }}>
        {userDetails && userDetails?.firstName && (
          <h1>Welcome {userDetails?.firstName}!</h1>
        )}
      </div>

      <div style={{ float: "right" }}>
        <Menu
          mode="horizontal"
          items={[
            {
              key: "1",
              label: <BellOutlined style={{ fontSize: "18px" }} />,
            },
            {
              key: "2",
              label: <QuestionCircleOutlined style={{ fontSize: "18px" }} />,
            },
            {
              key: "3",
              label: (
                <Divider style={{ backgroundColor: "gray" }} type="vertical" />
              ),
            },
            {
              key: "4",
              label: userDetails && userDetails?.firstName && (
                <Dropdown menu={{ items }}>
                  <Space>
                    {userDetails?.firstName} &nbsp;
                    <Avatar src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" />
                    <DownOutlined />
                  </Space>
                </Dropdown>
              ),
            },
          ]}
        />
      </div>
    </Header>
  );
};

export default HeaderView;
