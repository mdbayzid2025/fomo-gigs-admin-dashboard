import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { MdAccessTime, MdLocalActivity, MdLocationOn } from "react-icons/md";
import { useGetAllEventsQuery } from "../../Redux/api/eventApi";
import { getImageUrl } from "../../utils/baseUrl";
import ManagePagination from "../Shared/ManagePagination";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";

export default function EventManagement() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const imageUrl = getImageUrl();
  const [searchInput, setSearchInput] = useState("");

  const { data: allEvents, isLoading, isError, refetch } = useGetAllEventsQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events = allEvents?.data || [];

  const updateSearchParams = useUpdateSearchParams()
  const { page, limit, searchTerm, sort } = getSearchParams()
  useEffect(() => {
    refetch()
  }, [page, limit, searchTerm, sort])


  const handleChange = (e) => {
    setSearchInput(e.target.value);
    updateSearchParams({ searchTerm: e.target.value });
  };



  const statusOptions = [
    "ALL",
    ...Array.from(new Set(events.map((event) => event.status).filter(Boolean))),
  ];


  const applyFilters = (search, status) => {
    let filtered = events;

    if (search) {
      filtered = filtered.filter(
        (event) =>
          event._id?.toLowerCase().includes(search) ||
          event.eventId?.toLowerCase().includes(search) ||
          event.title?.toLowerCase().includes(search)
      );
    }

    if (status !== "ALL") {
      filtered = filtered.filter((event) => event.status === status);
    }
    setPage(0);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchText(search);
    applyFilters(search, statusFilter);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    if (status === "ALL") {
      updateSearchParams({ status: "" });
    } else {
      updateSearchParams({ status: status?.toUpperCase() });
    }
  };


  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedEvent(null);
  };

  // Status class for styling
  const statusClass = (s) => {
    const key = s?.toUpperCase();
    if (key === "UPCOMING") return "bg-blue-600 text-white";
    if (key === "ONGOING") return "bg-green-600 text-white";
    if (key === "ENDED") return "bg-gray-600 text-white";
    if (key === "CANCELLED") return "bg-red-600 text-white";
    return "bg-gray-400 text-white";
  };

  // Format date time
  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Format currency
  const formatPrice = (price) => {
    if (price === 0 || price === "0") return "Free";
    return `$${parseFloat(price).toFixed(2)}`;
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
        <p className="text-red-500 text-lg">Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="px-10 py-8 bg-[#fbfbfb] min-h-[92vh]">
      {/* Search */}
      <div className="flex items-center justify-end mb-6 gap-3">
        <TextField
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "#131927" },
            },
            "& .MuiOutlinedInput-notchedOutline": { borderRadius: "20px" },
            height: "40px",
            "& .MuiInputBase-root": { height: "100%" },
          }}
          placeholder="Search by Event ID or Title"
          value={searchInput}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
        {/* Status Filters (from real data) */}
        <div className="flex gap-3 flex-wrap">
          {statusOptions.map((status) => (
            <Button
              key={status}
              onClick={() => handleStatusChange(status)}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
                minWidth: "auto",
                bgcolor: statusFilter === status ? "#131927" : "#e5e7eb",
                color: statusFilter === status ? "#fff" : "#374151",
                "&:hover": {
                  bgcolor: statusFilter === status ? "#131927" : "#d1d5db",
                },
              }}
            >
              {status === "ALL"
                ? "All"
                : status.charAt(0) + status.slice(1).toLowerCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <TableContainer
        style={{
          borderRadius: "16px",
          boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
              {[
                "Event ID",
                "Title",
                "City",
                "Status",
                "Start Date",
                "Action",
              ].map((h) => (
                <TableCell
                  key={h}
                  sx={{
                    color: "#000",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {events?.map((event) => (
              <TableRow key={event._id}>
                <TableCell sx={{ textAlign: "center", fontSize: "13px" }}>
                  {event.eventId}
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "13px" }}>
                  {event.title}
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "13px" }}>
                  {event.city}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <span
                    className={`px-3 py-2 rounded-lg text-xs font-semibold ${statusClass(
                      event.status
                    )}`}
                  >
                    {event.status?.charAt(0).toUpperCase() +
                      event.status?.slice(1).toLowerCase()}
                  </span>
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "13px" }}>
                  {formatDateTime(event.startAt)}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <IconButton
                    onClick={() => handleOpenModal(event)}
                    size="small"
                  >
                    <FiEye className="text-lg text-[#131927]" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ManagePagination meta={allEvents?.meta} />

      {/* Event Details Modal */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="event-details-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "900px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            padding: { xs: "24px", md: "32px" },
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          {selectedEvent && (
            <div className="overflow-hidden">
              {/* Banner Section with Overlay */}
              <div className="relative w-full h-64 overflow-hidden bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200">
                {selectedEvent.bannerUrl && (
                  <img
                    src={`${imageUrl}${selectedEvent.bannerUrl}`}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${statusClass(
                      selectedEvent.status
                    )}`}
                  >
                    {selectedEvent.status}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                    {selectedEvent.title}
                  </h1>
                  <div className="flex items-center gap-2 text-white mt-3">
                    <MdLocationOn className="text-xl" />
                    <span className="text-lg">
                      {selectedEvent.city}, {selectedEvent.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                {/* Key Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {/* Start Time Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <MdAccessTime className="text-2xl text-blue-600" />
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                        Starts
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {formatDateTime(selectedEvent.startAt)}
                    </p>
                  </div>

                  {/* End Time Card */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <MdAccessTime className="text-2xl text-purple-600" />
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
                        Ends
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {formatDateTime(selectedEvent.endAt)}
                    </p>
                  </div>

                  {/* Price Card */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <MdLocalActivity className="text-2xl text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                        Price Range
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedEvent.priceRange}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Event ID
                    </p>
                    <p className="text-gray-900 font-bold mt-1">
                      {selectedEvent.eventId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </p>
                    <p className="text-gray-900 font-bold mt-1">
                      {selectedEvent.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Venue
                    </p>
                    <p className="text-gray-900 font-bold mt-1">
                      {selectedEvent.venue}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Available
                    </p>
                    <p className="text-gray-900 font-bold mt-1">
                      {selectedEvent.isAvailable ? "✓ Yes" : "✗ No"}
                    </p>
                  </div>
                </div>

                {/* Location Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MdLocationOn className="text-blue-600" />
                    Location
                  </h2>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <p className="text-gray-700 font-semibold mb-2">
                      {selectedEvent.location?.address}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {selectedEvent.city}, {selectedEvent.country}
                    </p>
                    {selectedEvent.location?.coordinates && (
                      <a
                        href={`https://www.google.com/maps/?q=${selectedEvent.location.coordinates[0]},${selectedEvent.location.coordinates[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        View on Google Maps →
                      </a>
                    )}
                  </div>
                </div>

                {/* Ticket Tiers */}
                {selectedEvent.tiers && selectedEvent.tiers.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Tickets
                    </h2>
                    <div className="space-y-3">
                      {selectedEvent.tiers.map((tier) => (
                        <div
                          key={tier._id}
                          className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow flex justify-between items-center"
                        >
                          <div>
                            <p className="font-bold text-gray-900 text-lg">
                              {tier.ticketCategory}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Type:{" "}
                              <span className="font-semibold">{tier.kind}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">
                              {formatPrice(tier.price)}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Sold:{" "}
                              <span className="font-semibold">{tier.sold}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                      <div className="text-2xl">📌</div>
                      <div>
                        <div>
                          <p className="text-sm text-gray-700 font-medium">
                            <span className="font-bold">Total Available:</span>{" "}
                            {selectedEvent.totalAvailable} •{" "}
                            <span className="font-bold">Max per User:</span>{" "}
                            {selectedEvent.maxTicketsPerUser || "N/A"}
                          </p>
                        </div>
                        <div className="flex gap-2 text-sm text-gray-700 font-bold mt-2">
                          <p>
                            Total Tickets Sold:{" "}
                            <span className="text-gray-700 font-medium">
                              {selectedEvent?.tiers.reduce(
                                (total, tier) => total + (tier.sold || 0),
                                0
                              )}
                            </span>
                          </p>
                          •{" "}
                          <p>
                            Total Revenue:{" "}
                            <span className="text-gray-700 font-medium ">
                              $
                              {selectedEvent?.tiers.reduce(
                                (total, tier) =>
                                  total + (tier.sold || 0) * (tier.price || 0),
                                0
                              )}
                            </span>
                          </p>
                        </div>{" "}
                        <div className="mt-2">
                          <p className="text-sm text-gray-700 font-medium">
                            <span className="font-bold">
                              Cancelled Tickets:
                            </span>{" "}
                            {selectedEvent?.cancelledTicketsCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedEvent.description && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      About Event
                    </h2>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-200">
                      {selectedEvent.description}
                    </p>
                  </div>
                )}

                {/* Images Gallery */}
                {selectedEvent.imageUrls &&
                  selectedEvent.imageUrls.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Gallery
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {selectedEvent.imageUrls.map((url, idx) => (
                          <div
                            key={idx}
                            className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                          >
                            <img
                              src={`${imageUrl}${url}`}
                              alt={`Event ${idx + 1}`}
                              className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Metadata Footer */}
                <div className="border-t pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {selectedEvent.isCancelled && (
                    <div className="py-3 px-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                      <p className="text-xs font-semibold text-black">Status</p>
                      <p className="text-sm text-red-600 font-medium mt-1">
                        {selectedEvent.isCancelled ? "Cancelled" : "Active"}
                      </p>
                    </div>
                  )}
                  {selectedEvent.promoCode && (
                    <div className="py-3 px-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
                      <p className="text-xs font-semibold text-pink-600 uppercase">
                        Promo
                      </p>
                      <p className="text-sm text-gray-800 font-mono font-bold mt-1">
                        {selectedEvent.promoCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
