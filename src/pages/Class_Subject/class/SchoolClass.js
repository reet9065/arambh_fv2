import React, { useContext, useEffect, useState } from "react";
import "./SchoolClass.css";
import SubjectTag from "../../../components/subjectTag/SubjectTag";
import { ClassListContext, SubjectListContext } from "../Index";
import Notification from "../../../components/notificationPopup/Notification";
import Loading from "../../../components/loading/Loading";
import Popup from "../../../components/popup/popup";
import ClassForm from "./popup_form/ClassForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchQuery from "../../../utils/fetchQuery";

const deleteClass = (cID) => {
  return `mutation removeClass{
  deleteClass(cID:"${cID}"){
      id
    }
  }`;
};

function SchoolClass() {
  const queryClient = useQueryClient();

  const [showSubjectList, setShowSubjectList] = useState(null);
  const [popupNotification, setPopupNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const closeNotification = () => {
    setPopupNotification(null);
  };

  const classList = useContext(ClassListContext);
  const subjectList = useContext(SubjectListContext);

  const [formType, setFormType] = useState(null);

  const removeClass = useMutation({
    mutationFn: async (removeSubjectQuery) => {
      return await fetchQuery(
        process.env.REACT_APP_ENDPOINT_URL,
        removeSubjectQuery
      );
    },
    onSuccess: (data) => {
      setLoading(false);
      queryClient.setQueryData(["getclasses"], (oldData) => {
        oldData.getclasses = oldData.getclasses.filter(
          (classItem) => classItem.id !== data.deleteClass.id
        );
        return oldData;
      });
      setPopupNotification({
        type: "success",
        message: "One class Deleted Successfully",
      });
    },
    onError: (err) => {
      setLoading(false);
      setPopupNotification({
        type:"warning",
        message:err.message,
        closeBtn:true
      })
    },
  });

  useEffect(() => {
    if (classList.error && subjectList.error) {
      setLoading(false);
      setPopupNotification({
        type: "warning",
        message: classList.error.message,
        closeBtn: true,
      });
    }

    if (classList.isLoading && subjectList.isLoading) {
      setLoading(true);
    }

    if (classList.data && subjectList.data) {
      setLoading(false);
    }
  }, [
    classList.error,
    classList.isLoading,
    classList.data,
    subjectList.error,
    subjectList.data,
    subjectList.isLoading,
  ]);

  const subjectListDisplayControler = (index) => {
    console.log("controlar function runs", index);

    if (!showSubjectList) {
      setShowSubjectList(index);
    }

    if (showSubjectList !== null) {
      setShowSubjectList(null);
    }
  };

  const popupClose = () => {
    setFormType(null);
  };

  const formSubmit = (formData) => {
    setFormType(null);
  };

  const classModificationFormControler = (key, prevData) => {
    const popupFormData = {
      type: key,
      subjectList: subjectList.data.getSubjects,
      classList: classList.data.getclasses,
    };

    if (key === "Update" && prevData) {
      popupFormData.data = {
        id: prevData.id,
        sclass: prevData.sclass,
        sclassCode: prevData.sclassCode,
        sclassSubjects: prevData.sclassSubjects.map((subject) => subject.id),
      };
    }

    console.log(popupFormData);

    setFormType(popupFormData);
  };

  const deletClassFromList = (id) => {
    console.log(id);
    if (!id) {
      return;
    }

    var userConformation = window.confirm(
      "Are sure want to delete the Class which you clicked ?"
    );

    if (!userConformation) {
      return;
    }

    removeClass.mutate(deleteClass(id));
  };

  return (
    <div className="SchoolClass">
      {formType && (
        <Popup titel={formType.type + " Class"} onClose={popupClose}>
          <ClassForm
            onSubmitSuccessfully={formSubmit}
            formValue={formType}
            setLoading={setLoading}
            setPopupNotification={setPopupNotification}
          />
        </Popup>
      )}

      {classList.error && !classList.isLoading && (
        <p style={{ color: "red" }}>{classList.error.message}</p>
      )}

      {classList.data && !classList.isLoading && subjectList.data && (
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
            {classList.data.getclasses.length > 0 &&
              classList.data.getclasses.map((classItem, classIndex) => {
                return (
                  <React.Fragment key={classIndex}>
                    <tr key={classIndex}>
                      <td title="Show Subject">
                        {classItem.sclass} |
                        <span
                          className="action_link"
                          onClick={() =>
                            subjectListDisplayControler(classIndex)
                          }
                        >
                          {" "}
                          veiw subjects{" "}
                        </span>
                      </td>
                      <td>{classItem.sclassCode}</td>
                      <td>
                        <span
                          className="action_link"
                          onClick={() =>
                            classModificationFormControler("Update", classItem)
                          }
                        >
                          edit
                        </span>
                      </td>
                      <td>
                        <span
                          className="action_link"
                          onClick={() => deletClassFromList(classItem.id)}
                        >
                          delete
                        </span>
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

      {classList.data && !classList.isLoading && subjectList.data && (
        <button
          className="primary_btn"
          onClick={() => classModificationFormControler("Add")}
        >
          Add class
        </button>
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
