import React from "react";
import { Button } from "@material-ui/core";

export function RemoveButton() {
  return (
    <Button
      variant="outlined"
      color="secondary"
      style={{ textTransform: "none" }}
    >
      Remove
    </Button>
  );
}
