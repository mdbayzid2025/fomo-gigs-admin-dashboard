import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";
import { useChangePasswordMutation } from "../../../Redux/api/settingsApi";
import { toast } from "sonner";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ CORRECT destructuring
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.warning("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match");
    }

    try {
      const payload = {
        currentPassword,
        newPassword,
        confirmPassword,
      };

      const res = await changePassword(payload).unwrap();

      if (res.success) {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-white h-screen p-20">
      <Button
        onClick={() => window.history.back()}
        sx={{
          backgroundColor: "#131927",
          color: "white",
          width: 40,
          ":hover": { backgroundColor: "#0095FF" },
        }}
      >
        <MdArrowBackIosNew />
      </Button>

      <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Current Password */}
          <div>
            <InputLabel>Current Password</InputLabel>
            <OutlinedInput
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              fullWidth
              size="small"
              onChange={(e) => setCurrentPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <IoIosEyeOff /> : <IoMdEye />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>

          {/* New Password */}
          <div>
            <InputLabel>New Password</InputLabel>
            <OutlinedInput
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              fullWidth
              size="small"
              onChange={(e) => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <IoIosEyeOff /> : <IoMdEye />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>

          {/* Confirm Password */}
          <div>
            <InputLabel>Confirm New Password</InputLabel>
            <OutlinedInput
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              fullWidth
              size="small"
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <IoIosEyeOff /> : <IoMdEye />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#0095FF",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Change Password
          </Button>
        </form>
      </Box>
    </div>
  );
}
