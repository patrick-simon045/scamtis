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
import { TabPanelComponent } from "../../../../components/home_page_components/criteria_tab_components/tabPanel";
import { AddCriteriaButton } from "../../../../components/home_page_components/criteria_tab_components/addCriteriaButton";

function CriteriaTab() {
  const courses = useSelector((state) => state.lecturer.courses_teaching);

  const course_list = function () {
    const list = courses.map((course_item) => course_item.course_code);
    return list;
  };

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

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
          <TabPanelComponent value={value} index={0} dir={theme.direction}>
            <div className={classes.tabpanelstyle}>
              {[{ criteria: "criteria 1" }, { criteria: "criteria 2" }].map(
                (item, index) => {
                  return (
                    <div className={classes.tabContents} key={index}>
                      <CriteriaSelect />
                      <QuestionsField />
                      <CaWeightField />
                      <DatePickerWidget />
                      <UpdateButton />
                      <RemoveButton />
                    </div>
                  );
                }
              )}
            </div>
          </TabPanelComponent>
          <TabPanelComponent value={value} index={1} dir={theme.direction}>
            <div className={classes.tabpanelstyle}>
              <div className={classes.tabpanel_emptyList}>
                <p>Nothing to show here</p>
              </div>
            </div>
          </TabPanelComponent>
        </Paper>
      </div>
    </>
  );
}

export default CriteriaTab;
