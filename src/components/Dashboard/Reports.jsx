import { useState } from "react";
import { Button } from "@mui/material";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from "react-icons/fa";

// Mock data for reports
const initialReports = [
  {
    id: 1,
    date: "12-02-25",
    name: "Talha Ahnaf",
    email: "example213@gmail.com",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    status: "pending",
  },
  {
    id: 2,
    date: "12-02-25",
    name: "Talha Ahnaf",
    email: "example213@gmail.com",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    status: "solved",
  },
  {
    id: 3,
    date: "12-02-25",
    name: "Talha Ahnaf",
    email: "example213@gmail.com",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    status: "pending",
  },
  {
    id: 4,
    date: "12-02-25",
    name: "Talha Ahnaf",
    email: "example213@gmail.com",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    status: "solved",
  },
  {
    id: 5,
    date: "11-02-25",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "pending",
  },
  {
    id: 6,
    date: "10-02-25",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    status: "solved",
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState(initialReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortFilter, setSortFilter] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const itemsPerPage = 4;

  // Filter and search logic
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      report.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Sort logic
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortFilter === "Most Recent") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortFilter === "Oldest") {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = sortedReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleStatusUpdate = (reportId, newStatus) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );
  };

  const handleDeleteReport = (reportId) => {
    setReports(reports.filter((report) => report.id !== reportId));
  };

  const statusOptions = ["All Status", "Pending", "Solved"];
  const sortOptions = ["Most Recent", "Oldest"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">Manage and process customer order</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1">
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-12"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Button
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              sx={{
                minWidth: "auto",
                padding: "8px 16px",
                textTransform: "none",
              }}
              className="flex items-center justify-between w-40 bg-white border border-gray-300 rounded-lg h-11 focus:outline-none focus:ring-2 focus:ring-blue-500"
              variant="outlined"
              endIcon={<FaChevronDown size={16} />}
            >
              <span className="text-gray-700">{statusFilter}</span>
            </Button>
            {isStatusDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {statusOptions.map((option) => (
                  <Button
                    key={option}
                    onClick={() => {
                      setStatusFilter(option);
                      setIsStatusDropdownOpen(false);
                      setCurrentPage(1);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    sx={{ justifyContent: "flex-start", textTransform: "none" }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <Button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              sx={{
                minWidth: "auto",
                padding: "8px 16px",
                textTransform: "none",
                width: "160px",
              }}
              className="flex items-center justify-between bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              variant="outlined"
              endIcon={<FaChevronDown size={16} />}
            >
              <span className="text-gray-700">{sortFilter}</span>
            </Button>
            {isSortDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {sortOptions.map((option) => (
                  <Button
                    key={option}
                    onClick={() => {
                      setSortFilter(option);
                      setIsSortDropdownOpen(false);
                      setCurrentPage(1);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    sx={{ justifyContent: "flex-start", textTransform: "none" }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {paginatedReports.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No reports found matching your criteria.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {paginatedReports.map((report) => (
                <div
                  key={report.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Date */}
                    <div className="lg:w-20 flex-shrink-0">
                      <span className="text-sm text-gray-600">
                        {report.date}
                      </span>
                    </div>

                    {/* Name */}
                    <div className="lg:w-32 flex-shrink-0">
                      <span className="text-sm font-medium text-gray-900">
                        {report.name}
                      </span>
                    </div>

                    {/* Email */}
                    <div className="lg:w-48 flex-shrink-0">
                      <span className="text-sm text-gray-600">
                        {report.email}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {report.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 lg:flex-shrink-0">
                      {report.status === "pending" ? (
                        <>
                          <Button
                            onClick={() =>
                              handleStatusUpdate(report.id, "solved")
                            }
                            variant="outlined"
                            size="small"
                            sx={{
                              color: "#059669",
                              borderColor: "#059669",
                              backgroundColor: "#ecfdf5",
                              "&:hover": {
                                backgroundColor: "#d1fae5",
                                borderColor: "#059669",
                              },
                              textTransform: "none",
                            }}
                          >
                            Solve
                          </Button>
                          <Button
                            onClick={() => handleDeleteReport(report.id)}
                            variant="outlined"
                            size="small"
                            sx={{
                              color: "#dc2626",
                              borderColor: "#dc2626",
                              backgroundColor: "#fef2f2",
                              "&:hover": {
                                backgroundColor: "#fee2e2",
                                borderColor: "#dc2626",
                              },
                              textTransform: "none",
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant="outlined"
                            size="small"
                            disabled
                            sx={{
                              color: "#059669",
                              borderColor: "#059669",
                              backgroundColor: "#ecfdf5",
                              textTransform: "none",
                            }}
                          >
                            Solved
                          </Button>
                          <Button
                            onClick={() => handleDeleteReport(report.id)}
                            variant="outlined"
                            size="small"
                            sx={{
                              color: "#dc2626",
                              borderColor: "#dc2626",
                              backgroundColor: "#fef2f2",
                              "&:hover": {
                                backgroundColor: "#fee2e2",
                                borderColor: "#dc2626",
                              },
                              textTransform: "none",
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              variant="outlined"
              sx={{ minWidth: "auto", padding: "8px" }}
            >
              <FaChevronLeft size={20} />
            </Button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  variant={currentPage === page ? "contained" : "outlined"}
                  sx={{
                    minWidth: "40px",
                    height: "40px",
                    backgroundColor:
                      currentPage === page ? "#111827" : "transparent",
                    color: currentPage === page ? "white" : "#4B5563",
                    borderColor: currentPage === page ? "#111827" : "#D1D5DB",
                    "&:hover": {
                      backgroundColor:
                        currentPage === page ? "#374151" : "#F3F4F6",
                    },
                  }}
                >
                  {page}
                </Button>
              );
            })}

            <Button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              variant="outlined"
              sx={{ minWidth: "auto", padding: "8px" }}
            >
              <FaChevronRight size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
