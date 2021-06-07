import { Col, Row, Typography } from "antd";
import React, { Component } from "react";
import "../home.css";

class Overview extends Component {
  state = {
    username: "",
    full_name: "",
    position: "",
    courses: [""],
  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/lecturers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response.position);
        // const courses = response.courses_teaching.map((course) => {
        //   return response.courses_teaching.length > 1
        //     ? course.course_code + ", "
        //     : course.course_code;
        // });
        // console.log(courses);

        const course_list = response.courses_teaching.map((course, index) => {
          return response.courses_teaching.length > 1
            ? course.course_code + ", "
            : course.course_code;
        });

        // setting state variables
        this.setState({
          username: response.user_name,
          full_name: response.lecturer_name,
          position: response.position,
          courses: course_list,
        });

        // setting values to session storage
        sessionStorage.setItem("course_count", response.course_count);
        sessionStorage.setItem("courses", course_list);

        console.log(course_list);
        console.log(sessionStorage.getItem("courses"));
        //     // return course_list.push({response.courses_teaching.course_code});
        //   })
        // );
      })
      .catch((error) => {
        console.log("cant fetch data");
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
      });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "93vh",
          width: "100%",
          //   backgroundColor: "red",
          padding: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            // justifyContent: "flex-start",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            width: "500px",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow:
              "10px 10px 20px rgba(255,255,255,0.2), 10px 10px 20px rgba(20,10,0,0.2)",
          }}
        >
          <div
            style={{
              height: "40%",
              width: "40%",
              backgroundColor: "red",
              borderRadius: "50%",
              boxShadow:
                "10px 10px 20px rgba(255,255,255,0.2), 10px 10px 20px rgba(20,10,0,0.2)",
              backgroundImage:
                'url("https://media.istockphoto.com/photos/portriat-of-senior-african-american-man-in-black-and-white-picture-id168268845?k=6&m=168268845&s=612x612&w=0&h=I71Xgor3RQLtMtpm7pEtpMgJI3AZn9FXs7yh_gLu3fI=")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              marginBottom: "20px",
            }}
          />
          <div
            style={{
              width: "100%",
            }}
          >
            <Row
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Typography style={{ marginRight: "5px" }}>
                    username
                  </Typography>
                </div>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Typography className="typo">
                    {this.state.username}
                  </Typography>
                </div>
              </Col>
            </Row>
            <Row
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Typography style={{ marginRight: "5px" }}>
                    username
                  </Typography>
                </div>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Typography className="typo">
                    {this.state.full_name}
                  </Typography>
                </div>
              </Col>
            </Row>
            <Row
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Typography
                    style={{
                      marginRight: "5px",
                    }}
                  >
                    position
                  </Typography>
                </div>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Typography className="typo">
                    {this.state.position}
                  </Typography>
                </div>
              </Col>
            </Row>
            <Row
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Typography style={{ marginRight: "5px" }}>
                    course teaching
                  </Typography>
                </div>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Typography className="typo">{this.state.courses}</Typography>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
