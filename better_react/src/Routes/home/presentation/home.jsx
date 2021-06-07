import { Link } from "react-router-dom";
import React from "react";
// import { message } from "antd";
import { NavBar, Content, NavBarItem } from "./components/HomeComponents";

const Home = () => {
  return (
    <div>
      <NavBar>
        <Logo />
        <NavigationMenu />
        <SignOut />
      </NavBar>
      <Content>
        <div className="contents"></div>
      </Content>
    </div>
  );
};

const Logo = () => {
  return <div style={{ color: "white" }}>Logooo</div>;
};

const SignOut = () => {
  return (
    // this should be a button so as to clear sessionStorage on leaving
    <Link style={{ color: "white" }} to="/" replace>
      Sign Out
    </Link>
  );
};

const NavigationMenu = () => {
  return (
    <div>
      {["Profile", "Criteria", "Scores", "Reports"].map((menuitem, index) => {
        return <NavBarItem key={index}>{menuitem}</NavBarItem>;
      })}
    </div>
  );
};

export default Home;
