import React from "react";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
