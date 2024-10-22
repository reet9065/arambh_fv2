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

const getclasses = `
  query getClasses{
  getclasses{
    id,
    sclass,
    sclassCode,
    sclassSubjects{
      id
      subName
      subCode
    }
  }
}
`;

export const ClassListContext = createContext();

export const SubjectListContext = createContext();

function Index() {

  console.log("Subject_Class_indexPage_render");
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
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, getsubjects);
    },
    refetchOnWindowFocus: false,
  });
  // console.log(subjectList.data);
  const classList = useQuery({
    queryKey:['getclasses'],
    queryFn: async ()=>{
      return await fetchQuery(process.env.REACT_APP_ENDPOINT_URL, getclasses);
    },
    refetchOnWindowFocus:false,
  })

  return (
    <>
      <SubjectListContext.Provider value={subjectList}>
        <ClassListContext.Provider value={classList}>
        <div className="subNave">
          {subnavs.map((nav, i) => {
            return <SubNav key={i} to={nav.path} text={nav.tabText} />;
          })}
        </div>
        <Outlet />
        </ClassListContext.Provider>
      </SubjectListContext.Provider>
    </>
  );
}

export default Index;
