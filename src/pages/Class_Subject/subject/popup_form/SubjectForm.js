import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./SubjectForm.css";
import fetchQuery from "../../../../utils/fetchQuery";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const createSubject = (data) => {
  const { subName, subCode } = data;
  return `
  mutation addSubject{
  createSubject(input:{
    subName:${JSON.stringify(subName)}
    subCode:${JSON.stringify(subCode)}
  }){
      id
      subName
      subCode
  }
}`;
};

const updateSubject = (id, input) => {
  return `
  mutation updateSubject{
  updateSubject(subID:"${id}",input:{
    subName:"${input.subName}",
    subCode:"${input.subCode}",
  }){
    id
    subName
    subCode
  }
}
  `;
};

function SubjectForm({ onButtonSubmitSuccessfully, formValue, setPopupNotification,setLoading}) {

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: formValue.data ? formValue.data : {},
  });

  const addSubject = useMutation({
    mutationFn: async (newSubject) => {
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, newSubject);
    },
    onSuccess: (data) => {
      setLoading(false);
      setPopupNotification({
        type: "success",
        message: "New subject added successfully",
      });
      queryClient.setQueryData(["getSubjects"], (oldsubjectList) => {
        console.log(oldsubjectList);
        oldsubjectList.getSubjects = [
          ...oldsubjectList.getSubjects,
          data.createSubject,
        ];
        return oldsubjectList;
      });

      reset();
      onButtonSubmitSuccessfully();
    },

    onError:(error)=>{
      setLoading(false);
      setPopupNotification({
        type: "warning",
        message:error.message,
        closeBtn: true,
      })
    }
  });

  const editSubject = useMutation({
    mutationFn: async (updatedSubject) => {
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, updatedSubject);
    },
    onSuccess:(data)=>{
      setLoading(false);
      setPopupNotification({
        type:'success',
        message:"Subject updated successfully"
      });
      queryClient.setQueryData(["getSubjects"], (oldsubjectList) => {
        oldsubjectList.getSubjects = oldsubjectList.getSubjects.map((subject)=> {
          if(subject.id === data.updateSubject.id){
            subject = data.updateSubject;
          }
          return subject;
        })

        console.log(oldsubjectList);

        return oldsubjectList;
      });
      reset();
      onButtonSubmitSuccessfully();
    },
    onError:(error)=>{
      setLoading(false)
      setPopupNotification({
        type: "warning",
        message:error.message,
        closeBtn: true,
      })
    }
  });

  useEffect(()=>{
    if(editSubject.isPending || addSubject.isPending){
      setLoading(true);
    }
  },[editSubject.isPending , addSubject.isPending, setLoading])

  const formSubmit = (data) => {

    if (formValue.type === "Add") {
      addSubject.mutate(createSubject(data));
    }

    if (formValue.type === "Update") {
      const { id, ...input } = data;
      editSubject.mutate(updateSubject(id, input));
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} className="subject_form">
      {/* input text subject name  */}
      <div className="input_text">
        <div className="label_required">
          <label htmlFor="input_type_text"> Subject name </label>
          <p>*</p>
        </div>
        <input
          type="text"
          id="input_type_text"
          className={errors.subName ? "input_error" : ""}
          {...register("subName", {
            required: "Subject name is required",
            minLength: {
              value: 3,
              message: `Subject name should have atlist 3 charecters`,
            },
          })}
        />
        {errors.subName && (
          <p className="helper_text info">{errors.subName.message}</p>
        )}
      </div>

      {/* input text subject Code */}
      <div className="input_text">
        <div className="label_required">
          <label htmlFor="input_type_text"> Subject Code </label>
          <p>*</p>
        </div>
        <input
          type="text"
          style={{textTransform:"uppercase"}}
          id="input_type_text"
          {...register("subCode", {
            required: "Subject Code is required",
          })}
        />
        {errors.subCode && (
          <p className="helper_text info">{errors.subCode.message}</p>
        )}
      </div>

      <div className="btn">
        {!formValue.data && (
          <button
            type="button"
            className="primary_btn"
            onClick={() => reset()}
            disabled={isSubmitting}
          >
            {" "}
            Reset{" "}
          </button>
        )}

        <button type="submit" className="primary_btn" disabled={isSubmitting}>
          {" "}
          {formValue.type}{" "}
        </button>
      </div>
    </form>
  );
}

export default SubjectForm;
