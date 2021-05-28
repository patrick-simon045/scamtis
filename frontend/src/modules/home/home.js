import React, { Component } from "react";

import { Layout, Menu } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import Results from "./pages/results";
import Criteria from "./pages/criteria";
import Reports from "./pages/reports";
import Overview from "./pages/overview";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// function Criteria() {
//   return <div>Criteria</div>;
// }
// function Overview() {
//   return <div>Overview</div>;
// }
// function Reports() {
//   return <div>Reports</div>;
// }

class Home extends Component {
  state = {
    collapsed: true,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            backgroundColor: "white",
          }}
        >
          <div className="logo" />
          <Menu
            // theme="dark"
            theme="light"
            defaultSelectedKeys={"1"}
            mode="inline"
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "white",
            }}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/home/">Overview</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<PieChartOutlined />}>
              <Link to="/home/criteria">Criteria</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              <Link to="/home/results">Results</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<DesktopOutlined />}>
              <Link to="/home/reports">Reports</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{
            transition: "all 0.2s",
            marginLeft: collapsed == true ? 80 : 200,
            // backgroundColor: "white",
          }}
        >
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: "0 16px", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Route exact path="/home/reports" component={Reports} />
              <Route exact path="/home/results" component={Results} />
              <Route exact path="/home/criteria" component={Criteria} />
              <Route exact path="/home/" component={Overview} />
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    );
  }
}

export default Home;
