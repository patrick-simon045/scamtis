import React from "react";
import TextField from "@material-ui/core/TextField";

export function Ca_WeightField({ contribution }) {
  return (
    <TextField
      InputProps={{ inputProps: { min: 0, max: 40 } }}
      id="outlined-weight-field"
      label="CA Weight"
      type="number"
      defaultValue={contribution}
      variant="outlined"
      style={{ width: "100px" }}
      onClick={() => console.log("ca weight field")}
    />
  );
}
