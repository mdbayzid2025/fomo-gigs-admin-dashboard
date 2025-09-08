import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  InputAdornment,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

// Expanded event data
const eventData = [
  {
    eventDate: "2025-09-10",
    eventId: "EVT123456",
    eventName: "Music Concert",
    location: "New York, USA",
    status: "Scheduled",
    category: "Music",
    price: "$100.00",
    description:
      "A high-energy night with chart-topping artists and immersive stage production.",
    organizer: "City Sound Live",
    contactEmail: "info@citysoundlive.com",
    contactPhone: "+1 212-555-0100",
    startTime: "2025-09-10T19:30:00",
    endTime: "2025-09-10T22:00:00",
    timezone: "America/New_York",
    venue: {
      name: "Madison Square Garden",
      address: "4 Pennsylvania Plaza",
      city: "New York",
      country: "USA",
    },
    capacity: 18000,
    attendees: 13450,
    tags: ["Live", "Indoor", "All Ages"],
    ticketTypes: [
      {
        name: "General Admission",
        price: 100,
        currency: "USD",
        remaining: 412,
      },
      { name: "VIP", price: 220, currency: "USD", remaining: 37 },
    ],
    website: "https://example.com/music-concert",
  },
  {
    eventDate: "2025-09-15",
    eventId: "EVT123457",
    eventName: "Tech Conference",
    location: "San Francisco, USA",
    status: "Ongoing",
    category: "Technology",
    price: "$350.00",
    description:
      "Three days of talks, workshops, and demos on AI, web platforms, and cloud.",
    organizer: "SF Tech Guild",
    contactEmail: "contact@sftechguild.org",
    contactPhone: "+1 415-555-0111",
    startTime: "2025-09-15T09:00:00",
    endTime: "2025-09-17T17:30:00",
    timezone: "America/Los_Angeles",
    venue: {
      name: "Moscone Center",
      address: "747 Howard St",
      city: "San Francisco",
      country: "USA",
    },
    capacity: 6000,
    attendees: 5120,
    tags: ["Conference", "Workshops", "Expo"],
    ticketTypes: [
      { name: "Standard Pass", price: 350, currency: "USD", remaining: 120 },
      { name: "Full Access", price: 699, currency: "USD", remaining: 45 },
    ],
    website: "https://example.com/tech-conf",
  },
  {
    eventDate: "2025-09-20",
    eventId: "EVT123458",
    eventName: "Art Exhibition",
    location: "Los Angeles, USA",
    status: "Completed",
    category: "Art",
    price: "$50.00",
    description:
      "A curated collection of modern installations and interactive exhibits.",
    organizer: "LA Modern Arts",
    contactEmail: "hello@lamodernarts.org",
    contactPhone: "+1 323-555-0122",
    startTime: "2025-09-20T10:00:00",
    endTime: "2025-09-20T18:00:00",
    timezone: "America/Los_Angeles",
    venue: {
      name: "The Broad",
      address: "221 S Grand Ave",
      city: "Los Angeles",
      country: "USA",
    },
    capacity: 1200,
    attendees: 1187,
    tags: ["Exhibition", "Contemporary", "Interactive"],
    ticketTypes: [
      { name: "General", price: 50, currency: "USD", remaining: 0 },
      { name: "Student", price: 25, currency: "USD", remaining: 0 },
    ],
    website: "https://example.com/art-exhibition",
  },
  {
    eventDate: "2025-09-25",
    eventId: "EVT123459",
    eventName: "Food Festival",
    location: "Chicago, USA",
    status: "Scheduled",
    category: "Food & Drink",
    price: "$40.00",
    description:
      "Street food from 50+ vendors, live cooking shows, and local breweries.",
    organizer: "Taste of the City",
    contactEmail: "team@tastecity.com",
    contactPhone: "+1 312-555-0133",
    startTime: "2025-09-25T11:00:00",
    endTime: "2025-09-25T21:00:00",
    timezone: "America/Chicago",
    venue: {
      name: "Millennium Park",
      address: "201 E Randolph St",
      city: "Chicago",
      country: "USA",
    },
    capacity: 8000,
    attendees: 3620,
    tags: ["Outdoor", "Family", "Vegan Options"],
    ticketTypes: [
      { name: "Day Pass", price: 40, currency: "USD", remaining: 980 },
      { name: "Tasting Bundle", price: 65, currency: "USD", remaining: 210 },
    ],
    website: "https://example.com/food-fest",
  },
  {
    eventDate: "2025-09-30",
    eventId: "EVT123460",
    eventName: "Fashion Show",
    location: "Miami, USA",
    status: "Cancelled",
    category: "Fashion",
    price: "$150.00",
    description:
      "Runway showcase from emerging designers and established fashion houses.",
    organizer: "Miami Fashion Council",
    contactEmail: "press@miamifashioncouncil.com",
    contactPhone: "+1 305-555-0144",
    startTime: "2025-09-30T18:00:00",
    endTime: "2025-09-30T21:00:00",
    timezone: "America/New_York",
    venue: {
      name: "Miami Beach Convention Center",
      address: "1901 Convention Center Dr",
      city: "Miami Beach",
      country: "USA",
    },
    capacity: 3000,
    attendees: 0,
    tags: ["Runway", "Designers", "Invite Only"],
    ticketTypes: [
      { name: "Runway Seat", price: 150, currency: "USD", remaining: 0 },
      { name: "Backstage Tour", price: 280, currency: "USD", remaining: 0 },
    ],
    website: "https://example.com/fashion-show",
  },
];

