import axios from "axios";
import { urls, headers } from "../../global";
import { setToken } from "../../state/reduxStateSlices/tokenSlice";
import { setLecturerDetails } from "../../state/reduxStateSlices/lecturer_detailsSlice";

export function login_user(userData, dispatch) {
  axios
    .post(urls.loginUrl, userData, headers.headersWithoutToken)
    .then((response) => {
      console.log(response.data);
      console.log("Token " + response.data.token);
      var tokenString = "Token " + response.data.token;
      sessionStorage.setItem("token", tokenString);
      console.log(sessionStorage.getItem("token"));
      dispatch(setLecturerDetails());

      // axios
      //   .get(urls.lectureDetailsUrl, headers.headersWithToken)
      //   .then((response) => {
      //     console.log(response.data);
      //     dispatch(setLecturerDetails(response.data));
      //   })
      //   .catch((error) => console.log("an error has occured"));
    })
    .catch((error) => console.log("an error has occured"));
}
