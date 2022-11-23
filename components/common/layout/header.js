import React from "react";
import { Layout } from "antd";
const { Header,  Content } = Layout;
const HeaderView = ({layoutCss, ref}) => {
  return (
    <Header ref={ref} className={layoutCss.mainLayoutHeader}>
      Header
    </Header>
  );
};

export default HeaderView;
