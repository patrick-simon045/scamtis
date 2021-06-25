import React from "react";
import TextField from "@material-ui/core/TextField";

export function QuestionsField({ number_of_questions }) {
  return (
    <TextField
      InputProps={{ inputProps: { min: 0, max: 10 } }}
      id="outlined-question-field"
      label="Questions"
      type="number"
      defaultValue={number_of_questions}
      variant="outlined"
      style={{ width: "100px" }}
      onClick={() => console.log("number field")}
    />
  );
}
