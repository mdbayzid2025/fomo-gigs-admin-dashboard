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

// Updated order data
const orderData = [
  {
    orderDate: "2025-08-21",
    orderId: "ORD123456",
    providerName: "Provider A",
    clientName: "John Doe",
    status: "Shipped",
    category: "Electronics",
    price: "$150.00",
  },
  {
    orderDate: "2025-08-20",
    orderId: "ORD123457",
    providerName: "Provider B",
    clientName: "Jane Smith",
    status: "Pending",
    category: "Home Appliances",
    price: "$220.00",
  },
  {
    orderDate: "2025-08-19",
    orderId: "ORD123458",
    providerName: "Provider C",
    clientName: "Robert Johnson",
    status: "Delivered",
    category: "Clothing",
    price: "$75.00",
  },
  {
    orderDate: "2025-08-18",
    orderId: "ORD123459",
    providerName: "Provider D",
    clientName: "Mary Williams",
    status: "Shipped",
    category: "Sports Equipment",
    price: "$180.00",
  },
  {
    orderDate: "2025-08-17",
    orderId: "ORD123460",
    providerName: "Provider E",
    clientName: "Patricia Brown",
    status: "Cancelled",
    category: "Toys",
    price: "$50.00",
  },
  // Add more orders as necessary
];

export default function OrderManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orderData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = orderData.filter(
      (order) =>
        order.orderId.toLowerCase().includes(search.toLowerCase()) ||
        order.clientName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrders(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedOrder(null);
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
          placeholder="Search by Order ID or Client Name"
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
                Order ID
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
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
                Provider
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
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.orderId}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.clientName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.providerName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.category}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          order.status.toLowerCase() === "shipped"
                            ? "#1EC74F"
                            : order.status.toLowerCase() === "pending"
                            ? "#FFCC00"
                            : order.status.toLowerCase() === "delivered"
                            ? "#00B5E2"
                            : order.status.toLowerCase() === "cancelled"
                            ? "#EE5252"
                            : "#9e9e9e",
                        fontWeight: "600",
                      }}
                    >
                      {order.status}
                    </span>
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleOpenModal(order)}>
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
        count={orderData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal to display order details */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="order-details-modal"
        aria-describedby="modal-to-view-order-details"
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
          {selectedOrder && (
            <div>
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2">
                  <p>Order ID:</p>
                  <p>Client Name:</p>
                  <p>Provider:</p>
                  <p>Category:</p>
                  <p>Status:</p>
                  <p>Price:</p>
                  <p>Order Date:</p>
                </div>
                <div className="flex flex-col gap-2 font-semibold">
                  <p>{selectedOrder.orderId}</p>
                  <p>{selectedOrder.clientName}</p>
                  <p>{selectedOrder.providerName}</p>
                  <p>{selectedOrder.category}</p>
                  <p>{selectedOrder.status}</p>
                  <p>{selectedOrder.price}</p>
                  <p>{selectedOrder.orderDate}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
