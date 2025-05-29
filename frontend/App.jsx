import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import QuickMeet from "./QuickMeet";
import QuickMeetLogin from "./QuickMeetLogin";
import QuickMeetSignUp from "./QuickMeetSignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} /> 
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/QuickMeet" element={<QuickMeet />} />
      <Route path="/login" element={<QuickMeetLogin />} />
      <Route path="/signup" element={<QuickMeetSignUp />} />
    </Routes>
  );
}

export default App;
