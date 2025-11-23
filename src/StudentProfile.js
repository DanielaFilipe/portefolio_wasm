import React from "react";
import Daniela from "./Dani.jpeg";

function StudentProfile({
  name,
  studentNumber,
  education,
  biography,
  career,
  hobbies,
  webDevSkills,
}) {
  return (
    <div className="student-profile">
      <img src={Daniela} alt="Profile" className="profile-image" />

      <h2>{name}</h2>
      <p>
        <strong>Student Number:</strong> {studentNumber}
      </p>

      <h3>Education</h3>
      <ul>
        {education.map((school, index) => (
          <li key={index}>{school}</li>
        ))}
      </ul>

      <h3>Biography</h3>
      <ul>
        {biography.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>

      <h3>Career</h3>
      <ul>
        {career.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>

      <h3>Hobbies</h3>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>

      <h3>Web Development Skills</h3>
      <ul>
        {webDevSkills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentProfile;
