import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import SignIn from "../../pages/SignIn";
import ForgotPassword from "../../pages/ForgotPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import Notifications from "../Dashboard/Notifications";
import VerifyOtp from "../../pages/VeryfiOTP";
import UpdatePassword from "../../pages/UpdatePassword";
import Settings from "../Dashboard/Settings";
import Profile from "../Dashboard/Settings/Profile";
import ChangePassword from "../Dashboard/Settings/ChangePassword";
import Faq from "../Dashboard/Settings/Faq";
import TermsAndConditions from "../Dashboard/Settings/TermsAndConditions";
import AboutUs from "../Dashboard/Settings/AboutUs";
import PrivacyPolicy from "../Dashboard/Settings/PrivacyPolicy";
import ProviderManagement from "../Dashboard/ProviderManagement";
import EventManagement from "../Dashboard/EventManagement";
import SocialManagement from "../Dashboard/SocialManagement";
import Subscription from "../Dashboard/Subscription";
import UserManagement from "../Dashboard/UserManagement";
import SupportEMail from "../Dashboard/SupportEMail";
import ReportManagement from "../Dashboard/ReportManagement";
import ProtectedRoute from "../../utils/ProtectedRoute";
import CategoryManagement from "../Dashboard/CategoryManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "provider-management",
            element: <ProviderManagement />,
          },
          {
            path: "user-management",
            element: <UserManagement />,
          },
          {
            path: "category-management",
            element: <CategoryManagement />,
          },
          {
            path: "event-management",
            element: <EventManagement />,
          },
          {
            path: "social-management",
            element: <SocialManagement />,
          },
          {
            path: "subscription",
            element: <Subscription />,
          },
          {
            path: "support",
            element: <SupportEMail />,
          },
          {
            path: "report-management",
            element: <ReportManagement />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "settings/profile",
            element: <Profile />,
          },
          {
            path: "settings/change-password",
            element: <ChangePassword />,
          },
          {
            path: "settings/terms-and-condition",
            element: <TermsAndConditions />,
          },
          {
            path: "settings/about-us",
            element: <AboutUs />,
          },
          {
            path: "settings/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "settings/faq",
            element: <Faq />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);

export default router;
