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
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

// Updated user data
const userData = [
  {
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    userLocation: "New York, USA",
    userStatus: "Active",
    userPhoneNumber: "(123) 456-7890",
  },
  {
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    userLocation: "Los Angeles, USA",
    userStatus: "Inactive",
    userPhoneNumber: "(987) 654-3210",
  },
  {
    userName: "Robert Johnson",
    userEmail: "robert.johnson@example.com",
    userLocation: "Chicago, USA",
    userStatus: "Pending",
    userPhoneNumber: "(555) 123-4567",
  },
  {
    userName: "Mary Williams",
    userEmail: "mary.williams@example.com",
    userLocation: "Austin, USA",
    userStatus: "Active",
    userPhoneNumber: "(800) 234-5678",
  },
  {
    userName: "Patricia Brown",
    userEmail: "patricia.brown@example.com",
    userLocation: "Dallas, USA",
    userStatus: "Inactive",
    userPhoneNumber: "(111) 222-3333",
  },
  // Add more users as necessary
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
                borderColor: "#131927", // Change border color on focus
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "20px", // Apply border-radius to the outline
            },
            height: "40px", // Set the height of the TextField
            "& .MuiInputBase-root": {
              height: "100%", // Ensure the input base fills the TextField height
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
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                User Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Location
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
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
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="user-details-modal"
        aria-describedby="modal-to-view-user-details"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            backgroundColor: "#FDFDFD",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            borderRadius: "8px",
          }}
        >
          {selecteduser && (
            <div>
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2">
                  <p>User Name:</p>
                  <p>Email:</p>
                  <p>Location:</p>
                  <p>Status:</p>
                  <p>Phone Number:</p>
                </div>
                <div className="flex flex-col gap-2 font-semibold">
                  <p>{selecteduser.userName}</p>
                  <p>{selecteduser.userEmail}</p>
                  <p>{selecteduser.userLocation}</p>
                  <p>{selecteduser.userStatus}</p>
                  <p>{selecteduser.userPhoneNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
