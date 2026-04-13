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
import ManagePagination from "../Shared/ManagePagination";
import SearchInput from "../Shared/SearchInput";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";

export default function ProviderManagement() {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: allProviderData,
    isLoading: loadingProvidersData,
    isError: errorProvidersData,
    refetch,
  } = useGetServiceProvidersQuery();
  const providersData = allProviderData?.data || [];

  const {
    data: allServicesData,
    isLoading: loadingServices,
    isError: servicesError,
  } = useGetAllServicesQuery();

  const { page, limit, searchTerm } = getSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  useEffect(() => {
    refetch()
  }, [page, limit, searchTerm]);

  const servicesData = allServicesData?.data || [];

  const [updateProviderStatus, { isLoading: updatingStatus }] =
    useChangeProviderStatusMutation();



  const handleViewDetails = (provider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProvider(null);
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
      <div className="flex justify-end mb-10">
        <SearchInput
          placeholder="Search by user Name or Email"
          onSearch={(value) => updateSearchParams({ searchTerm: value })}
          width={300}
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
            {providersData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  <p className="text-gray-500">No providers found</p>
                </TableCell>
              </TableRow>
            ) : (
              providersData
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
      <ManagePagination meta={allProviderData?.meta} />
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProviders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}

      {/* Provider Details Modal */}
      <ProviderDetailsModal
        selectedProvider={selectedProvider}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        refetchProviders={refetch}
        updateProviderStatus={updateProviderStatus}
        updatingStatus={updatingStatus}
      />
    </div>
  );
}
