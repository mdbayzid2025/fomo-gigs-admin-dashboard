import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  InputBase,
  InputAdornment,
  Button,
  Modal,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const userData = [
  {
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    userLocation: "New York, USA",
    userStatus: "Active",
    userPhoneNumber: "(123) 456-7890",
    profilePicture:
      "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg",
    bio: "Avid traveler and tech enthusiast. Exploring the world one city at a time.",
    followers: 3500,
    following: 800,
    createdAt: "2020-01-15",
    lastActive: "2025-09-06",
    dateOfBirth: "1990-05-14",
    socialLinks: {
      instagram: "https://www.instagram.com/johndoe",
      twitter: "https://www.twitter.com/johndoe",
      linkedin: "https://www.linkedin.com/in/johndoe",
    },
    profileStatus: "Living the dream!",
    profileViews: 12345,
    totalPosts: 98,
    profileCompletion: 85,
    membershipLevel: "Premium",
    accountVerification: "Verified",
    interests: ["Travel", "Technology", "Photography", "Cycling"],
  },
  {
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    userLocation: "Los Angeles, USA",
    userStatus: "Inactive",
    userPhoneNumber: "(987) 654-3210",
    profilePicture:
      "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg",
    bio: "Content creator and digital marketing strategist.",
    followers: 1200,
    following: 300,
    createdAt: "2018-11-20",
    lastActive: "2025-06-15",
    dateOfBirth: "1985-08-22",
    socialLinks: {
      instagram: "https://www.instagram.com/janesmith",
      twitter: "https://www.twitter.com/janesmith",
    },
    profileStatus: "Helping businesses grow online.",
    profileViews: 8976,
    totalPosts: 150,
    profileCompletion: 90,
    membershipLevel: "VIP",
    accountVerification: "Verified",
    interests: ["Digital Marketing", "Fitness", "Food Blogging"],
  },
  {
    userName: "Robert Johnson",
    userEmail: "robert.johnson@example.com",
    userLocation: "Chicago, USA",
    userStatus: "Pending",
    userPhoneNumber: "(555) 123-4567",
    profilePicture:
      "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg",
    bio: "Check out my latest work!",
    followers: 2500,
    following: 500,
    createdAt: "2022-02-10",
    lastActive: "2025-08-25",
    dateOfBirth: "1992-03-03",
    socialLinks: {
      instagram: "https://www.instagram.com/robertjohnson",
    },
    profileStatus: "Let’s create something amazing!",
    profileViews: 3200,
    totalPosts: 45,
    profileCompletion: 70,
    membershipLevel: "Free",
    accountVerification: "Not Verified",
    interests: ["Music", "Art", "Video Production"],
  },
  {
    userName: "Mary Williams",
    userEmail: "mary.williams@example.com",
    userLocation: "Austin, USA",
    userStatus: "Active",
    userPhoneNumber: "(800) 234-5678",
    profilePicture:
      "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg",
    bio: "Fitness enthusiast. Let's keep moving!",
    followers: 8000,
    following: 1200,
    createdAt: "2019-06-05",
    lastActive: "2025-09-05",
    dateOfBirth: "1993-11-12",
    socialLinks: {
      instagram: "https://www.instagram.com/marywilliams",
      twitter: "https://www.twitter.com/marywilliams",
    },
    profileStatus: "Stronger every day!",
    profileViews: 15000,
    totalPosts: 240,
    profileCompletion: 95,
    membershipLevel: "VIP",
    accountVerification: "Verified",
    interests: ["Fitness", "Yoga", "Nutrition", "Meditation"],
  },
  {
    userName: "Patricia Brown",
    userEmail: "patricia.brown@example.com",
    userLocation: "Dallas, USA",
    userStatus: "Inactive",
    userPhoneNumber: "(111) 222-3333",
    profilePicture:
      "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg",
    bio: "Exploring the world, one step at a time.",
    followers: 4500,
    following: 1300,
    createdAt: "2021-03-11",
    lastActive: "2025-07-30",
    dateOfBirth: "1995-07-21",
    socialLinks: {
      instagram: "https://www.instagram.com/patriciabrown",
    },
    profileStatus: "Adventure is out there!",
    profileViews: 9850,
    totalPosts: 120,
    profileCompletion: 88,
    membershipLevel: "Premium",
    accountVerification: "Not Verified",
    interests: ["Travel", "Photography", "Writing"],
  },
];

