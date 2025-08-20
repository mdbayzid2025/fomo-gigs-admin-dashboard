import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";
import { IoMailOpen } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
// import { useForgetPasswordMutation } from "../../Redux/api/authApi";
// import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // const [forgetPassword] = useForgetPasswordMutation();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onFinish = async () => {
    const data = { email };
    console.log("Success:", data);
    navigate("/verify-otp");
    // try {
    //   const response = await forgetPassword(data).unwrap();
    //   console.log("response token", response);
    //   if (response.success === true) {
    //     localStorage.setItem("otpToken", response?.data?.forgetToken);
    //     localStorage.setItem("userEmail", email);
    //     toast.success("An OTP has been sent to your email!");
    //     navigate("/verify-otp");
    //   }
    // } catch (error) {
    //   console.error("Error sending reset code:", error);
    //   if (error.data?.message === "User not found") {
    //     toast.error("Incorrect Email.");
    //   }
    // }
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
          <div className="bg-[#fff] rounded-lg p-5 border border-[#875473]">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Link to="/sign-in" className="cursor-pointer">
                  <HiArrowLeft style={{ fontSize: "24px", color: "black" }} />
                </Link>
                <p className="text-2xl font-medium">Forget Password</p>
              </div>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ marginBottom: "20px" }}
              >
                Please enter your email address to reset your password
              </Typography>
            </div>

            <form onSubmit={onFinish}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                InputProps={{
                  startAdornment: (
                    <IoMailOpen
                      style={{ fontSize: "24px", marginRight: "8px" }}
                    />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#CD8085", // Change border color on focus
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#CD8085", // Change label color on focus (optional)
                  },
                  height: "50px", // Set the height of the TextField
                  "& .MuiInputBase-root": {
                    height: "100%", // Ensure the input base fills the TextField height
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  marginTop: "20px",
                  backgroundColor: "#CD8085",
                  padding: "8px",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  fontSize: "16px",
                  textTransform: "none",
                }}
              >
                Send OTP
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default ForgotPassword;
