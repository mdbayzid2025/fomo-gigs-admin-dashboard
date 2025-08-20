import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { IoMdEye } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";

import { IoIosEyeOff } from "react-icons/io";

import profileImg from "../../../../public/Images/profile.png";

export default function Profile() {
  const [name, setName] = useState("Charlene Reed");
  const [email, setEmail] = useState("charlenereed@gmail.com");
  const [userName, setUserName] = useState("Charlene Reed");
  const [password, setPassword] = useState("**********");
  const [profileImage, setProfileImage] = useState(profileImg);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log({
      name,
      email,
      userName,
      password,
    });
  };

  return (
    <div className="flex flex-col items-start gap-10 w-full bg-[#fff] h-screen p-20">
      <Button
        onClick={() => window.history.back()}
        sx={{
          backgroundColor: "#131927",
          color: "white",
          padding: "10px",
          width: "15px",
          ":hover": {
            backgroundColor: "#0095FF",
          },
        }}
      >
        <MdArrowBackIosNew />
      </Button>
      {/* Profile Header */}
      <div className="flex items-center w-full gap-20">
        <div className="relative">
          <div className="bg-[#efefef]">
            <img src={profileImage} alt="" className="size-48" />
          </div>
          <IconButton
            sx={{
              position: "absolute",
              top: "80%",
              right: 0,
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: "8px",
            }}
            component="label"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <FiEdit fontSize={25} className="text-[#0095FF]" />
          </IconButton>
        </div>

        <div className="flex flex-col gap-8 w-2/3">
          <div className="flex items-center gap-5">
            <div className="w-full">
              <TextField
                label="Your Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <TextField
                label="User Name"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="w-full">
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="disabled"
              />
            </div>
            <div className="w-full">
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                fullWidth
              />
            </div>
          </div>

          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#0095FF",
                color: "white",
                textTransform: "none",
                padding: "10px",
                width: "40%",
                float: "right",
              }}
              onClick={handleSubmit}
            >
              Save & Update
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}