export default function UserManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredusers, setFilteredusers] = useState(userData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selecteduser, setSelecteduser] = useState(null);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = userData.filter(
      (user) =>
        user.userName.toLowerCase().includes(search.toLowerCase()) ||
        user.userEmail.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredusers(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (user) => {
    setSelecteduser(user);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelecteduser(null);
  };

  return (
    <div className="px-10 py-8 bg-[#fbfbfb] h-[92vh]">
      <div className="flex items-center justify-end mb-4">
        <TextField
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#131927",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "20px",
            },
            height: "40px",
            "& .MuiInputBase-root": {
              height: "100%",
            },
          }}
          placeholder="Search by user Name or Email"
          value={searchText}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          }
        />
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F0F0F0" }}>
              <TableCell sx={{ textAlign: "center", fontWeight: "600" }}>
                User Name
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Location
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredusers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.userEmail}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.userName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.userEmail}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.userLocation}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          user.userStatus.toLowerCase() === "active"
                            ? "#1EC74F"
                            : user.userStatus.toLowerCase() === "inactive"
                            ? "#EE5252"
                            : user.userStatus.toLowerCase() === "pending"
                            ? "#FFCC00"
                            : "#9e9e9e",
                        fontWeight: "600",
                      }}
                    >
                      {user.userStatus}
                    </span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleOpenModal(user)}>
                      <FiEye className="text-lg text-[#131927]" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal to display user details */}
      <Modal open={openDetailsModal} onClose={handleCloseModal}>
        {/* Overlay & centering */}
        {/* <div className="fixed inset-0 grid place-items-center p-4"> */}
        {/* Modal panel */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white rounded-2xl shadow-lg outline-none p-6 md:p-8 max-h-[85vh] overflow-y-auto animate-fadeIn
      "
        >
          {selecteduser && (
            <CardContent className="p-0">
              <Typography variant="h5" gutterBottom>
                {selecteduser.userName}
              </Typography>

              <Box className="flex justify-center mb-4">
                <img
                  src={selecteduser.profilePicture}
                  alt={selecteduser.userName}
                  className="size-24 sm:size-32 md:size-40 lg:size-48 rounded-full object-cover"
                />
              </Box>

              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                {selecteduser.userEmail}
              </Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-1"
              >
                <strong>Bio:</strong> {selecteduser.bio}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-1"
              >
                <strong>Location:</strong> {selecteduser.userLocation}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-1"
              >
                <strong>Phone Number:</strong> {selecteduser.userPhoneNumber}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-1"
              >
                <strong>Followers:</strong> {selecteduser.followers}{" "}
                <strong>Following:</strong> {selecteduser.following}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-1"
              >
                <strong>Account Created:</strong> {selecteduser.createdAt}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-1"
              >
                <strong>Last Active:</strong> {selecteduser.lastActive}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-1"
              >
                <strong>Profile Views:</strong> {selecteduser.profileViews}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-1"
              >
                <strong>Profile Completion:</strong>{" "}
                {selecteduser.profileCompletion}%
              </Typography>

              <Typography variant="body2" color="textSecondary">
                <strong>Social Links:</strong>{" "}
                <a
                  href={selecteduser.socialLinks?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Instagram
                </a>
                {", "}
                <a
                  href={selecteduser.socialLinks?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Twitter
                </a>
              </Typography>
            </CardContent>
          )}
        </div>
      </Modal>
    </div>
  );
}
