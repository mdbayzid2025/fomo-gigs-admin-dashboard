import { Tab, Tabs, Box, Typography } from "@mui/material";
import React from "react";
import Profile from "../UI/Profile";
import ChangePassword from "../UI/ChangePassword";

export default function EditProfile() {
  const [value, setValue] = React.useState("1");

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="p-8 bg-[#fbfbfb]">
      <div>
        <p className="font-medium text-xl">Profile</p>
        <p className="text-[#545454]">Manage Profile & Password</p>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md mt-4">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Profile management tabs"
          textColor="inherit"
          sx={{
            "& .MuiTab-root": {
              color: "#333",
              fontSize: "16px",
            },
            "& .Mui-selected": {
              color: "#232323",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#232323",
            },
          }}
        >
          <Tab
            sx={{
              textTransform: "none",
            }}
            label="Edit Profile"
            value="1"
          />
          <Tab
            sx={{
              textTransform: "none",
            }}
            label="Change Password"
            value="2"
          />
        </Tabs>

        <Box sx={{ paddingTop: 3 }}>
          {value === "1" && <Profile />}
          {value === "2" && <ChangePassword />}
        </Box>
      </div>
    </div>
  );
}
