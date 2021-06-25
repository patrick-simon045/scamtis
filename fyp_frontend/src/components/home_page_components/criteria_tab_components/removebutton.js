import React from "react";
import { Button } from "@material-ui/core";

export function RemoveButton({ onClick }) {
  return (
    <Button
      variant="outlined"
      color="secondary"
      style={{ textTransform: "none" }}
      onClick={onClick}
    >
      Remove
    </Button>
  );
}
