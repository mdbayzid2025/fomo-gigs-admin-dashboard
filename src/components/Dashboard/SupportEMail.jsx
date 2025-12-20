import { useEffect, useState } from "react";
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
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
// import { toast } from "sonner";
import { useGetSupportDataQuery } from "../../Redux/api/supportApi";
import dayjs from "dayjs";

export default function SupportEmail() {
  const [searchText, setSearchText] = useState("");
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  // const [replyText, setReplyText] = useState("");

  const { data: supportData, isLoading, isError } = useGetSupportDataQuery();
  const support = supportData?.data.data || [];
  console.log("support data", support);

  useEffect(() => {
    if (support.length) {
      setFilteredEmails(support);
    }
  }, [support]);

  const handleSearchChange = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchText(search);
    const filtered = support.filter(
      (email) =>
        email.name.toLowerCase().includes(search) ||
        email.email.includes(search)
    );
    setFilteredEmails(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (email) => {
    setSelectedEmail(email);
    // setReplyText("");
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedEmail(null);
    // setReplyText("");
  };

  // const handleSendReply = () => {
  //   if (!replyText.trim()) {
  //     toast.error("Please type a reply before sending.");
  //     return;
  //   }

  //   const updatedEmails = filteredEmails.map((email) =>
  //     email.phoneNumber === selectedEmail.phoneNumber
  //       ? { ...email, status: "Solved" }
  //       : email
  //   );

  //   setFilteredEmails(updatedEmails);

  //   console.log("Sending reply:", replyText);
  //   console.log("To:", selectedEmail.userName);

  //   toast.success("Reply sent successfully!");

  //   setReplyText("");
  //   handleCloseModal();
  // };

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
        <p className="text-red-500">Something went wrong</p>
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
                borderColor: "#131927",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "20px",
            },
            height: "40px",
            "& .MuiInputBase-root": {
              height: "100%",
            },
          }}
          placeholder="Search by User Name"
          value={searchText}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          }
        />
      </div>

      <TableContainer
        style={{
          borderRadius: "16px",
          boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                User Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Problem Message
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
            {filteredEmails
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((email) => (
                <TableRow key={email._id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {email.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {email.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {email.message}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          email.status.toLowerCase() === "solved"
                            ? "#1EC74F"
                            : "#EE5252", // Adjust the status color as per the status
                        fontWeight: "600",
                      }}
                    >
                      {email.status}
                    </span>
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleOpenModal(email)}>
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
        count={filteredEmails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal to display email details */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="email-details-modal"
        aria-describedby="modal-to-view-email-details"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 750,
            backgroundColor: "#FDFDFD",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {selectedEmail && (
            <div className="flex flex-col items-center gap-5 ">
              <p className="text-center text-3xl font-semibold text-[#1A1A1A] py-5">
                Support Request Details
              </p>
              <div className="flex flex-col gap-5 w-full px-10">
                <div className="flex justify-between w-full gap-10">
                  <div>
                    <p className="font-semibold">From:</p>
                    <p>{selectedEmail.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p>{selectedEmail.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Date:</p>
                    <p>
                      {dayjs(selectedEmail.createdAt).format(
                        "DD MMM YYYY, hh:mm A"
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Message:</p>
                  <p className="text-justify">{selectedEmail.message}</p>
                </div>
                {/* <div className="flex flex-col gap-2">
                  <p className="font-semibold">Your Reply</p>
                  <TextField
                    className="w-full"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#131927", // Change border color on focus
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "12px", // Apply border-radius to the outline
                      },
                      "& .MuiInputBase-root": {
                        height: "100%", // Ensure the input base fills the TextField height
                      },
                      backgroundColor: "#F5F5F5",
                      "& .MuiInputBase-input": {
                        padding: "8px", // Adjust padding for better text alignment
                      },
                    }}
                    multiline
                    rows={4}
                    placeholder="Type your reply here..."
                  />
                  <div className="flex justify-end gap-4 mt-5">
                    <Button
                      onClick={handleCloseModal}
                      sx={{
                        backgroundColor: "#FA4747",
                        textTransform: "none",
                        width: "100px",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#EE5252",
                        },
                      }}
                    >
                      Decline
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#00A430",
                        textTransform: "none",
                        width: "100px",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#00A430",
                        },
                      }}
                      onClick={handleSendReply}
                    >
                      Send
                    </Button>
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
