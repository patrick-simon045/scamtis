import axios from "axios";
import { urls, headers } from "../../global";
import { getLecturer_details } from "../../state/reduxStateSlices/lecturer_detailsSlice";

export function login_user(userData, dispatch, history) {
  axios
    .post(urls.loginUrl, userData, headers.headersWithoutToken)
    .then((response) => {
      console.log(response.data);
      console.log("Token " + response.data.token);
      var tokenString = "Token " + response.data.token;
      sessionStorage.setItem("token", tokenString);
      console.log(sessionStorage.getItem("token"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + response.data.token,
        },
      };
      dispatch(
        getLecturer_details({
          url: urls.lectureDetailsUrl,
          header: config,
        })
      );
    })
    .catch((error) => console.log("an error has occured"));
}
