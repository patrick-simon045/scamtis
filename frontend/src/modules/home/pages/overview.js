import { Col, Row, Typography } from "antd";
import React, { Component } from "react";

class Overview extends Component {
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
          {[
            {
              position: "Lecturer",
              course_teaching: "CS 441 Wide Area Networks",
              academic_rank: "Proffesor",
            },
          ].map((detail, index) => {
            return (
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
                      <Typography
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}
                      >
                        {detail.position}
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
                      <Typography
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}
                      >
                        {detail.course_teaching}
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
                        academic rank
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
                      <Typography
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}
                      >
                        {detail.academic_rank}
                      </Typography>
                    </div>
                  </Col>
                </Row>
                {/* <Typography>
                  position:{" "}
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {detail.position}
                  </span>
                </Typography>
                <Typography>
                  course teaching:{" "}
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {detail.course_teaching}
                  </span>
                </Typography>
                <Typography>
                  academic rank:{" "}
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {detail.academic_rank}
                  </span>
                </Typography> */}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Overview;
