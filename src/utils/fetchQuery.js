class CustomError extends Error {
  constructor(message, code, gqlErrorCode) {
    super(message); // Call the parent constructor with the error message
    this.code = code; // Custom error code
    this.gqlErrorCode = gqlErrorCode || null;
    this.name = "CustomError"; // Set the error name to the custom class name
  }
}



const fetchQuery = async (url, query) => {
  console.log("fetch function runs")
  try {
    const queryServer = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    });

    const respons = await queryServer.json();
    if (respons) {
      if (respons.errors) {
        console.log( "Respons Error = >> ",respons.errors);
        var errorMessage = respons.errors[0].extensions.code === "GRAPHQL_VALIDATION_FAILED" ? "INTERNAL_SERVER_ERROR :: failed to fetch" : respons.errors[0].message;
        throw new CustomError(errorMessage, queryServer.status,respons.errors[0].extensions.code);
      }

      return respons.data;
    }
  } catch (error) {

    if(error instanceof TypeError){
        console.log(error);
        throw new CustomError('Service temporarily unavailable. Please refresh and try again.', 503);
    }
    console.log(error);
    throw error;
  }
};

export default fetchQuery;
