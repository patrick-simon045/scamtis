import React, {Component} from "react";

import {
    DatePicker,
    InputNumber,
    Row,
    Select,
    Typography,
    Col,
    Button,
    message,
} from "antd";

import {
    DeleteOutlined,
    CheckOutlined,
    RetweetOutlined,
} from "@ant-design/icons";

import "../home.css";

const {Option} = Select;

// instead of using a select componet with multiple mode
// i should instead use the normal select one and thus update or create the assessments one by one
// and after each update or create, refresh the page to show the changes made to the database immediately

function submit_assessment_values(
    criteria,
    course,
    academic_year,
    date_taken,
    number_of_questions,
    contribution
) {
    fetch("http://127.0.0.1:8000/api/assessments/", {
        methood: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + sessionStorage.getItem("token"),
        },
        body: {
            criteria: criteria,
            course: course,
            academic_year: academic_year,
            date_taken: date_taken,
            number_of_questions: number_of_questions,
            contribution: contribution,
        },
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log("error obtained: " + error);
        });
}

class Criteria extends Component {
    state = {
        assessment_criteria: [],
        chosen_criteria: [],
        number_of_questions: 1,
        contribution_to_ca: 20,
        assessments: [],
        courses: [],
        selected_course: "",
        academic_year: "",
        date: "",
        // courses: sessionStorage.getItem("courses"),
    };

