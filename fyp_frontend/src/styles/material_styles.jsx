import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

const material_ui_default_values = {
  appBarHeight: "64px",
  drawerWidth: 240,
};

export const useStyles = makeStyles((theme) => ({
  backdrop: {
    // zIndex: theme.zIndex.drawer + 5,
    zIndex: 90,
    color: "#fff",
  },
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
  criteriatabcontainer: {
    height: "80vh",
    width: "80vw",
    // borderRadius: 20,
    // backgroundColor: "red",
    // boxShadow:
    //   "10px 10px 20px rgba(255, 255, 255, 0.5), 10px 10px 20px rgba(20, 10, 0, 0.2)",
  },
  typography: {
    fontSize: "14px",
    letterSpacing: 1.2,
    fontWeight: 100,
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
    color: "#202020",
    // backgroundColor: "#202020",
    // color: "white",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // boxShadow:
    //   "10px 10px 20px rgba(255, 255, 255, 0.5), 10px 10px 20px rgba(20, 10, 0, 0.2)",
    boxShadow: theme.shadows[10],
    // backgroundColor: "#202020",
  },
  appBarIcons: {
    marginLeft: "200px",
  },
  letterAvatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    // backgroundColor: deepPurple[500],
    backgroundColor: "blue",
    padding: theme.spacing(2),
    textTransform: "uppercase",
    fontSize: "12px",
    // backgroundColor: "black",
  },
  popover: {
    width: "350px",
    // height: "500px",
    borderRadius: "30px",
    padding: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-evenly",
    justifyContent: "center",
    backgroundColor: "white",
  },
  popover_detail_card: {
    backgroundColor: "whitesmoke",
    marginTop: "10px",
    // width: "100vw",
    textAlign: "center",
    padding: "20px 10px",
    borderRadius: "10px",
    boxShadow:
      "10px 10px 20px rgba(255, 255, 255, 0.5), 10px 10px 20px rgba(20, 10, 0, 0.2)",
  },
  image: {
    // display: "block",
    marginBottom: "10px",
    // width: "80px",
    // height: "80px",
    // borderRadius: "50%",
    textTransform: "uppercase",
    backgroundColor: "blue",
    padding: theme.spacing(5),
    boxShadow:
      "10px 10px 20px rgba(255, 255, 255, 0.6), 10px 10px 20px rgba(20, 10, 0, 0.4)",
  },
  logout_button: {
    marginTop: "40px",
    // width: "100%",
  },
  drawer: {
    width: material_ui_default_values.drawerWidth,
    flexShrink: 0,
    zIndex: 2,
  },
  drawerPaper: {
    width: material_ui_default_values.drawerWidth,
    zIndex: 2,
    backgroundColor: "white",
    // backgroundColor: "#202020",
  },
  drawerContainer: {
    overflow: "auto",
    backgroundColor: "white",
    // backgroundColor: "#202020",
    color: "#202020",
    width: "100%",
    marginTop: material_ui_default_values.appBarHeight,
  },
  content: {
    // padding: "24px 24px 24px 24px",
    width: "84.5vw",
    padding: theme.spacing(3),
    top: material_ui_default_values.appBarHeight,
    bottom: 0,
    left: material_ui_default_values.drawerWidth,
    position: "fixed",
    backgroundColor: "whitesmoke",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "flex-start",
    overflow: "auto",
    // height: "50vh",
    // backgroundColor: "#181818",
    color: "#202020",
  },
}));