export default function EventManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = eventData.filter(
      (event) =>
        event.eventId.toLowerCase().includes(search.toLowerCase()) ||
        event.eventName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEvents(filtered);
    setPage(0);
  };

  const handleChangePage = (_event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedEvent(null);
  };

  // Tailwind class for status pill
  const statusClass = (s) => {
    const key = s?.toLowerCase();
    if (key === "scheduled") return "bg-amber-400 text-black";
    if (key === "ongoing") return "bg-green-500 text-white";
    if (key === "completed") return "bg-sky-500 text-white";
    if (key === "cancelled") return "bg-rose-500 text-white";
    return "bg-gray-400 text-white";
  };

  // Quick formatter helpers
  const formatMoney = (n, c = "USD") =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: c }).format(
      n
    );

  const formatDT = (iso, tz) =>
    new Date(iso).toLocaleString(undefined, {
      timeZone: tz,
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="px-10 py-8 bg-[#fbfbfb] min-h-[92vh]">
      {/* Search */}
      <div className="flex items-center justify-end mb-4">
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
          placeholder="Search by Event ID or Event Name"
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F0F0F0" }}>
              {[
                "Event ID",
                "Event Name",
                "Location",
                "Category",
                "Status",
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
            {filteredEvents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event) => (
                <TableRow key={event.eventId}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {event.eventId}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {event.eventName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {event.location}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {event.category}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      className={`px-3 py-2 rounded-xl font-semibold ${statusClass(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleOpenModal(event)}>
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
        count={filteredEvents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Event Details Modal */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="event-details-modal"
        aria-describedby="modal-to-view-event-details"
      >
        {/* Overlay & center */}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl md:max-w-3xl bg-white rounded-2xl shadow-lg outline-none p-6 md:p-8 max-h-[85vh] overflow-y-auto animate-fadeIn">
          {selectedEvent && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-xl md:text-2xl font-semibold">
                    {selectedEvent.eventName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedEvent.category} • {selectedEvent.location}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass(
                      selectedEvent.status
                    )}`}
                  >
                    {selectedEvent.status}
                  </span>
                </div>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs tracking-wide text-gray-500">
                    Event ID
                  </p>
                  <p className="font-medium">{selectedEvent.eventId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs tracking-wide text-gray-500">Date</p>
                  <p className="font-medium">{selectedEvent.eventDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs tracking-wide text-gray-500">Starts</p>
                  <p className="font-medium">
                    {formatDT(selectedEvent.startTime, selectedEvent.timezone)}{" "}
                    ({selectedEvent.timezone})
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs tracking-wide text-gray-500">
                    Ends
                  </p>
                  <p className="font-medium">
                    {formatDT(selectedEvent.endTime, selectedEvent.timezone)} (
                    {selectedEvent.timezone})
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs tracking-wide text-gray-500">
                    Capacity
                  </p>
                  <p className="font-medium">
                    {selectedEvent.attendees}/{selectedEvent.capacity}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs tracking-wide text-gray-500">
                    Base Price
                  </p>
                  <p className="font-medium">{selectedEvent.price}</p>
                </div>
              </div>

              {/* Tags */}
              {selectedEvent.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.tags.map((event) => (
                    <span
                      key={event}
                      className="px-4 py-2 rounded-full text-xs font-semibold bg-green-500 text-gray-900"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Venue */}
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Venue</p>
                <p className="text-sm text-gray-700">
                  {selectedEvent.venue?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedEvent.venue?.address}, {selectedEvent.venue?.city},{" "}
                  {selectedEvent.venue?.country}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${selectedEvent.venue?.name}, ${selectedEvent.venue?.address}, ${selectedEvent.venue?.city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline text-blue-600"
                >
                  View on Map
                </a>
              </div>

              {/* Tickets */}
              {selectedEvent.ticketTypes?.length ? (
                <div className="space-y-2">
                  <p className="font-semibold">Tickets</p>
                  <div className="border rounded-xl overflow-hidden">
                    <div className="grid grid-cols-12 bg-gray-50 text-xs font-semibold text-gray-600">
                      <div className="col-span-5 p-3">Type</div>
                      <div className="col-span-3 p-3">Price</div>
                      <div className="col-span-4 p-3">Remaining</div>
                    </div>
                    {selectedEvent.ticketTypes.map((t) => (
                      <div
                        key={t.name}
                        className="grid grid-cols-12 border-t text-sm"
                      >
                        <div className="col-span-5 p-3">{t.name}</div>
                        <div className="col-span-3 p-3">
                          {formatMoney(t.price, t.currency)}
                        </div>
                        <div className="col-span-4 p-3">{t.remaining}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Description */}
              {selectedEvent.description ? (
                <div className="space-y-1">
                  <h3 className="font-semibold">About</h3>
                  <p className="text-sm text-gray-700">
                    {selectedEvent.description}
                  </p>
                </div>
              ) : null}

              {/* Contact & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold">Organizer</h3>
                  <p className="text-sm text-gray-700">
                    {selectedEvent.organizer}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedEvent.contactEmail}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedEvent.contactPhone}
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Links</h3>
                  <a
                    href={selectedEvent.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline text-blue-600"
                  >
                    Event Website
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
