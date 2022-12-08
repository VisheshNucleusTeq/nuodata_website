import HomeCss from "../../styles/Home.module.css";
import Info from "./info";
import ThinkBig from "./thinkbig";
import EnterpriseChallenge from "./enterprisechallenge";
import ModernizeWithConfidence from "./modernizewithconfidence";
import Footer from "../common/footer";
import DataModernizationArchitecture from "./datamodernizationarchitecture";
import Platforms from "./platforms";
export default function Home() {
  return (
    <>
      <Info HomeCss={HomeCss} />
      <ThinkBig HomeCss={HomeCss} />
      <EnterpriseChallenge HomeCss={HomeCss} />
      <DataModernizationArchitecture HomeCss={HomeCss} />
      {/* <Platforms HomeCss={HomeCss} /> */}
      <ModernizeWithConfidence HomeCss={HomeCss} />
      <Footer HomeCss={HomeCss} />
    </>
  );
}
