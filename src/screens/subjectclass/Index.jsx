import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import Navtablink from "../../components/NavTabLinks/Navtablink";
import useSubjectList from "../../hooks/useSubjectList";
import useClassList from "../../hooks/useClassList";

const tablist = [

  {
    to: "/subjectclass/subject",
    label: "Subject",
  },
  {
    to: "/subjectclass/class",
    label: "Class",
  },
];

export const ClassListContext = createContext();

export const SubjectListContext = createContext();

function Index() {
  console.log("Subject class Index page rendred")

  const SubjectList = useSubjectList();
  const ClassList = useClassList();

  console.log(SubjectList);

  return (
    <React.Fragment>
      <SubjectListContext.Provider value={SubjectList}>
        <ClassListContext.Provider value={ClassList}>

          <Navtablink tabs={tablist} />
          <Outlet />

        </ClassListContext.Provider>
      </SubjectListContext.Provider>
    </React.Fragment>
  );
}

export default Index;
