import DataGovernanceCss from "../../styles/dataGovernance.module.css";
import Info from "./info";
import Footer from "../common/footer";
import FiveModules from "./five-modules";
import SixFoundations from "./six-foundations";
export default function DataGovernance() {
  return (
    <>
      <Info DataGovernanceCss={DataGovernanceCss} />
      <FiveModules DataGovernanceCss={DataGovernanceCss} />
      <SixFoundations />
      <Footer />
    </>
  );
}
