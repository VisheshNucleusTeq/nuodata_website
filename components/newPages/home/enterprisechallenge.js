import { Col, Row, Tabs, Image, Space } from "antd";
import { useState } from "react";
export default function EnterpriseChallengeNew({ HomeCss }) {
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabData, setActiveTabData] = useState({
    image: "/all-graph/home/enterprise-section/ECImage1.html",
    text: "No SME knowledge to bridge source & target tech-stack",
  });
  const [tabData] = useState([
    {
      tabKey: "1",
      tabTitle: "No SME knowledge to bridge source & target tech-stack",
      tab: "/all-graph/home/gradient/tab1.html",
      items: {
        image: "/all-graph/home/enterprise-section/ECImage1.html",
        text: "No SME knowledge to bridge source & target tech-stack",
      },
    },
    {
      tabKey: "2",
      tabTitle: "Time consuming and Labor-Intensive",
      tab: "/all-graph/home/gradient/tab2.html",
      items: {
        image: "/all-graph/home/enterprise-section/ECImage2.html",
        text: "Time consuming and Labor-Intensive",
      },
    },
    {
      tabKey: "3",
      tabTitle: "Majority of the data & queries are redundant",
      tab: "/all-graph/home/gradient/tab3.html",
      items: {
        image: "/all-graph/home/enterprise-section/ECImage3.html",
        text: "Majority of the data & queries are redundant",
      },
    },
    {
      tabKey: "4",
      tabTitle: "Dumping everything on cloud is expensive",
      tab: "/all-graph/home/gradient/tab4.html",
      items: {
        image: "/all-graph/home/enterprise-section/ECImage4.html",
        text: "Dumping everything on cloud is expensive",
      },
    },
    {
      tabKey: "5",
      tabTitle: "Maintainability in the target environment",
      tab: "/all-graph/home/gradient/tab2.html",
      items: {
        image: "/all-graph/home/enterprise-section/ECImage5.html",
        text: "Maintainability in the target environment",
      },
    },
  ]);

  return (
    <div className={HomeCss.ECMain}>
      <div className={HomeCss.ECpipelineDiv}>
        <iframe
          src="/all-graph/sign_in/pipeline.html"
          style={{ width: "15vw", height: "15vw", border: "none" }}
        />
      </div>

      <div>
        <Row>
          <Col
            id={"id"}
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12}
            className={HomeCss.ECImage}
          >
            <iframe src={activeTabData.image} className={HomeCss.iframe} />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12}
            className={HomeCss.ECText}
          >
            <Row>
              <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
                <h1>Enterprise Challenges</h1>
              </Col>
              <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6} />
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={2}
                xl={2}
                xxl={2}
                className={HomeCss.numberCss}
              >
                {activeTab}
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={21}
                xl={21}
                xxl={21}
                className={HomeCss.textCss}
              >
                {activeTabData.text}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className={HomeCss.tabPositionCss}>
        <Row align={"center"}>
          <Col xs={2} sm={2} md={0} lg={0} xl={2} xxl={2} />
          {tabData.map((data, index) => {
            return (
              <Col
              key={index + "enterprisechallenge"}
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={4}
                xxl={4}
                className={HomeCss.listTabs}
                onClick={() => {
                  setActiveTab(index + 1);
                  setActiveTabData(data?.items);
                  document.getElementById("id").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                }}
              >
                <Row>
                  <Col span={24}>
                    {activeTab === index + 1 ? (
                      <iframe
                        src={data?.tab}
                        style={{ width: "100%", height: "2vh", border: "none" }}
                      />
                    ) : (
                      <div
                        style={{ width: "100%", height: "2vh", border: "none" }}
                      ></div>
                    )}
                  </Col>
                  <Col span={24}>
                    <Row style={{ height: "14vh" }}>
                      <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
                      <Col
                        xs={2}
                        sm={2}
                        md={2}
                        lg={2}
                        xl={2}
                        xxl={2}
                        className={HomeCss.numberTabCss}
                      >
                        {index + 1}
                      </Col>
                      <Col
                        xs={20}
                        sm={20}
                        md={20}
                        lg={20}
                        xl={20}
                        xxl={20}
                        className={HomeCss.textTabCss}
                      >
                        {data?.tabTitle}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            );
          })}
          <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
        </Row>
      </div>
      <div>
        <Row>
          {/* <Col span={24}>fgdfg</Col> */}
        </Row>
      </div>
    </div>
  );
}

// import { Col, Row, Tabs, Image, Space } from "antd";
// import { useState, useEffect, useRef } from "react";
// import { AnimationOnScroll } from "react-animation-on-scroll";

// const { TabPane } = Tabs;

// export default function EnterpriseChallenge({ HomeCss }) {
//   const [activeTab, setActiveTab] = useState("1");

