import React, {useReducer} from "react";
import { Layout, Divider, Avatar, Menu } from "antd";
const { Header, Content } = Layout;

import { BellOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  }
];

const HeaderView = ({ layoutCss, ref }) => {

  const [multiplication, dispatch] = useReducer((state, action) => {
    alert(action)
    return state * action;
  }, 50);

  return (
    <Header ref={ref} className={layoutCss.mainLayoutHeader}>
      
      <div style={{ float : "left" }}>
        <h1>Welcome Amit! </h1>
      </div>

      <div style={{ float : "right" }}>
        <Menu mode="horizontal">
          <Menu.Item key="1">
            <BellOutlined style={{ fontSize: "18px" }} />
          </Menu.Item>
          <Menu.Item key="2">
            <QuestionCircleOutlined style={{ fontSize: "18px" }} />
          </Menu.Item>
          <Menu.Item key="3">
            <Divider style={{ "background-color": "gray" }} type="vertical" />
          </Menu.Item>
          <Menu.Item key="4">
            <Dropdown menu={{ items }}>
              <Space>
                Amit &nbsp;
                <Avatar src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" />
                <DownOutlined />
              </Space>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default HeaderView;
