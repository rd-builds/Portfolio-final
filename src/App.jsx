import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HackathonsPage from "./pages/HackathonsPage";
import CertificationsPage from "./pages/CertificationsPage";
import ClubRolesPage from "./pages/ClubRolesPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/club-roles" element={<ClubRolesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
