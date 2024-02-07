import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Layout, Menu, Space } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
const { Header, Content } = Layout;

import { UserDetailsAction } from "../../../Redux/action";

const HeaderView = ({ layoutCss, ref }) => {
  const queryClient = useQueryClient()
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
            queryClient.clear()
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
      <div className={layoutCss.HeaderUserName}>
        {userDetails && userDetails?.firstName && (
          <h1>Welcome {userDetails?.firstName}!</h1>
        )}
      </div>

      <div className={layoutCss.headerItems}>
        <Menu
          mode="horizontal"
          items={[
            {
              key: "1",
              label: (
                <Badge size="default" count={0} className={layoutCss.BellOutlined}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                    <path d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.7295 20C11.5537 20.3031 11.3014 20.5547 10.9978 20.7295C10.6941 20.9044 10.3499 20.9965 9.99953 20.9965C9.64915 20.9965 9.30492 20.9044 9.0013 20.7295C8.69769 20.5547 8.44534 20.3031 8.26953 20" stroke="#E74860" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  {/* <BellOutlined disabled style={{ fontSize: "18px", color: 'grey' }} /> */}
                </Badge>
              ),
            },
            // {
            //   key: "2",
            //   label: <QuestionCircleOutlined style={{ fontSize: "18px" }} />,
            // },
            // {
            //   key: "3",
            //   label: (
            //     <Divider style={{ backgroundColor: "grey" }} type="vertical" />
            //   ),
            // },
            {
              key: "4",
              label: userDetails && userDetails?.firstName && (
                <Dropdown menu={{ items }}>
                  <Space>
                    {/* {userDetails?.firstName} &nbsp; */}
                    <Avatar className={layoutCss.UserOutlined} >
                      <UserOutlined />
                    </Avatar>
                    {/* <DownOutlined /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
                      <path d="M3.68164 0.68232H7.36396L3.68164 4.36464L-0.000679565 0.68232H3.68164Z" fill="#8C8C8C" />
                    </svg>
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
