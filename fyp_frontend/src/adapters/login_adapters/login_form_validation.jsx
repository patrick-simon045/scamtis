import { useFormik } from "formik";
import * as yup from "yup";
import { login_user } from "./login_user";
import { getLecturerDetails } from "../home_adapters/lecturer_details";

function FormValidation(history, dispatch) {
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
      login_user(values, dispatch);
      console.log("here");
      // getLecturerDetails(dispatch);

      // console.log(response);
      history.replace("/home/");
    },
    validationSchema: validationSchema,
  });

  return {
    validationSchema: validationSchema,
    formik: formik,
  };
}

export default FormValidation;
