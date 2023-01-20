import { Col, Row, Image } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
export default function ThinkBig({ HomeCss }) {
  return (
    <div id="dataManagement" className={HomeCss.thinkBigMainDiv}>
      <Row  className={HomeCss.thinkBigChild}>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
          <AnimationOnScroll animateIn="animate__zoomIn" animateOnce={true}>
            <h1>THINK</h1>
            <h1>BIG.</h1>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>

      <Row className={HomeCss.thinkBigChild} align="center">
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={10} xl={10} xxl={10}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Modernize your enterprise data from <span>ANY</span> source to{" "}
              <span>ANY</span> cloud platform.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={10} xl={10} xxl={10}>
          <Image src="/home/ezgif.com-gif-maker (2).gif" preview={false} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildStstem}`}
        align="center"
      >
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={10} xl={10} xxl={10}>
          <Image src="/home/new-video.gif" preview={false} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={10} xl={10} xxl={10}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Unified <span>Data Management</span> platform for all data
              engineering, analytics & operations needs.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildMobile}`}
        align="center"
      >
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={10} xl={10} xxl={10}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Unified <span>Data Management</span> platform for all data
              engineering, analytics & operations needs.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={10} xl={10} xxl={10}>
          <Image src="/home/new-video.gif" preview={false} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>

      {/* <Row className={HomeCss.thinkBigChild}>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={11} sm={11} md={11} lg={11} xl={11} xxl={11}>
          <Image src="/home/unified-new-GIF.gif" preview={false} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Modernize your enterprise data from <span>ANY</span> source to{" "}
              <span>ANY</span> cloud platform.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row> */}
    </div>
  );
}

// import React from "react";
// import { Col, Row, Image } from "antd";
// import { StarFilled } from "@ant-design/icons";
// import { AnimationOnScroll } from "react-animation-on-scroll";

// export default function ThinkBig({ HomeCss }) {
//   return (
//     <div className={HomeCss.thinkBigMainDiv}>
//       <Row align={"middle"} justify="space-around">
//         {/* <Col xs={1} sm={1} md={2} lg={3} xl={3} xxl={3} /> */}
//         <Col span={22}>
//           <Row
//             align={"middle"}
//             justify="space-around"
//             className={HomeCss.thinkBigChild}
//           >
//             <Col span={24}>
//               <AnimationOnScroll animateIn="animate__zoomIn" animateOnce={true}>
//                 <h1>THINK</h1>
//                 <h1>BIG.</h1>
//               </AnimationOnScroll>
//             </Col>

//             {/* <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={20}>
//               <AnimationOnScroll
//                 animateIn="animate__fadeInDown"
//                 animateOnce={true}
//               >
//                 <h2>
//                   Modernize your enterprise data from <span>ANY</span> source to{" "}
//                   <span>ANY</span> cloud platform.
//                 </h2>
//               </AnimationOnScroll>
//             </Col>
//             <Col xs={0} sm={0} md={0} lg={0} xl={4} xxl={4} />

//             <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
//               <Row style={{ margin: "4%" }}>
//                 <Col xs={0} sm={0} md={0} lg={0} xl={2} xxl={2} />
//                 <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={20}>
//                   <Image
//                     src="/home/ezgif.com-gif-maker (2).gif"
//                     preview={false}
//                   />
//                 </Col>
//                 <Col xs={0} sm={0} md={0} lg={0} xl={2} xxl={2} />
//               </Row>
//             </Col>

//             <Col xs={0} sm={0} md={0} lg={0} xl={4} xxl={4} />

//             <Col xs={24} sm={24} md={24} lg={24} xl={22} xxl={20}>
//               <AnimationOnScroll
//                 animateIn="animate__fadeInUp"
//                 animateOnce={true}
//               >
//                 <h2>

//                   Unified<span>Data Management</span> platform for all data
//                   engineering, analytics & operations needs.
//                 </h2>
//               </AnimationOnScroll>
//             </Col>
//             <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={20}>
//               <Image src="/home/unified-new-GIF.gif" preview={false} />
//             </Col> */}
//           </Row>
//           <Row
//             className={HomeCss.thinkBigChild}
//             align="middle"
//             justify={"space-around"}
//             id="dataManagement"
//           >
//             <Col span={14}>
//               <AnimationOnScroll
//                 animateIn="animate__fadeInDown"
//                 animateOnce={true}
//               >
//                 <h2>
//                   Modernize your enterprise data from <span>ANY</span> source to{" "}
//                   <span>ANY</span> cloud platform.
//                 </h2>
//               </AnimationOnScroll>
//             </Col>
//             <Col span={10}>
//               <Image src="/home/ezgif.com-gif-maker (2).gif" preview={false} />
//             </Col>
//           </Row>
//           <Row
//             className={HomeCss.thinkBigChild}
//             align="middle"
//             justify={"space-between"}
//             gutter={[8, 8]}
//             style={{ marginTop: "4rem" }}
//           >
//             <Col span={8}>
//               <Image src="/home/unified-new-GIF.gif" preview={false} />
//             </Col>
//             <Col span={12}>
//               <AnimationOnScroll
//                 animateIn="animate__fadeInUp"
//                 animateOnce={true}
//               >
//                 <h2>
//                   Unified <span>Data Management</span> platform
//                   <span>(Quantum)</span> for all data engineering, analytics &
//                   operations needs.
//                 </h2>
//               </AnimationOnScroll>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </div>
//   );
// }
