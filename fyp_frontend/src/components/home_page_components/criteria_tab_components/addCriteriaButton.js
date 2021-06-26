import React, { useEffect } from "react";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { QuestionsField } from "./questionsfield";
import { CriteriaSelect } from "./criteria_select";
import { Ca_WeightField } from "./ca_weightfield";
import { DatePickerWidget } from "./datepicker";
import axios from "axios";
import { headers, urls } from "../../../global";

export function AddCriteriaButton() {
  const [open, setOpen] = React.useState(false);

  // const history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="add criteria" onClick={handleClickOpen}>
        <div
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: "50%",
            height: 80,
            width: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:
              "10px -10px 20px rgba(255, 255, 255, 0.3), -10px 10px 20px rgba(20, 10, 0, 0.1)",
          }}
        >
          <AddRoundedIcon />
        </div>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Add assessment criteria"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <h1>Hey there</h1> */}
            <PopUpItems />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log("create button clicked");
              handleClose();
            }}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function PopUpItems() {
  const [ca_items, setCa_items] = React.useState([]);

  useEffect(() => {
    axios
      .get(urls.assessmentCriteria, headers.headersWithToken)
      .then((response) => {
        console.log(response.data);
        const data = response.data.map((criteria) => {
          return criteria.ca_item_name;
        });
        setCa_items(data);
      })
      .catch((error) => console.log("an error has occurred"));
  }, []);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "whitesmoke",
        padding: "20px 10px",
        borderRadius: "10px",
      }}
    >
      <CriteriaSelect ca_items={ca_items} />
      <QuestionsField width={"200px"} />
      <Ca_WeightField width={"200px"} />
      <DatePickerWidget />
    </div>
  );
}
