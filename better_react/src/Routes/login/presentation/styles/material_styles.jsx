import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    height: "auto",
    width: "auto",
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "blue",
  },
  form: {
    width: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
