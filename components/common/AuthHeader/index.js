import { Tag, Menu } from "antd";
import authHeaderCss from "./authHeader.module.css";

export default function AuthHeader() {
  return (
    <Menu className={authHeaderCss.topMenu} mode="horizontal">
      <Menu.Item key="1">Why NuoData?</Menu.Item>
      <Menu.Item key="2">Data Modernization</Menu.Item>
      <Menu.Item key="3">Data Management</Menu.Item>
      <Menu.Item key="4">Get Started</Menu.Item>
      <Menu.Item key="5">
        <Tag className={authHeaderCss.tryNowTag} color="#E74860">
          Try Now
        </Tag>
      </Menu.Item>
    </Menu>
  );
}
