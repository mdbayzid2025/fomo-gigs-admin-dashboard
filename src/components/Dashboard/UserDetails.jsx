import { useState } from "react";
import {
  TableContainer,
  Table,
  Paper,
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

const usersData = [
  {
    name: "Alice Johnson",
    userName: "alicej",
    email: "alice.johnson@example.com",
    location: "New York, USA",
    status: "Active",
    parentingJourney: "Starting",
  },
  {
    name: "Bob Smith",
    userName: "bobsmith",
    email: "bob.smith@example.com",
    location: "Los Angeles, USA",
    status: "Inactive",
    parentingJourney: "Managing Day-to-Day",
  },
  {
    name: "Carol White",
    userName: "carolw",
    email: "carol.white@example.com",
    location: "Chicago, USA",
    status: "Active",
    parentingJourney: "Mentor Ready",
  },
  {
    name: "David Lee",
    userName: "davidl",
    email: "david.lee@example.com",
    location: "Houston, USA",
    status: "Pending",
    parentingJourney: "Starting",
  },
  {
    name: "Eva Green",
    userName: "evagreen",
    email: "eva.green@example.com",
    location: "Phoenix, USA",
    status: "Active",
    parentingJourney: "Managing Day-to-Day",
  },
  {
    name: "Frank Moore",
    userName: "frankm",
    email: "frank.moore@example.com",
    location: "Philadelphia, USA",
    status: "Active",
    parentingJourney: "Mentor Ready",
  },
  {
    name: "Grace Kim",
    userName: "gracek",
    email: "grace.kim@example.com",
    location: "San Antonio, USA",
    status: "Inactive",
    parentingJourney: "Starting",
  },
  {
    name: "Henry Clark",
    userName: "henryc",
    email: "henry.clark@example.com",
    location: "San Diego, USA",
    status: "Active",
    parentingJourney: "Managing Day-to-Day",
  },
  {
    name: "Isabel Turner",
    userName: "isabelt",
    email: "isabel.turner@example.com",
    location: "Dallas, USA",
    status: "Pending",
    parentingJourney: "Mentor Ready",
  },
  {
    name: "Jackie Adams",
    userName: "jackiea",
    email: "jackie.adams@example.com",
    location: "San Jose, USA",
    status: "Active",
    parentingJourney: "Starting",
  },
  {
    name: "Liam Williams",
    userName: "liamw",
    email: "liam.williams@example.com",
    location: "Seattle, USA",
    status: "Active",
    parentingJourney: "Managing Day-to-Day",
  },
  {
    name: "Megan Brown",
    userName: "meganb",
    email: "megan.brown@example.com",
    location: "Boston, USA",
    status: "Inactive",
    parentingJourney: "Mentor Ready",
  },
  {
    name: "Nina Patel",
    userName: "ninap",
    email: "nina.patel@example.com",
    location: "Miami, USA",
    status: "Active",
    parentingJourney: "Starting",
  },
  {
    name: "Oscar Ramirez",
    userName: "oscar.r",
    email: "oscar.ramirez@example.com",
    location: "Denver, USA",
    status: "Pending",
    parentingJourney: "Managing Day-to-Day",
  },
  {
    name: "Penny Moore",
    userName: "pennym",
    email: "penny.moore@example.com",
    location: "Las Vegas, USA",
    status: "Active",
    parentingJourney: "Mentor Ready",
  },
  {
    name: "Quincy Davis",
    userName: "quincyd",
    email: "quincy.davis@example.com",
    location: "Orlando, USA",
    status: "Inactive",
    parentingJourney: "Starting",
  },
  {
    name: "Rachel Green",
    userName: "rachelg",
    email: "rachel.green@example.com",
    location: "Miami, USA",
    status: "Active",
    parentingJourney: "Managing Day-to-Day",
  },
  {
    name: "Steve Harris",
    userName: "steveh",
    email: "steve.harris@example.com",
    location: "Austin, USA",
    status: "Active",
    parentingJourney: "Mentor Ready",
  },
  {
    name: "Tina Roberts",
    userName: "tinar",
    email: "tina.roberts@example.com",
    location: "Portland, USA",
    status: "Inactive",
    parentingJourney: "Starting",
  },
  {
    name: "Ursula Black",
    userName: "ursulab",
    email: "ursula.black@example.com",
    location: "Salt Lake City, USA",
    status: "Pending",
    parentingJourney: "Managing Day-to-Day",
  },
  {
    name: "Vera Johnson",
    userName: "veraj",
    email: "vera.johnson@example.com",
    location: "St. Louis, USA",
    status: "Active",
    parentingJourney: "Mentor Ready",
  },
];

export default function UserDetails() {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = usersData.filter(
      (user) =>
        user.userName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
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
    setSelectedUser(user);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="px-10 py-8 bg-[#fdfdfd] h-[92vh]">
      <div className="flex items-center justify-end mb-4">
        <TextField
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#CD8085", // Change border color on focus
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
          placeholder="Search by Name or Email"
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
            <TableRow sx={{ backgroundColor: "#CD8085" }}>
              <TableCell
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Location
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Parenting Journey
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
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
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.email}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.location}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.parentingJourney}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          user.status.toLowerCase() === "active"
                            ? "#1EC74F"
                            : user.status.toLowerCase() === "inactive"
                            ? "#EE5252"
                            : user.status.toLowerCase() === "pending"
                            ? "#FFCC00"
                            : "#9e9e9e",
                        fontWeight: "600",
                      }}
                    >
                      {user.status}
                    </span>
                  </TableCell>{" "}
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleOpenModal(user)}>
                      <FiEye className="text-lg text-[#cd8a0d]" />
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
        count={usersData.length}
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
          {selectedUser && (
            <div>
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2">
                  <p>Name:</p>
                  <p>Email:</p>
                  <p>Location:</p>
                  <p>Parenting Journey:</p>
                  <p>Status:</p>
                </div>
                <div className="flex flex-col gap-2 font-semibold">
                  <p>{selectedUser.name}</p>
                  <p>{selectedUser.email}</p>
                  <p>{selectedUser.location}</p>
                  <p>{selectedUser.parentingJourney}</p>
                  <p>{selectedUser.status}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
