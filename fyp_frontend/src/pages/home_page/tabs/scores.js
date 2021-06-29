import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { useSelector } from "react-redux";
import { urls } from "../../../global";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function ScoresTab() {
  const token = useSelector((state) => state.token.tokenString);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log(sessionStorage.getItem("criteria_list_from_database"));
    fetch(urls.getAssessmentResults, {
      method: "GET",
      headers: config.headers,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData(response);
      });
  }, []);

  useEffect(() => {
    const rowData = data.map((data) => {
      let row_details = {
        id: data.id,
        student: data.student,
        year_of_study: data.year_of_study,
        semester: data.semester,
        score: data.score,
      };
      return row_details;
    });
    setRows(rowData);
  }, [data]);

  return (
    <div style={componentStyles.mainContainer}>
      <div style={componentStyles.dataGridContainer}>
        <React.StrictMode>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight="true"
            checkboxSelection
            components={{
              Toolbar: CustomToolbar,
            }}
            onEditCellChange={(cell) => {
              const record_id = cell.id;
              // const score_record = searchArray(record_id, rows);
              const new_score = Number(cell.props.value);

              let dataRecord = searchArray(record_id, data).record;
              dataRecord.score = new_score;
              console.log(dataRecord);

              const url = urls.updateAssessmentResult + dataRecord.id;
              const headers = config.headers;
              const body = {
                id: dataRecord.id,
                assessment: dataRecord.assessment.id,
                semester: dataRecord.semester,
                course_type: dataRecord.course_type,
                year_of_study: dataRecord.year_of_study,
                academic_year: dataRecord.academic_year,
                student: dataRecord.student,
                score: dataRecord.score,
              };
              console.log({ url: url, headers: headers, body: body });
              updateAssessmentResultRecord(url, headers, body);
            }}
          />
        </React.StrictMode>
      </div>
    </div>
  );
}

export default ScoresTab;

const columns = [
  { field: "student", headerName: "STUDENT", width: 200, editable: false },
  {
    field: "year_of_study",
    headerName: "YEAR OF STUDY",
    width: 200,
    editable: false,
  },
  { field: "semester", headerName: "SEMESTER", width: 200, editable: false },
  { field: "score", headerName: "SCORE", width: 200, editable: true },
];

function searchArray(idValue, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].id === idValue) {
      // console.log(myArray[i]);
      return { record: myArray[i], index: i };
    }
  }
}

function updateAssessmentResultRecord(url, headers, body) {
  fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json_response) => console.log(json_response))
    .catch((error) => {
      console.log("an error has occurred");
      console.log("the error is: " + error);
    });
}

const componentStyles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  dataGridContainer: {
    width: "100%",
    borderRadius: "10px",
    boxShadow:
      "10px 10px 20px rgba(255,255,255,0.2), 10px 10px 20px rgba(20,10,0,0.2)",
    backgroundColor: "white",
  },
};
