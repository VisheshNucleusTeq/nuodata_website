import { Carousel, Col, Row, Button, Image } from "antd";
import Header from "../common/header";

export default function Info({ HomeCss }) {
  return (
    <div className={HomeCss.mainDiv}>
      <Header />
      <div className={HomeCss.mainDivChild}>
        <Carousel
          effect={"fade"}
          dots={true}
          autoplay={true}
          draggable={true}
          autoplaySpeed={3000}
          className="home-carousel"
        >
          <div>
            <Row justify={"center"} align={"middle"}  style={{width: "100%"}}>
              <Col
                xs={22}
                sm={22}
                md={10}
                lg={10}
                xl={10}
                xxl={10}
                className={HomeCss.homeInfoText}
              >
                <div style={{ width: "100%" }}>
                  <h3>
                    <span>Come explore our</span>
                  </h3>
                  <h1>DATA UNIVERSE PLATFORM</h1>
                  <h2>
                    AT THE GARTNER DATA & AI <br />
                    CONFERENCE BOOTH #301
                  </h2>
                  <h2>
                    <span>MARCH 11 - MARCH 13, ORLANDO FL</span>
                  </h2>
                  <Button className={HomeCss.tryNowBtn}>Read More</Button>
                </div>
              </Col>
              <Col
                xs={22}
                sm={22}
                md={10}
                lg={10}
                xl={10}
                xxl={10}
                align={"center"}
                className={HomeCss.homeInfoImgCol}
              >
                <Image
                  className={HomeCss.homeInfoImg}
                  src="/carousel_imgs/banner_img1.png"
                  alt="banner"
                  preview={false}
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row justify={"center"} align={"middle"}>
              <div className={HomeCss.pipelineDiv}>
                <iframe
                  src="/all-graph/home/banner/home-pipeline.html"
                  style={{ width: "25vw", height: "25vw", border: "none" }}
                />
              </div>
              <Col
                xs={22}
                sm={22}
                md={10}
                lg={10}
                xl={10}
                xxl={10}
                className={HomeCss.homeInfoText}
              >
                <div style={{ width: "100%" }}>
                  <h3>
                    <span>ONE PLATFORM</span>
                  </h3>
                  <h1>
                    ALL DATA <br />
                    MODERNIZATION &
                    <br /> MANAGEMENT NEEDS.
                  </h1>
                  <Button className={HomeCss.tryNowBtn}>Read More</Button>
                </div>
              </Col>
              <Col
                xs={22}
                sm={22}
                md={10}
                lg={10}
                xl={10}
                xxl={10}
                className={HomeCss.homeInfoImgCol}
              />
            </Row>
          </div>
          <div>
            <Row justify={"center"} align={"middle"}>
              <Col
                xs={22}
                sm={22}
                md={10}
                lg={10}
                xl={10}
                xxl={10}
                className={HomeCss.homeInfoText}
              >
                <div style={{ width: "100%" }}>
                  <h3>
                    <span>Modernize your data from</span>
                  </h3>

                  <h1>ANY SOURCE TO ANY CLOUD</h1>
                  <h2>6-10X FASTER & 50% CHEAPER</h2>
                  <Button className={HomeCss.tryNowBtn}>Read More</Button>
                </div>
              </Col>
              <Col
                xs={22}
                sm={22}
                md={10}
                lg={10}
                xl={10}
                xxl={10}
                className={HomeCss.homeInfoImgCol}
              >
                <Image
                  className={HomeCss.homeInfoImg}
                  src="/carousel_imgs/banner_img3.png"
                  alt="banner"
                  align={"center"}
                  preview={false}
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row justify={"center"} align={"middle"}>
              <Col
                xs={22}
                sm={22}
                md={10}
                lg={10}
                xl={10}
                xxl={10}
                className={HomeCss.homeInfoText}
              >
                <div style={{ width: "100%" }}>
                  <h3>
                    <span>Data Catalog, Lineage & Governance</span>
                  </h3>
                  <h1>DISCOVER, CREATE AND FEDERATE</h1>
                  <h2>
                    DATA ASSETS & MODELS WITH
                    <br /> NUODATA'S CATALOG, MDM, LINEAGE &<br />
                    GOVERNANCE
                  </h2>
                  <Button className={HomeCss.tryNowBtn}>Read More</Button>
                </div>
              </Col>
              <Col xs={22} sm={22} md={10} lg={10} xl={10} xxl={10} />
              <div className={HomeCss.bannerDiv3}>
                <Image
                  className={HomeCss.homeInfoImg}
                  src="/carousel_imgs/banner_img4.png"
                  alt="banner"
                  align={"right"}
                  preview={false}
                />
              </div>
            </Row>
          </div>
          <div>
            <Row justify={"center"} align={"middle"} style={{width: "100%"}}>
              <Col
                xs={22}
                sm={22}
                md={10}
                lg={10}
                xl={10}
                xxl={10}
                className={HomeCss.homeInfoText}
              >
                <div style={{ width: "100%" }}>
                  <h3>
                    <span>Build, Test & Deploy your workflows</span>
                  </h3>
                  <h1>PIPELINES & MODELS IN MINUTES</h1>

                  <Button className={HomeCss.tryNowBtn}>Read More</Button>
                </div>
              </Col>
              <Col
                xs={22}
                sm={22}
                md={10}
                lg={10}
                xl={10}
                xxl={10}
                className={HomeCss.homeInfoImgCol}
              >
                <Image
                  src="/carousel_imgs/banner_img5.png"
                  alt="banner"
                  align={"center"}
                  preview={false}
                  className={HomeCss.homeInfoImg}
                />
              </Col>
            </Row>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
