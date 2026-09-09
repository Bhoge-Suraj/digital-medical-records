import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Maincontent from "./components/maincontent";

import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Maincontent />} />
          <Route path="/medical-records" element={<MedicalRecordsPage />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;