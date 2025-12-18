import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { MdArrowBackIosNew } from "react-icons/md";

import profileImg from "../../../../public/Images/profile.png";
import {
  useEditProfileMutation,
  useGetProfileQuery,
} from "../../../Redux/api/usersApi";
import { getImageUrl } from "../../../utils/baseUrl";
import { toast } from "sonner";

export default function Profile() {
  const imageUrl = getImageUrl();

  /* ===================== STATE ===================== */
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("BD");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const [profileImage, setProfileImage] = useState(profileImg);
  const [imageFile, setImageFile] = useState(null);

  /* ===================== API ===================== */
  const {
    data: profileInfo,
    isLoading: loadingProfile,
    isError: profileError,
    refetch,
  } = useGetProfileQuery();

  const profileData = profileInfo?.data;

  const [updateProfile, { isLoading: updatingProfile }] =
    useEditProfileMutation();

  /* ===================== POPULATE DATA ===================== */
  useEffect(() => {
    if (!profileData) return;

    setName(profileData.name || "");
    setUserName(profileData.userName || "");
    setEmail(profileData.email || "");
    setBio(profileData.bio || "");
    setPhone(profileData.phone || "");
    setCountryCode(profileData.countryCode || "BD");
    setDateOfBirth(profileData.dateOfBirth || "");
    setGender(profileData.gender || "");

    if (profileData.profileImage) {
      setProfileImage(imageUrl + profileData.profileImage);
    }
  }, [profileData, imageUrl]);

  /* ===================== IMAGE HANDLER ===================== */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async () => {
    if (!name.trim()) return toast.warning("Name is required");
    if (!userName.trim()) return toast.warning("Username is required");

    try {
      const formData = new FormData();

      const payload = {
        name: name.trim(),
        userName: userName.trim(),
        gender,
        dateOfBirth,
        bio,
      };

      formData.append("data", JSON.stringify(payload));

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const res = await updateProfile(formData).unwrap();
      console.log("update response", res);
      if (res.success) {
        toast.success("Profile updated successfully");
        refetch();
        setImageFile(null);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  /* ===================== UI STATES ===================== */
  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <p className="text-red-500">Something went wrong</p>
      </div>
    );
  }

  /* ===================== RENDER ===================== */
  return (
    <div className="flex flex-col gap-10 w-full bg-white h-screen p-20">
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

      <div className="flex gap-20">
        {/* ===== PROFILE IMAGE ===== */}
        <div className="relative h-44">
          <img
            src={profileImage}
            alt="Profile"
            className="size-48 object-cover bg-gray-100"
          />

          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "#fff",
            }}
          >
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <FiEdit className="text-[#0095FF]" />
          </IconButton>
        </div>

        {/* ===== FORM ===== */}
        <div className="flex flex-col gap-6 w-2/3">
          <div className="flex gap-4">
            <TextField
              label="Name"
              fullWidth
              value={name}
              size="small"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Username"
              fullWidth
              value={userName}
              size="small"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <TextField
            label="Email"
            value={email}
            size="small"
            disabled
            fullWidth
          />

          <TextField
            label="Bio"
            multiline
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <div className="flex gap-4">
            <TextField
              label="Country Code"
              value={countryCode}
              size="small"
              onChange={(e) => setCountryCode(e.target.value)}
              sx={{ width: "30%" }}
            />
            <TextField
              label="Phone"
              fullWidth
              value={phone}
              size="small"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <TextField
              type="date"
              label="Date of Birth"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />

            <TextField
              select
              label="Gender"
              fullWidth
              value={gender}
              size="small"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </TextField>
          </div>

          <Box>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={updatingProfile}
              sx={{
                backgroundColor: "#0095FF",
                width: "40%",
                textTransform: "none",
                float: "right",
              }}
            >
              {updatingProfile ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Save & Update"
              )}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}
