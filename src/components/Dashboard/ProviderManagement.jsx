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

const providerData = [
  {
    name: "Provider One",
    userName: "provider1",
    email: "provider1@example.com",
    location: "New York, USA",
    status: "Active",
    serviceType: "Mental Health",
    phoneNumber: "(123) 456-7890",
  },
  {
    name: "Provider Two",
    userName: "provider2",
    email: "provider2@example.com",
    location: "Los Angeles, USA",
    status: "Inactive",
    serviceType: "Education",
    phoneNumber: "(987) 654-3210",
  },
  {
    name: "Provider Three",
    userName: "provider3",
    email: "provider3@example.com",
    location: "Chicago, USA",
    status: "Pending",
    serviceType: "Nutrition",
    phoneNumber: "(555) 123-4567",
  },
  {
    name: "Provider Four",
    userName: "provider4",
    email: "provider4@example.com",
    location: "Houston, USA",
    status: "Active",
    serviceType: "Healthcare",
    phoneNumber: "(800) 234-5678",
  },
  {
    name: "Provider Five",
    userName: "provider5",
    email: "provider5@example.com",
    location: "San Francisco, USA",
    status: "Inactive",
    serviceType: "Mental Health",
    phoneNumber: "(111) 222-3333",
  },
  {
    name: "Provider Six",
    userName: "provider6",
    email: "provider6@example.com",
    location: "Miami, USA",
    status: "Active",
    serviceType: "Education",
    phoneNumber: "(444) 555-6666",
  },
  {
    name: "Provider Seven",
    userName: "provider7",
    email: "provider7@example.com",
    location: "Dallas, USA",
    status: "Pending",
    serviceType: "Nutrition",
    phoneNumber: "(777) 888-9999",
  },
  {
    name: "Provider Eight",
    userName: "provider8",
    email: "provider8@example.com",
    location: "Austin, USA",
    status: "Active",
    serviceType: "Healthcare",
    phoneNumber: "(222) 333-4444",
  },
  {
    name: "Provider Nine",
    userName: "provider9",
    email: "provider9@example.com",
    location: "Seattle, USA",
    status: "Inactive",
    serviceType: "Mental Health",
    phoneNumber: "(666) 777-8888",
  },
  {
    name: "Provider Ten",
    userName: "provider10",
    email: "provider10@example.com",
    location: "Denver, USA",
    status: "Pending",
    serviceType: "Education",
    phoneNumber: "(333) 444-5555",
  },
  {
    name: "Provider Eleven",
    userName: "provider11",
    email: "provider11@example.com",
    location: "Phoenix, USA",
    status: "Active",
    serviceType: "Healthcare",
    phoneNumber: "(123) 654-9870",
  },
  {
    name: "Provider Twelve",
    userName: "provider12",
    email: "provider12@example.com",
    location: "Orlando, USA",
    status: "Inactive",
    serviceType: "Mental Health",
    phoneNumber: "(234) 567-8901",
  },
  {
    name: "Provider Thirteen",
    userName: "provider13",
    email: "provider13@example.com",
    location: "San Diego, USA",
    status: "Active",
    serviceType: "Nutrition",
    phoneNumber: "(345) 678-9012",
  },
  {
    name: "Provider Fourteen",
    userName: "provider14",
    email: "provider14@example.com",
    location: "Los Angeles, USA",
    status: "Pending",
    serviceType: "Healthcare",
    phoneNumber: "(456) 789-0123",
  },
  {
    name: "Provider Fifteen",
    userName: "provider15",
    email: "provider15@example.com",
    location: "New York, USA",
    status: "Inactive",
    serviceType: "Mental Health",
    phoneNumber: "(567) 890-1234",
  },
  {
    name: "Provider Sixteen",
    userName: "provider16",
    email: "provider16@example.com",
    location: "Chicago, USA",
    status: "Active",
    serviceType: "Education",
    phoneNumber: "(678) 901-2345",
  },
  {
    name: "Provider Seventeen",
    userName: "provider17",
    email: "provider17@example.com",
    location: "San Francisco, USA",
    status: "Inactive",
    serviceType: "Healthcare",
    phoneNumber: "(789) 012-3456",
  },
  {
    name: "Provider Eighteen",
    userName: "provider18",
    email: "provider18@example.com",
    location: "Portland, USA",
    status: "Pending",
    serviceType: "Mental Health",
    phoneNumber: "(890) 123-4567",
  },
  {
    name: "Provider Nineteen",
    userName: "provider19",
    email: "provider19@example.com",
    location: "Miami, USA",
    status: "Active",
    serviceType: "Nutrition",
    phoneNumber: "(901) 234-5678",
  },
  {
    name: "Provider Twenty",
    userName: "provider20",
    email: "provider20@example.com",
    location: "Austin, USA",
    status: "Inactive",
    serviceType: "Education",
    phoneNumber: "(012) 345-6789",
  },
];

export default function ProviderManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providerData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = providerData.filter(
      (provider) =>
        provider.name.toLowerCase().includes(search.toLowerCase()) ||
        provider.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProviders(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (provider) => {
    setSelectedProvider(provider);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedProvider(null);
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
            <TableRow sx={{ backgroundColor: "#F0F0F0" }}>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Provider Name
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
                Service Type
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
            {filteredProviders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((provider) => (
                <TableRow key={provider.email}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {provider.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {provider.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {provider.location}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {provider.serviceType}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          provider.status.toLowerCase() === "active"
                            ? "#1EC74F"
                            : provider.status.toLowerCase() === "inactive"
                            ? "#EE5252"
                            : provider.status.toLowerCase() === "pending"
                            ? "#FFCC00"
                            : "#9e9e9e",
                        fontWeight: "600",
                      }}
                    >
                      {provider.status}
                    </span>
                  </TableCell>{" "}
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleOpenModal(provider)}>
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
        count={providerData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal to display provider details */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="provider-details-modal"
        aria-describedby="modal-to-view-provider-details"
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
          {selectedProvider && (
            <div>
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2">
                  <p>Provider Name:</p>
                  <p>Email:</p>
                  <p>Location:</p>
                  <p>Service Type:</p>
                  <p>Status:</p>
                  <p>Phone Number:</p>
                </div>
                <div className="flex flex-col gap-2 font-semibold">
                  <p>{selectedProvider.name}</p>
                  <p>{selectedProvider.email}</p>
                  <p>{selectedProvider.location}</p>
                  <p>{selectedProvider.serviceType}</p>
                  <p>{selectedProvider.status}</p>
                  <p>{selectedProvider.phoneNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
