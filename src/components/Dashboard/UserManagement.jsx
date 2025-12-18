import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  InputAdornment,
  IconButton,
  Modal,
  TextField,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useGetAllUsersQuery } from "../../Redux/api/usersApi";
import Info from "../UI/Info";
import { getImageUrl } from "../../utils/baseUrl";

export default function UserManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const imageUrl = getImageUrl();

  const { data: allUserData, isLoading, isError } = useGetAllUsersQuery();

  const userData = allUserData?.data?.data || [];
  console.log("userdata", userData);

  /* ✅ Sync filtered users when API data loads */
  useEffect(() => {
    setFilteredUsers(userData);
  }, [userData]);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);

    const filtered = userData.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
    setPage(0);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <p className="text-red-500 text-lg">
          Something went wrong. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="px-10 py-8 bg-[#fbfbfb] h-[92vh]">
      {/* Search */}
      <div className="flex justify-end mb-4">
        <TextField
          sx={{
            width: 300,
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "20px",
            },
          }}
          placeholder="Search by user Name or Email"
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Table */}
      <TableContainer sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
              {["User Name", "Email", "Country", "Status", "Action"].map(
                (head) => (
                  <TableCell
                    key={head}
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.userEmail}>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.countryName || "N/A"}
                  </TableCell>

                  <TableCell align="center">
                    <span
                      style={{
                        padding: "8px 14px",
                        borderRadius: "12px",
                        color: "white",
                        fontWeight: 600,
                        backgroundColor:
                          user.status?.toLowerCase() === "active"
                            ? "#1EC74F"
                            : user.status?.toLowerCase() === "inactive"
                            ? "#EE5252"
                            : "#FFCC00",
                      }}
                    >
                      {user.status
                        ? user.status.charAt(0).toUpperCase() +
                          user.status.slice(1).toLowerCase()
                        : ""}
                    </span>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenModal(user)}>
                      <FiEye />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal */}
      <Modal open={openDetailsModal} onClose={handleCloseModal}>
        <div className="absolute top-1/2 left-1/2 w-[95%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 outline-none">
          {/* Close Button */}
          <IconButton
            onClick={handleCloseModal}
            className="absolute top-3 right-3"
          >
            <IoClose />
          </IconButton>

          {selectedUser && (
            <>
              {/* Header */}
              <div className="flex flex-col items-center gap-3 mb-6">
                <img
                  src={`${imageUrl}${selectedUser.profileImage}`}
                  alt={selectedUser.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
                />

                <h2 className="text-xl font-semibold">{selectedUser.name}</h2>

                <div className="flex gap-2 items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      selectedUser.status === "ACTIVE"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {selectedUser.status.charAt(0).toUpperCase() +
                      selectedUser.status.slice(1).toLowerCase()}
                  </span>

                  {selectedUser.verified && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Bio */}
              {selectedUser.bio && (
                <p className="text-sm text-gray-600 text-center mb-6">
                  {selectedUser.bio}
                </p>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <Info label="Email" value={selectedUser.email} />
                <Info
                  label="Phone"
                  value={`${selectedUser.countryCode} ${selectedUser.phone}`}
                />
                <Info label="Gender" value={selectedUser.gender} />
                <Info label="Date of Birth" value={selectedUser.dateOfBirth} />
                <Info label="Country" value={selectedUser.countryName} />
                <Info label="Role" value={selectedUser.role} />
                <Info
                  label="Provider Profile"
                  value={selectedUser.serviceProviderProfileStatus}
                />
                <Info
                  label="Joined"
                  value={new Date(selectedUser.createdAt).toLocaleDateString()}
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
