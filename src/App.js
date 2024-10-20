import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PageIndex from "./pages/PageIndex";
import SubjectClassIndex from "./pages/Class_Subject/Index";
import Subject from "./pages/Class_Subject/subject/Subject";
import SchoolClass from "./pages/Class_Subject/class/SchoolClass";

function App() {
  console.log("App renders");
  return (
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<PageIndex />}>
              <Route path="/" element={<div>Home</div>} />
              <Route path="subjectclass" element={<SubjectClassIndex />}>
                <Route path="subject" element={<Subject />} />
                <Route path="class" element={<SchoolClass />} />
              </Route>
            </Route>
          </Routes>
        </div>
  );
}

export default App;
