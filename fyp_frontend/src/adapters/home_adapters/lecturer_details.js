import axios from "axios";
import { urls, headers } from "../../global";
import { setLecturerDetails } from "../../state/reduxStateSlices/lecturer_detailsSlice";

export const getLecturerDetails = (dispatch) => {
  axios
    .get(urls.lectureDetailsUrl, headers.headersWithToken)
    .then((response) => {
      console.log(response.data);
      dispatch(setLecturerDetails(response.data));
    })
    .catch((error) => console.log("an error has occured"));
};
