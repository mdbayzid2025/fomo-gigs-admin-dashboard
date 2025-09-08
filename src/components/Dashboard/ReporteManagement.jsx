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
  IconButton,
  Modal,
  Box,
  InputAdornment,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const reportedPosts = [
  {
    postId: "POST123456",
    userName: "john_doe",
    userProfile: "https://www.example.com/images/john_doe.jpg",
    userEmail: "john_doe@example.com",
    followers: 3400,
    content: "https://via.placeholder.com/800x400",
    contentType: "Image",
    reportReason: "Inappropriate Content",
    status: "Pending",
    timestamp: "2025-09-15T14:00:00",
    likes: 124,
    comments: 45,
    shares: 12,
    location: "New York, USA",
    device: "iPhone 12",
    platform: "Instagram",
  },
  {
    postId: "POST123457",
    userName: "jane_smith",
    userProfile: "https://www.example.com/images/jane_smith.jpg",
    userEmail: "jane_smith@example.com",
    followers: 1800,
    content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // YouTube video link
    contentType: "Reel",
    reportReason: "Violence",
    status: "Reviewed",
    timestamp: "2025-09-14T10:00:00",
    likes: 231,
    comments: 67,
    shares: 23,
    location: "San Francisco, USA",
    device: "Samsung Galaxy",
    platform: "TikTok",
  },
  {
    postId: "POST123458",
    userName: "alice_wonder",
    userProfile:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Favatar-placeholder.iran.liara.run%2F&psig=AOvVaw0yvwSENQR-UZmd2OYAJ2Fu&ust=1757397439497000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjAg-G9yI8DFQAAAAAdAAAAABAE",
    userEmail: "alice_wonder@example.com",
    followers: 2500,
    content: "https://via.placeholder.com/800x400", // Placeholder image link
    contentType: "Image",
    reportReason: "Hate Speech",
    status: "Pending",
    timestamp: "2025-09-13T08:30:00",
    likes: 350,
    comments: 120,
    shares: 47,
    location: "Los Angeles, USA",
    device: "Google Pixel",
    platform: "Instagram",
  },
  {
    postId: "POST123459",
    userName: "bob_the_builder",
    userProfile: "https://www.example.com/images/bob_the_builder.jpg",
    userEmail: "bob_the_builder@example.com",
    followers: 4500,
    content: "https://www.vimeo.com/123456789", // Vimeo video link
    contentType: "Reel",
    reportReason: "Spam",
    status: "Reviewed",
    timestamp: "2025-09-12T16:45:00",
    likes: 420,
    comments: 30,
    shares: 56,
    location: "Chicago, USA",
    device: "OnePlus 9",
    platform: "Vimeo",
  },
];

export default function ReporteManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(reportedPosts);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = reportedPosts.filter(
      (post) =>
        post.postId.toLowerCase().includes(search.toLowerCase()) ||
        post.userName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
    setPage(0);
  };

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

  // Format timestamp helper
  const formatTimestamp = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // Status pill style helper
  const statusClass = (status) => {
    return status === "Reviewed"
      ? "bg-green-500 text-white"
      : status === "Pending"
      ? "bg-yellow-500 text-black"
      : "bg-gray-400 text-white";
  };

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
          placeholder="Search by Post ID or Username"
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

      {/* Table for Reported Posts */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F0F0F0" }}>
              {[
                "Post ID",
                "User",
                "Content Type",
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
                <TableRow key={post.postId}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.postId}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.userName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.contentType}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.reportReason}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      className={`px-3 py-2 rounded-xl font-semibold ${statusClass(
                        post.status
                      )}`}
                    >
                      {post.status}
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
              <div className="flex items-center gap-4">
                <img
                  src={selectedPost.userProfile}
                  alt="User Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                  <h3 className="text-2xl font-semibold">
                    {selectedPost.userName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedPost.userEmail}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedPost.followers} followers
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Post Details</h4>
                <div className="flex items-center">
                  <span className="font-semibold w-40">Post ID:</span>
                  <span>{selectedPost.postId}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-40">Reported Reason:</span>
                  <span>{selectedPost.reportReason}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-40">Timestamp:</span>
                  <span>{formatTimestamp(selectedPost.timestamp)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Post Content</h4>
                {selectedPost.contentType === "Image" ? (
                  <img
                    src={selectedPost.content}
                    alt="Reported Content"
                    className="w-full rounded-lg"
                  />
                ) : (
                  <video controls className="w-full rounded-lg">
                    <source src={selectedPost.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Engagement</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {selectedPost.likes}
                    </p>
                    <p className="text-sm text-gray-500">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {selectedPost.comments}
                    </p>
                    <p className="text-sm text-gray-500">Comments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {selectedPost.shares}
                    </p>
                    <p className="text-sm text-gray-500">Shares</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">
                  Additional Information
                </h4>
                <div className="flex items-center">
                  <span className="font-semibold w-40">Location:</span>
                  <span>{selectedPost.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-40">Device:</span>
                  <span>{selectedPost.device}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-40">Platform:</span>
                  <span>{selectedPost.platform}</span>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
