import { Col, Row } from "antd";
import { useEffect, useState } from "react";

export default function ModernizeWithConfidenceNew({ HomeCss }) {
  const [isDivShow, setIsDivShow] = useState(true);

  const getCircle = (colorStart, colorEnd, id) => {
    return (
      <Col
        xs={0}
        sm={0}
        md={0}
        lg={24}
        xl={24}
        xxl={24}
        className={HomeCss.firstViewCurcle}
        // style={{border : "1px solid red"}}
      >
        {isDivShow ? (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 55 55"
              fill="none"
            >
              <circle
                cx="27.5"
                cy="27.5"
                r="24"
                stroke={`url(#paint0_linear_1638_11286${id})`}
                strokeWidth="7"
              />
              <defs>
                <linearGradient
                  id={"paint0_linear_1638_11286" + id}
                  x1="27.5"
                  y1="0"
                  x2="27.5"
                  y2="55"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={colorStart} />
                  <stop offset="1" stopColor={colorEnd} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ) : (
          <></>
        )}
      </Col>
    );
  };

  const createPipeline = (index) => {
    return (
      <Col
        xs={0}
        sm={0}
        md={0}
        lg={2}
        xl={2}
        xxl={2}
        className={HomeCss.firstViewLine}
      >
        {isDivShow ? (
          <iframe
            src={`/all-graph/gradient/pipeline-${index}.html`}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              transform: "rotate(0deg)",
            }}
          />
        ) : (
          <></>
        )}
      </Col>
    );
  };

  const createImage = (index) => {
    return (
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={11}
        xl={11}
        xxl={11}
        className={HomeCss.firstViewImage}
      >
        <iframe
          src={`/all-graph/modernize/MWCImage${index}.html`}
          style={{
            width: isDivShow ? "30vw" : "60vw",
            height: isDivShow ? "30vw" : "60vw",
            border: "none",
          }}
        />
      </Col>
    );
  };

  const handleResize = async () => {
    let box = document.querySelector(".box");
    let width = box.offsetWidth;
    if (width < 992) {
      if (isDivShow) {
        setIsDivShow(false);
      }
    } else {
      if (!isDivShow) {
        setIsDivShow(true);
      }
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, []);

  return (
    <div className="box" style={{ marginTop: "4vw", marginBottom: "4vw" }}>
      <Row className={HomeCss.firstView}>
        {!isDivShow ? createImage(1) : null}
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          xxl={11}
          className={HomeCss.firstViewText}
          style={
            !isDivShow ? { textAlign: "center", justifyContent: "center" } : {}
          }
        >
          <h1>
            Modernize with <span>Confidence 6-10x faster & 100%</span> Accurate
            conversion
          </h1>
        </Col>
        {createPipeline(1)}
        {isDivShow ? createImage(1) : null}
        {getCircle("#6015E2", "#29D5A6", "_1")}
      </Row>

      <Row className={HomeCss.firstView}>
        {createImage(2)}
        {createPipeline(2)}
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          xxl={11}
          className={HomeCss.secondViewText}
          style={
            !isDivShow ? { textAlign: "center", justifyContent: "center" } : {}
          }
        >
          <h1>
            <span>Data driven</span> enterprise enabled through{" "}
            <span>modern data lake</span>
          </h1>
        </Col>
        {getCircle("#29B8EF", "#FFF281", "_2")}
      </Row>

      <Row className={HomeCss.firstView}>
        {!isDivShow ? createImage(3) : null}
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          xxl={11}
          className={HomeCss.thirdViewText}
          style={
            !isDivShow ? { textAlign: "center", justifyContent: "center" } : {}
          }
        >
          <h1>
            <span>Certified</span> data for enterprise <span>consumption</span>
          </h1>
        </Col>
        {createPipeline(3)}
        {isDivShow ? createImage(3) : null}
        {getCircle("#FF8860", "#6015E2", "_3")}
      </Row>

      <Row className={HomeCss.firstView}>
        {createImage(4)}
        {createPipeline(4)}
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          xxl={11}
          className={HomeCss.fourthViewText}
          style={
            !isDivShow ? { textAlign: "center", justifyContent: "center" } : {}
          }
        >
          <h1>
            Single version of <span>truth</span>
          </h1>
        </Col>
        {getCircle("#FB4794", "#29B8EC", "_4")}
      </Row>

      <Row className={HomeCss.firstView}>
        {!isDivShow ? createImage(5) : null}
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          xxl={11}
          className={HomeCss.fifthViewText}
          style={
            !isDivShow ? { textAlign: "center", justifyContent: "center" } : {}
          }
        >
          <h1>
            Enabling <span>federation of data</span> through self services
          </h1>
        </Col>
        {createPipeline(5)}
        {isDivShow ? createImage(5) : null}
        {getCircle("#29D5A6", "#29D5A6", "_5")}
      </Row>
      {/* first second third fourth fifth sixth seventh */}
    </div>
  );
}
