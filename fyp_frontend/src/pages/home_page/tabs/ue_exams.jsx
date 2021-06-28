import TitleBar from "../../../components/titleBar";
import DataTable from "../../../components/data_table";
import axios from "axios";
import React, { Component } from "react";

class UniversityExam extends Component {
  state = {
    rows: [],
    columns: [
      { field: "academic_year", headerName: "ACADEMIC YEAR", width: 250 },
      { field: "date_taken", headerName: "DATE", width: 250 },
      { field: "course", headerName: "COURSE", width: 250 },
    ],
  };
  options = {
    headers: {
      Accept: "text/plain,*/*",
      "Content-Type": "application/json",
    },
  };
  url = "http://127.0.0.1:8000/api/add-ue/";

  componentDidMount() {
    axios.get(this.url, this.options).then(
      (response) => {
        let rows = response.data.map((x) => {
          let { exam_type, number_of_questions, venue, ...row } = x;
          return row;
        });
        this.setState({ rows: rows });
        console.log(rows);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <div>
        <TitleBar
          title="Select University Exam to change"
          to="/home/ue/add"
          action="ADD UNIVERSITY EXAM"
        />
        <br />
        <br />
        <br />
        <DataTable rows={this.state.rows} columns={this.state.columns} />
      </div>
    );
  }
}
export default UniversityExam;
