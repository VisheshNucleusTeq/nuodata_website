import DataManagementCss from "../../styles/dataManagement.module.css";
import Info from "./info";
import Timeline from "./timeline";
import Footer from "../common/footer";
export default function DataManagement() {
  return (
    <>
        <Info DataManagementCss={DataManagementCss}/>
        <Timeline DataManagementCss={DataManagementCss}/>
        <Footer DataManagementCss={DataManagementCss} />
    </>
  );
}
