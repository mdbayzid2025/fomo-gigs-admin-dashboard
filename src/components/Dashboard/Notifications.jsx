import { Button, IconButton } from "@mui/material";
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

const notifications = [
  {
    id: 1,
    message: "You have a new order from John Doe.",
    date: "2025-05-08 09:30 AM",
  },
  {
    id: 2,
    message: "New customer registration: Jane Smith.",
    date: "2025-05-07 04:45 PM",
  },
  {
    id: 3,
    message: "Payment received for order #34567.",
    date: "2025-05-07 01:10 PM",
  },
  {
    id: 4,
    message: "Inventory stock for 'Pizza' is low.",
    date: "2025-05-06 03:00 PM",
  },
];

export default function Notifications() {
  return (
    <div className="px-10 py-6 bg-[#fbfbfb] h-[93vh]">
      <div>
        <p className="text-[#1c1c1c] font-semibold text-xl">Notifications</p>
        <p className="text-[#7d7d7d]">Manage and process notifications</p>
      </div>
      <div className="bg-white p-8 mt-7">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex justify-between items-center p-4 my-2 rounded-xl bg-gray-100"
          >
            <div className="flex items-center gap-5">
              <div className="bg-[#000000] p-3 rounded-lg">
                <IoIosNotificationsOutline
                  fontSize={28}
                  className="text-[#EAEDF6]"
                />
              </div>
              <div>
                <p className="font-semibold">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.date}</p>
              </div>
            </div>
            {/* <div className="flex items-center gap-3">
              <IconButton
                sx={{
                  border: "1px solid #7d7d7d",
                }}
              >
                <RiEditLine fontSize={20} />
              </IconButton>
              <IconButton
                sx={{
                  border: "1px solid #7d7d7d",
                }}
              >
                <RiDeleteBin6Line fontSize={20} />
              </IconButton>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
