/* eslint-disable no-unused-vars */
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from "@mui/material";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "../Redux/api/authApi";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading: updatingPassword }] =
    useUpdatePasswordMutation();

  const handleShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = {
      newPassword,
      confirmPassword,
    };

    try {
      const response = await resetPassword(data).unwrap();

      if (response.success) {
        toast.success("Password Updated Successfully");
        setNewPassword("");
        setConfirmPassword("");
        navigate("/sign-in");
      } else {
        toast.error(response.message || "Failed to reset password.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to reset password.");
    }
  };

  if (updatingPassword) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-[#fbfbfb] min-h-[100vh]">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <div className="bg-[#fff] rounded-lg p-5 border border-[#131927] w-1/2">
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
                        borderColor: "#0095FF", // Change border color on focus
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0095FF", // Change label color on focus
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
                          <IoIosEyeOff className="text-[#131927]" />
                        ) : (
                          <IoMdEye className="text-[#131927]" />
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
              <div className="w-full">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#131927",
                    color: "white",
                    fontSize: "16px",
                    textTransform: "none",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "20px",
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
