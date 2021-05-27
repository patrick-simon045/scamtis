import React, { useState, useEffect, useRef } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Results = () => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/results/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 6e13a770995c2dee1a131fa840ea81d91ae4f83c",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData(response);
      });
  }, []);

  useEffect(() => {
    const rowData = data.map((data, index) => {
      return {
        id: data.id,
        question1: data.first_question,
        question2: data.second_question,
        question3: data.third_question,
        question4: data.fourth_question,
        // sum: data.sum,
        sum:
          Number(data.first_question) +
          Number(data.second_question) +
          Number(data.third_question) +
          Number(data.fourth_question),
      };
    });
    setRows(rowData);
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: "10px",
          boxShadow:
            "10px 10px 20px rgba(255,255,255,0.2), 10px 10px 20px rgba(20,10,0,0.2)",
          backgroundColor: "white",
        }}
      >
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
              console.log(cell.id);
              const res = searchRow(cell.id, rows);
              const value = Number(cell.props.value);
              switch (cell.field) {
                case "question1":
                  rows[res.index].question1 = value;
                  rows[res.index].sum =
                    rows[res.index].question1 +
                    rows[res.index].question2 +
                    rows[res.index].question3 +
                    rows[res.index].question4;
                  break;
                case "question2":
                  rows[res.index].question2 = value;
                  rows[res.index].sum =
                    rows[res.index].question1 +
                    rows[res.index].question2 +
                    rows[res.index].question3 +
                    rows[res.index].question4;
                  break;
                case "question3":
                  rows[res.index].question3 = value;
                  rows[res.index].sum =
                    rows[res.index].question1 +
                    rows[res.index].question2 +
                    rows[res.index].question3 +
                    rows[res.index].question4;
                  break;
                case "question4":
                  rows[res.index].question4 = value;
                  rows[res.index].sum =
                    rows[res.index].question1 +
                    rows[res.index].question2 +
                    rows[res.index].question3 +
                    rows[res.index].question4;
                  break;
                default:
                  console.log("default");
              }

              const newData = rows[res.index];

              const result = function (id, newData, rowIndex) {
                fetch("http://127.0.0.1:8000/api/results/" + id + "/", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization:
                      "Token 6e13a770995c2dee1a131fa840ea81d91ae4f83c",
                  },
                  body: JSON.stringify({
                    first_question: newData.question1,
                    second_question: newData.question2,
                    third_question: newData.question3,
                    fourth_question: newData.question4,
                  }),
                })
                  .then((response) => response.json())
                  .then((response) => {
                    const dataUpdate = [...rows];
                    dataUpdate[rowIndex] = newData;
                    setRows([...dataUpdate]);
                    console.log(newData);
                  });
              };
              result(cell.id, newData, res.index);
            }}
          />
          ;
        </React.StrictMode>
      </div>
    </div>
  );
};

export default Results;

const columns = [
  { field: "id", headerName: "ID", width: 100, editable: false },
  { field: "question1", headerName: "Question 1", width: 200, editable: true },
  { field: "question2", headerName: "Question 2", width: 200, editable: true },
  { field: "question3", headerName: "Question 3", width: 200, editable: true },
  { field: "question4", headerName: "Question 4", width: 200, editable: true },
  { field: "sum", headerName: "Sum", width: 150, editable: false },
];

function searchRow(idValue, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].id === idValue) {
      console.log(myArray[i]);
      return { array: myArray[i], index: i };
    }
  }
}
