import "./App.css";
import Home from "./modules/home/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NormalLoginForm from "./modules/authentication/login";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" component={NormalLoginForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
