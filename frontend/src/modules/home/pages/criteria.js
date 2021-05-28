import React, { Component } from "react";

import { DatePicker, InputNumber, Row, Select, Typography, Col } from "antd";

const { Option } = Select;

class Criteria extends Component {
  state = {
    assessment_criteria: [],
    chosen_criteria: [],
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
        this.setState({ assessment_criteria: criteria });
        console.log(this.state.assessment_criteria);
        console.log("course count: " + sessionStorage.getItem("course_count"));
        console.log("courses: " + sessionStorage.getItem("courses"));
      })
      .catch((error) => {
        console.log("cant do that");
      });
  }

  render() {
    return (
      <div>
        <div style={{ width: "95%", margin: "20px auto" }}>
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
                          <span style={{ color: "black", fontWeight: "bold" }}>
                            number
                          </span>{" "}
                          of questions
                        </Typography>
                        <InputNumber
                          size="large"
                          min={1}
                          max={40}
                          defaultValue={3}
                          onChange={(value) => {
                            console.log(value);
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
                          <span style={{ color: "black", fontWeight: "bold" }}>
                            less than 40
                          </span>
                        </Typography>
                        <InputNumber
                          size="large"
                          min={1}
                          max={40}
                          defaultValue={3}
                          onChange={(value) => {
                            console.log(value);
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
                          <span style={{ color: "black", fontWeight: "bold" }}>
                            {" "}
                            date{" "}
                          </span>{" "}
                          of occurance
                        </Typography>
                        <DatePicker
                          onChange={(date, dateString) => {
                            // console.log(date, dateString);
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
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Criteria;
