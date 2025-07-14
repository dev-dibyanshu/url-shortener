

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShortenerForm from "./components/ShortenerForm";
import StatsPage from "./components/StatsPage";
import Redirector from "./components/Redirector";
import LoginPage from "./components/LoginPage";

const token = "CZypQK";

function App() {
  const [token, setToken] = useState<string | null>(null);

  if (!token) {
    return <LoginPage onLogin={setToken} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenerForm token={token} />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortCode" element={<Redirector />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

