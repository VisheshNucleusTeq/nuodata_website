import { Col, Row, Menu, Image, Tag, Button } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import Header from "../common/header";

export default function Info({ HowItWorkCss }) {
  return (
    <div className={HowItWorkCss.mainDiv}>
      <div className={HowItWorkCss.mainDivOP}>
        <Header />
        <Row>
          <Col span={22} offset={1}>
            <Row className={HowItWorkCss.infoTextImage}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={11}
                xxl={11}
                className={HowItWorkCss.infoText}
              >
                <div>
                  <h1>
                    How it <span>Works ?</span>
                  </h1>
                  <p>
                    NuoData brings intelligence and automation to the
                    modernization process for data warehouses, ETL, and
                    analytics systems, improving speed and accuracy while
                    lowering risks and costs
                  </p>
                </div>
                <Button className={HowItWorkCss.launchYourFreeTrial}  block>
                Launch your free trial
                </Button>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={13}
                xxl={13}
                className={HowItWorkCss.infoImage}
              >
                <Image preview={false} src="/home/platform gif.gif" />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>

    // <div className={HowItWorkCss.mainDiv}>
    //   <div className={HowItWorkCss.mainDivOP}>
    //     <Header />
    //     <div className={HowItWorkCss.detailsDiv}>
    //       <Row>
    //         <Col span={22} offset={1} style={{border : "1px solid red"}}>
    //           <Row className={HowItWorkCss.infoRow}>
    //             <Col
    //               xs={24}
    //               sm={24}
    //               md={24}
    //               lg={10}
    //               xl={10}
    //               xxl={10}
    //               className={HowItWorkCss.infoRow}
    //             >
    //               <div>
    //                 <h1>
    //                   How it <span>Works ?</span>
    //                 </h1>
    //                 <p>
    //                   NuoData brings intelligence and automation to the
    //                   modernization process for data warehouses, ETL, and
    //                   analytics systems, improving speed and accuracy while
    //                   lowering risks and costs
    //                 </p>
    //               </div>
    //             </Col>
    //             <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
    //               <Image preview={false} src="/home/platform-gif2.gif" />
    //             </Col>
    //           </Row>
    //         </Col>
    //       </Row>
    //     </div>
    //   </div>
    // </div>
  );
}
