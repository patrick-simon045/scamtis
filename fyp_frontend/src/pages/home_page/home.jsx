import React, { useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "../../styles/material_styles";
import { drawerList } from "../../components/home_page_components/drawer/drawerList";
import AppBarTextLogo from "../../components/home_page_components/appBar/appBarTextLogo";
import MessageIcon from "../../components/home_page_components/appBar/messages";
import NotificationIcon from "../../components/home_page_components/appBar/notifications";
import UserAccountIcon from "../../components/home_page_components/appBar/userAccount";
import { Route, useHistory } from "react-router-dom";
import CriteriaTab from "./tabs/criteria";
import ScoresTab from "./tabs/scores";
import ReportsTab from "./tabs/reports";
import HomeTab from "./tabs/home";
import {
  loginUser,
  logoutUser,
} from "../../state/reduxStateSlices/login_pageSlice";
import { getLecturerDetails } from "../../adapters/home_adapters/lecturer_details";

function Home() {
  const isLogged = useSelector((state) => state.login.isLoggedIn);

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    console.log("we begin here");
    getLecturerDetails(dispatch);
  }, []);

  // useEffect(() => {
  //   console.log(lectureDetails);
  // }, [lectureDetails]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <AppBarTextLogo />
          <div className={classes.grow} />
          <MessageIcon />
          <NotificationIcon />
          <UserAccountIcon />
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "start",
          flexDirection: "row",
        }}
      >
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {/* <Toolbar /> */}
          <div className={classes.drawerContainer}>
            <List>
              {drawerList.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    console.log(item.name + " is clicked");
                    console.log(sessionStorage.getItem("token"));
                    console.log(isLogged);
                    dispatch(loginUser());
                    history.push(item.route);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Route exact path="/home/criteriatab" component={CriteriaTab} />
          <Route exact path="/home/scorestab" component={ScoresTab} />
          <Route exact path="/home/reportstab" component={ReportsTab} />
          <Route exact path="/home" component={HomeTab} />
        </main>
      </div>
    </div>
  );
}

export default Home;
