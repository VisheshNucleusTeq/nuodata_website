import { Col, Row, Button, Image } from "antd";
import { useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { RiseOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function EnterpriseChallenge({ HomeCss }) {
  const [EnterpriseChallenge] = useState([
    {
      image: "/home/enterpriseChallenge/12.png",
      text: "No SME knowledge to bridge source & target tech-stack",
    },
    {
      image: "/home/enterpriseChallenge/15.png",
      text: "Time consuming & manual effort",
    },
    {
      image: "/home/enterpriseChallenge/13.png",
      text: "Majority of the data & queries are redundant",
    },
    {
      image: "/home/enterpriseChallenge/11.png",
      text: "Dumping everything on cloud is expensive",
    },
    {
      image: "/home/enterpriseChallenge/14.png",
      text: "Maintainability in the target environment",
    },
  ]);

  const [hoverColor, setHoverColor] = useState(0);

  return (
    <div className={HomeCss.ECmain}>
      <Row className={HomeCss.mainEnterpriseChallengeDiv}>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <h2 className={HomeCss.ECTitle}>
            <AnimationOnScroll
              animateOut="animate__fadeOut"
              animateIn="animate__fadeIn"
              animateOnce={true}
              
            >
              <span>Enterprise Challenges</span>
            </AnimationOnScroll>
          </h2>

          {EnterpriseChallenge.map((e, i) => {
            return (
              <AnimationOnScroll
                animateIn={
                  i % 2 ? "animate__fadeInDown" : "animate__fadeInDown"
                }
                animateOnce={true}
                key={(Math.random() + 1).toString(36).substring(7)}
              >
                <Row className={HomeCss.ECmainRow}>
                  <Col
                    xs={12}
                    sm={8}
                    md={8}
                    lg={8}
                    xl={8}
                    xxl={8}
                    className={HomeCss.ECimageCol}
                  >
                    <Image
                      className={HomeCss.ECColimage}
                      preview={false}
                      src={e.image}
                    />
                  </Col>
                  <Col
                    xs={12}
                    sm={16}
                    md={16}
                    lg={16}
                    xl={16}
                    xxl={16}
                    className={HomeCss.ECnumberCol}
                  >
                    <h1>{i + 1} &nbsp; &nbsp;</h1>
                  </Col>

                  <Col xs={2} sm={8} md={8} lg={8} xl={8} xxl={8} />
                  <Col
                    xs={24}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                    xxl={14}
                    className={HomeCss.ECtextCol}
                  >
                    <h1>{e.text}</h1>
                  </Col>
                  <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />

                  {i < 4 && (
                    <Col
                      className={HomeCss.mainEnterpriseChallengeDottedLine}
                      xs={10}
                      sm={8}
                      md={8}
                      lg={8}
                      xl={8}
                      xxl={8}
                    />
                  )}
                </Row>
              </AnimationOnScroll>
            );
          })}
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />

        <Col span={24} className={HomeCss.howNuoDataworksBtn}>
          <Link prefetch href="/how-it-works">
            <Button>
              “Explore How NuoData works” <RiseOutlined />
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

// import { Col, Row, Button, Image } from "antd";
// import { useState } from "react";
// import { AnimationOnScroll } from "react-animation-on-scroll";
// import Link from "next/link";
// import { RiseOutlined } from "@ant-design/icons";

// export default function EnterpriseChallenge({ HomeCss }) {
//   const [EnterpriseChallenge] = useState([
//     {
//       image: "./home/enterpriseChallenge/6.png",
//       text: "No SME knowledge to bridge source & target tech-stack",
//     },
//     {
//       image: "./home/enterpriseChallenge/7.png",
//       text: "Time consuming & manual effort",
//     },
//     {
//       image: "./home/enterpriseChallenge/8.png",
//       text: "Majority of the data & queries are redundant",
//     },
//     {
//       image: "./home/enterpriseChallenge/9.png",
//       text: "Dumping everything on cloud is expensive",
//     },
//     {
//       image: "./home/enterpriseChallenge/10.png",
//       text: "Maintainability in the target environment",
//     },
//   ]);
//   return (
//     <Row className={HomeCss.mainEnterpriseChallenge}>
//       {/* <div className={HomeCss.mainEnterpriseChallengeDiv}>
//        */}

//       <h2>
//         <AnimationOnScroll
//           animateOut="animate__fadeOut"
//           animateIn="animate__fadeIn"
//           animateOnce={true}
//         >
//           <span>Enterprise Challenges</span>
//         </AnimationOnScroll>
//       </h2>
//       <Col span={24} className={HomeCss.enterpriseChallengeList} >
//       {EnterpriseChallenge.map((e, i) => {
//         return (
//           <Row>
//             <Col xs={1} sm={1} md={2} lg={2} xl={2} xxl={2} />
//             <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
//               <Row>
//                 <Col
//                   xs={8}
//                   sm={8}
//                   md={5}
//                   lg={5}
//                   xl={5}
//                   xxl={5}
//                   className={HomeCss.mainEnterpriseChallengeImageDiv}
//                 >
//                   <Image
//                     className={HomeCss.mainEnterpriseChallengeImage}
//                     preview={false}
//                     src={e.image}
//                   />
//                 </Col>

//                 <Col xs={16} sm={16} md={19} lg={19} xl={19} xxl={19}>
//                   <h1 className={HomeCss.mainEnterpriseChallengeNumber}>
//                     {i + 1} &nbsp; &nbsp;
//                   </h1>
//                 </Col>

//                 <Col xs={8} sm={8} md={5} lg={5} xl={5} xxl={5}></Col>
//                 <Col xs={16} sm={16} md={19} lg={19} xl={19} xxl={19}>
//                   <h1 className={HomeCss.mainEnterpriseChallengeText}>
//                     {e.text}
//                   </h1>
//                 </Col>

//                 {i < 4 && (
//                   <>
//                     <Col xs={8} sm={8} md={5} lg={5} xl={5} xxl={5} />
//                     <Col
//                       className={HomeCss.mainEnterpriseChallengeDottedLine}
//                       xs={16}
//                       sm={16}
//                       md={19}
//                       lg={19}
//                       xl={19}
//                       xxl={19}
//                     />
//                   </>
//                 )}
//               </Row>
//             </Col>
//             <Col xs={1} sm={1} md={2} lg={2} xl={2} xxl={2} />
//             </Row>
//         );
//       })}
//       </Col>

//       {/* {EnterpriseChallenge.map((e, i) => {
//           return (
//             <AnimationOnScroll
//               animateIn={i % 2 ? "animate__fadeInDown" : "animate__fadeInDown"}
//               animateOnce={true}
//               key={(Math.random() + 1).toString(36).substring(7)}
//             >
//               <Col
//                 key={(Math.random() + 1).toString(36).substring(7)}
//                 span={24}
//                 className={HomeCss.enterpriseChallengeList}
//               >
//                 <Row>
//                   <Col xs={0} sm={1} md={1} lg={2} xl={2} xxl={2} />
//                   <Col
//                     xs={24}
//                     sm={7}
//                     md={7}
//                     lg={4}
//                     xl={4}
//                     xxl={4}
//                     className={HomeCss.mainEnterpriseChallengeImageDiv}
//                   >
//                     <AnimationOnScroll
//                       animateOnce={true}
//                       animateIn="animate__bounceIn"
//                     >
//                       <Image
//                         className={HomeCss.mainEnterpriseChallengeImage}
//                         preview={false}
//                         src={e.image}
//                       />
//                     </AnimationOnScroll>
//                   </Col>
//                   <Col xs={3} sm={0} md={0} lg={0} xl={0} xxl={0} />
//                   <Col
//                     xs={18}
//                     sm={15}
//                     md={15}
//                     lg={16}
//                     xl={16}
//                     xxl={16}
//                     className={HomeCss.mainEnterpriseChallengeTextDiv}
//                   >
//                     <h1 className={HomeCss.mainEnterpriseChallengeNumber}>
//                       {i + 1} &nbsp; &nbsp;
//                     </h1>
//                     <h1 className={HomeCss.mainEnterpriseChallengeText}>
//                       {e.text}
//                     </h1>
//                   </Col>

//                   <Col xs={3} sm={1} md={1} lg={2} xl={2} xxl={2} />
//                 </Row>
//               </Col>
//             </AnimationOnScroll>
//           );
//         })} */}

//       <Col span={24} className={HomeCss.howNuoDataworksBtn}>
//         <Link prefetch href="/how-it-works">
//           <Button>
//             “Explore How NuoData works” <RiseOutlined />
//           </Button>
//         </Link>
//       </Col>
//       {/* </div> */}
//     </Row>
//   );
// }
