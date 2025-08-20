import React, { useState } from "react";
import { Button, Grid, Typography, Container } from "@mui/material";
import OTPInput from "react-otp-input";
import { HiArrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
// import { useVerifyOtpMutation } from "../../Redux/api/authApi";
// import { toast } from "sonner";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  //   const [verifyOtp] = useVerifyOtpMutation();

  const handleOTPSubmit = async () => {
    navigate("/update-password");

    if (otp.length < 6) {
      alert("Please fill in all OTP fields");
      return;
    }
    // const token = localStorage.getItem("otpToken");
    // if (!token) {
    //   alert("Error! Please start the reset process again.");
    //   navigate("/forgot-password");
    //   return;
    // }
    // try {
    //   const data = { token, otp };
    //   const response = await verifyOtp(data).unwrap();
    //   if (response.success === true) {
    //     localStorage.setItem(
    //       "verifiedOtpToken",
    //       response?.data?.forgetOtpMatchToken
    //     );
    //     toast.success("OTP verified successfully!");
    //     navigate("/reset-password");
    //   }
    // } catch (error) {
    //   console.error("Error verifying OTP:", error);
    //   if (error.data?.message === "Invalid OTP") {
    //     toast.error("Invalid OTP. Please try again.");
    //   } else {
    //     toast.error("Failed to verify OTP. Please try again.");
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
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-4">
                <Link to="/forgot-password" className="cursor-pointer">
                  <HiArrowLeft style={{ fontSize: "24px" }} />
                </Link>
                <Typography variant="h5" style={{ fontWeight: 500 }}>
                  Enter verification code
                </Typography>
              </div>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ marginBottom: "20px" }}
              >
                Please enter the OTP sent to your email address
              </Typography>
            </div>

            <div className="flex items-center justify-center">
              <OTPInput
                inputStyle={{
                  width: "55px",
                  height: "45px",
                  fontSize: "20px",
                  backgroundColor: "transparent",
                  border: "1px solid #CD8085",
                  borderRadius: "8px",
                  margin: "5px",
                  textAlign: "center",
                }}
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} required />}
              />
            </div>

            <Button
              fullWidth
              variant="contained"
              style={{
                marginTop: "20px",
                backgroundColor: "#CD8085",
                padding: "8px",
                fontWeight: "bold",
                borderRadius: "30px",
                fontSize: "16px",
                textTransform: "none",
              }}
              onClick={handleOTPSubmit}
            >
              Verify
            </Button>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default VerifyOtp;
