import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "../../../styles/material_styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";

function TabPanel(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`centered-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{ boxShadow: "none" }}
    >
      {value === index && (
        <div
          style={{
            padding: "20px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton aria-label="delete" color="primary" onClick={handleClick}>
            <div
              style={{
                padding: "10px",
                borderRadius: "50%",
                height: 50,
                width: 50,
                backgroundColor: "blue",
                color: "white",
                fontSize: 30,
                marginBottom: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              +
            </div>
          </IconButton>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            elevation={20}
            anchorReference="none"
            // anchorPosition={{ top: "auto", left: "auto" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 240,
            }}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
          >
            <p
              style={{
                padding: "20px",
                width: "60vw",
                height: "50vh",
              }}
            >
              The content of the Popover.
            </p>
          </Popover>
          <div
            style={{
              backgroundColor: "transparent",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
              borderRadius: "10px",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function CriteriaTab() {
  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    console.log("obtained date: " + day + "-" + month + "-" + year);
    setSelectedDate(date);
  };

  const [isEmpty, setIsEmpty] = React.useState(true);

  const [age, setAge] = React.useState("");

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const assessmentCriteria = ["Assignment", "Test 1", "Test 2", "Labs"];
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        // backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      {/* <h5>Criteria</h5> */}
      <Paper
        className={classes.criteriatabcontainer}
        elevation={0}
        square={false}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          style={{
            backgroundColor: "whitesmoke",
          }}
        >
          {["course 1", "course 2"].map((course, index) => {
            return <Tab key={index} label={course} />;
          })}
        </Tabs>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div
            style={{
              width: "60vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {[
              {
                assignment: "Assignment 1",
                questions: "# of questions",
                weight: "Weight value",
                date: "date 1",
              },

              {
                assignment: "Assignment 2",
                questions: "# of questions",
                weight: "Weight value",
                date: "date 2",
              },
            ].map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    fontWeight: "600",
                    borderRadius: "10px",
                    width: "65vw",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    border: "1px solid lightblue",
                    marginBottom: "20px",
                    boxShadow:
                      "10px -10px 20px rgba(255, 255, 255, 0.3), -10px 10px 20px rgba(20, 10, 0, 0.1)",
                  }}
                >
                  <FormControl variant="outlined" style={{ width: "150px" }}>
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      style={{ backgroundColor: "white", padding: "0 10px" }}
                    >
                      Criteria
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={age}
                      onChange={handleSelectChange}
                    >
                      {assessmentCriteria.map((criteria, index) => {
                        return (
                          <MenuItem key={index} value={criteria}>
                            {criteria}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <TextField
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    id="outlined-question-field"
                    label="Questions"
                    type="number"
                    defaultValue={3}
                    variant="outlined"
                    style={{ width: "100px" }}
                  />
                  <TextField
                    InputProps={{ inputProps: { min: 0, max: 40 } }}
                    id="outlined-weight-field"
                    label="CA Weight"
                    type="number"
                    defaultValue={20}
                    variant="outlined"
                    style={{ width: "100px" }}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      // format="MM/dd/yyyy"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date of assessment"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ textTransform: "none" }}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div
            style={{
              width: "60vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {isEmpty ? (
              <div
                style={{
                  fontWeight: "600",
                  backgroundColor: "whitesmoke",
                  width: "100%",
                  height: "50vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>show a vector illustration here when list is empty</p>
              </div>
            ) : (
              [
                {
                  assignment: "Assignment 1",
                  questions: "# of questions",
                  weight: "Weight value",
                  date: "date 1",
                },
              ].map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "whitesmoke",
                      width: "65vw",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      marginBottom: "20px",
                      boxShadow:
                        "10px 10px 20px rgba(255, 255, 255, 0.05), 10px 10px 20px rgba(20, 10, 0, 0.02)",
                    }}
                  >
                    <h4>{item.assignment}</h4>
                    <h4>{item.questions}</h4>
                    <h4>{item.weight}</h4>
                    <h4>{item.date}</h4>
                    <h5>Update button</h5>
                  </div>
                );
              })
            )}
          </div>
        </TabPanel>
      </Paper>
    </div>
  );
}

export default CriteriaTab;
