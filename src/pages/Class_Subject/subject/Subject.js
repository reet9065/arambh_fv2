import React, { useContext, useEffect, useState } from "react";
import "./Subject.css";
import Popup from "../../../components/popup/popup";
import SubjectForm from "./popup_form/SubjectForm";
import Notification from "../../../components/notificationPopup/Notification";
import Loading from "../../../components/loading/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchQuery from "../../../utils/fetchQuery";
import { SubjectListContext } from "../Index";

const deleteSubject = (id) => {
  return `
  mutation DeleteSubject{
  deleteSubject(subID:"${id}"){
		id
  }
}
  `;
};

function Subject() {
  console.log("subject page renders");

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [popupNotification, setPopupNotification] = useState(null);

  const closeNotification = () => {
    setPopupNotification(null);
  };

  const subjectList = useContext(SubjectListContext);

  const [formType, setFormType] = useState(null);

  const removeSubject = useMutation({
    mutationFn: async (deleteQuery) => {
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, deleteQuery);
    },
    onSuccess: (data) => {
      setPopupNotification({
        type: "success",
        message: "One subject deleted Successfully",
        closeBtn: true,
      });
      queryClient.setQueryData(["getSubjects"], (oldSubjectList) => {
        oldSubjectList.getSubjects = oldSubjectList.getSubjects.filter(
          (subject) => subject.id !== data.deleteSubject.id
        );
        return oldSubjectList;
      });
    },
    onError: (error) => {
      setPopupNotification({
        type: "warning",
        message: error.message,
        closeBtn: true,
      });
    },
  });

  useEffect(() => {
    if (subjectList.isLoading) {
      setLoading(true);
    }
    if (subjectList.data || subjectList.error) {
      setLoading(false);
    }

    if (subjectList.error) {
      setLoading(false);
      setPopupNotification({
        type: "warning",
        message: subjectList.error.message,
        closeBtn: true,
      });
    }
  }, [subjectList.isLoading, subjectList.error, subjectList.data]);

  const popupClose = () => {
    setFormType(null);
  };

  const formSubmit = (formData) => {
    setFormType(null);
  };

  const deleteSubjectFromList = (id) => {
    if (!id) {
      return;
    }

    var userConformation = window.confirm(
      "Are you sure want to delete this Subject"
    );

    if (!userConformation) {
      return;
    }

    removeSubject.mutate(deleteSubject(id));
  };

  return (
    <div className="subject_page">
      {subjectList.error && (
        <p style={{ color: "red" }}>{subjectList.error.message}</p>
      )}
      {formType && (
        <Popup titel={formType.type + " Subject"} onClose={popupClose}>
          <SubjectForm
            onButtonSubmitSuccessfully={formSubmit}
            formValue={formType}
            setPopupNotification={setPopupNotification}
            setLoading={setLoading}
          />
        </Popup>
      )}

      {subjectList.data && !subjectList.error && (
        <table>
          <thead>
            <tr>
              <th>S/no.</th>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {subjectList.data.getSubjects.length &&
              subjectList.data.getSubjects.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.subName}</td>
                    <td>{item.subCode}</td>
                    <td>
                      <span
                        className="action_link"
                        onClick={() =>
                          setFormType({
                            type: "Update",
                            data: {
                              id: item.id,
                              subName: item.subName,
                              subCode: item.subCode,
                            },
                          })
                        }
                      >
                        edit
                      </span>
                    </td>
                    <td>
                      <span
                        className="action_link"
                        onClick={() => deleteSubjectFromList(item.id)}
                      >
                        delete
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      {subjectList.data && !subjectList.error &&
          <button
            className="primary_btn"
            onClick={() =>
              setFormType({
                type: "Add",
              })
            }
          >
            {" "}
            Add Subject
          </button>
        }

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

export default Subject;
