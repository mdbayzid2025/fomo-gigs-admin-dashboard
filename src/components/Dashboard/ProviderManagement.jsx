import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  TablePagination,
} from "@mui/material";

import { FaEye, FaSearch } from "react-icons/fa";
import ProviderDetailsModal from "../UI/Modals/ProviderDetailsModal";

const providerData = [
  {
    name: "Dr. Sarah Johnson",
    userName: "drsarah",
    email: "sarah.johnson@example.com",
    location: "New York, NY",
    status: "pending",
    serviceCategory: "Mental Health",
    phoneNumber: "(123) 456-7890",
    experience: "8 years",
    timeSlot: "9:00 AM - 5:00 PM",
    serviceDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    skills: ["Cognitive Therapy", "Anxiety Treatment", "Depression Counseling"],
    description:
      "Licensed clinical psychologist specializing in anxiety and depression treatment with over 8 years of experience.",
    pricing: { amount: 150, type: "hourly" },
    coverImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
  },
  {
    name: "Prof. Michael Chen",
    userName: "profchen",
    email: "michael.chen@example.com",
    location: "Los Angeles, CA",
    status: "accepted",
    serviceCategory: "Education",
    phoneNumber: "(987) 654-3210",
    experience: "12 years",
    timeSlot: "10:00 AM - 6:00 PM",
    serviceDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    skills: ["Mathematics", "Physics", "Computer Science", "Tutoring"],
    description:
      "Experienced mathematics and physics professor offering comprehensive tutoring services for students of all levels.",
    pricing: { amount: 80, type: "hourly" },
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  },
  {
    name: "Lisa Rodriguez",
    userName: "lisanutrition",
    email: "lisa.rodriguez@example.com",
    location: "Chicago, IL",
    status: "declined",
    serviceCategory: "Nutrition",
    phoneNumber: "(555) 123-4567",
    experience: "5 years",
    timeSlot: "8:00 AM - 4:00 PM",
    serviceDays: ["Tuesday", "Thursday", "Saturday"],
    skills: ["Weight Management", "Dietary Planning", "Sports Nutrition"],
    description:
      "Certified nutritionist helping clients achieve their health goals through personalized meal planning and lifestyle changes.",
    pricing: { amount: 200, type: "monthly" },
    coverImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop",
  },
  {
    name: "Dr. James Wilson",
    userName: "drwilson",
    email: "james.wilson@example.com",
    location: "Houston, TX",
    status: "accepted",
    serviceCategory: "Healthcare",
    phoneNumber: "(800) 234-5678",
    experience: "15 years",
    timeSlot: "7:00 AM - 3:00 PM",
    serviceDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    skills: ["General Practice", "Preventive Care", "Health Consultations"],
    description:
      "Board-certified family physician providing comprehensive healthcare services with a focus on preventive medicine.",
    pricing: { amount: 200, type: "hourly" },
    coverImage:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
  },
  {
    name: "Emma Thompson",
    userName: "emmatherapy",
    email: "emma.thompson@example.com",
    location: "San Francisco, CA",
    status: "pending",
    serviceCategory: "Mental Health",
    phoneNumber: "(111) 222-3333",
    experience: "6 years",
    timeSlot: "11:00 AM - 7:00 PM",
    serviceDays: ["Monday", "Wednesday", "Friday"],
    skills: ["Family Therapy", "Relationship Counseling", "Trauma Recovery"],
    description:
      "Licensed marriage and family therapist specializing in relationship counseling and trauma recovery.",
    pricing: { amount: 1200, type: "monthly" },
    coverImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
  },
  {
    name: "David Park",
    userName: "davidcoach",
    email: "david.park@example.com",
    location: "Seattle, WA",
    status: "pending",
    serviceCategory: "Education",
    phoneNumber: "(333) 444-5555",
    experience: "7 years",
    timeSlot: "2:00 PM - 8:00 PM",
    serviceDays: ["Tuesday", "Wednesday", "Thursday", "Sunday"],
    skills: ["Language Learning", "Public Speaking", "Academic Writing"],
    description:
      "Certified language instructor and communication coach with expertise in ESL and professional development.",
    pricing: { amount: 500, type: "weekly" },
    coverImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
  },
];

export default function ProviderManagement() {
  const [providers, setProviders] = useState(providerData);
  const [searchText, setSearchText] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providerData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = providers.filter(
      (provider) =>
        provider.name.toLowerCase().includes(search.toLowerCase()) ||
        provider.email.toLowerCase().includes(search.toLowerCase()) ||
        provider.serviceCategory.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProviders(filtered);
    setPage(0);
  };

  const handleViewDetails = (provider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProvider(null);
  };

  const handleStatusUpdate = (providerEmail, newStatus) => {
    const updatedProviders = providers.map((provider) =>
      provider.email === providerEmail
        ? { ...provider, status: newStatus }
        : provider
    );
    setProviders(updatedProviders);

    const updatedFiltered = filteredProviders.map((provider) =>
      provider.email === providerEmail
        ? { ...provider, status: newStatus }
        : provider
    );
    setFilteredProviders(updatedFiltered);

    handleCloseModal();
  };

  // Pagination
  // const totalItems = filteredProviders.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = filteredProviders.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "24px",
      }}
    >
      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "24px",
        }}
      >
        <TextField
          placeholder="Search by name, email or service..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: "325px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
            style: {
              borderRadius: "16px",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
            },
          }}
        />
      </div>

      {/* Table */}
      <TableContainer
        component={Paper}
        style={{
          borderRadius: "16px",
          boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Table>
          <TableHead style={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell
                style={{ fontWeight: 600, color: "#333", textAlign: "center" }}
              >
                Provider Name
              </TableCell>
              <TableCell
                style={{ fontWeight: 600, color: "#333", textAlign: "center" }}
              >
                Email
              </TableCell>
              <TableCell
                style={{ fontWeight: 600, color: "#333", textAlign: "center" }}
              >
                Location
              </TableCell>
              <TableCell
                style={{ fontWeight: 600, color: "#333", textAlign: "center" }}
              >
                Service Category
              </TableCell>
              <TableCell
                style={{ fontWeight: 600, color: "#333", textAlign: "center" }}
              >
                Status
              </TableCell>
              <TableCell
                style={{ fontWeight: 600, color: "#333", textAlign: "center" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProviders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((provider, index) => (
                <TableRow
                  key={index}
                  style={{
                    "&:hover": { backgroundColor: "#f9f9f9" },
                    "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                  }}
                >
                  <TableCell
                    style={{
                      color: "#333",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    {provider.name}
                  </TableCell>
                  <TableCell style={{ color: "#666", textAlign: "center" }}>
                    {provider.email}
                  </TableCell>
                  <TableCell style={{ color: "#666", textAlign: "center" }}>
                    {provider.location}
                  </TableCell>
                  <TableCell style={{ color: "#666", textAlign: "center" }}>
                    {provider.serviceCategory}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      className="py-2 px-3 capitalize font-semibold text-white rounded-xl"
                      style={{
                        backgroundColor:
                          provider.status.toLowerCase() === "accepted"
                            ? "#1EC74F"
                            : provider.status.toLowerCase() === "declined"
                            ? "#EE5252"
                            : provider.status.toLowerCase() === "pending"
                            ? "#FFCC00"
                            : "#9e9e9e",
                      }}
                    >
                      {provider.status}
                    </span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      onClick={() => handleViewDetails(provider)}
                      size="small"
                    >
                      <FaEye />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={providerData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Provider Details Modal */}
      <ProviderDetailsModal
        selectedProvider={selectedProvider}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
