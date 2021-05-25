import { Button, Typography } from "@material-ui/core";
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
        console.log(data);
      });
  }, []);

  useEffect(() => {
    // console.log(data);
    const rowData = data.map((data, index) => {
      return {
        id: index + 1,
        question1: data.first_question,
        question2: data.second_question,
        question3: data.third_question,
        question4: data.fourth_question,
        sum:
          Number(data.first_question) +
          Number(data.second_question) +
          Number(data.third_question) +
          Number(data.fourth_question),
      };
    });
    console.log(rowData);
    console.log(data);
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
      {/* <Button
        variant="outlined"
        color="secondary"
        onClick={async () => {
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
              console.log(data);
            });
        }}
        style={{
          color: "white",
          //   padding: "50px",
          backgroundColor: "black",
          marginBottom: "30px",
        }}
      >
        Get Scores
      </Button> */}
      <div
        style={{
          width: "100%",
          // height: "100vh",
          borderRadius: "10px",
          boxShadow:
            "10px 10px 20px rgba(255,255,255,0.2), 10px 10px 20px rgba(20,10,0,0.2)",
          backgroundColor: "white",
        }}
      >
        <React.StrictMode>
          <DataGrid
            // style={{ backgroundColor: "red" }}
            rows={rows}
            columns={columns}
            autoHeight="true"
            checkboxSelection
            // onEditCellChange={handleEditCellChange}
            components={{
              Toolbar: CustomToolbar,
            }}
            onEditCellChange={(cell) => {
              console.log("this is jnjdncj");
              console.log(rows);
              console.log(cell);
              console.log(cell.id);
              console.log(rows[cell.id - 1]);
              console.log(cell.props.value);

              const rowIndex = cell.id - 1;

              const value = Number(cell.props.value);

              // rows[cell.id - 1].cell.field = cell.props.value;
              switch (cell.field) {
                case "question1":
                  console.log("question1");
                  rows[rowIndex].question1 = value;
                  break;
                case "question2":
                  console.log("question2");
                  rows[rowIndex].question2 = value;
                  break;
                case "question3":
                  console.log("question3");
                  rows[rowIndex].question3 = value;
                  break;
                case "question4":
                  console.log("question4");
                  rows[rowIndex].question4 = value;
                  break;
                default:
                  console.log("default");
              }

              const newData = rows[rowIndex];
              console.log(newData);

              const result = function (id, newData, rowIndex) {
                fetch("http://127.0.0.1:8000/api/results/" + id + "/", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization:
                      "Token 6e13a770995c2dee1a131fa840ea81d91ae4f83c",
                  },
                  body: JSON.stringify({
                    name: "question " + id,
                    first_question: newData.question1,
                    second_question: newData.question2,
                    third_question: newData.question3,
                    fourth_question: newData.question4,
                  }),
                })
                  .then((response) => response.json())
                  .then((response) => {
                    const dataUpdate = [...rows];
                    // const index = oldData.tableData.id;

                    const sum =
                      response.first_question +
                      response.second_question +
                      response.third_question +
                      response.fourth_question;

                    console.log(sum);

                    newData.sum = sum;

                    dataUpdate[rowIndex] = newData;
                    setRows([...dataUpdate]);
                    console.log(newData);

                    // return response;
                  });
              };

              result(rowIndex + 1, newData, rowIndex);
            }}

            // editRowsModel={editRowsModel}
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
