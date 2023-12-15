import HomeCss from "../../styles/Home.module.css";
import Footer from "../common/footer";
import DataModernizationArchitecture from "./datamodernizationarchitecture";
import EnterpriseChallenge from "./enterprisechallenge";
import Info from "./info";
import ModernizeWithConfidence from "./modernizewithconfidence";
import ThinkBig from "./thinkbig";

export default function Home() {
  return (
    <>
      <Info HomeCss={HomeCss} />
      <ThinkBig HomeCss={HomeCss} />
      <EnterpriseChallenge HomeCss={HomeCss} />
      <div className={HomeCss.space} />
      <ModernizeWithConfidence HomeCss={HomeCss} />
      <DataModernizationArchitecture HomeCss={HomeCss} />
      <Footer HomeCss={HomeCss} />
    </>
  );
}
