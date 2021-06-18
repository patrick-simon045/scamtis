import { Typography, Button } from "antd";
import { Link } from "react-router-dom";

const TitleBar = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div
        style={{
          justifySelf: "flex-start",
        }}
      >
        <Typography>{props.title}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary">
          <Link to={props.to}>{props.action}</Link>
        </Button>
      </div>
    </div>
  );
};

export default TitleBar;
