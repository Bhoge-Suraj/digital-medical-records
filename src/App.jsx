import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";

import Maincontent from "./components/maincontent";

import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/verify-otp"
                    element={<VerifyOTP />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                {/* Protected Routes */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <Maincontent />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/medical-records"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <MedicalRecordsPage />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/doctors"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <Doctors />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <Appointments />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <Reports />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Unknown URL */}

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;