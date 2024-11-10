import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import Index from "./screens/Index";
import SubjectClass from "./screens/subjectclass/Index";
import Subject from "./screens/subjectclass/subject/Subject";
import Navbar from "./components/Navbar/Navbar";
import Sclass from "./screens/subjectclass/sclass/Sclass";
// import Navbar from "./components/Navbar/Navbar";
// import PageIndex from "./pages/PageIndex";
// import SubjectClassIndex from "./pages/Class_Subject/Index";
// import Subject from "./pages/Class_Subject/subject/Subject";
// import SchoolClass from "./pages/Class_Subject/class/SchoolClass";

function App() {
  console.log("App renders");

  return (
    <Box
      sx={{
        margin: "auto",
        border:"1px solid red",
        width:{xs:"100%",sm:"100%",md:"100%",lg:"70%",xl:"70%"},
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height:"100dvh"
      }}
    >
      <Navbar/>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="subjectclass" element={<SubjectClass />}>
            <Route path="subject" element={<Subject/>} />
            <Route path="class" element={<Sclass/>} />
          </Route>
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
