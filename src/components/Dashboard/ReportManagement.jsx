import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  IconButton,
  Modal,
  Box,
  InputAdornment,
  Button,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import {
  useChangeReportStatusMutation,
  useGetReportsDataQuery,
} from "../../Redux/api/interactApi";
import dayjs from "dayjs";
import { toast } from "sonner";

export default function ReportManagement() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const {
    data: reportsData,
    isLoading: reportsLoading,
    isError: reportsError,
    refetch,
  } = useGetReportsDataQuery();
  const reports = reportsData?.data.data || [];
  console.log(reports);

  const [changeReportStatus, { isLoading: isStatusChanging }] =
    useChangeReportStatusMutation();

  useEffect(() => {
    if (reports.length) {
      setFilteredPosts(reports);
    }
  }, [reports]);

  const handleChangePage = (_event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedPost(null);
  };

  const handleManagePost = async (postId, newStatus) => {
    try {
      // Call the mutation with the report ID and new status
      const result = await changeReportStatus({
        providerId: postId,
        status: newStatus,
      }).unwrap();
      console.log(result);

      if (result.success) {
        refetch();
        toast.success("Report Status Updated Successfully.");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating report status:", error);
      toast.error("Failed to update report status.");
    }
  };

  // Status pill style helper
  const statusClass = (status) => {
    return status === "RESOLVED"
      ? "bg-green-500 text-white"
      : status === "PENDING"
      ? "bg-yellow-500 text-black"
      : "bg-gray-400 text-white";
  };

  if (reportsLoading || isStatusChanging) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (reportsError) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <p className="text-red-500">Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="px-10 py-8 bg-[#fbfbfb] min-h-[92vh]">
      {/* Table for Reported Posts */}
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
                "Post ID",

                "Target Type",
                "Reported Reason",
                "Status",
                "Action",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <TableRow key={post._id}>
                  <TableCell sx={{ textAlign: "center" }}>{post._id}</TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    {post.targetType}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.reason}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      className={`px-3 py-2 rounded-xl font-semibold ${statusClass(
                        post.status
                      )}`}
                    >
                      {post?.status
                        ? post.status.charAt(0).toUpperCase() +
                          post.status.slice(1).toLowerCase()
                        : ""}
                    </span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleOpenModal(post)}>
                      <FiEye className="text-lg text-[#131927]" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredPosts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for Viewing Reported Post Details */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="reported-post-details-modal"
        aria-describedby="modal-to-view-reported-post-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "800px",
            backgroundColor: "#FDFDFD",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            borderRadius: "8px",
            overflowY: "auto",
            maxHeight: "90vh",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          {selectedPost && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Post Details</h4>
                <div className="flex items-center">
                  <span className="font-semibold w-40">Post ID:</span>
                  <span>{selectedPost._id}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-40">Reported Reason:</span>
                  <span>{selectedPost.reason}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-40">Timestamp:</span>
                  <span>
                    {" "}
                    {dayjs(selectedPost.createdAt).format(
                      "DD MMM YYYY, hh:mm A"
                    )}
                  </span>
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div className="flex justify-end gap-4">
                {/* <Button
                  sx={{
                    bgcolor: "#131927",
                    color: "white",
                    ":hover": { bgcolor: "#0095FF" },
                    textTransform: "none",
                  }}
                  onClick={() => handleManagePost(selectedPost._id, "REVIEWED")}
                  disabled={isStatusChanging}
                >
                  Mark as Reviewed
                </Button> */}
                {selectedPost.status !== "RESOLVED" && (
                  <Button
                    sx={{
                      bgcolor: "#0095FF",
                      color: "white",
                      ":hover": { bgcolor: "#131927" },
                      textTransform: "none",
                    }}
                    onClick={() =>
                      handleManagePost(selectedPost._id, "RESOLVED")
                    }
                    disabled={isStatusChanging}
                  >
                    Mark as Resolved
                  </Button>
                )}
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
