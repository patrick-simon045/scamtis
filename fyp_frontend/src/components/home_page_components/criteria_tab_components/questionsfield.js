import React from "react";
import TextField from "@material-ui/core/TextField";

export function QuestionsField() {
  return (
    <TextField
      InputProps={{ inputProps: { min: 0, max: 10 } }}
      id="outlined-question-field"
      label="Questions"
      type="number"
      defaultValue={3}
      variant="outlined"
      style={{ width: "100px" }}
      onClick={() => console.log("number field")}
    />
  );
}
