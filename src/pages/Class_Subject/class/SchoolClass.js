import React from "react";
import "./SchoolClass.css";
import SubjectTag from "../../../components/subjectTag/SubjectTag";

function SchoolClass() {
  return (
    <div className="SchoolClass">
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Class Code</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr title="Show Subject">
            <td>NC</td>
            <td>NCA</td>
            <td>
              <span className="action_link">edit</span>
            </td>
            <td>
              <span className="action_link">delete</span>
            </td>
          </tr>
          <tr>
            <td
              aria-rowspan={4}
              className="subject_list_container"
              // style={{ display: true ? "flex" : "none" }}
            >
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
              <SubjectTag subName={"English"} subCode={"ENG"} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SchoolClass;
