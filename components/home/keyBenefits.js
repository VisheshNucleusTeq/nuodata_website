import { Image } from "antd";
import { Timeline } from "antd";

export default function KeyBenefits({ HomeCss }) {
  return (
    <div className={HomeCss.KeyBenefits}>
      <h1>What is NuoData?</h1>
      <div className={HomeCss.KeyBenefitsParent}>
        <Timeline mode={"alternate"} className={HomeCss.KeyBenefitTimeline} >
          <Timeline.Item
            className="aaaa"
            color={"#e74860"}
            label="6-10x faster & 100% accurate conversion"
            style={{ height: "15vh", fontSize : "16px" }}
          >
            <div className={HomeCss.KeyBenefitChildMarginLeft}>
              <Image
                className={HomeCss.KeyBenefitImage}
                width={"60px"}
                src="./home/image (1).png"
              />
            </div>
          </Timeline.Item>
          <Timeline.Item
            color={"#e74860"}
            label="Data driven enterprise enabled through modern data lake"
            style={{ height: "15vh", fontSize : "16px" }}
          >
            <div className={HomeCss.KeyBenefitChildMarginRight}>
              <Image
                className={HomeCss.KeyBenefitImage}
                width={"60px"}
                src="./home/image (2).png"
              />
            </div>
          </Timeline.Item>
          <Timeline.Item
            color={"#e74860"}
            label="Certified data for enterprise consumption"
            style={{ height: "15vh", fontSize : "16px" }}
          >
            <div className={HomeCss.KeyBenefitChildMarginLeft}>
              <Image
                className={HomeCss.KeyBenefitImage}
                width={"60px"}
                src="./home/image (3).png"
              />
            </div>
          </Timeline.Item>
          <Timeline.Item
            color={"#e74860"}
            label="No redundancies or in-efficiencies"
            style={{ height: "15vh", fontSize : "16px" }}
          >
            <div className={HomeCss.KeyBenefitChildMarginRight}>
              <Image
                className={HomeCss.KeyBenefitImage}
                width={"60px"}
                src="./home/image (4).png"
              />
            </div>
          </Timeline.Item>
          <Timeline.Item
            color={"#e74860"}
            label="6-10x faster time to market for new reports"
            style={{ height: "15vh", fontSize : "16px" }}
          >
            <div className={HomeCss.KeyBenefitChildMarginLeft}>
              <Image
                className={HomeCss.KeyBenefitImage}
                width={"60px"}
                src="./home/image (5).png"
              />
            </div>
          </Timeline.Item>
          <Timeline.Item
            color={"#e74860"}
            label="Enabling federation of data through self services"
            style={{ height: "15vh", fontSize : "16px" }}
          >
            <div className={HomeCss.KeyBenefitChildMarginRight}>
              <Image
                className={HomeCss.KeyBenefitImage}
                width={"60px"}
                src="./home/image (6).png"
              />
            </div>
          </Timeline.Item>
          <Timeline.Item
            color={"#e74860"}
            label="Single version of truth"
            style={{ height: "15vh", fontSize : "16px" }}
          >
            <div className={HomeCss.KeyBenefitChildMarginLeft}>
              <Image
                className={HomeCss.KeyBenefitImage}
                width={"60px"}
                src="./home/image (7).png"
              />
            </div>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
}
