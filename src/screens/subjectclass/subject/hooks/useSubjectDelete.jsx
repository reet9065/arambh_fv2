import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getSubjects, deleteSubject } from "../../../../GQL/keysAndQueries";
import usePopupNotificationControler from "../../../../hooks/usePopupNotificationControler";
import fetchQuery from "../../../../utils/fetchQuery";

function useSubjectDelete() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const notification = usePopupNotificationControler();

  const removeSubject = useMutation({
    mutationFn: async (deleteQuery) => {
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, deleteQuery);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([getSubjects.key], (oldSubjectList) => {
        oldSubjectList[getSubjects.key] = oldSubjectList[
          getSubjects.key
        ].filter((subject) => subject.id !== data[deleteSubject.key].id);
        return oldSubjectList;
      });

      notification.show({
        type: "success",
        message: "One subject deleted successfully",
      });
      setIsLoading(false);
    },
    onError: (error) => {
      notification.show({
        type: "error",
        message: error.message,
      });
      setIsLoading(false);
    },
  });

  const deleteOneSubject = async (query) => {
    setIsLoading(true);
    await removeSubject.mutateAsync(query);
  };

  return { deleteOneSubject, isLoading };
}

export default useSubjectDelete;
