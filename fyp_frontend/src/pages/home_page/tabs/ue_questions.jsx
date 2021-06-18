import { Typography, Button } from "antd";
import { Link } from "react-router-dom";

const UeQuestions = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          justifySelf: "flex-start",
        }}
      >
        <Typography>
          Select University Exam Questions Result to change
        </Typography>
      </div>
      <div
        style={{
          justifySelf: "flex-end",
        }}
      >
        <Button type="primary">
          <Link to="/home/ue">Add University Exam Questions Result</Link>
        </Button>
      </div>
    </div>
  );
};

export default UeQuestions;
