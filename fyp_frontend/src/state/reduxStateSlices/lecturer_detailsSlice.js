import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers, urls } from "../../global";

export const lectureDetailsSlice = createSlice({
  name: "lecturer",
  initialState: {
    user_name: "",
    lecturer_name: "",
    courses_teaching: [],
    course_count: 0,
    position: "",
  },
  reducers: {
    setLecturerDetails: (state, action) => {
      axios
        .get(urls.lectureDetailsUrl, headers.headersWithToken)
        .then((response) => {
          console.log(response.data);
        });
      state.user_name = action.payload.user_name;
      state.lecturer_name = action.payload.lecturer_name;
      state.courses_teaching = action.payload.courses_teaching;
      state.course_count = action.payload.course_count;
      state.position = action.payload.position;
    },
  },
});

export const { setLecturerDetails } = lectureDetailsSlice.actions;

export default lectureDetailsSlice.reducer;
