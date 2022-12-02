import { Col, Row, Button, Image } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { RiseOutlined } from "@ant-design/icons";

export default function EnterpriseChallenge({ HomeCss }) {
  return (
    <Row className={HomeCss.mainEnterpriseChallenge}>
      <h2>
          <AnimationOnScroll animateIn="animate__fadeIn" animateOnce={true}>
          <span>
            Enterprise Challenge
            </span>
          </AnimationOnScroll>
      </h2>

      <Col xs={22} sm={22} md={22} lg={20} xl={18} xxl={18}>
        <AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
          <Row className={HomeCss.childDiv}>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} xxl={14} >
              <div className={HomeCss.textDiv}>
                <h1>
                  <span>1</span>
                  <br />
                  No SME knowledge to bridge source & target tech-stack
                </h1>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={10} xxl={10}>
              <div className={HomeCss.imageDiv}>
                <Image
                  width={"100%"}
                  height={"100%"}
                  preview={false}
                  src="./home/bg3.png"
                />
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeInLeft" animateOnce={true}>
          <Row className={HomeCss.childDiv}>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} xxl={14} >
              <div className={HomeCss.textDiv}>
                <h1>
                  <span>2</span>
                  <br />
                  Time consuming, manual & error prone
                </h1>
              </div>
            </Col>
            <Col  xs={24} sm={24} md={12} lg={12} xl={10} xxl={10}>
              <div className={HomeCss.imageDiv}>
                <Image
                  width={"100%"}
                  height={"100%"}
                  preview={false}
                  src="./home/bg3.png"
                />
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
          <Row className={HomeCss.childDiv}>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} xxl={14} >
              <div className={HomeCss.textDiv}>
                <h1>
                  <span>3</span>
                  <br />
                  Majority of the data, ETL & queries are not used, redundant or
                  duplicate
                </h1>
              </div>
            </Col>
            <Col  xs={24} sm={24} md={12} lg={12} xl={10} xxl={10}>
              <div className={HomeCss.imageDiv}>
                <Image
                  width={"100%"}
                  height={"100%"}
                  preview={false}
                  src="./home/bg3.png"
                />
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeInLeft" animateOnce={true}>
          <Row className={HomeCss.childDiv}>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} xxl={14} >
              <div className={HomeCss.textDiv}>
                <h1>
                  <span>4</span>
                  <br />
                  There is no merit in simply dumping the data to cloud
                </h1>
              </div>
            </Col>
            <Col  xs={24} sm={24} md={12} lg={12} xl={10} xxl={10}>
              <div className={HomeCss.imageDiv}>
                <Image
                  width={"100%"}
                  height={"100%"}
                  preview={false}
                  src="./home/bg3.png"
                />
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
          <Row className={HomeCss.childDiv}>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} xxl={14} >
              <div className={HomeCss.textDiv}>
                <h1>
                  <span>5</span>
                  <br />
                  Maintainability in the target environment
                </h1>
              </div>
            </Col>
            <Col  xs={24} sm={24} md={12} lg={12} xl={10} xxl={10}>
              <div className={HomeCss.imageDiv}>
                <Image
                  width={"100%"}
                  height={"100%"}
                  preview={false}
                  src="./home/bg3.png"
                />
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>
      </Col>
      <Col xs={22} sm={22} md={22} lg={20} xl={18} xxl={18} className={HomeCss.howNuoDataworksBtn}>
        <Button ghost={true} size="large">“Explore How NuoData works” <RiseOutlined /></Button>
      </Col>
    </Row>
  );
}

// import { Col, Row, Button, Image } from "antd";
// import { ArrowRightOutlined, CaretRightOutlined } from "@ant-design/icons";

// export default function EnterpriseChallenge({ HomeCss }) {
//   return (
//     <Row style={{ height: "100%", backgroundColor : "#e74860" }}>
//       <div className={HomeCss.enterpriseChallengeTitle}>
//         <span>Enterprise Challenge</span>
//       </div>

//       <Col offset={2} span={20}>
//         <Row className={HomeCss.enterpriseChallengeFirstRow}>
//           <Col
//             xs={24}
//             sm={12}
//             md={12}
//             lg={8}
//             xl={8}
//             xxl={8}
//             className={HomeCss.div}
//           >
//             <Row className={HomeCss.row}>
//               <Col offset={1} span={16} className={HomeCss.number}>
//                 1
//               </Col>
//               <Col offset={1} span={18} className={HomeCss.text}>
//                 There is no merit in simply dumping the data to cloud
//               </Col>

//               <Col offset={2} span={2} className={HomeCss.icon}>
//                 <ArrowRightOutlined />
//               </Col>
//             </Row>
//           </Col>
//           <Col
//             xs={24}
//             sm={12}
//             md={12}
//             lg={8}
//             xl={8}
//             xxl={8}
//             className={HomeCss.div}
//           >
//             <Row className={HomeCss.row}>
//               <Col offset={1} span={16} className={HomeCss.number}>
//                 2
//               </Col>
//               <Col offset={1} span={18} className={HomeCss.text}>
//                 There is no merit in simply dumping the data to cloud
//               </Col>

//               <Col offset={2} span={2} className={HomeCss.icon}>
//                 <ArrowRightOutlined />
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//         <Row>
//           <Col
//             xs={24}
//             sm={12}
//             md={12}
//             lg={8}
//             xl={8}
//             xxl={8}
//             className={HomeCss.div}
//           >
//             <Row className={HomeCss.row}>
//               <Col offset={1} span={16} className={HomeCss.number}>
//                 3
//               </Col>
//               <Col offset={1} span={18} className={HomeCss.text}>
//                 There is no merit in simply dumping the data to cloud
//               </Col>

//               <Col offset={2} span={2} className={HomeCss.icon}>
//                 <ArrowRightOutlined />
//               </Col>
//             </Row>
//           </Col>
//           <Col
//             xs={24}
//             sm={12}
//             md={12}
//             lg={8}
//             xl={8}
//             xxl={8}
//             className={HomeCss.div}
//           >
//             <Row className={HomeCss.row}>
//               <Col offset={1} span={16} className={HomeCss.number}>
//                 4
//               </Col>
//               <Col offset={1} span={18} className={HomeCss.text}>
//                 There is no merit in simply dumping the data to cloud
//               </Col>

//               <Col offset={2} span={2} className={HomeCss.icon}>
//                 <ArrowRightOutlined />
//               </Col>
//             </Row>
//           </Col>
//           <Col
//             xs={24}
//             sm={12}
//             md={12}
//             lg={8}
//             xl={8}
//             xxl={8}
//             className={HomeCss.div}
//           >
//             <Row className={HomeCss.row}>
//               <Col offset={1} span={16} className={HomeCss.number}>
//                 5
//               </Col>
//               <Col offset={1} span={18} className={HomeCss.text}>
//                 There is no merit in simply dumping the data to cloud
//               </Col>

//               <Col offset={2} span={2} className={HomeCss.icon}>
//                 <ArrowRightOutlined />
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Col>
//     </Row>
//   );
// }
