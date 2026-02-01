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
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { IoClose } from "react-icons/io5";

// Mock Data
const mockRevenue = [
  {
    _id: "101",
    transactionId: "TXN-12345",
    userName: "John Doe",
    serviceName: "Home Cleaning",
    amount: "$120",
    date: "2023-10-25",
    status: "Completed",
    paymentMethod: "Credit Card",
  },
  {
    _id: "102",
    transactionId: "TXN-67890",
    userName: "Jane Smith",
    serviceName: "Plumbing Repair",
    amount: "$85",
    date: "2023-10-24",
    status: "Completed",
    paymentMethod: "PayPal",
  },
  {
    _id: "103",
    transactionId: "TXN-54321",
    userName: "Alice Johnson",
    serviceName: "Electrical Wiring",
    amount: "$200",
    date: "2023-10-23",
    status: "Pending",
    paymentMethod: "Stripe",
  },
    {
    _id: "104",
    transactionId: "TXN-98765",
    userName: "Bob Brown",
    serviceName: "Gardening",
    amount: "$150",
    date: "2023-10-22",
    status: "Failed",
    paymentMethod: "Credit Card",
  },
];

export default function SalesRevenue() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredRevenue = mockRevenue.filter(
    (item) =>
      item.transactionId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTransaction(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Failed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="px-10 py-8 bg-[#fbfbfb] h-[92vh]">
      {/* Header with Search */}
      <div className="flex justify-between gap-3 items-center mb-4">
        <p className="text-xl font-semibold">Sales Revenue</p>
        <div className="flex items-center gap-3">
          <TextField
            sx={{ width: 300 }}
            placeholder="Search Transaction or User"
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
                Transaction ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                User
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Service
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Amount
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Date
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
            {filteredRevenue
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="center">{row.transactionId}</TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center">{row.serviceName}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">
                    {new Date(row.date).toLocaleDateString()}
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

      {/* Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="absolute top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Transaction Details</h2>
            <IconButton onClick={handleCloseModal}>
              <IoClose />
            </IconButton>
          </div>

          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Transaction ID:</span>
                <span className="font-semibold text-gray-800">
                  {selectedTransaction.transactionId}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">User:</span>
                <span className="text-gray-800">
                  {selectedTransaction.userName}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Service:</span>
                <span className="text-gray-800">
                  {selectedTransaction.serviceName}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Amount:</span>
                <span className="text-gray-800">
                  {selectedTransaction.amount}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Payment Method:</span>
                <span className="text-gray-800">
                  {selectedTransaction.paymentMethod}
                </span>
              </div>
               <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Date:</span>
                 <span className="text-gray-800">
                  {new Date(selectedTransaction.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-600">Status:</span>
                <Chip
                  label={selectedTransaction.status}
                  color={getStatusColor(selectedTransaction.status)}
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
