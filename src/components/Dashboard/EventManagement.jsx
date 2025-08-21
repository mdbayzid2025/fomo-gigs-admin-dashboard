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
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

// Updated event data
const eventData = [
  {
    eventDate: "2025-09-10",
    eventId: "EVT123456",
    eventName: "Music Concert",
    location: "New York, USA",
    status: "Scheduled",
    category: "Music",
    price: "$100.00",
  },
  {
    eventDate: "2025-09-15",
    eventId: "EVT123457",
    eventName: "Tech Conference",
    location: "San Francisco, USA",
    status: "Ongoing",
    category: "Technology",
    price: "$350.00",
  },
  {
    eventDate: "2025-09-20",
    eventId: "EVT123458",
    eventName: "Art Exhibition",
    location: "Los Angeles, USA",
    status: "Completed",
    category: "Art",
    price: "$50.00",
  },
  {
    eventDate: "2025-09-25",
    eventId: "EVT123459",
    eventName: "Food Festival",
    location: "Chicago, USA",
    status: "Scheduled",
    category: "Food & Drink",
    price: "$40.00",
  },
  {
    eventDate: "2025-09-30",
    eventId: "EVT123460",
    eventName: "Fashion Show",
    location: "Miami, USA",
    status: "Cancelled",
    category: "Fashion",
    price: "$150.00",
  },
  // Add more events as necessary
];

export default function EventManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = eventData.filter(
      (event) =>
        event.eventId.toLowerCase().includes(search.toLowerCase()) ||
        event.eventName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEvents(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedEvent(null);
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
          placeholder="Search by Event ID or Event Name"
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
                Event ID
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Event Name
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
                Category
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
            {filteredEvents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event) => (
                <TableRow key={event.eventId}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {event.eventId}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {event.eventName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {event.location}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {event.category}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          event.status.toLowerCase() === "scheduled"
                            ? "#FFCC00"
                            : event.status.toLowerCase() === "ongoing"
                            ? "#1EC74F"
                            : event.status.toLowerCase() === "completed"
                            ? "#00B5E2"
                            : event.status.toLowerCase() === "cancelled"
                            ? "#EE5252"
                            : "#9e9e9e",
                        fontWeight: "600",
                      }}
                    >
                      {event.status}
                    </span>
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleOpenModal(event)}>
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
        count={eventData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal to display event details */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="event-details-modal"
        aria-describedby="modal-to-view-event-details"
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
          {selectedEvent && (
            <div>
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2">
                  <p>Event ID:</p>
                  <p>Event Name:</p>
                  <p>Location:</p>
                  <p>Category:</p>
                  <p>Status:</p>
                  <p>Price:</p>
                  <p>Event Date:</p>
                </div>
                <div className="flex flex-col gap-2 font-semibold">
                  <p>{selectedEvent.eventId}</p>
                  <p>{selectedEvent.eventName}</p>
                  <p>{selectedEvent.location}</p>
                  <p>{selectedEvent.category}</p>
                  <p>{selectedEvent.status}</p>
                  <p>{selectedEvent.price}</p>
                  <p>{selectedEvent.eventDate}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
