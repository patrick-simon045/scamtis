import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseByOneHundred,
  decreaseByOneHundred,
  increaseByAmount,
  decreaseByAmount,
} from "../../state/reduxStateSlices/accountSlice";
import { useStyles } from "../../styles/material_styles";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";

function Home() {
  const account_balance = useSelector((state) => state.account.accountBalance);
  const dispatch = useDispatch();
  const classes = useStyles();

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
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap style={{ fontWeight: "600" }}>
            SCA<span style={{ fontWeight: "100" }}>MTIS</span>
          </Typography>
          <div className={classes.grow} />
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                console.log("Profile option tapped");
                handleClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                console.log("My account option tapped");
                handleClose();
              }}
            >
              My account
            </MenuItem>
            <MenuItem
              onClick={() => {
                console.log("Logout option tapped");
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
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
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        {/* <Toolbar /> */}
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>{account_balance}</Typography>
        <Button
          style={{ fontWeight: "600" }}
          onClick={() => dispatch(increaseByOneHundred())}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          +100 Dollars
        </Button>
        <Button
          style={{ fontWeight: "600", marginTop: "20px" }}
          onClick={() => dispatch(decreaseByOneHundred())}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          -100 Dollars
        </Button>
        <Button
          style={{ fontWeight: "600", marginTop: "20px" }}
          onClick={() => dispatch(increaseByAmount(500))}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Increase By 500
        </Button>
        <Button
          style={{ fontWeight: "600", marginTop: "20px" }}
          onClick={() => dispatch(decreaseByAmount(500))}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Decrease By 500
        </Button>
        <Link to="/" replace>
          Log out
        </Link>
      </main>
    </div>
  );
}

export default Home;
