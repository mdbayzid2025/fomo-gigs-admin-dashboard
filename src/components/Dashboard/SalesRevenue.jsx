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
  CircularProgress,
  Chip,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { MdVisibility, MdAttachMoney } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { LuCalendar, LuUser, LuMail, LuShoppingCart } from "react-icons/lu";
import { IoAlertCircleOutline } from "react-icons/io5";

import { useGetEventsSalesRevenueQuery } from "../../Redux/api/eventApi";

export default function SalesRevenue() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const {
    data: revenueData,
    isLoading,
    isError,
  } = useGetEventsSalesRevenueQuery();
  const salesRevenue = revenueData?.data;
  console.log("sales revenue", salesRevenue);

  const filteredRevenue =
    salesRevenue?.filter(
      (item) =>
        item?.event?.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.organizer?.name.toLowerCase().includes(searchText.toLowerCase()),
    ) || [];

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTransaction(null);
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
        <p className="text-red-500 text-lg">Failed to load revenue data.</p>
      </div>
    );
  }

  return (
    <div className="px-10 py-8 bg-[#fbfbfb] h-[92vh]">
      {/* Header with Search */}
      <div className="flex justify-between gap-3 items-center mb-4">
        <p className="text-xl font-semibold">Sales Revenue</p>
        <div className="flex items-center gap-3">
          <TextField
            sx={{ width: 300 }}
            placeholder="Search Event or Organizer"
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
                Event Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Organizer
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Tickets Sold
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Total Orders
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Total Revenue
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Event Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRevenue
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row?.event?._id || index}>
                  <TableCell align="center">
                    <p className="font-medium text-gray-700">
                      {row?.event?.title}
                    </p>
                  </TableCell>
                  <TableCell align="center">{row?.organizer?.name}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row?.totalTicketsSold}
                      size="small"
                      sx={{
                        backgroundColor: "#E3F2FD",
                        color: "#1976D2",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{row?.totalOrders}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "green", fontWeight: 600 }}
                  >
                    ${row?.totalRevenue}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(row?.event?.startAt).toLocaleDateString()}
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

      <TablePagination
        component="div"
        count={filteredRevenue.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />

      {/* Enhanced Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="absolute top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl overflow-hidden outline-none">
          {/* Modal Header */}
          <div className="bg-[#131927] p-6 flex justify-between items-center text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MdAttachMoney className="text-2xl" /> Revenue Details
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

          {selectedTransaction && (
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {/* Event Header Card */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 text-center mb-1">
                  {selectedTransaction?.event?.title}
                </h3>
                <div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
                  <LuCalendar className="text-blue-500" />
                  <span>
                    {new Date(
                      selectedTransaction?.event?.startAt,
                    ).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center justify-center border border-blue-100">
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
                    Total Revenue
                  </span>
                  <span className="text-2xl font-bold text-blue-900">
                    ${selectedTransaction?.totalRevenue?.toLocaleString()}
                  </span>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl flex flex-col items-center justify-center border border-purple-100">
                  <span className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-1">
                    Tickets Sold
                  </span>
                  <span className="text-2xl font-bold text-purple-900">
                    {selectedTransaction?.totalTicketsSold}
                  </span>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                      <LuUser />
                    </div>
                    <span className="text-gray-600 font-medium">Organizer</span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    {selectedTransaction?.organizer?.name}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                      <LuMail />
                    </div>
                    <span className="text-gray-600 font-medium">Email</span>
                  </div>
                  <span className="text-gray-900 text-sm">
                    {selectedTransaction?.organizer?.email}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                      <LuShoppingCart />
                    </div>
                    <span className="text-gray-600 font-medium">
                      Total Orders
                    </span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    {selectedTransaction?.totalOrders}
                  </span>
                </div>
              </div>

              {/* Cancelled Stats */}
              {(selectedTransaction?.totalCancelledOrders > 0 ||
                selectedTransaction?.cancelledRevenue > 0) && (
                <div className="mt-6 bg-red-50 rounded-xl p-4 border border-red-100">
                  <div className="flex items-center gap-2 text-red-700 font-bold mb-3">
                    <IoAlertCircleOutline />
                    <span>Cancellations & Refunds</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-red-600">Cancelled Orders</span>
                    <span className="font-bold text-red-700">
                      {selectedTransaction?.totalCancelledOrders}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-red-600">Lost Revenue</span>
                    <span className="font-bold text-red-700">
                      -$
                      {selectedTransaction?.cancelledRevenue?.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
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
