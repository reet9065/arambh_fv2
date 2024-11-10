import fetchQuery from "../utils/fetchQuery";
import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "../GQL/keysAndQueries";

function useSubjectList() {
  const subjectList = useQuery({
    queryKey: [getSubjects.key],
    queryFn: async () => {
      return await fetchQuery(
        process.env.REACT_APP_ENDPOINT_URL,
        getSubjects.query
      );
    },
    refetchOnWindowFocus: false,
  });

  
  return {
    data: subjectList.data,
    error: subjectList.error,
    isLoading: subjectList.isLoading,
  };
}

export default useSubjectList;
