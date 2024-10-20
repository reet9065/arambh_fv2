import React, { useContext, useEffect, useState } from "react";
import "./SchoolClass.css";
import SubjectTag from "../../../components/subjectTag/SubjectTag";
import { ClassListContext } from "../Index";
import Notification from "../../../components/notificationPopup/Notification";
import Loading from "../../../components/loading/Loading";
import Popup from "../../../components/popup/popup";
import ClassForm from "./popup_form/ClassForm";

function SchoolClass() {
  const [showSubjectList, setShowSubjectList] = useState(null);
  const [popupNotification, setPopupNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formType,setFormType] = useState(null);

  const closeNotification = () => {
    setPopupNotification(null);
  };

  const classList = useContext(ClassListContext);

  useEffect(() => {
    if (classList.error) {
      setLoading(false);
      setPopupNotification({
        type: "warning",
        message: classList.error.message,
        closeBtn: true,
      });
    }

    if (classList.isLoading) {
      setLoading(true);
    }

    if (classList.data) {
      setLoading(false);
    }
  }, [classList.error, classList.isLoading, classList.data]);

  const subjectListDisplayControler = (index) => {
    console.log("controlar function runs", index);

    if (!showSubjectList) {
      setShowSubjectList(index);
    }

    if (showSubjectList !== null) {
      setShowSubjectList(null);
    }
  };

  const popupClose = ()=>{
    setFormType(null);
  }

  const formSubmit = (formData)=>{
    console.log("Form submit");
  }

  return (
    <div className="SchoolClass">

      <Popup titel={"Add class"} onClose={popupClose}>
        <ClassForm 
        onSubmitSuccessfully={formSubmit}
        />
      </Popup>

      {classList.error && !classList.isLoading && (
        <p style={{ color: "red" }}>{classList.error.message}</p>
      )}

      {classList.data && !classList.isLoading && (
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
        </table>
      )}

      {classList.data && !classList.isLoading && (
        <button className="primary_btn">Add class</button>
      )}

      {popupNotification && (
        <Notification
          notification={popupNotification}
          duration={5000}
          closeNotification={closeNotification}
        />
      )}
      {loading && <Loading />}
    </div>
  );
}

export default SchoolClass;
