import { makeStyles } from "@material-ui/core/styles";

const material_ui_default_values = {
  appBarHeight: "64px",
  drawerWidth: 240,
};

export const useStyles = makeStyles((theme) => ({
  // login page styles
  paper: {
    height: "auto",
    width: "25vw",
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
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  // home page styles

  root: {
    display: "flex",
    position: "relative",
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: "white",
    color: "black",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow:
      "10px 10px 20px rgba(255, 255, 255, 0.4), 10px 10px 20px rgba(20, 10, 0, 0.2)",
  },
  appBarIcons: {
    marginLeft: "200px",
  },
  drawer: {
    width: material_ui_default_values.drawerWidth,
    flexShrink: 0,
    zIndex: 2,
  },
  drawerPaper: {
    width: material_ui_default_values.drawerWidth,
    zIndex: 2,
    backgroundColor: "whitesmoke",
    height: "80vh",
    position: "fixed",
    left: 0,
    top: "50%",
    transform: "translate(0, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "24px",
    borderRadius: "10px",
    boxShadow:
      "10px 10px 20px rgba(255, 255, 255, 0.4), 10px 10px 20px rgba(20, 10, 0, 0.2)",
  },
  drawerContainer: {
    overflow: "auto",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },
  content: {
    padding: "24px 24px 24px 48px",
    top: material_ui_default_values.appBarHeight,
    bottom: 0,
    left: material_ui_default_values.drawerWidth,
    position: "fixed",
    backgroundColor: "whitesmoke",
  },
}));
