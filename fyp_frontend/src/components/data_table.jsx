import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

export default function DataTable(props) {
  return (
    <div style={{ height: 400, width: 900 }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}
