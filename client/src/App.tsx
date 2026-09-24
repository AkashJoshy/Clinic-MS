import PatientLogin from "./pages/auth/patient-login.page";
import OTPVerification from "./pages/auth/otp-verification.page";
import PatientRegisterPage from "./pages/auth/patient-register.page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/shared/auth/login-form.shared";
import TwofactorAuthenticationPage from "./pages/auth/two-factor-authentication.page";
import ForgotPasswordPage from "./pages/auth/forgot-password.page";
import ChangePasswordPage from "./pages/auth/change-password.page";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/patient/dashboard.page";
import PatientDashboardLayout from "./components/layout/patient/dashboard.layout";
import ToastLayout from "./components/layout/toast.layout";

// Admin layout + pages
import AdminDashboardLayout from "./components/layout/admin/dashboard.layout";
import AdminDashboardPage from "./pages/admin/dashboard.page";
import { loginAdmin, loginDoctor } from "./services/auth.service";

// Doctor layout + pages
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { AuthRoute } from "./components/shared/auth-route.shared";
import NotFoundPage from "./pages/not-found.page";
import DoctorDashboardLayout from "./components/layout/doctor/dashboard.layout";
import UnderConstruction from "./components/layout/under-construction.layout";
import DepartmentPage from "./pages/admin/departments/department.page";
import AddDepartmentPage from "./pages/admin/departments/add-department.page";
import EditDepartmentPage from "./pages/admin/departments/edit-department.page";
import DoctorRegistrationPage from "./pages/doctor-registration.page";
import DoctorManagementPage from "./pages/admin/doctors/doctor-management.page";
import DoctorDetailsPage from "./pages/admin/doctors/doctor-details.page";
import PatientDetailsPage from "./pages/admin/patients/patient-details.page";
import MyProfilePage from "./pages/patient/my-profile.page";
import PatientManagementPage from "./pages/admin/patients/patient-management.page";
import DoctorProfilePage from "./pages/doctor/profile.page";
import SchedulePage from "./pages/doctor/schedule.page";
import { TooltipProvider } from "./components/ui/tooltip";
import Homepage from "./pages/auth/home.page";
import DoctorHomepage from "./pages/auth/doctor-home.page";
import DoctorRegistrationPendingPage from "./pages/auth/doctor-registration-pending.page";
import DoctorRegistrationRejectedPage from "./pages/auth/doctor-registration-rejected.page";
import DoctorReapplication from "./pages/doctor-reapplication.page";

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
          { path: "/doctor-home", element: <DoctorHomepage /> },
          { path: "/doctor/reapplication", element: <DoctorReapplication /> },
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
      {
        path: "/doctor-registration",
        element: <DoctorRegistrationPage />,
      },
      {
        path: "/doctor-registration-pending",
        element: <DoctorRegistrationPendingPage />,
      },
      {
        path: "/doctor-registration-rejected",
        element: <DoctorRegistrationRejectedPage />,
      },

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
                element: <MyProfilePage />,
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
                element: <SchedulePage />,
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
                element: <DoctorProfilePage />,
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
                element: <DoctorManagementPage />,
              },
              {
                path: "/admin/doctors/:doctorId",
                element: <DoctorDetailsPage />,
              },
              {
                path: "/admin/patients",
                element: <PatientManagementPage />,
              },
              {
                path: "/admin/patients/:patientId",
                element: <PatientDetailsPage />,
              },
              {
                path: "/admin/departments",
                element: <DepartmentPage />,
              },
              {
                path: "/admin/department/add",
                element: <AddDepartmentPage />,
              },
              {
                path: "/admin/department/edit/:deptId",
                element: <EditDepartmentPage />,
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
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-center" reverseOrder={false} />
      </TooltipProvider>
    </div>
  );
};

export default App;
