import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../../pages/ForgotPassword";
import SignIn from "../../pages/SignIn";
import UpdatePassword from "../../pages/UpdatePassword";
import VerifyOtp from "../../pages/VeryfiOTP";
import ProtectedRoute from "../../utils/ProtectedRoute";
import CouponManage from "../Dashboard/CouponManage";
import Dashboard from "../Dashboard/Dashboard";
import EventCategory from "../Dashboard/EventCategory";
import EventManagement from "../Dashboard/EventManagement";
import Notifications from "../Dashboard/Notifications";
import PackageManage from "../Dashboard/PackageManage";
import ProviderManagement from "../Dashboard/ProviderManagement";
import ReportManagement from "../Dashboard/ReportManagement";
import SalesRevenue from "../Dashboard/SalesRevenue";
import ServiceBooking from "../Dashboard/ServiceBooking";
import ServiceCategory from "../Dashboard/ServiceCategory";
import Settings from "../Dashboard/Settings";
import AboutUs from "../Dashboard/Settings/AboutUs";
import ChangePassword from "../Dashboard/Settings/ChangePassword";
import Faq from "../Dashboard/Settings/Faq";
import PrivacyPolicy from "../Dashboard/Settings/PrivacyPolicy";
import Profile from "../Dashboard/Settings/Profile";
import TermsAndConditions from "../Dashboard/Settings/TermsAndConditions";
import SocialManagement from "../Dashboard/SocialManagement";
import Subscription from "../Dashboard/Subscription";
import SupportEMail from "../Dashboard/SupportEMail";
import SystemHealth from "../Dashboard/SystemHealth";
import UserManagement from "../Dashboard/UserManagement";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Layout/MainLayout";
import WithdrawalManagement from "../Dashboard/Withdrawal/WithdrawalManagement";


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
            path: "service-category",
            element: <ServiceCategory />,
          },
          {
            path: "event-category",
            element: <EventCategory />,
          },
          {
            path: "event-management",
            element: <EventManagement />,
          },
          {
            path: "withdrawal-management",
            element: <WithdrawalManagement />,
          },
          {
            path: "packages-management",
            element: <PackageManage />,
          },
          {
            path: "coupon-management",
            element: <CouponManage />,
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
            path: "service-booking",
            element: <ServiceBooking />,
          },
          {
            path: "sales-revenue",
            element: <SalesRevenue />,
          },
          {
            path: "system-health",
            element: <SystemHealth />,
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
