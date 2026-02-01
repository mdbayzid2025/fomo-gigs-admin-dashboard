import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Modal,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useGetServiceBookingsQuery } from "../../Redux/api/serviceApi";

export default function ServiceBooking() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: bookingData, isLoading, isError } = useGetServiceBookingsQuery();
  const bookings = bookingData?.data || [];
  console.log("service bookings", bookings);

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.serviceName?.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.customerName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
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
        <p className="text-red-500 text-lg">Failed to load bookings.</p>
      </div>
    );
  }

  return (
    <div className="px-10 py-8 bg-[#fbfbfb] h-[92vh]">
      {/* Header with Search */}
      <div className="flex justify-between gap-3 items-center mb-4">
        <p className="text-xl font-semibold">Service Booking</p>
        <div className="flex items-center gap-3">
          <TextField
            sx={{ width: 300 }}
            placeholder="Search Service or Customer"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      {/* Table */}
      <TableContainer className="rounded-xl shadow bg-white">
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Service Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Customer
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Provider
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Amount
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredBookings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell align="center">{booking.serviceName}</TableCell>
                  <TableCell align="center">{booking.customerName}</TableCell>
                  <TableCell align="center">{booking.providerName}</TableCell>
                  <TableCell align="center">
                    {new Date(booking.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">{booking.amount}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={booking.status}
                      color={getStatusColor(booking.status)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleOpenModal(booking)}
                      color="primary"
                    >
                      <MdVisibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredBookings.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />

      {/* Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="absolute top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Booking Details</h2>
            <IconButton onClick={handleCloseModal}>
              <IoClose />
            </IconButton>
          </div>

          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Service:</span>
                <span className="font-semibold text-gray-800">
                  {selectedBooking.serviceName}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Customer:</span>
                <span className="text-gray-800">
                  {selectedBooking.customerName}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Provider:</span>
                <span className="text-gray-800">
                  {selectedBooking.providerName}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Date:</span>
                <span className="text-gray-800">
                  {new Date(selectedBooking.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Amount:</span>
                <span className="text-gray-800">{selectedBooking.amount}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-600">Status:</span>
                <Chip
                  label={selectedBooking.status}
                  color={getStatusColor(selectedBooking.status)}
                  size="small"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{
                textTransform: "none",
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#1565c0" },
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
