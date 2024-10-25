import React, { useEffect } from "react";
import "./ClassForm.css";
import SubjectTag from "../../../../components/subjectTag/SubjectTag";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchQuery from "../../../../utils/fetchQuery";

const createClass = (newClass) => {
  return `mutation addNewClass{
  createClass(input:{
    sclass:"${newClass.sclass}",
    sclassSubjects:[${newClass.sclassSubjects
      .map((item) => `"${item}"`)
      .join(",")}]
  }){
    id,
    sclass,
    sclassCode,
    sclassSubjects{
      id
      subName
      subCode
    }
  }
}`;
};

const updateClass = (cID,updatedClass) => {
  return `mutation editClass{
  updateClass(cID:"${cID}",input:{
    sclass:"${updatedClass.sclass}",
    sclassSubjects:[${updatedClass.sclassSubjects
      .map((item) => `"${item}"`)
      .join(",")}]
  }){
    id,
    sclass,
    sclassCode,
    sclassSubjects{
      id
      subName
      subCode
    }
  }
  }`;
};

function ClassForm({
  formValue,
  onSubmitSuccessfully,
  setLoading,
  setPopupNotification,
}) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: formValue.data ? formValue.data : {},
  });

  const sclass = watch("sclass");
  const subjectList = watch("sclassSubjects") || [];

  const hasError = (error)=>{    
    setLoading(false);
    setPopupNotification({
      type:'warning',
      message:error.message,
      closeBtn:true,
    })
  };

  const addNewClass = useMutation({
    mutationFn: async (newClass) => {
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, newClass);
    },
    onSuccess: (data) => {
      setLoading(false);
      queryClient.setQueryData(["getclasses"], (oldData) => {
        console.log(oldData);
        oldData.getclasses = [...oldData.getclasses, data.createClass];
        return oldData;
      });
      setPopupNotification({
        type: "success",
        message: "New Class added successfully",
      });

      onSubmitSuccessfully();
    },
    onError: (error) => {
      hasError(error);
    },
  });

  const editeClass = useMutation({
    mutationFn: async(updatedClass) => {
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, updatedClass)
    },
    onSuccess:(data)=>{
      console.log("Update succesfully done !!!")
      setLoading(false);
      queryClient.setQueryData(["getclasses"], (oldData)=> {
        console.log(oldData);
        oldData.getclasses = oldData.getclasses.map((classItem)=> {
          if(data.updateClass.id === classItem.id){
            classItem = data.updateClass;
          }
          return classItem;
        })

        return oldData;
      });
      console.log("Updated also function reached here")
      setPopupNotification({
        type:"success",
        message:"Class updated successfully",
        closeBtn: true,
      })
      onSubmitSuccessfully();
    },
    onError:(error)=>{
      console.log("Getting some error");
      hasError(error);
    }
  })

  useEffect(() => {
    if (sclass) {
      var match = formValue.classList.filter(
        (sclassItem) => sclassItem.sclass === sclass
      );
      console.log(match);
      setValue("sclassCode", sclass + String.fromCharCode(65 + match.length));
    } else {
      setValue("sclassCode");
    }
  }, [sclass, formValue.classList, setValue]);

  const formSubmit = (formData) => {
    setLoading(true);
    console.log(formData);
    if (formValue.type === "Add") {
      addNewClass.mutate(createClass(formData));
    }

    if(formValue.type === "Update"){
      editeClass.mutate(updateClass(formValue.data.id,formData))
    }
  };

  return (
    <form action="#" className="sclassForm" onSubmit={handleSubmit(formSubmit)}>
      {/* Class input  */}
      <div className="classInput_classCode">
        <div className="input_text">
          <div className="label_required">
            <label htmlFor="input_type_text"> Class </label>
            <p>*</p>
          </div>
          <input
            type="text"
            id="input_type_text"
            style={{ textTransform: "uppercase" }}
            className={errors.sclass ? "input_error" : ""}
            {...register("sclass", {
              required: "Class input is required",
            })}
          />
          {errors.sclass && (
            <p className="helper_text info">{errors.sclass.message}</p>
          )}
        </div>

        <div className="input_text">
          <div className="label_required">
            <label htmlFor="input_type_text"> Class Code </label>
            <p>*</p>
          </div>
          <input
            type="text"
            id="input_type_text"
            style={{ textTransform: "uppercase" }}
            className={errors.sclassCode ? "input_error" : ""}
            {...register("sclassCode")}
            disabled
          />
          {errors.sclassCode && (
            <p className="helper_text info">{errors.sclassCode.message}</p>
          )}
        </div>
      </div>
      <div className="class_form_subject_list_box">
        <p>
          Includ Subjects <span style={{ color: "red" }}>*</span>
        </p>
        <hr />
        <div className="subject_list_checkbox_container">
          {formValue.subjectList.map((subject, i) => {
            return (
              <div className="subject_checkbox" key={i}>
                <SubjectTag
                  subName={subject.subName}
                  subCode={subject.subCode}
                />
                <input
                  type="checkbox"
                  style={{cursor:"pointer"}}
                  {...register("sclassSubjects")}
                  value={subject.id}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="btn">
        {formValue.type === "Add" && (
          <button type="reset" className="primary_btn" onClick={() => reset()}>
            Reset
          </button>
        )}

        <button
          type="submit"
          className="primary_btn"
          disabled={subjectList.length === 0}
        >
          {formValue.type} class
        </button>
      </div>
    </form>
  );
}

export default ClassForm;
