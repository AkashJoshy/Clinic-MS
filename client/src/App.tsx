import Homepage from "./pages/auth/Homepage";
import PatientLogin from "./pages/auth/PatientLoginPage";
import OTPVerification from "./pages/auth/OTPVerificationPage";
import PatientRegisterPage from "./pages/auth/PatientRegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/shared/auth/LoginForm";
import TwofactorAuthenticationPage from "./pages/auth/TwofactorAuthenticationPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/patient/Dashboard";
import PatientDashboardLayout from "./components/layout/patient/PatientDashboardLayout";
import ToastLayout from "./components/layout/ToastLayout";

// Admin layout + pages
import AdminDashboardLayout from "./components/layout/AdminDashboardLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import { loginAdmin, loginDoctor } from "./services/auth.service";

// Clinic layout + pages
// import AddDoctorPage from "./pages/clinic/AddDoctorPage";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { AuthRoute } from "./components/shared/AuthRoute";
import NotFoundPage from "./pages/NotFoundPage";
import DoctorDashboardLayout from "./components/layout/DoctorDashboardLayout";
import UnderConstruction from "./components/layout/UnderConstruction";

const router = createBrowserRouter([
  {
    element: <ToastLayout />,
    children: [
      {
        element: <AuthRoute role="patient" />,
        children: [
          { path: "/", element: <Homepage /> },
          { path: "/login", element: <PatientLogin /> },
          { path: "/signup", element: <PatientRegisterPage /> },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage role={"PATIENT"} />,
          },
          {
            path: "/change-password",
            element: <ChangePasswordPage role="PATIENT" />,
          },
          {
            path: "/verify-email",
            element: <OTPVerification role="PATIENT" />,
          },
        ],
      },
      {
        element: <AuthRoute role="admin" />,
        children: [
          {
            path: "/admin",
            element: (
              <LoginForm
                portal={"Admin"}
                role={"ADMIN"}
                fn={loginAdmin}
                to="/admin/dashboard"
              />
            ),
          },
          {
            path: "/admin/forgot-password",
            element: <ForgotPasswordPage role={"ADMIN"} />,
          },
          {
            path: "/admin/change-password",
            element: <ChangePasswordPage role="ADMIN" />,
          },
        ],
      },
      {
        element: <AuthRoute role="doctor" />,
        children: [
          {
            path: "/doctor",
            element: (
              <LoginForm
                portal={"Doctor"}
                role={"DOCTOR"}
                fn={loginDoctor}
                to="/doctor/dashboard"
              />
            ),
          },
          {
            path: "/doctor/forgot-password",
            element: <ForgotPasswordPage role={"DOCTOR"} />,
          },
          {
            path: "/doctor/change-password",
            element: <ChangePasswordPage role="DOCTOR" />,
          },
          {
            path: "/doctor/verify-email",
            element: <OTPVerification role="DOCTOR" />,
          },
        ],
      },

      { path: "/two-factor", element: <TwofactorAuthenticationPage /> },
      { path: "/doctor-registration", element: (
                  <UnderConstruction
                    title="Doctor Registration"
                    backTo="/"
                    backLabel="Back to Home"
                  />
                ),},

      {
        element: <ProtectedRoute role="patient" />,
        children: [
          {
            element: <PatientDashboardLayout />,
            children: [
              { path: "/patient/dashboard", element: <Dashboard /> },
              {
                path: "/patient/find-doctors",
                element: (
                  <UnderConstruction
                    title="Find Doctors"
                    backTo="/patient/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/patient/book-appointment",
                element: (
                  <UnderConstruction
                    title="Book Appointment"
                    backTo="/patient/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/patient/my-appointments",
                element: (
                  <UnderConstruction
                    title="My Bookings"
                    backTo="/patient/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/patient/medical-reports",
                element: (
                  <UnderConstruction
                    title="Medical Reports"
                    backTo="/patient/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/patient/bills-payments",
                element: (
                  <UnderConstruction
                    title="Bills & Payments"
                    backTo="/patient/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/patient/wallet",
                element: (
                  <UnderConstruction
                    title="Wallet"
                    backTo="/patient/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/patient/notifications",
                element: (
                  <UnderConstruction
                    title="Notifications"
                    backTo="/patient/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/patient/my-profile",
                element: (
                  <UnderConstruction
                    title="My Profile"
                    backTo="/patient/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/patient/settings",
                element: (
                  <UnderConstruction
                    title="Settings"
                    backTo="/patient/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute role="doctor" />,
        children: [
          {
            element: <DoctorDashboardLayout />,
            children: [
              {
                path: "/doctor/dashboard",
                element: (
                  <UnderConstruction
                    title="Dashboard"
                    backTo="/doctor/dashboard"
                    backLabel={"Back to Dashboard"}
                  />
                ),
              },
              {
                path: "/doctor/appointments",
                element: (
                  <UnderConstruction
                    title="Appointments"
                    backTo="/doctor/dashboard"
                    backLabel={"Back to Dashboard"}
                  />
                ),
              },
              {
                path: "/doctor/schedule",
                element: (
                  <UnderConstruction
                    title="Schedule"
                    backTo="/doctor/dashboard"
                    backLabel={"Back to Dashboard"}
                  />
                ),
              },
              {
                path: "/doctor/patients",
                element: (
                  <UnderConstruction
                    title="Patients"
                    backTo="/doctor/dashboard"
                    backLabel={"Back to Dashboard"}
                  />
                ),
              },
              {
                path: "/doctor/subscription",
                element: (
                  <UnderConstruction
                    title="Subscription"
                    backTo="/doctor/dashboard"
                    backLabel={"Back to Dashboard"}
                  />
                ),
              },
              {
                path: "/doctor/revenue",
                element: (
                  <UnderConstruction
                    title="Revenue"
                    backTo="/doctor/dashboard"
                    backLabel={"Back to Dashboard"}
                  />
                ),
              },
              {
                path: "/doctor/wallet",
                element: (
                  <UnderConstruction
                    title="Wallet"
                    backTo="/doctor/dashboard"
                    backLabel={"Back to Dashboard"}
                  />
                ),
              },
              {
                path: "/doctor/notifications",
                element: (
                  <UnderConstruction
                    title="Notifications"
                    backTo="/doctor/dashboard"
                    backLabel={"Back to Dashboard"}
                  />
                ),
              },
              {
                path: "/doctor/my-profile",
                element: (
                  <UnderConstruction
                    title="My Profile"
                    backTo="/doctor/dashboard"
                    backLabel={"Back to Dashboard"}
                  />
                ),
              },
              {
                path: "/doctor/settings",
                element: (
                  <UnderConstruction
                    title="Settings"
                    backTo="/doctor/dashboard"
                    backLabel={"Back to Dashboard"}
                  />
                ),
              },
            ],
          },
        ],
      },

      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            element: <AdminDashboardLayout />,
            children: [
              {
                path: "/admin/dashboard",
                element: <AdminDashboardPage />,
              },
              {
                path: "/admin/doctors",
                element: (
                  <UnderConstruction
                    title="Doctors"
                    backTo="/admin/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/admin/patients",
                element: (
                  <UnderConstruction
                    title="Patients"
                    backTo="/admin/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/admin/subscriptions",
                element: (
                  <UnderConstruction
                    title="Subscription Plans"
                    backTo="/admin/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/admin/revenue",
                element: (
                  <UnderConstruction
                    title="Payment Revenue"
                    backTo="/admin/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/admin/wallet",
                element: (
                  <UnderConstruction
                    title="Wallet"
                    backTo="/admin/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/admin/withdraw-requests",
                element: (
                  <UnderConstruction
                    title="Withdraw Requests"
                    backTo="/admin/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/admin/reports",
                element: (
                  <UnderConstruction
                    title="System Reports"
                    backTo="/admin/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/admin/notifications",
                element: (
                  <UnderConstruction
                    title="Notifications"
                    backTo="/admin/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/admin/my-profile",
                element: (
                  <UnderConstruction
                    title="My Profile"
                    backTo="/admin/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
              {
                path: "/admin/settings",
                element: (
                  <UnderConstruction
                    title="Settings"
                    backTo="/admin/dashboard"
                    backLabel="Back to Dashboard"
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default App;
