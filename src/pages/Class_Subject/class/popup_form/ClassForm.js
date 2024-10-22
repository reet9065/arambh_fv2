import React, { useEffect } from "react";
import "./ClassForm.css";
import SubjectTag from "../../../../components/subjectTag/SubjectTag";
import { useForm } from "react-hook-form";

function ClassForm({ formValue }) {
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
    console.log(formData);
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

        <button type="submit" className="primary_btn">
          {formValue.type} class
        </button>
      </div>
    </form>
  );
}

export default ClassForm;
