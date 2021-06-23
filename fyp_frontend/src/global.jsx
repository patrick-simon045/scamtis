const baseUrl = "http://127.0.0.1:8000/";

export const urls = {
  baseUrl: baseUrl,
  loginUrl: baseUrl + "token_auth/",
  lectureDetailsUrl: baseUrl + "api/lecturers/",
  assessmentCriteria: baseUrl + "api/ca_items/",
};

export const headers = {
  headersWithoutToken: {
    headers: {
      "Content-Type": "application/json",
    },
  },
  headersWithToken: {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
  },
};

export const lecturerInitialDetails = {
  user_name: "nonem",
  lecturer_name: "nonem",
  courses_teaching: [],
  course_count: 0,
  position: "nonem",
};
