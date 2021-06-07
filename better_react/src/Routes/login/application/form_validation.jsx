import { useFormik } from "formik";
import * as yup from "yup";
import { urls } from "../../../globalvariables";

function FormValidation(history) {
  const validationSchema = yup.object({
    username: yup.string().required("Userame is required"),
    password: yup
      .string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      login(values, history);
    },
    validationSchema: validationSchema,
  });

  return {
    validationSchema: validationSchema,
    formik: formik,
  };
}

export default FormValidation;

function login(values, history) {
  const headers = { "Content-Type": "application/json" };
  const body = {
    username: values.username,
    password: values.password,
  };

  fetch(urls.loginUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      // navigating to main page
      history.replace("/home/");
    })
    .catch((error) => {
      console.error(error);
      console.log("error has occured");
    });
}
