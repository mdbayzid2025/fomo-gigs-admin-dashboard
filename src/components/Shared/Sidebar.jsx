import { useState } from "react";

import { FaRegCalendar, FaRegUser, FaStore } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { LuBookText, LuNotepadText } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { TbMessageReport } from "react-icons/tb";

import { LuCalendarCheck, LuDollarSign } from "react-icons/lu";

import { Link, NavLink } from "react-router-dom";

import { RiCoupon3Line } from "react-icons/ri";
import logo from "../../../public/Images/logo.png";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (path) => {
    setSelected(path);
  };

  return (
    <div className="bg-[#131927] h-screen transition-all duration-300 overflow-y-auto">
      <div className="flex flex-col items-center gap-4 py-5 transition-all duration-300">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-8 lg:w-full lg:h-12 mx-auto"
          />
        </Link>
        <hr className="w-8 lg:w-20 border border-[#E0E1E2]" />
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col lg:items-start px-4 py-3 gap-1 w-16 lg:w-64">
        {[
          {
            to: "/dashboard",
            icon: <MdOutlineDashboard className=" lg:text-2xl" />,
            label: "Dashboard",
          },
          {
            to: "/provider-management",
            icon: <FaStore className=" lg:text-2xl" />,
            label: "Provider Management",
          },
          {
            to: "/user-management",
            icon: <FaRegUser className=" lg:text-2xl" />,
            label: "User Management",
          },
          {
            to: "/service-category",
            icon: <LuNotepadText className=" lg:text-2xl" />,
            label: "Service Category",
          },
          {
            to: "/service-booking",
            icon: <LuCalendarCheck className=" lg:text-2xl" />,
            label: "Service Booking",
          },
          {
            to: "/event-category",
            icon: <LuNotepadText className=" lg:text-2xl" />,
            label: "Event Category",
          },
          {
            to: "/event-management",
            icon: <FaRegCalendar className=" lg:text-2xl" />,
            label: "Event Management",
          },
          {
            to: "/coupon-management",
            icon: <RiCoupon3Line className=" lg:text-2xl" />,
            label: "Coupon Management",
          },
          {
            to: "/withdrawal-management",
            icon: <LuDollarSign className=" lg:text-2xl" />,
            label: "Withdrawal Request",
          },
          {
            to: "/packages-management",
            icon: <RiCoupon3Line className=" lg:text-2xl" />,
            label: "Packages Management",
          },
          {
            to: "/sales-revenue",
            icon: <LuDollarSign className=" lg:text-2xl" />,
            label: "Sales Revenue",
          },
          // {
          //   to: "/social-management",
          //   icon: <HiOutlinePresentationChartLine className=" lg:text-2xl" />,
          //   label: "Social Management",
          // },
          // {
          //   to: "/subscription",
          //   icon: <IoDiamondOutline className=" lg:text-2xl" />,
          //   label: "Subscription",
          // },
          {
            to: "/support",
            icon: <LuBookText className=" lg:text-2xl" />,
            label: "Support E-Mail",
          },
          {
            to: "/report-management",
            icon: <TbMessageReport className=" lg:text-2xl" />,
            label: "Manage Reports",
          },
          {
            to: "/system-health",
            icon: <GrSystem className=" lg:text-2xl" />,
            label: "System Health",
          },
          {
            to: "/settings",
            icon: <IoSettingsOutline className=" lg:text-2xl" />,
            label: "Settings",
          },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => handleSelect(to)}
            className={({ isActive }) =>
              `flex items-center font-medium gap-3 text-base p-2 rounded-md w-full
              ${isActive
                ? "bg-[#0095FF] text-[#fff]"
                : selected === to
                  ? "bg-[#0095FF] text-white"
                  : "text-white"
              }
              hover:bg-[#94d2ff] hover:text-[#000]`
            }
          >
            {icon}
            <p className="hidden lg:block">{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
