import React from "react";
import "./ClassForm.css";
import SubjectTag from "../../../../components/subjectTag/SubjectTag";
import { useForm } from "react-hook-form";

function ClassForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form action="#" className="sclassForm">
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
            <label htmlFor="input_type_text"> Class </label>
            <p>*</p>
          </div>
          <input
            type="text"
            id="input_type_text"
            className={errors.sclassCode ? "input_error" : ""}
            {...register("sclassCode", {
              required: "Class Code input is required",
            })}
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
        <div className="subject_list_checkbox_container">
          <div className="subject_checkbox">
            <SubjectTag subName={"English"} subCode={"ENG"} />
            <input type="checkbox" {...register("subject")} />
          </div>
          <div className="subject_checkbox">
            <SubjectTag subName={"Hindi"} subCode={"Hindi"} />
            <input type="checkbox" {...register("subject")} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ClassForm;
