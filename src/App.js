import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NoticeDetail from "./pages/NoticeDetail";

function App() {
  const [notices, setNotices] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Dashboard notices={notices} setNotices={setNotices} />}
        />
        <Route
          path="/notices/:noticeId"
          element={<NoticeDetail notices={notices} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
