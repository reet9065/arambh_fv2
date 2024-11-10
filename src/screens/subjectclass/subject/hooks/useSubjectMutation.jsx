import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSubjects, createSubject, updateSubject } from "../../../../GQL/keysAndQueries";
import usePopupNotificationControler from "../../../../hooks/usePopupNotificationControler";
import fetchQuery from "../../../../utils/fetchQuery";

function useSubjectMutation({onOperationSuccess}) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const notification = usePopupNotificationControler();

  // For adding a new subject
  const addSubject = useMutation({
    mutationFn: async (newSubject) => {
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, newSubject);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([getSubjects.key], (oldsubjectList) => {
        oldsubjectList[getSubjects.key] = [
          ...oldsubjectList[getSubjects.key],
          data[createSubject.key],
        ];
        return oldsubjectList;
      });

      notification.show({
        type: "success",
        message: "Subject Created Successfully",
      });
      setIsLoading(false);
      onOperationSuccess()
    },

    onError: (error) => {
      notification.show({
        type:"error",
        message:error.message
      })
      setIsLoading(false);
    },
  });

  // For updating the subject
  const editSubject = useMutation({
    mutationFn: async (updatedSubject) => {
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, updatedSubject);
    },
    onSuccess:(data)=>{
      queryClient.setQueryData([getSubjects.key], (oldsubjectList) => {
        oldsubjectList[getSubjects.key] = oldsubjectList[getSubjects.key].map((subject)=> {
          if(subject.id === data[updateSubject.key].id){
            subject = data[updateSubject.key];
          }
          return subject;
        })
        return oldsubjectList;
      });
      notification.show({
        type:"success",
        message:"A subject updated successfully"
      })
      setIsLoading(false);
      onOperationSuccess();
    },
    onError:(error)=>{
      notification.show({
        type:"error",
        message:error.message
      })
      setIsLoading(false);
    }
  });

  const createNewSubject =  (query) => {
    setIsLoading(true);
    addSubject.mutate(query);
  };

  const updateASubject = (query) => {
    setIsLoading(true);
   editSubject.mutate(query);
  };

  return { createNewSubject, updateASubject, isLoading };
}

export default useSubjectMutation;
