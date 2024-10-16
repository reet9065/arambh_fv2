import { createContext, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PageIndex from "./pages/PageIndex";
import SubjectClassIndex from "./pages/Class_Subject/Index";
import Subject from "./pages/Class_Subject/subject/Subject";
import Notification from "./components/notificationPopup/Notification";
import Loading from "./components/loading/Loading";
import SchoolClass from "./pages/Class_Subject/class/SchoolClass";

export const NotificationContext = createContext();
export const LoadingContext = createContext();

function App() {
  console.log("App renders");
  const [notification, setNotification] = useState(null); // {type:"sucess" || "warning", message:"some message", closeBtn: true || flase};
  const [loading, setLoading] = useState(false);

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoading}}>
      <NotificationContext.Provider value={{ notification, setNotification}}>
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
          {notification && (
            <Notification
              notification={notification}
              duration={5000}
              closeNotification={closeNotification}
            />
          )}

          {loading && <Loading />}
        </div>
      </NotificationContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
