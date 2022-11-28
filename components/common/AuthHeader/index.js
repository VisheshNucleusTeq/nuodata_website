import { Tag, Menu } from "antd";
import authHeaderCss from "./authHeader.module.css";

export default function AuthHeader() {
  return (
    <Menu className={authHeaderCss.topMenu} mode="horizontal">
      <Menu.Item key="1" className={authHeaderCss.menu} >Why NuoData?</Menu.Item>
      <Menu.Item key="2" className={authHeaderCss.menu} >Data Modernization</Menu.Item>
      <Menu.Item key="3" className={authHeaderCss.menu} >Data Management</Menu.Item>
      <Menu.Item key="4" className={authHeaderCss.menu} >Get Started</Menu.Item>
      <Menu.Item key="5">
        <Tag className={authHeaderCss.tryNowTag} color="#E74860">
          Try Now
        </Tag>
      </Menu.Item>
    </Menu>
  );
}
