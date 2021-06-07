import "antd/dist/antd.css";
import SignIn from "./Routes/login/presentation/login";
import {
  BackgroundDiv,
  CenteredContentDiv,
} from "./Routes/login/presentation/components/loginComponents";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/home/presentation/home";

function SignInFormCentered() {
  return (
    <BackgroundDiv>
      <CenteredContentDiv>
        <SignIn />
      </CenteredContentDiv>
    </BackgroundDiv>
  );
}

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" component={SignInFormCentered} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
