import { useHistory } from "react-router-dom";
import FormValidation from "../../adapters/login_adapters/login_form_validation";
import LoginFormIcon from "../../components/login_page_components/loginFormIcon";
import UsernameField from "../../components/login_page_components/usernameField";
import PasswordField from "../../components/login_page_components/passwordField";
import SignInButton from "../../components/login_page_components/signInButton";
import ForgotPassword from "../../components/login_page_components/forgotPassword";
import { useStyles } from "../../styles/material_styles";
import { useDispatch } from "react-redux";
import { getLecturerDetails } from "../../adapters/home_adapters/lecturer_details";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const login_formik = FormValidation(history, dispatch);

  return (
    <div className={classes.paper}>
      <LoginFormIcon />
      <form
        className={classes.form}
        onSubmit={() => {
          login_formik.formik.handleSubmit();
          getLecturerDetails(dispatch);
        }}
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
