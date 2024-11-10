const getSubjects = {
  key: "getSubjects",
  query: `query subjectlist {
    getSubjects{
      id
      subName
      subCode
    }
  }`,
};

const createSubject = {
  key: "createSubject",
  query: (data) => {
    const { subName, subCode } = data;
    return ` mutation addSubject{
        createSubject(input:{
          subName:${JSON.stringify(subName)}
          subCode:${JSON.stringify(subCode)}
        }){
            id
            subName
            subCode
        }
    }`;
  },
};

const updateSubject = {
  key: "updateSubject",
  query: (id, input) => {
    return `mutation updateSubject{
      updateSubject(subID:"${id}",input:{
        subName:"${input.subName}",
        subCode:"${input.subCode}",
      }){
          id
          subName
          subCode
        }
  }`;
  },
};

const deleteSubject = {
  key: "deleteSubject",
  query: (id) => {
    return ` mutation DeleteSubject{
      deleteSubject(subID:"${id}"){
        id
      }
    }`;
  },
};

const getclasses = {
  key: "getclasses",
  query: `query getClasses {
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
  }`,
};

export { getSubjects, createSubject, updateSubject, deleteSubject, getclasses };
