import { useState } from "react";

import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaStore } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { LuNotepadText } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { LuBookText } from "react-icons/lu";
import { IoDiamondOutline } from "react-icons/io5";

import { Link, NavLink } from "react-router-dom";

import logo from "../../../public/Images/logo.png";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (path) => {
    setSelected(path);
  };

  return (
    <div className="bg-[#131927] h-screen transition-all duration-300 w-20 lg:w-72 ">
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
            to: "/order-management",
            icon: <LuNotepadText className=" lg:text-2xl" />,
            label: "Order Management",
          },
          {
            to: "/event-management",
            icon: <FaRegCalendar className=" lg:text-2xl" />,
            label: "Event Management",
          },
          {
            to: "/social-management",
            icon: <HiOutlinePresentationChartLine className=" lg:text-2xl" />,
            label: "Social Management",
          },
          {
            to: "/subscription",
            icon: <IoDiamondOutline className=" lg:text-2xl" />,
            label: "Subscription",
          },
          {
            to: "/support",
            icon: <LuBookText className=" lg:text-2xl" />,
            label: "Support E-Mail",
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
              ${
                isActive
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
