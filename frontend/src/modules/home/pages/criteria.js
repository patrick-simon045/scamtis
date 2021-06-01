import React, { Component } from "react";

import {
  DatePicker,
  InputNumber,
  Row,
  Select,
  Typography,
  Col,
  Button,
} from "antd";

import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";

import "../home.css";

const { Option } = Select;

class Criteria extends Component {
  state = {
    assessment_criteria: [],
    chosen_criteria: [],
    number_of_questions: 1,
    contribution_to_ca: 20,
    assessments: [],
    courses: [],
    selected_course: "",
    // courses: sessionStorage.getItem("courses"),
  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/ca_items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 6e13a770995c2dee1a131fa840ea81d91ae4f83c",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const criteria = response.map((criteria) => {
          return criteria.ca_item_name;
        });
        console.log(criteria);
        console.log(this.state.assessment_criteria);
        console.log("course count: " + sessionStorage.getItem("course_count"));
        console.log("courses: " + sessionStorage.getItem("courses"));

        const course_list = sessionStorage.getItem("courses");

        const number_of_iterations = parseInt((course_list.length - 1) / 6);

        console.log(number_of_iterations);

        const final_course_list = [];

        let start_slicing_value = 0;
        let end_slicing_value = 6;

        for (var index = 0; index < number_of_iterations; index++) {
          let course_code = course_list.slice(
            start_slicing_value,
            end_slicing_value
          );
          // console.log(
          //   course_list.slice(start_slicing_value, end_slicing_value)
          // );
          final_course_list.push(course_code);
          start_slicing_value = start_slicing_value + 9;
          end_slicing_value = end_slicing_value + 9;
        }

        console.log(final_course_list);
        // console.log(course_list);
        // console.log(course_list.slice(0, 6));
        // console.log(course_list.slice(9, 15));
        this.setState({
          assessment_criteria: criteria,
          courses: final_course_list,
          selected_course: final_course_list[0],
        });
      })
      .catch((error) => {
        console.log("cant do that");
        console.log("error: " + error);
      });

    fetch("http://127.0.0.1:8000/api/assessments/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <div>
        <div style={{ width: "95%", margin: "20px auto" }}>
          <Select
            // size="middle"
            defaultValue="0"
            onChange={(value) => {
              console.log(value);
              console.log(this.state.courses[value]);
              this.setState({ selected_course: this.state.courses[value] });
            }}
            style={{ width: 200, marginBottom: "20px" }}
          >
            {this.state.courses.map((course, index) => {
              return <Option key={index}>{course}</Option>;
            })}
          </Select>

          <Select
            mode="multiple"
            size="middle"
            placeholder="Please select a criteria"
            // defaultValue={["0", "5"]}
            onChange={(value) => {
              // console.log(value);
              this.setState({
                chosen_criteria: value.map((value, index) => {
                  return this.state.assessment_criteria[Number(value)];
                }),
              });
              console.log(this.state.chosen_criteria);
            }}
            style={{ width: "100%" }}
          >
            {this.state.assessment_criteria.map((criteria, index) => {
              return <Option key={index}>{criteria}</Option>;
            })}
          </Select>
        </div>
        <br />

        {this.state.chosen_criteria.length === 0 ? (
          <div />
        ) : (
          <div
            style={{
              height: "auto",
              overflow: "auto",
              width: "100%",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              flexDirection: "column",
              padding: "30px",
            }}
          >
            <Typography style={{ marginBottom: "20px" }}>
              Please define the{" "}
              <span style={{ color: "black", fontWeight: "bold" }}>weight</span>{" "}
              and{" "}
              <span style={{ color: "black", fontWeight: "bold" }}>date</span>{" "}
              for each criteria.
            </Typography>
            {this.state.chosen_criteria.map((criteria, index) => {
              console.log(criteria);
              return (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    // justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <div
                    key={index}
                    style={{
                      backgroundColor: "white",
                      height: 80,
                      width: "100%",
                      textAlign: "start",
                      padding: "25px",
                      margin: "10px",
                      boxShadow:
                        "10px 10px 20px rgba(255,255,255,0.2), 10px 10px 20px rgba(20,10,0,0.2)",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Row
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Col span={3}>
                        <Typography key={index}>{criteria}</Typography>
                      </Col>
                      <Col span={6}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <Typography
                            key={index + 1}
                            style={{ marginRight: "20px" }}
                          >
                            The{" "}
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              number
                            </span>{" "}
                            of questions
                          </Typography>
                          <InputNumber
                            size="large"
                            min={1}
                            max={40}
                            defaultValue={this.state.number_of_questions}
                            onChange={(value) => {
                              this.setState({ number_of_questions: value });
                            }}
                          />
                        </div>
                      </Col>
                      <Col span={8}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            // justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                            // paddingLeft: "10px",
                          }}
                        >
                          <Typography
                            key={index + 1}
                            style={{ marginRight: "20px" }}
                          >
                            Contribution to CA{" "}
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              less than 40
                            </span>
                          </Typography>
                          <InputNumber
                            size="large"
                            min={1}
                            max={40}
                            defaultValue={this.state.contribution_to_ca}
                            onChange={(value) => {
                              this.setState({ contribution_to_ca: value });
                            }}
                          />
                        </div>
                      </Col>
                      <Col span={7}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <Typography
                            key={index + 1}
                            style={{ marginRight: "20px" }}
                          >
                            The{" "}
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {" "}
                              date{" "}
                            </span>{" "}
                            of occurance
                          </Typography>
                          <DatePicker
                            onChange={(date, dateString) => {
                              // console.log(date, dateString);
                              console.log(dateString.slice(0, 6));
                              const end_year = dateString.slice(0, 4);
                              const start_year = (
                                Number(end_year) - 1
                              ).toString();
                              const academic_year = start_year + "/" + end_year;
                              console.log(academic_year);
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div
                    key={index + 1}
                    className="iconContainer"
                    onClick={() => {
                      console.log(index);
                      console.log(this.state.selected_course);
                      console.log(sessionStorage.getItem("token"));
                      // console.log(sessionStorage.getItem("courses"));
                      // console.log(sessionStorage.getItem("course_count"));
                      console.log({ criteria }.criteria);
                      console.log(this.state.chosen_criteria);
                      console.log(this.state.number_of_questions);
                      console.log(this.state.contribution_to_ca);
                    }}
                  >
                    <CheckOutlined className="submitIcon" />
                  </div>
                  <div
                    className="iconContainer"
                    onClick={() => {
                      console.log("clicked");
                    }}
                  >
                    <DeleteOutlined className="deleteIcon" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <br />
      </div>
    );
  }
}

export default Criteria;
