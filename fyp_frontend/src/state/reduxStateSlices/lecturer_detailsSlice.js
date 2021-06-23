import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { lecturerInitialDetails } from "../../global";

export const getLecturer_details = createAsyncThunk(
  "lecturer/lecturerDetails",
  (endpoint_details, thunkAPI) => {
    return axios
      .get(endpoint_details.url, endpoint_details.header)
      .then((response) => {
        return response.data;
      });
  }
);

const lectureDetailsSlice = createSlice({
  name: "lecturer",
  initialState: {
    user_name: lecturerInitialDetails.user_name,
    lecturer_name: lecturerInitialDetails.lecturer_name,
    courses_teaching: lecturerInitialDetails.courses_teaching,
    course_count: lecturerInitialDetails.course_count,
    position: lecturerInitialDetails.position,
  },
  reducers: {
    setDefaultLecturerDetails: (state, action) => {
      state.user_name = action.payload.user_name;
      state.lecturer_name = action.payload.lecturer_name;
      state.courses_teaching = action.payload.courses_teaching;
      state.course_count = action.payload.course_count;
      state.position = action.payload.position;
    },
  },
  extraReducers: {
    [getLecturer_details.pending]: (state) => {
      state.lecturer_name = "...loading";
    },
    [getLecturer_details.fulfilled]: (state, action) => {
      state.user_name = action.payload.user_name;
      state.lecturer_name = action.payload.lecturer_name;
      state.courses_teaching = action.payload.courses_teaching;
      state.course_count = action.payload.course_count;
      state.position = action.payload.position;
    },
    [getLecturer_details.rejected]: (state) => {
      state.lecturer_name = "...rejected";
      console.log("rejected");
    },
  },
});

export const { setDefaultLecturerDetails } = lectureDetailsSlice.actions;

export default lectureDetailsSlice.reducer;
