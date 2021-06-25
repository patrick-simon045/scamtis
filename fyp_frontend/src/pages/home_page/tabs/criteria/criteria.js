import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useStyles } from "../../../../styles/material_styles";
import { DatePickerWidget } from "../../../../components/home_page_components/criteria_tab_components/datepicker";
import { QuestionsField } from "../../../../components/home_page_components/criteria_tab_components/questionsfield";
import { Ca_WeightField as CaWeightField } from "../../../../components/home_page_components/criteria_tab_components/ca_weightfield";
import { CriteriaSelect } from "../../../../components/home_page_components/criteria_tab_components/criteria_select";
import { UpdateButton } from "../../../../components/home_page_components/criteria_tab_components/updatebutton";
import { RemoveButton } from "../../../../components/home_page_components/criteria_tab_components/removebutton";
import { AddCriteriaButton } from "../../../../components/home_page_components/criteria_tab_components/addCriteriaButton";

function CriteriaTab() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const courses = useSelector((state) => state.lecturer.courses_teaching);
  const assessments = useSelector((state) => state.assessments.assessments);

  const course_list = function () {
    const list = courses.map((course_item) => course_item.course_code);
    return list;
  };
  const coursesList = course_list();

  const assessmentList = function () {
    const list = course_list();
    let course_assessments = [];
    list.forEach((list) => {
      let list_holder = assessments.map((item) => {
        if (item.course === list) {
          return item;
        }
      });
      course_assessments.push(list_holder.filter(Boolean));
    });
    return course_assessments;
  };
  const course_assessmentList = assessmentList();

  return (
    <>
      <AddCriteriaButton />
      <div className={classes.criteriaTab_container}>
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
            style={{ backgroundColor: "whitesmoke" }}
          >
            {course_list().map((course, index) => {
              return <Tab key={index} label={course} />;
            })}
          </Tabs>

          <div
            style={{
              height: "65vh",
              backgroundColor: "whitesmoke",
              padding: "1%",
            }}
          >
            {coursesList.length === 0 ? (
              <h1>nothing to show</h1>
            ) : (
              <AssessmentsComponent
                courses={coursesList}
                course_assessmentList={course_assessmentList}
                value={value}
              />
            )}
          </div>
        </Paper>
      </div>
    </>
  );
}

export default CriteriaTab;

function AssessmentsComponent({ courses, course_assessmentList, value }) {
  return (
    <>
      {courses.map((course, index) => {
        console.log(index);
        return course_assessmentList[index].map(
          (assessment, assessment_index) => {
            console.log(index);
            console.log(course_assessmentList[index]);
            return (
              <div hidden={value !== index}>
                <div
                  style={{
                    margin: "20px 0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: "20px 10px",
                    borderRadius: "10px",
                    boxShadow:
                      "10px 10px 20px rgba(255, 255, 255, 0.5), 10px 10px 20px rgba(20, 10, 0, 0.2)",
                  }}
                >
                  <CriteriaSelect criteria={assessment.criteria} />
                  <QuestionsField
                    number_of_questions={assessment.number_of_questions}
                  />
                  <CaWeightField contribution={assessment.contribution} />
                  <DatePickerWidget date_taken={assessment.date_taken} />
                  <UpdateButton
                    onClick={() => {
                      console.log(
                        "update button " +
                          (assessment_index + 1) +
                          " is clicked"
                      );
                    }}
                  />
                  <RemoveButton
                    onClick={() => {
                      console.log(
                        "remove button " +
                          (assessment_index + 1) +
                          " is clicked"
                      );
                    }}
                  />
                </div>
              </div>
            );
          }
        );
      })}
    </>
  );
}
