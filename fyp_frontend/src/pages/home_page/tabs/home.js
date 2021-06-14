import { useSelector } from "react-redux";

function HomeTab() {
  const lectureDetails = useSelector((state) => {
    const stateVariable = state.lecturer;
    return {
      user_name: stateVariable.user_name,
      lecturer_name: stateVariable.lecturer_name,
      courses_teaching: stateVariable.courses_teaching,
      course_count: stateVariable.course_count,
      position: stateVariable.position,
    };
  });
  return (
    <div>
      {/* <h1>username: {lectureDetails.user_name}</h1>
      <h1>lecturer_name: {lectureDetails.lecturer_name}</h1>
      {lectureDetails.courses_teaching.map((course, index) => {
        return <h1 key={index}>{course.course_code}</h1>;
      })}
      <h1>course_count: {lectureDetails.course_count}</h1>
      <h1>position: {lectureDetails.position}</h1> */}
      <h5>Home</h5>
      {/* welcome message */}
      <p style={{ fontWeight: "600" }}>
        Welcome{" "}
        <span style={{ fontWeight: "800" }}>
          {lectureDetails.lecturer_name}
        </span>{" "}
        to the all new Student Continuous Assessment and Marks Tallying
        Information System <span style={{ fontWeight: "800" }}>(SCAMTIS)</span>.
        Please follow the following guide on how to use this website.
      </p>
      {/* criteria */}
      <span style={{ fontWeight: "800" }}>Criteria</span>
      <p style={{ fontWeight: "600" }}>
        This is where you can decide how to evaluate your students performances
        and results. Forinstance in a particular course, a lecturer may decide
        to assess the performances of his or her students through 3 categories
        <span style={{ fontWeight: "800" }}> (test 1, test 2 and quizz)</span>.
        These categories are selected by the lecturer and the appropriate
        weights for each criteria is determined and can be updtaed at any time.
      </p>
      {/* score tallying */}
      <span style={{ fontWeight: "800" }}>Score Tallying</span>
      <p style={{ fontWeight: "600" }}>
        This is where the student scores are inserted and updated as required.
        One may even be able to download the scores table as an excel if needed
        in some way.
      </p>
      {/* reports */}
      <span style={{ fontWeight: "800" }}>Reports</span>
      <p style={{ fontWeight: "600" }}>
        This is where all the crucial reports namely,{" "}
        <span style={{ fontWeight: "800" }}>Black Sheet and Red Sheet</span> are
        downloaded.
      </p>
    </div>
  );
}

export default HomeTab;
