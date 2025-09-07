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
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiCheck, FiEye } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

// Enhanced order data with more detailed information
const orderData = [
  {
    orderDate: "2025-08-21",
    orderId: "ORD123456",
    providerName: "Provider A",
    clientName: "John Doe",
    status: "Shipped",
    category: "Electronics",
    price: "$150.00",
    paymentMethod: "Credit Card",
    trackingNumber: "1234567890",
    shippingAddress: "123 Main St, Springfield, IL, 62701",
    deliveryInstructions: "Leave at the front door if not at home.",
    orderNotes: "Please handle with care. Fragile item.",
    deliverySteps: [
      { step: "Ordered", date: "2025-08-19" },
      { step: "Shipped", date: "2025-08-21" },
      { step: "Out for Delivery", date: "2025-08-22" },
      { step: "Delivered", date: "2025-08-23" },
    ],
    items: [{ name: "Laptop", quantity: 1, price: "$150.00" }],
  },
  {
    orderDate: "2025-08-20",
    orderId: "ORD123457",
    providerName: "Provider B",
    clientName: "Jane Smith",
    status: "Pending",
    category: "Home Appliances",
    price: "$220.00",
    paymentMethod: "PayPal",
    trackingNumber: "0987654321",
    shippingAddress: "456 Oak St, Springfield, IL, 62702",
    deliveryInstructions: "Ring the bell on arrival.",
    orderNotes: "Ensure to check the package for damages.",
    deliverySteps: [
      { step: "Ordered", date: "2025-08-19" },
      { step: "Shipped", date: "2025-08-21" },
      { step: "Out for Delivery", date: "2025-08-22" },
    ],
    items: [{ name: "Washing Machine", quantity: 1, price: "$220.00" }],
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

  // Function to determine step icon background color
  // eslint-disable-next-line no-unused-vars
  const getStepIconColor = (stepIndex, statusIndex) => {
    if (stepIndex < statusIndex) {
      return "#1EC74F"; // Green for completed
    } else if (stepIndex === statusIndex) {
      return "#00B5E2"; // Blue for active
    } else {
      return "#FFCC00"; // Yellow for pending
    }
  };

  // Custom Step Icon to change background color based on step status
  function StepIcon(props) {
    const { active, completed, index } = props;
    const backgroundColor = active
      ? "#00B5E2"
      : completed
      ? "#1EC74F"
      : "#FFCC00"; // Default color for pending

    return (
      <div
        style={{
          backgroundColor: backgroundColor,
          color: "white",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        {completed ? <FiCheck className="text-xl font-semibold" /> : index + 1}
      </div>
    );
  }

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

      {/* Enhanced Modal to display detailed order information */}
      <Modal open={openDetailsModal} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 950,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            padding: "30px",
            borderRadius: "20px",
            outline: "none", // Remove default outline
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          {selectedOrder && (
            <div>
              {/* Close Button */}
              <IconButton
                onClick={handleCloseModal}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  backgroundColor: "#FF5C5C",
                  borderRadius: "50%",
                  color: "white",
                  padding: "6px",
                }}
              >
                <IoClose className="text-xl" />
              </IconButton>

              <div className="mb-5 text-left">
                <p className="text-2xl font-bold mb-3 text-[#131927] text-center">
                  Order Details for {selectedOrder.clientName}
                </p>
                <div className="flex gap-5 justify-between text-[#444] font-medium w-[95%] mx-auto">
                  <div className="flex flex-col gap-4">
                    <div>
                      <p>Order ID</p>
                      <p>
                        <strong>{selectedOrder.orderId}</strong>
                      </p>
                    </div>
                    <div>
                      <p>Category</p>
                      <p>
                        <strong>{selectedOrder.category}</strong>
                      </p>
                    </div>
                    <div>
                      <p>Status</p>
                      <p
                        style={{
                          color: "white",
                          textAlign: "center",
                          borderRadius: "5px",
                          padding: "2px",
                          maxWidth: "120px",
                          backgroundColor:
                            selectedOrder.status.toLowerCase() === "shipped"
                              ? "#1EC74F"
                              : selectedOrder.status.toLowerCase() === "pending"
                              ? "#FFCC00"
                              : selectedOrder.status.toLowerCase() ===
                                "delivered"
                              ? "#00B5E2"
                              : selectedOrder.status.toLowerCase() ===
                                "cancelled"
                              ? "#EE5252"
                              : "#9e9e9e",
                        }}
                      >
                        <strong> {selectedOrder.status}</strong>
                      </p>
                    </div>
                    <div>
                      <p>Delivery Instructions</p>
                      <p>
                        <strong>{selectedOrder.deliveryInstructions}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <p>Client Name</p>
                      <p>
                        <strong>{selectedOrder.clientName}</strong>
                      </p>
                    </div>
                    <div>
                      <p>Price</p>
                      <p>
                        <strong>{selectedOrder.price}</strong>
                      </p>
                    </div>

                    <div>
                      <p>Payment Method</p>
                      <p>
                        <strong>{selectedOrder.paymentMethod}</strong>
                      </p>
                    </div>

                    <div>
                      <p>Order Notes</p>
                      <p>
                        <strong>{selectedOrder.orderNotes}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p>Provider</p>
                      <p>
                        <strong>{selectedOrder.providerName}</strong>
                      </p>
                    </div>
                    <div>
                      <p>Order Date</p>
                      <p>
                        <strong>{selectedOrder.orderDate}</strong>
                      </p>
                    </div>
                    <div>
                      <p>Shipping Address</p>
                      <p>
                        <strong>{selectedOrder.shippingAddress}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stepper to display delivery steps with dates */}
              <div style={{ marginTop: "20px" }}>
                <Stepper
                  activeStep={selectedOrder.deliverySteps.findIndex(
                    (step) => step.step === selectedOrder.status
                  )}
                  alternativeLabel
                >
                  {selectedOrder.deliverySteps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel
                        StepIconComponent={(props) => (
                          <StepIcon
                            {...props}
                            active={
                              index ===
                              selectedOrder.deliverySteps.findIndex(
                                (step) => step.step === selectedOrder.status
                              )
                            }
                            completed={
                              index <
                              selectedOrder.deliverySteps.findIndex(
                                (step) => step.step === selectedOrder.status
                              )
                            }
                            index={index}
                          />
                        )}
                      >
                        <span style={{ fontWeight: "bold", color: "#333" }}>
                          {step.step}
                        </span>{" "}
                        - {step.date}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>

              {/* Order Items Table */}
              <div style={{ marginTop: "20px" }}>
                <p className="text-xl font-semibold mb-2 text-[#131927]">
                  Order Items:
                </p>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Item</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Quantity
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
