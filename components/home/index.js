import HomeCss from "../../styles/Home.module.css";
import Info from "./info";
import Footer from "../common/footer";
import ThinkBig from "./thinkbig";
import EnterpriseChallenge from "./enterprisechallenge";
import ModernizeWithConfidence from "./modernizewithconfidence";
import DataModernizationArchitecture from "./datamodernizationarchitecture";
import SnapShot from "./snapShot";

export default function Home() {
  return (
    <>
      <Info HomeCss={HomeCss} />
      <ThinkBig HomeCss={HomeCss} />
      <EnterpriseChallenge HomeCss={HomeCss} />
      <ModernizeWithConfidence HomeCss={HomeCss} />
      <DataModernizationArchitecture HomeCss={HomeCss} />
      <SnapShot
        HomeCss={HomeCss}
      />
      <Footer />
    </>
  );
}