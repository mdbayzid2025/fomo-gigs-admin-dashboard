import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { toast } from "sonner";
import { useLogInMutation } from "../Redux/api/authApi";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [login] = useLogInMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onFinish = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const values = {
      email: form.get("email"),
      password: form.get("password"),
    };

    try {
      const res = await login(values).unwrap();
      sessionStorage.setItem("accessToken", res?.data?.token);

      if (res.success) {
        toast.success("Login Successfully!");
        navigate("/");
      } else {
        toast.error("Login Error.");
      }
    } catch (error) {
      console.error("Error user login:", error);
      if (error.data.message === "User doesn't exist!") {
        toast.error("Wrong Email or User doesn't exist !");
      }
      if (error.data.message === "Password is incorrect!") {
        toast.error("Wrong Password !");
      } else {
        toast.error("Something went wrong !");
      }
    }
  };

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
          <div className="bg-[#fff] rounded-lg p-5 border border-[#131927]">
            <p className="text-3xl text-center font-semibold mb-7">
              Sign in to continue!
            </p>

            <form onSubmit={onFinish}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: (
                    <HiOutlineMailOpen className="mr-2 text-[#2454c4]" />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#0095FF", // Change border color on focus
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0095FF", // Change label color on focus (optional)
                  },
                  height: "50px", // Set the height of the TextField

                  "& .MuiInputBase-root": {
                    height: "100%", // Ensure the input base fills the TextField height
                  },
                }}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your password"
                slotProps={{
                  input: {
                    startAdornment: (
                      <MdOutlineLock className="mr-2 text-[#2454c4]" />
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <IoMdEyeOff className="text-[#131927]" />
                          ) : (
                            <IoMdEye className="text-[#131927]" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#0095FF", // Change border color on focus
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0095FF", // Change label color on focus (optional)
                  },
                  height: "50px", // Set the height of the TextField
                  "& .MuiInputBase-root": {
                    height: "100%", // Ensure the input base fills the TextField height
                  },
                }}
              />

              <div className="flex items-center justify-end mt-2">
                {/* <div className="text-[#131927] font-semibold">
                  <FormControlLabel
                    control={<Checkbox name="rememberMe" color="primary" />}
                    label="Remember Me"
                  />
                </div> */}
                <div>
                  <Link
                    to="/forgot-password"
                    style={{
                      fontWeight: "semibold",
                      textDecoration: "underline",
                      color: "#131927",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  marginTop: "20px",
                  backgroundColor: "#131927",
                  padding: "8px",
                  fontWeight: "semibold",
                  borderRadius: "20px",
                  fontSize: "16px",
                  textTransform: "none",
                }}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default SignIn;
