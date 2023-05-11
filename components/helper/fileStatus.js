import { Badge } from "antd";
export const fileStatusBadge = (fileStatus, isUserAction) => {
  if (isUserAction === true) {
    switch (fileStatus) {
      case "convert_failed":
        return <Badge count={"Transformed Partially"} color="orange" />;
      case "converted":
        return <Badge count={"Transformed Successfully"} color="green" />;
      case "validated":
        return <Badge count={"Validated"} color="darkgreen" />;
      default:
        return <Badge count={"Analysis Completed"} color="blue" />;
    }
  } else {
    switch (fileStatus) {
      case "analyze_failed":
        return <Badge count={"Analysis Failed"} color="red" />;
      default:
        return <Badge count={"Analysis Completed"} color="blue" />;
    }
  }
};
