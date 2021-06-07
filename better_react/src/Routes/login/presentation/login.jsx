import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./styles/material_styles";
import FormValidation from "../application/form_validation";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const history = useHistory();
  const classes = useStyles();
  const login_formik = FormValidation(history);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginBottom: "20px" }}
        >
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={login_formik.formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            // autoFocus
            value={login_formik.formik.values.username}
            onChange={login_formik.formik.handleChange}
            error={
              login_formik.formik.touched.username &&
              Boolean(login_formik.formik.errors.username)
            }
            helperText={
              login_formik.formik.touched.username &&
              login_formik.formik.errors.username
            }
            onBlur={login_formik.formik.handleBlur}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={login_formik.formik.values.password}
            onChange={login_formik.formik.handleChange}
            error={
              login_formik.formik.touched.password &&
              Boolean(login_formik.formik.errors.password)
            }
            helperText={
              login_formik.formik.touched.password &&
              login_formik.formik.errors.password
            }
            onBlur={login_formik.formik.handleBlur}
          />
          <Button
            style={{ fontWeight: "600" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </form>
      </div>
    </Container>
  );
}
