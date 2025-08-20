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

// Updated client data
const clientData = [
  {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    clientLocation: "New York, USA",
    clientStatus: "Active",
    clientPhoneNumber: "(123) 456-7890",
  },
  {
    clientName: "Jane Smith",
    clientEmail: "jane.smith@example.com",
    clientLocation: "Los Angeles, USA",
    clientStatus: "Inactive",
    clientPhoneNumber: "(987) 654-3210",
  },
  {
    clientName: "Robert Johnson",
    clientEmail: "robert.johnson@example.com",
    clientLocation: "Chicago, USA",
    clientStatus: "Pending",
    clientPhoneNumber: "(555) 123-4567",
  },
  {
    clientName: "Mary Williams",
    clientEmail: "mary.williams@example.com",
    clientLocation: "Austin, USA",
    clientStatus: "Active",
    clientPhoneNumber: "(800) 234-5678",
  },
  {
    clientName: "Patricia Brown",
    clientEmail: "patricia.brown@example.com",
    clientLocation: "Dallas, USA",
    clientStatus: "Inactive",
    clientPhoneNumber: "(111) 222-3333",
  },
  // Add more clients as necessary
];

export default function ClientManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredClients, setFilteredClients] = useState(clientData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = clientData.filter(
      (client) =>
        client.clientName.toLowerCase().includes(search.toLowerCase()) ||
        client.clientEmail.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredClients(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (client) => {
    setSelectedClient(client);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedClient(null);
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
          placeholder="Search by Client Name or Email"
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
                Client Name
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
            {filteredClients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((client) => (
                <TableRow key={client.clientEmail}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {client.clientName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {client.clientEmail}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {client.clientLocation}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          client.clientStatus.toLowerCase() === "active"
                            ? "#1EC74F"
                            : client.clientStatus.toLowerCase() === "inactive"
                            ? "#EE5252"
                            : client.clientStatus.toLowerCase() === "pending"
                            ? "#FFCC00"
                            : "#9e9e9e",
                        fontWeight: "600",
                      }}
                    >
                      {client.clientStatus}
                    </span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleOpenModal(client)}>
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
        count={clientData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal to display client details */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="client-details-modal"
        aria-describedby="modal-to-view-client-details"
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
          {selectedClient && (
            <div>
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2">
                  <p>Client Name:</p>
                  <p>Email:</p>
                  <p>Location:</p>
                  <p>Status:</p>
                  <p>Phone Number:</p>
                </div>
                <div className="flex flex-col gap-2 font-semibold">
                  <p>{selectedClient.clientName}</p>
                  <p>{selectedClient.clientEmail}</p>
                  <p>{selectedClient.clientLocation}</p>
                  <p>{selectedClient.clientStatus}</p>
                  <p>{selectedClient.clientPhoneNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
