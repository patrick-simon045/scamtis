import { useHistory } from "react-router-dom";
import FormValidation from "./login_form_validation";
import LoginFormIcon from "../../components/login_page_components/loginFormIcon";
import UsernameField from "../../components/login_page_components/usernameField";
import PasswordField from "../../components/login_page_components/passwordField";
import SignInButton from "../../components/login_page_components/signInButton";
import ForgotPassword from "../../components/login_page_components/forgotPassword";
import { useStyles } from "../../styles/material_styles";

function Login() {
  const history = useHistory();
  const classes = useStyles();
  const login_formik = FormValidation(history);

  return (
    <div className={classes.paper}>
      <LoginFormIcon />
      <form
        className={classes.form}
        onSubmit={login_formik.formik.handleSubmit}
      >
        <UsernameField login_formik={login_formik} />
        <PasswordField login_formik={login_formik} />
        <SignInButton />
        <ForgotPassword />
      </form>
    </div>
  );
}

export default Login;
