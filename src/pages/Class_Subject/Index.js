import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import SubNav from "../../components/subNav/SubNav";
import "./index.css";
import { useQuery } from "@tanstack/react-query";
import fetchQuery from "../../utils/fetchQuery";


const getsubjects = `
  query subjectlist{
    getSubjects{
      id
      subName
      subCode
    }
}
`;

export const SubjectListContext = createContext();

function Index() {
  var subnavs = [
    {
      tabText: "SUBJET",
      path: "/subjectclass/subject",
    },
    {
      tabText: "CLASS",
      path: "/subjectclass/class",
    },
  ];

  const subjectList = useQuery({
    queryKey: ["getSubjects"],
    queryFn: async () => {
      console.log("Subject list function called");
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, getsubjects);
    },
    refetchOnWindowFocus: false,
  });
  console.log(subjectList.data);
  if (subjectList.data) {
    console.log(subjectList.data);
  }

  return (
    <>
      <SubjectListContext.Provider value={subjectList}>
        <div className="subNave">
          {subnavs.map((nav, i) => {
            return <SubNav key={i} to={nav.path} text={nav.tabText} />;
          })}
        </div>
        <Outlet />
      </SubjectListContext.Provider>
    </>
  );
}

export default Index;
