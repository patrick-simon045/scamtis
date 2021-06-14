import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { useStyles } from "../../../styles/material_styles";
import { useSelector } from "react-redux";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

export default function UserAccountIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const classes = useStyles();
  const [name_acronym, setNameAcronym] = useState("");

  const lectureDetails = useSelector((state) => {
    const stateVariable = state.lecturer;
    return {
      user_name: stateVariable.user_name,
      lecturer_name: stateVariable.lecturer_name,
      courses_teaching: stateVariable.courses_teaching,
      course_count: stateVariable.course_count,
      position: stateVariable.position,
    };
  });

  useEffect(() => {
    // extracting the first letter in each word
    let acronym = lectureDetails.lecturer_name
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "");

    setNameAcronym(acronym);

    console.log(acronym);
  }, [lectureDetails]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {/* <AccountCircle /> */}
        <Avatar className={classes.letterAvatar}>{name_acronym}</Avatar>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.popover}>
          <div className={classes.image_plus_name}>
            <img
              className={classes.image}
              src="https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Paris"
            />
            <Typography className={classes.typography}>
              {lectureDetails.lecturer_name}
            </Typography>
          </div>

          <div className={classes.popover_detail_card}>
            <Typography className={classes.typography}>
              username: {lectureDetails.user_name}
            </Typography>
          </div>

          <div className={classes.popover_detail_card}>
            <Typography className={classes.typography}>
              {/* courses: {lectureDetails.user_name} */}
              {(function (courses = lectureDetails.courses_teaching) {
                // extracting course list
                var list = [];
                for (let index = 0; index < courses.length; index++) {
                  const course = courses[index];
                  list.push(course.course_code);
                }
                return "courses: " + list;
              })()}
            </Typography>
          </div>

          <div className={classes.popover_detail_card}>
            <Typography className={classes.typography}>
              position: {lectureDetails.position}
            </Typography>
          </div>

          <div className={classes.logout_button}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => {
                console.log("Logout option tapped");
                handleClose();
                history.replace("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
