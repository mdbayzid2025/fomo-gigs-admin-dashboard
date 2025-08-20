import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    setError("");
    console.log("Password change request submitted");
  };

  return (
    <div className="bg-[#fff] h-screen p-20">
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
      <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            {/* Current Password */}
            <div>
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{
                  color: "#131927",
                }}
              >
                Current Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                fullWidth
                onChange={(e) => setCurrentPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showCurrentPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleShowCurrentPassword}
                      edge="end"
                    >
                      {showCurrentPassword ? (
                        <IoIosEyeOff className="text-[#131927]" />
                      ) : (
                        <IoMdEye className="text-[#131927]" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>

            {/* New Password */}
            <div>
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{
                  color: "#131927",
                }}
              >
                New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                fullWidth
                onChange={(e) => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleShowNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? (
                        <IoIosEyeOff className="text-[#131927]" />
                      ) : (
                        <IoMdEye className="text-[#131927]" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>

            {/* Confirm Password */}
            <div>
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{
                  color: "#131927",
                }}
              >
                Confirm New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                fullWidth
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <IoIosEyeOff className="text-[#131927]" />
                      ) : (
                        <IoMdEye className="text-[#131927]" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>

            {/* Error Message */}
            {error && (
              <div>
                <Typography color="error">{error}</Typography>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0095FF",
                  color: "white",
                  fontSize: "16px",
                  textTransform: "none",
                  padding: "10px",
                  float: "right",
                }}
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </div>
  );
}
