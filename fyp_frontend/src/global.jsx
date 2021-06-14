const baseUrl = "http://127.0.0.1:8000/";

export const urls = {
  baseUrl: baseUrl,
  loginUrl: baseUrl + "token_auth/",
  lectureDetailsUrl: baseUrl + "api/lecturers/",
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
