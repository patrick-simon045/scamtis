import { Typography, Button } from "antd";
import { Link } from "react-router-dom";
import TitleBar from "../../../components/titleBar";

const UniversityExam = (props) => {
  return (
    <TitleBar
      title="Select University Exam to change"
      action="ADD UNIVERSITY EXAM"
    />
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: "space-evenly",
    //   }}
    // >
    //   <div
    //     style={{
    //       justifySelf: "flex-start",
    //     }}
    //   >
    //     <Typography>{props.title}</Typography>
    //   </div>
    //   <div style={{ display: "flex", justifyContent: "flex-end" }}>
    //     <Button type="primary">
    //       <Link to="/home/ue">{props.action}</Link>
    //     </Button>
    //   </div>
    // </div>
  );
};

export default UniversityExam;