//   const tabData = [
//     {
//       tabKey: "1",
//       tabTitle: "No SME knowledge to bridge source & target tech-stack",
//       tab: "/all-graph/home/gradient/tab1.html",
//       items: [
//         {
//           image: "/all-graph/home/enterprise-section/ECImage1.html",
//           text: "No SME knowledge to bridge source & target tech-stack",
//         },
//       ],
//     },
//     {
//       tabKey: "2",
//       tabTitle: "Time consuming and Labor-Intensive",
//       tab: "/all-graph/home/gradient/tab2.html",
//       items: [
//         {
//           image: "/all-graph/home/enterprise-section/ECImage2.html",
//           text: "Time consuming and Labor-Intensive",
//         },
//       ],
//     },
//     {
//       tabKey: "3",
//       tabTitle: "Majority of the data & queries are redundant",
//       tab: "/all-graph/home/gradient/tab3.html",
//       items: [
//         {
//           image: "/all-graph/home/enterprise-section/ECImage3.html",
//           text: "Majority of the data & queries are redundant",
//         },
//       ],
//     },
//     {
//       tabKey: "4",
//       tabTitle: "Dumping everything on cloud is expensive",
//       tab: "/all-graph/home/gradient/tab4.html",
//       items: [
//         {
//           image: "/all-graph/home/enterprise-section/ECImage4.html",
//           text: "Dumping everything on cloud is expensive",
//         },
//       ],
//     },
//     {
//       tabKey: "5",
//       tabTitle: "Maintainability in the target environment",
//       tab: "/all-graph/home/gradient/tab2.html",
//       items: [
//         {
//           image: "/all-graph/home/enterprise-section/ECImage5.html",
//           text: "Maintainability in the target environment",
//         },
//       ],
//     },
//   ];

//   const handleChangeTab = (tabKey) => {
//     setActiveTab(tabKey);
//   };

//   return (
//     <div className={HomeCss.ECmain}>
//       <Row
//         className={HomeCss.mainEnterpriseChallengeDiv}
//         align="stretch"
//         justify={"center"}
//       >
//         <Col span={24}>
//           <div className={HomeCss.ECpipelineDiv}>
//             <iframe
//               src="/all-graph/sign_in/pipeline.html"
//               style={{ width: "15vw", height: "15vw", border: "none" }}
//             />
//           </div>
//         </Col>

//         <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
//           <Tabs
//             activeKey={activeTab}
//             onChange={handleChangeTab}
//             tabPosition={"bottom"}
//             className={HomeCss.ECMainTab}
//           >
//             {tabData.map((tab) => (
//               <TabPane
//                 tab={
//                   <Col>
//                     {activeTab === tab.tabKey && (
//                       <iframe
//                         src={tab.tab}
//                         style={{
//                           position: "absolute",
//                           width: "100%",
//                           border: "none",
//                           top: "-80px",
//                           zIndex: "-1",
//                         }}
//                       />
//                     )}
//                     <Space
//                       direction="horizontal"
//                       align="center"
//                       className={HomeCss.ECTabTitle}
//                     >
//                       <h1
//                         style={{
//                           color:
//                             activeTab === tab.tabKey
//                               ? "white"
//                               : "rgba(255, 255, 255, 0.50)",
//                         }}
//                       >
//                         {tab.tabKey}
//                       </h1>
//                       <span
//                         className={HomeCss.ECDesktopView}
//                         style={{
//                           color:
//                             activeTab === tab.tabKey
//                               ? "white"
//                               : "rgba(255, 255, 255, 0.50)",
//                         }}
//                       >
//                         {tab.tabTitle}
//                       </span>
//                     </Space>
//                   </Col>
//                 }
//                 key={tab.tabKey}
//                 className={HomeCss.ECMainTabPane}
//               >
//                 {tab.items.map((item, index) => {
//                   console.log("index", index);
//                   return (
//                     <Row className={HomeCss.ECmainRow} key={index}>
//                       <Col
//                         className={HomeCss.ECtitleCol}
//                         xs={24}
//                         sm={24}
//                         md={24}
//                         lg={0}
//                         xl={0}
//                         xxl={0}
//                       >
//                         <div className={HomeCss.ECTitleDiv}>
//                           <h1> Enterprise Challenges</h1>
//                           <Space direction="horizontal" align="top">
//                             <h3>{item.text}</h3>
//                           </Space>
//                         </div>
//                       </Col>
//                       <Col
//                         className={HomeCss.ECimageCol}
//                         xs={24}
//                         sm={24}
//                         md={24}
//                         lg={12}
//                         xl={12}
//                         xxl={12}
//                       >
//                         <iframe
//                           key={index}
//                           src={item.image}
//                           style={{
//                             width: "100%",
//                             height: "40vw",
//                             border: "none",
//                           }}
//                         />
//                       </Col>
//                       <Col
//                         className={HomeCss.ECtitleCol}
//                         xs={0}
//                         sm={0}
//                         md={0}
//                         lg={12}
//                         xl={12}
//                         xxl={12}
//                       >
//                         <div className={HomeCss.ECTitleDiv}>
//                           <h1> Enterprise Challenges</h1>
//                           <Space direction="horizontal" align="top">
//                             <h2>{tab.tabKey} &nbsp;</h2>
//                             <h3>{item.text}</h3>
//                           </Space>
//                         </div>
//                       </Col>
//                     </Row>
//                   );
//                 })}
//               </TabPane>
//             ))}
//           </Tabs>
//         </Col>
//       </Row>
//     </div>
//   );
// }
