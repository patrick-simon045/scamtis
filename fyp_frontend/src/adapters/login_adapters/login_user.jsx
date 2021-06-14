import axios from "axios";
import { urls, headers } from "../../global";
import { setToken } from "../../state/reduxStateSlices/tokenSlice";

export function login_user(userData) {
  axios
    .post(urls.loginUrl, userData, headers.headersWithoutToken)
    .then((response) => {
      console.log(response.data);
      console.log("Token " + response.data.token);
      var tokenString = "Token " + response.data.token;
      sessionStorage.setItem("token", tokenString);
      console.log(sessionStorage.getItem("token"));
    })
    .catch((error) => console.log("an error has occured"));
}
