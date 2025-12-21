import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home.jsx";
import AdminLogin from "./auth/AdminLogin.jsx";
import DoctorLogin from "./auth/DoctorLogin.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

// doctor
import DoctorLayout from "./layouts/DoctorLayout.jsx";
import DoctorDashboard from "./pages/doctor/Dashboard.jsx";
import PatientList from "./pages/doctor/PatientList.jsx";
import AddPatient from "./pages/doctor/AddPatient.jsx";
import Checkup from "./pages/doctor/Checkup.jsx";
import PatientVisits from "./pages/doctor/PatientVisits.jsx";
import VisitDetails from "./pages/doctor/VisitDetails.jsx";
import Prescription from "./pages/doctor/Prescription.jsx";

// admin
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import DoctorManagement from "./pages/admin/DoctorManagement.jsx";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />

          {/* amdin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="doctors" element={<DoctorManagement />} />
          </Route>

          {/* doctor */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute role="doctor">
                <DoctorLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="add-patient" element={<AddPatient />} />
            <Route path="checkup/:patientId" element={<Checkup />} />
            <Route path="prescription/:patientId" element={<Prescription />} />
            <Route path="patient/:id/visits" element={<PatientVisits />} />
            <Route path="visit/:visitId" element={<VisitDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
