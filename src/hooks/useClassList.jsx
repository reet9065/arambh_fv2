import { useQuery } from "@tanstack/react-query";
import { getclasses } from "../GQL/keysAndQueries";
import fetchQuery from "../utils/fetchQuery";

function useClassList() {
  const classList = useQuery({
    queryKey: [getclasses.key],
    queryFn: async () => {
      return await fetchQuery(
        process.env.REACT_APP_ENDPOINT_URL,
        getclasses.query
      );
    },
    refetchOnWindowFocus: false,
  });

  return {
    data: classList.data,
    error: classList.error,
    isLoading: classList.isLoading,
  };
}

export default useClassList;
