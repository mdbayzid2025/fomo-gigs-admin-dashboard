import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import { MdOutlineLock } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation for password match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    console.log("Password change request submitted");
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="bg-[#f5e5e4] min-h-[100vh]">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <div className="bg-[#fff] rounded-lg p-5 border border-[#875473] w-1/2">
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-4">
                <Link to="/verify-otp" style={{ textDecoration: "none" }}>
                  <HiArrowLeft style={{ fontSize: "24px" }} />
                </Link>
                <Typography variant="h5" style={{ fontWeight: 500 }}>
                  Set a new password
                </Typography>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-5 w-full"
            >
              {/* New Password Field */}
              <div className="w-full">
                <InputLabel htmlFor="outlined-adornment-password">
                  New Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#CD8085", // Change border color on focus
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#CD8085", // Change label color on focus
                    },
                    height: "50px", // Set the height of the TextField
                    "& .MuiInputBase-root": {
                      height: "100%", // Ensure the input base fills the TextField height
                    },
                  }}
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
                          <IoIosEyeOff className="text-[#CD8085]" />
                        ) : (
                          <IoMdEye className="text-[#CD8085]" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>

              {/* Confirm New Password Field */}
              <div className="w-full">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm New Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#CD8085",
                        outlingColor: "#CD8085",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#CD8085", // Change label color on focus
                    },
                    height: "50px", // Set the height of the TextField
                    "& .MuiInputBase-root": {
                      height: "100%", // Ensure the input base fills the TextField height
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        onClick={handleShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <IoIosEyeOff className="text-[#CD8085]" />
                        ) : (
                          <IoMdEye className="text-[#CD8085]" />
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
              <div className="w-full">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#CD8085",
                    color: "white",
                    fontSize: "16px",
                    textTransform: "none",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "30px",
                    fontWeight: "bold",
                  }}
                  type="submit"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default UpdatePassword;
