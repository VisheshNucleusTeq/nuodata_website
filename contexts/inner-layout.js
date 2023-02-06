import React, { useState, useEffect, useRef } from "react";
import { Layout } from "antd";
const { Content } = Layout;

import SiderView from "../components/common/layout/sider";
import HeaderView from "../components/common/layout/header";
import layoutCss from "../styles/layout.module.css";

export const InnerLayout = ({ children, componentName }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref?.current?.clientHeight);
  });

  return (
    <>
      <Layout className={layoutCss.mainLayout}>
        <SiderView layoutCss={layoutCss} height={height} componentName={componentName} />
        <Layout>
          <div ref={ref}>
            <HeaderView layoutCss={layoutCss} />
          </div>
          <Content style={{overflowY: "auto"}} className={layoutCss.mainLayoutContent}>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};