    course_listing = [];

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
                console.log(typeof sessionStorage.getItem("courses"));

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
                    console.log(course_code);
                    final_course_list.push(course_code);
                    start_slicing_value = start_slicing_value + 9;
                    end_slicing_value = end_slicing_value + 9;
                }

                console.log(final_course_list);

                this.course_listing = final_course_list;
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

                // console.log(final_course_list);
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

                var criteria_list = response.map((criteria_item) => {
                    return criteria_item.criteria;
                });

                console.log(criteria_list);

                sessionStorage.setItem("criteria_list_from_database", criteria_list);
                sessionStorage.setItem("final_course_list", final_course_list);

                this.setState({
                    assessments: response,
                    courses: final_course_list,
                });
            });
    }

    render() {
        return (
            <div>
                <div style={{width: "95%", margin: "20px auto"}}>
                    <Select
                        // size="middle"
                        defaultValue="0"
                        onChange={(value) => {
                            console.log(value);
                            this.setState({selected_course: this.state.courses[value]});
                        }}
                        style={{width: 200, marginBottom: "20px"}}
                    >
                        {this.state.courses.map((course, index) => {
                            return <Option key={index}>{course}</Option>;
                        })}
                    </Select>

                    <Select
                        style={{marginBottom: "50px"}}
                        mode="multiple"
                        size="middle"
                        placeholder="Please select a criteria"
                        // defaultValue={[...this.state.chosen_criteria]}
                        onChange={(value) => {
                            console.log(value);
                            console.log(this.state.chosen_criteria);
                            this.setState({
                                chosen_criteria: value.map((value, index) => {
                                    return this.state.assessment_criteria[Number(value)];
                                }),
                            });
                            console.log(this.state.chosen_criteria);
                        }}
                        onDeselect={(value) => {
                            console.log(value);
                            console.log(this.state.assessment_criteria[Number(value)]);

                            console.log(this.state.assessments);

                            // // delete on both front end an backend
                            // fetch(
                            //   "http://127.0.0.1:8000/api/assessments_change/" +
                            //     result_to_delete.assessment.id,
                            //   {
                            //     method: "DELETE",
                            //     headers: {
                            //       "Content-Type": "application/json",
                            //       Authorization: "Token " + sessionStorage.getItem("token"),
                            //     },
                            //     body: JSON.stringify({
                            //       academic_year: result_to_delete.assessment.academic_year,
                            //       contribution: result_to_delete.assessment.contribution,
                            //       course: result_to_delete.assessment.course,
                            //       criteria: result_to_delete.assessment.criteria,
                            //       date_taken: result_to_delete.assessment.date_taken,
                            //       number_of_questions:
                            //         result_to_delete.assessment.number_of_questions,
                            //     }),
                            //   }
                            // )
                            //   .then((response) => {
                            //     console.log(response);
                            //     for (
                            //       let index = 0;
                            //       index < this.state.chosen_criteria.length;
                            //       index++
                            //     ) {
                            //       if (
                            //         this.state.assessment_criteria[index] ===
                            //         result_to_delete.assessment.criteria
                            //       ) {
                            //         this.setState({
                            //           chosen_criteria: this.state.chosen_criteria.filter(
                            //             (item) =>
                            //               item !== result_to_delete.assessment.criteria
                            //           ),
                            //         });
                            //       }
                            //     }
                            //   })
                            //   .catch((error) => {
                            //     console.log("error obtained: " + error);
                            //   });
                        }}
                        // onClear={(value) => {
                        //   console.log("cleared :" + value);
                        // }}
                        style={{width: "100%"}}
                    >
                        {this.state.assessment_criteria.map((criteria, index) => {
                            return <Option key={index}>{criteria}</Option>;
                        })}
                    </Select>
                    <div style={{marginTop: "30px"}}>
                        <Typography style={{marginBottom: "20px"}}>
                            Show current seetings in the db
                        </Typography>
                        {this.state.assessments.map((assessment_item, index) => {
                            return (
                                <div
                                    style={{
                                        textAlign: "center",
                                        padding: "20px",
                                        marginBottom: "20px",
                                        backgroundColor: "white",
                                        borderRadius: "10px",
                                        boxShadow:
                                            "10px 10px 50px rgba(255,255,255,0.01), 10px 10px 50px rgba(20,10,0,0.05)",
                                    }}
                                >
                                    <Row gutter={16}>
                                        <Col className="gutter-row" span={4}>
                                            {assessment_item.course}
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            {assessment_item.criteria}
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            {assessment_item.contribution}
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            {assessment_item.academic_year}
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            {assessment_item.number_of_questions}
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            {assessment_item.date_taken}
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <br/>

                {this.state.chosen_criteria.length === 0 ? (
                    <div/>
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
                        <Typography style={{marginBottom: "20px"}}>
                            Please define the{" "}
                            <span style={{color: "black", fontWeight: "bold"}}>weight</span>{" "}
                            and{" "}
                            <span style={{color: "black", fontWeight: "bold"}}>date</span>{" "}
                            for each criteria.
                        </Typography>
                        {this.state.chosen_criteria.map((criteria, index) => {
                            // console.log(criteria);
                            return (
                                <div
                                    key={index}
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
                                            // boxShadow:
                                            //   "10px 10px 20px rgba(255,255,255,0.2), 10px 10px 20px rgba(20,10,0,0.2)",
                                            boxShadow:
                                                "10px 10px 50px rgba(255,255,255,0.01), 10px 10px 50px rgba(20,10,0,0.05)",
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
                                                        style={{marginRight: "20px", fontSize: "13px"}}
                                                    >
                                                        The{" "}
                                                        <span
                                                            style={{color: "black", fontWeight: "bold"}}
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
                                                            this.setState({number_of_questions: value});
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
                                                        style={{marginRight: "20px"}}
                                                    >
                                                        Contribution to CA{" "}
                                                        <span
                                                            style={{color: "black", fontWeight: "bold"}}
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
                                                            this.setState({contribution_to_ca: value});
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
                                                        style={{marginRight: "20px"}}
                                                    >
                                                        The{" "}
                                                        <span
                                                            style={{color: "black", fontWeight: "bold"}}
                                                        >
                              {" "}
                                                            date{" "}
                            </span>{" "}
                                                        of occurance
                                                    </Typography>
                                                    <DatePicker
                                                        onChange={(date, dateString) => {
                                                            console.log(dateString);
                                                            console.log(dateString.slice(0, 4));
                                                            console.log(dateString.slice(5, 7));

                                                            let year = parseInt(dateString.slice(0, 4));
                                                            let month = parseInt(dateString.slice(5, 7));
                                                            console.log(month);
                                                            console.log(year);

                                                            let academic_year = "";

                                                            if (month >= 11) {
                                                                const end_year = year + 1;
                                                                const start_year = year;
                                                                academic_year = start_year + "/" + end_year;
                                                            } else {
                                                                const end_year = year;
                                                                const start_year = year - 1;
                                                                academic_year = start_year + "/" + end_year;
                                                            }

                                                            console.log(academic_year);
                                                            this.setState({
                                                                academic_year: academic_year,
                                                                date: dateString,
                                                            });

                                                            const data = {
                                                                criteria: {criteria}.criteria,
                                                                course: this.state.selected_course,
                                                                academic_year: academic_year,
                                                                date_taken: dateString,
                                                                number_of_questions:
                                                                this.state.number_of_questions,
                                                                contribution: this.state.contribution_to_ca,
                                                            };

                                                            console.log(data);
                                                            var update = false;
                                                            var object_to_update = {};

                                                            for (
                                                                let index = 0;
                                                                index < this.state.assessments.length;
                                                                index++
                                                            ) {
                                                                const current_assessment =
                                                                    this.state.assessments[index];

                                                                if (
                                                                    current_assessment.criteria ===
                                                                    data.criteria &&
                                                                    current_assessment.course === data.course
                                                                ) {
                                                                    update = true;
                                                                    break;
                                                                }
                                                            }

                                                            // console.log("update: " + update);

                                                            if (update) {
                                                                console.log(
                                                                    "show pop up message to press the update button"
                                                                );
                                                                message.warning(
                                                                    "Please press the update button to save your changes"
                                                                );
                                                            } else {
                                                                console.log("creating new object");
                                                                console.log(data);
                                                                // send assessment details to database
                                                                fetch(
                                                                    "http://127.0.0.1:8000/api/assessments/",
                                                                    {
                                                                        method: "POST",
                                                                        headers: {
                                                                            "Content-Type": "application/json",
                                                                            Authorization:
                                                                                "Token " +
                                                                                sessionStorage.getItem("token"),
                                                                        },
                                                                        body: JSON.stringify(data),
                                                                    }
                                                                )
                                                                    .then((response) => response.json())
                                                                    .then((response) => {
                                                                        console.log(response);
                                                                        message.success(
                                                                            "Success, please refresh this page after you are done 🙏"
                                                                        );
                                                                        window.location.reload();
                                                                    })
                                                                    .catch((error) => {
                                                                        console.log("error obtained: " + error);
                                                                    });
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div
                                        className="iconContainer"
                                        onClick={() => {
                                            var data = {
                                                criteria: {criteria}.criteria,
                                                course: this.state.selected_course,
                                                academic_year: this.state.academic_year,
                                                date_taken: this.state.date,
                                                number_of_questions: this.state.number_of_questions,
                                                contribution: this.state.contribution_to_ca,
                                            };

                                            console.log(data);
                                            console.log(this.state.assessments);
                                            // console.log(this.state.assessment_criteria);

                                            var update = false;
                                            var object_to_update = {};

                                            for (
                                                let index = 0;
                                                index < this.state.assessments.length;
                                                index++
                                            ) {
                                                const current_assessment =
                                                    this.state.assessments[index];

                                                if (
                                                    current_assessment.criteria === data.criteria &&
                                                    current_assessment.course === data.course
                                                ) {
                                                    object_to_update = current_assessment;
                                                    data.date_taken = current_assessment.date_taken;
                                                    update = true;
                                                    break;
                                                }
                                            }

                                            // console.log("update: " + update);
                                            console.log(object_to_update);
                                            console.log(typeof data.date_taken);

                                            // if (!update) {
                                            //   if (data.date_taken === "") {
                                            //     console.log("empty date");
                                            //     message.warning("Please select a date");
                                            //   } else {
                                            //     console.log("not empty");
                                            //     message.info("We are good to update");
                                            //   }
                                            // }

                                            if (!update) {
                                                console.log(
                                                    "show pop up message to select a date which automaticaly creates a new record"
                                                );
                                                message.warning(
                                                    "Please select a date to save your changes"
                                                );
                                            } else if (object_to_update.date_taken !== "") {
                                                console.log("updating the object");
                                                console.log(data);
                                                console.log(
                                                    "http://127.0.0.1:8000/api/assessments_change/" +
                                                    object_to_update.id
                                                );

                                                fetch(
                                                    "http://127.0.0.1:8000/api/assessments_change/" +
                                                    object_to_update.id,
                                                    {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            Authorization:
                                                                "Token " + sessionStorage.getItem("token"),
                                                        },
                                                        body: JSON.stringify(data),
                                                    }
                                                )
                                                    .then((response) => response.json())
                                                    .then((response) => {
                                                        console.log(response);
                                                        window.location.reload();
                                                    })
                                                    .catch((error) => {
                                                        console.log("error caught: " + error);
                                                    });
                                            }
                                        }}
                                    >
                                        <RetweetOutlined className="deleteIcon"/>
                                    </div>
                                    {/* <div
                    className="iconContainer"
                    onClick={() => {
                      console.log(this.state.assessments);
                      console.log("criteria: " + { criteria }.criteria);
                      console.log("course: " + this.state.selected_course);

                      const criteria_item = { criteria }.criteria;
                      console.log(criteria_item);
                      const course_selected = this.state.selected_course;

                      const assessment_data = this.state.assessments;

                      let result_to_delete = {};

                      for (
                        let index = 0;
                        index < assessment_data.length;
                        index++
                      ) {
                        const assessment_datum = assessment_data[index];
                        console.log(index);
                        // console.log(assessment_datum.criteria);
                        // console.log(typeof assessment_datum.criteria);

                        if (
                          assessment_datum.criteria === criteria_item &&
                          assessment_datum.course === course_selected
                        ) {
                          // console.log({
                          //   index: index,
                          //   assessment: assessment_datum,
                          // });
                          result_to_delete = {
                            index: index,
                            assessment: assessment_datum,
                          };
                          // console.log(result_to_delete);
                          break;
                        }
                      }
                      if (Object.keys(result_to_delete).length === 0) {
                        console.log("Delete only on frontend");
                      } else {
                        console.log("Delete on both front end an backend");
                        console.log(result_to_delete);
                        console.log(result_to_delete.assessment);
                        console.log(
                          "http://127.0.0.1:8000/api/assessments_change/" +
                            result_to_delete.assessment.id
                        );
                        // console.log({
                        //   academic_year:
                        //     result_to_delete.assessment.academic_year,
                        //   contribution: result_to_delete.assessment.contribution,
                        // });
                        // console.log({
                        //   academic_year: result_to_delete.academic_year,
                        //   contribution: result_to_delete.contribution,
                        //   course: result_to_delete.course,
                        //   criteria: result_to_delete.criteria,
                        //   date_taken: result_to_delete.date_taken,
                        //   number_of_questions:
                        //     result_to_delete.number_of_questions,
                        // });
                        let i = this.state.chosen_criteria.indexOf(
                          result_to_delete.assessment.criteria
                        );

                        console.log(i);
                        console.log(this.state.chosen_criteria);
                        console.log(result_to_delete.assessment.criteria);
                        console.log(
                          this.state.chosen_criteria[
                            this.state.chosen_criteria.indexOf(
                              result_to_delete.assessment.criteria
                            )
                          ]
                        );

                        var itemp = this.state.chosen_criteria.filter(
                          (item) => {
                            return (
                              item !== result_to_delete.assessment.criteria
                            );
                            // if (
                            //   this.state.chosen_criteria[
                            //     this.state.chosen_criteria.indexOf(
                            //       result_to_delete.assessment.criteria
                            //     )
                            //   ] === result_to_delete.assessment.criteria
                            // ) {
                            //   return item;
                            // }
                          }
                        );

                        console.log(itemp);
                        this.setState({ chosen_criteria: itemp });

                        // // delete on both front end an backend
                        // fetch(
                        //   "http://127.0.0.1:8000/api/assessments_change/" +
                        //     result_to_delete.assessment.id,
                        //   {
                        //     method: "DELETE",
                        //     headers: {
                        //       "Content-Type": "application/json",
                        //       Authorization:
                        //         "Token " + sessionStorage.getItem("token"),
                        //     },
                        //     body: JSON.stringify({
                        //       academic_year:
                        //         result_to_delete.assessment.academic_year,
                        //       contribution:
                        //         result_to_delete.assessment.contribution,
                        //       course: result_to_delete.assessment.course,
                        //       criteria: result_to_delete.assessment.criteria,
                        //       date_taken:
                        //         result_to_delete.assessment.date_taken,
                        //       number_of_questions:
                        //         result_to_delete.assessment.number_of_questions,
                        //     }),
                        //   }
                        // )
                        //   .then((response) => {
                        //     console.log(response);
                        //     for (
                        //       let index = 0;
                        //       index < this.state.chosen_criteria.length;
                        //       index++
                        //     ) {
                        //       if (
                        //         this.state.assessment_criteria[index] ===
                        //         result_to_delete.assessment.criteria
                        //       ) {
                        //         this.setState({
                        //           chosen_criteria:
                        //             this.state.chosen_criteria.filter(
                        //               (item) =>
                        //                 item !==
                        //                 result_to_delete.assessment.criteria
                        //             ),
                        //         });
                        //       }
                        //     }
                        //   })
                        //   .catch((error) => {
                        //     console.log("error obtained: " + error);
                        //   });
                      }
                    }}
                  >
                    <DeleteOutlined className="deleteIcon" />
                  </div> */}

                                    {/* <Button
                    style={{ marginLeft: "10px" }}
                    type="primary"
                    shape="circle"
                    icon={<DeleteOutlined />}
                  /> */}
                                </div>
                            );
                        })}
                    </div>
                )}
                <br/>
            </div>
        );
    }
}

export default Criteria;
