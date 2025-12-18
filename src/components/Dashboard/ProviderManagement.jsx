import { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";

import { FaEye, FaSearch } from "react-icons/fa";
import ProviderDetailsModal from "../UI/Modals/ProviderDetailsModal";
import {
  useChangeProviderStatusMutation,
  useGetServiceProvidersQuery,
} from "../../Redux/api/usersApi";
import { useGetAllServicesQuery } from "../../Redux/api/serviceApi";

export default function ProviderManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: allProviderData,
    isLoading: loadingProvidersData,
    isError: errorProvidersData,
    refetch: refetchProviders,
  } = useGetServiceProvidersQuery();
  const providersData = allProviderData?.data || [];
  console.log("providersData", providersData);

  const {
    data: allServicesData,
    isLoading: loadingServices,
    isError: servicesError,
  } = useGetAllServicesQuery();
  const servicesData = allServicesData?.data || [];
  console.log("servicesData", servicesData);

  const [updateProviderStatus, { isLoading: updatingStatus }] =
    useChangeProviderStatusMutation();

  // Initialize filteredProviders when providersData is loaded
  useEffect(() => {
    if (providersData && providersData.length > 0) {
      setFilteredProviders(providersData);
    }
  }, [providersData]);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchText(search);

    if (!providersData || providersData.length === 0) {
      setFilteredProviders([]);
      return;
    }

    const filtered = providersData.filter(
      (provider) =>
        provider.userId.name?.toLowerCase().includes(search.toLowerCase()) ||
        provider.userId.email?.toLowerCase().includes(search.toLowerCase()) ||
        provider.serviceCategory?.toLowerCase().includes(search.toLowerCase())
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loadingProvidersData || loadingServices) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (errorProvidersData || servicesError) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <p className="text-red-500 text-lg">
          Something went wrong. Please try again.
        </p>
      </div>
    );
  }

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
          <TableHead style={{ backgroundColor: "#e0e0e0" }}>
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
            {filteredProviders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  <p className="text-gray-500">No providers found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredProviders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((provider, index) => (
                  <TableRow
                    key={provider.email || index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                    }}
                    hover
                  >
                    <TableCell
                      style={{
                        color: "#333",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      {provider.userId.name || "N/A"}
                    </TableCell>
                    <TableCell style={{ color: "#666", textAlign: "center" }}>
                      {provider.userId.email || "N/A"}
                    </TableCell>
                    <TableCell style={{ color: "#666", textAlign: "center" }}>
                      {/* {provider.location?.coordinates
                        ? `${provider.location.coordinates[1]}, ${provider.location.coordinates[0]}`
                        : provider.location?.type
                        ? "Location Available"
                        : typeof provider.location === "string"
                        ? provider.location
                        : "N/A"} */}
                      {provider.serviceArea}
                    </TableCell>
                    <TableCell style={{ color: "#666", textAlign: "center" }}>
                      {provider.serviceCategory &&
                      servicesData.find(
                        (service) => service._id === provider.serviceCategory
                      )
                        ? servicesData.find(
                            (service) =>
                              service._id === provider.serviceCategory
                          ).serviceName
                        : "N/A"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <span
                        className="py-2 px-3 capitalize font-semibold text-white rounded-xl"
                        style={{
                          backgroundColor:
                            provider.status?.toLowerCase() === "approved"
                              ? "#1EC74F"
                              : provider.status?.toLowerCase() === "rejected"
                              ? "#EE5252"
                              : provider.status?.toLowerCase() === "pending"
                              ? "#FFCC00"
                              : "#9e9e9e",
                        }}
                      >
                        {provider.status
                          ? provider.status.charAt(0).toUpperCase() +
                            provider.status.slice(1).toLowerCase()
                          : "N/A"}
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
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProviders.length}
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
        refetchProviders={refetchProviders}
        updateProviderStatus={updateProviderStatus}
        updatingStatus={updatingStatus}
      />
    </div>
  );
}
