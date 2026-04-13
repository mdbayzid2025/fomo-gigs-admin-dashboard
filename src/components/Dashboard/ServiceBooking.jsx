import { useEffect, useState } from "react";
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
  Avatar,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { MdVisibility, MdWork } from "react-icons/md";
import { IoClose, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { LuBanknote } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import { useGetServiceBookingsQuery } from "../../Redux/api/serviceApi";
import { getImageUrl } from "../../utils/baseUrl";
import ManagePagination from "../Shared/ManagePagination";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";

export default function ServiceBooking() {
  const [searchText, setSearchText] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const imageUrl = getImageUrl();

  const {
    data: bookingData,
    isLoading,
    isError,
    refetch
  } = useGetServiceBookingsQuery();
  const providers = bookingData?.data || [];  

  const { page, limit, searchTerm } = getSearchParams()

  const updateSearchParams = useUpdateSearchParams()
  /* ✅ Sync filtered users when API data loads */
  useEffect(() => {
    refetch()
  }, [page, limit, searchTerm]);

  useEffect(() => {
    updateSearchParams({ searchTerm: searchText })
  }, [searchText])

  const handleOpenModal = (provider) => {
    setSelectedProvider(provider);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProvider(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "PENDING":
        return "warning";
      case "REJECTED":
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
        <p className="text-red-500 text-lg">Failed to load booking data.</p>
      </div>
    );
  }

  return (
    <div className="px-10 py-8 bg-[#fbfbfb] h-[92vh]">
      {/* Header with Search */}
      <div className="flex justify-between gap-3 items-center mb-4">
        <p className="text-xl font-semibold">Service Booking Stats</p>
        <div className="flex items-center gap-3">
          <TextField
            sx={{ width: 300 }}
            placeholder="Search Name or Email"
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
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Location
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Total Bookings
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Completed
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Total Revenue
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
            {providers
              .map((row, index) => (
                <TableRow key={row.serviceProviderId || index}>
                  <TableCell align="center">
                    <div className="flex items-center gap-2 pl-10 ">
                      <img
                        src={`${imageUrl}${row.profileImage}`}
                        alt={row.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {row.city}, {row.country}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.totalBookings}
                      size="small"
                      sx={{
                        backgroundColor: "#E3F2FD",
                        color: "#1976D2",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-green-600 font-medium"
                  >
                    {row.completedBookings}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    ${row.totalRevenue}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.status}
                      color={getStatusColor(row.status)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleOpenModal(row)}
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

      <ManagePagination meta={bookingData?.meta} />

      {/* Enhanced Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="absolute top-1/2 left-1/2 w-[550px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl overflow-hidden outline-none">
          {/* Modal Header */}
          <div className="bg-[#131927] p-6 flex justify-between items-center text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MdWork className="text-2xl" /> Provider Booking Details
            </h2>
            <IconButton
              onClick={handleCloseModal}
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <IoClose />
            </IconButton>
          </div>

          {selectedProvider && (
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {/* Provider Profile Card */}
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <img
                  src={`${imageUrl}${selectedProvider.profileImage}`}
                  alt={selectedProvider.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {selectedProvider.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <IoMailOutline />
                    <span>{selectedProvider.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <IoLocationOutline />
                    <span>
                      {selectedProvider.city}, {selectedProvider.country}
                    </span>
                  </div>
                </div>
                <div className="ml-auto">
                  <Chip
                    label={selectedProvider.status}
                    color={getStatusColor(selectedProvider.status)}
                    size="small"
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center justify-center border border-blue-100">
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
                    Total Bookings
                  </span>
                  <span className="text-2xl font-bold text-blue-900">
                    {selectedProvider.totalBookings}
                  </span>
                  <div className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                    <FaCheckCircle className="text-green-500" />{" "}
                    {selectedProvider.completedBookings} Completed
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl flex flex-col items-center justify-center border border-green-100">
                  <span className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">
                    Total Revenue
                  </span>
                  <span className="text-2xl font-bold text-green-900">
                    ${selectedProvider.totalRevenue}
                  </span>
                  <div className="text-xs text-green-600 mt-1 flex gap-1">
                    Profit: ${selectedProvider.profit}
                  </div>
                </div>
              </div>

              {/* Financial & Status Details */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 border-b pb-2 mb-3">
                  Additional Information
                </h4>

                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiAlertTriangle className="text-orange-500" />
                    <span>Pending Payments</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {selectedProvider.pendingPayments}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2 text-gray-600">
                    <IoMdCloseCircle className="text-red-500" />
                    <span>Cancelled Bookings</span>
                  </div>
                  <span className="font-bold text-red-600">
                    {selectedProvider.cancelledBookings}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2 text-gray-600">
                    <LuBanknote className="text-red-500" />
                    <span>Refunded Bookings</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {selectedProvider.refundedBookings}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2 text-gray-600">
                    <LuBanknote className="text-red-500" />
                    <span>Total Refund Amount</span>
                  </div>
                  <span className="font-bold text-red-600">
                    ${selectedProvider.totalRefundAmount}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{
                textTransform: "none",
                bgcolor: "#131927",
                boxShadow: "none",
                "&:hover": { bgcolor: "#1565c0", boxShadow: "none" },
              }}
            >
              Close Details
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
