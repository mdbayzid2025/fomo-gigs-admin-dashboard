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
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

// Updated social media data
const socialMediaData = [
  {
    postDate: "2025-08-21",
    postId: "POST123456",
    postTitle: "New Product Launch",
    authorName: "John Doe",
    platform: "Instagram",
    status: "Published",
    category: "Product",
    engagement: "1500 likes, 300 comments",
  },
  {
    postDate: "2025-08-20",
    postId: "POST123457",
    postTitle: "Event Reminder",
    authorName: "Jane Smith",
    platform: "Facebook",
    status: "Scheduled",
    category: "Event",
    engagement: "800 likes, 150 comments",
  },
  {
    postDate: "2025-08-19",
    postId: "POST123458",
    postTitle: "Behind the Scenes",
    authorName: "Robert Johnson",
    platform: "Twitter",
    status: "Published",
    category: "Media",
    engagement: "1200 likes, 200 comments",
  },
  {
    postDate: "2025-08-18",
    postId: "POST123459",
    postTitle: "New Blog Post",
    authorName: "Mary Williams",
    platform: "LinkedIn",
    status: "Draft",
    category: "Content",
    engagement: "400 likes, 50 comments",
  },
  {
    postDate: "2025-08-17",
    postId: "POST123460",
    postTitle: "Weekly Update",
    authorName: "Patricia Brown",
    platform: "YouTube",
    status: "Published",
    category: "Update",
    engagement: "2500 likes, 500 comments",
  },
  // Add more social media posts as necessary
];

export default function SocialManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(socialMediaData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = socialMediaData.filter(
      (post) =>
        post.postId.toLowerCase().includes(search.toLowerCase()) ||
        post.postTitle.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
          placeholder="Search by Post ID or Title"
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
                Post ID
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Post Title
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Author Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Platform
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
                Engagement
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
            {filteredPosts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <TableRow key={post.postId}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.postId}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.postTitle}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.authorName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.platform}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          post.status.toLowerCase() === "published"
                            ? "#1EC74F"
                            : post.status.toLowerCase() === "scheduled"
                            ? "#FFCC00"
                            : post.status.toLowerCase() === "draft"
                            ? "#00B5E2"
                            : post.status.toLowerCase() === "cancelled"
                            ? "#EE5252"
                            : "#9e9e9e",
                        fontWeight: "600",
                      }}
                    >
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.engagement}
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={socialMediaData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal to display post details */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="post-details-modal"
        aria-describedby="modal-to-view-post-details"
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
          {selectedPost && (
            <div>
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2">
                  <p>Post ID:</p>
                  <p>Post Title:</p>
                  <p>Author Name:</p>
                  <p>Platform:</p>
                  <p>Status:</p>
                  <p>Engagement:</p>
                  <p>Post Date:</p>
                </div>
                <div className="flex flex-col gap-2 font-semibold">
                  <p>{selectedPost.postId}</p>
                  <p>{selectedPost.postTitle}</p>
                  <p>{selectedPost.authorName}</p>
                  <p>{selectedPost.platform}</p>
                  <p>{selectedPost.status}</p>
                  <p>{selectedPost.engagement}</p>
                  <p>{selectedPost.postDate}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
