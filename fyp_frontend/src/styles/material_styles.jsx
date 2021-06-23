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
    // height: "80vh",
    width: "80vw",
    // borderRadius: 20,
    // backgroundColor: "red",
    // boxShadow:
    //   "10px 10px 20px rgba(255, 255, 255, 0.5), 10px 10px 20px rgba(20, 10, 0, 0.2)",
  },
  tabpanelcontainer: {
    padding: "20px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tabpaneliconbutton: {
    padding: "10px",
    borderRadius: "50%",
    height: 50,
    width: 50,
    backgroundColor: "blue",
    color: "white",
    fontSize: 30,
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tabpanelcontentscontainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "auto",
    borderRadius: "10px",
    // backgroundColor: "#f1f2f5",
  },
  criteriaTab_container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
  tabpanelstyle: {
    width: "60vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "#f1f2f5",
    // justifyContent: "center",
  },
  tabContents: {
    backgroundColor: "white",
    padding: 10,
    fontWeight: "600",
    borderRadius: "10px",
    width: "75vw",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    border: "1px solid lightblue",
    marginBottom: "20px",
    boxShadow:
      "10px -10px 20px rgba(255, 255, 255, 0.3), -10px 10px 20px rgba(20, 10, 0, 0.1)",
  },
  tabpanel_emptyList: {
    fontWeight: "600",
    // backgroundColor: "#f1f2f5",
    backgroundColor: "white",
    width: "100%",
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: "5vh",
    // height: "200px",
    fit: "contain",
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
