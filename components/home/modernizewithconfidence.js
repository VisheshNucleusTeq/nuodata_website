import { Col, Row, Button, Image } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function ModernizeWithConfidence({ HomeCss }) {
  const [modernizeData, setModernizeData] = useState([
    {text : "6-10x faster & 100% accurate conversion", ref : useRef(null)},
    {text : "Data driven enterprise enabled through modern data lake", ref : useRef(null)},
    {text : "Certified data for enterprise consumption", ref : useRef(null)},
    {text : "No redundancies", ref : useRef(null)},
    {text : "Single version of truth", ref : useRef(null)},
    {text : "Enabling federation of data through self services", ref : useRef(null)},
  ]);

  const [visibleData, setVisibleData] = useState(0);

  // const useIsInViewport = (ref) => {
  //   const [isIntersecting, setIsIntersecting] = useState(false);

  //   const observer = useMemo(
  //     () =>
  //       new IntersectionObserver(([entry]) =>
  //         setIsIntersecting(entry.isIntersecting)
  //       ),
  //     []
  //   );

  //   useEffect(() => {
  //     observer.observe(ref.current);

  //     return () => {
  //       observer.disconnect();
  //     };
  //   }, [ref, observer]);
  //   console.log(isIntersecting)
  //   return isIntersecting;
  // }

  return (
    <div className={HomeCss.ECmain} style={{ marginTop: "2vh" }}>
      <Row className={HomeCss.mainEnterpriseChallengeDiv}>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <h2 className={HomeCss.ECTitle}>
            <AnimationOnScroll
              animateOut="animate__fadeOut"
              animateIn="animate__fadeIn"
              animateOnce={true}
            >
              <span>Modernize with Confidence</span>
            </AnimationOnScroll>
          </h2>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />

        {modernizeData.map((e, i) => {
          return (
            <AnimationOnScroll
              // animateIn="animate__fadeInUp"
              animateIn={
                i % 2 ? "animate__fadeInUp" : "animate__fadeInUp"
              }
              animateOut={
                i % 2 ? "animate__zoomOut" : "animate__zoomOut"
              }
              animateOnce={false}
              style={{ width: "100%" }}
              afterAnimatedIn={() => {
              }}
              offset={400}
            >
              <Row ref={e.ref} style={{ width: "100%" }}>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
                <Col
                  xs={20}
                  sm={20}
                  md={20}
                  lg={20}
                  xl={20}
                  xxl={20}
                  className={`${HomeCss.MWCText}`}
                >
                  <h1>{e.text}</h1>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
              </Row>
            </AnimationOnScroll>
          );
        })}
      </Row>
    </div>
  );
}

// import { Col, Row } from "antd";

// export default function ModernizeWithConfidence({ HomeCss }) {
//   return (
//     <div className={HomeCss.bgImage}>
//       <h1>
//         <span>Modernize with Confidence</span>
//       </h1>
//       <p>
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry's standard dummy text ever
//         since the 1500s
//       </p>

//       <Row className={HomeCss.modernizeWithConfidenceMain}>

//         <Col span={24}>
//           <Row>
//             <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
//             <Col
//               xs={22}
//               sm={14}
//               md={12}
//               lg={11}
//               xl={11}
//               xxl={9}
//               className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.right}`}
//             >
//               6-10x faster & 100% accurate conversion
//             </Col>
//             <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
//           </Row>
//         </Col>

//         <Col span={12} className={HomeCss.ModernDataDev} ></Col>

//         <Col span={24}>
//           <Row>
//             <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
//             <Col
//               xs={22}
//               sm={14}
//               md={12}
//               lg={11}
//               xl={11}
//               xxl={9}
//               className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.left}`}
//             >
//               Data driven enterprise enabled through modern data lake
//             </Col>
//             <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
//           </Row>
//         </Col>

//         <Col span={12} className={HomeCss.ModernDataDev} />

//         <Col span={24}>
//           <Row>
//             <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
//             <Col
//               xs={22}
//               sm={14}
//               md={12}
//               lg={11}
//               xl={11}
//               xxl={9}
//               className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.right}`}
//             >
//               Certified data for enterprise consumption
//             </Col>
//             <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
//           </Row>
//         </Col>

//         <Col span={12} className={HomeCss.ModernDataDev} />

//         <Col span={24}>
//           <Row>
//             <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
//             <Col
//               xs={22}
//               sm={14}
//               md={12}
//               lg={11}
//               xl={11}
//               xxl={9}
//               className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.left}`}
//             >
//               No redundancies
//             </Col>
//             <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
//           </Row>
//         </Col>

//         <Col span={12} className={HomeCss.ModernDataDev} />

//         <Col span={24}>
//           <Row>
//             <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
//             <Col
//               xs={22}
//               sm={14}
//               md={12}
//               lg={11}
//               xl={11}
//               xxl={9}
//               className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.right}`}
//             >
//              Single version of truth
//             </Col>
//             <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
//           </Row>
//         </Col>

//         <Col span={12} className={HomeCss.ModernDataDev} />

//         <Col span={24}>
//           <Row>
//             <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
//             <Col
//               xs={22}
//               sm={14}
//               md={12}
//               lg={11}
//               xl={11}
//               xxl={9}
//               className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.left}`}
//             >
//               Enabling federation of data through self services
//             </Col>
//             <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
//           </Row>
//         </Col>

//         <Col span={12} className={HomeCss.ModernDataDev} />

//         <Col span={24}>
//           <Row>
//             <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
//             <Col
//               xs={22}
//               sm={14}
//               md={12}
//               lg={11}
//               xl={11}
//               xxl={9}
//               className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.right}`}
//             >
//               Single version of truth
//             </Col>
//             <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
//           </Row>
//         </Col>

//       </Row>
//     </div>
//   );
// }
