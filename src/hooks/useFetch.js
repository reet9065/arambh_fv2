// import { useEffect, useState } from "react";

// function useFetch({ url, query }) {
//   const [isloading, setIsloading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify({ query: query }),
//         });

//         if(!res.ok){
//             throw Error('Not abel to fetch data');
//         }

//         const res_data = await res.json();

//         if (res_data.error) {
//           setIsloading(false);
//           setError(res_data.error.message);
//           throw new Error(res_data.error.message);
//         }

//         // console.log(res_data);
//         setIsloading(false);
//         setData(res_data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, [url, query]);

//   return { isloading, error, data };
// }

// export default useFetch;
