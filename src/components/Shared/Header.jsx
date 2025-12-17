import React, { useState } from "react";
import { PiBellSimpleRingingBold } from "react-icons/pi";

import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import profileImg from "../../../public/Images/profile.png";

export default function Header() {
  const [dropdownMenu, setDropdownMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setDropdownMenu(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    navigate("/sign-in");
    handleClose();
  };

  return (
    <div className="flex items-center justify-end bg-[#fff] w-full px-10 py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* <div className="text-white">
          <Link to="/notifications">
            <PiBellSimpleRingingBold fontSize={24} />
          </Link>
        </div> */}
        <Button
          sx={{
            color: "black",
            textTransform: "none",
            padding: "5px",
            width: "100%",
            float: "right",
          }}
          onClick={handleProfileClick}
          variant="text"
        >
          <div className="flex items-center gap-2 bg-[#EFEFEF] p-1 rounded-lg">
            <img
              src={profileImg}
              alt=""
              className="size-8 rounded-full border border-white"
            />
            <p className="text-black font-medium">User Name</p>
            <IoIosArrowDown fontSize={20} color="black" />
          </div>
        </Button>
        <Menu
          anchorEl={dropdownMenu}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              width: "130px",
            },
          }}
        >
          {/* <MenuItem component={Link} to="/edit-profile" onClick={handleClose}>
            Profile
          </MenuItem>
          <hr className="border-t border-[#ebebeb]" /> */}

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
