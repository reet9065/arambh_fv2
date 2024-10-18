import React, { useContext, useState } from "react";
import "./SchoolClass.css";
import SubjectTag from "../../../components/subjectTag/SubjectTag";
import { ClassListContext } from "../Index";

function SchoolClass() {
  const [showSubjectList, setShowSubjectList] = useState(null);

  const classList = useContext(ClassListContext);

  const subjectListDisplayControler = (index) => {
    console.log("controlar function runs", index);

    if (!showSubjectList) {
      setShowSubjectList(index);
    }

    if (showSubjectList !== null) {
      setShowSubjectList(null);
    }
  };

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

        {classList.data && (
          <tbody>
            {classList.data.getclasses.length &&
              classList.data.getclasses.map((classItem, classIndex) => {
                return (
                  <React.Fragment key={classIndex}>
                    <tr key={classIndex}>
                      <td
                        title="Show Subject"
                        onClick={() => subjectListDisplayControler(classIndex)}
                      >
                        {classItem.sclass}
                      </td>
                      <td>{classItem.sclassCode}</td>
                      <td>
                        <span className="action_link">edit</span>
                      </td>
                      <td>
                        <span className="action_link">delete</span>
                      </td>
                    </tr>
                    {showSubjectList !== null &&
                      showSubjectList === classIndex && (
                        <tr>
                          <td colSpan={4} className="subject_list_container">
                            <div className="subject_list">
                              {classItem.sclassSubjects.map(
                                (subjectsItem, i) => {
                                  return (
                                    <SubjectTag
                                      key={i}
                                      subName={subjectsItem.subName}
                                      subCode={subjectsItem.subCode}
                                    />
                                  );
                                }
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                );
              })}
          </tbody>
        )}
      </table>

      <button className="primary_btn">
        Add class
      </button>
    </div>
  );
}

export default SchoolClass;
