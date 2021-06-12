import axios from "axios";
import { urls } from "../../global";

export function login_user(userData) {
  axios
    .post(urls.loginUrl, userData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log("an error has occured"));
}
