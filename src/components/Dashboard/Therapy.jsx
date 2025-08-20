import { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Checkbox,
  Modal,
  Box,
  TextField,
  InputBase,
  InputAdornment,
  checkboxClasses,
  IconButton,
} from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const therapyData = [
  {
    therapyName: "Autism Spectrum Disorder Therapy 1",
    therapyType: "Applied Behavior Analysis (ABA)",
  },
  {
    therapyName: "Autism Spectrum Disorder Therapy 2",
    therapyType: "Speech Therapy",
  },
  {
    therapyName: "Autism Spectrum Disorder Therapy 3",
    therapyType: "Occupational Therapy",
  },
  {
    therapyName: "Autism Spectrum Disorder Therapy 4",
    therapyType: "Developmental Therapy",
  },
  {
    therapyName: "Autism Spectrum Disorder Therapy 5",
    therapyType: "Play Therapy",
  },
  {
    therapyName: "Autism Spectrum Disorder Therapy 6",
    therapyType: "Early Intervention Therapy",
  },
  {
    therapyName: "Autism Spectrum Disorder Therapy 7",
    therapyType: "Social Skills Therapy",
  },
  {
    therapyName: "Autism Spectrum Disorder Therapy 8",
    therapyType: "Cognitive Behavioral Therapy (CBT)",
  },
  {
    therapyName: "Autism Spectrum Disorder Therapy 9",
    therapyType: "Parent Training Therapy",
  },
  {
    therapyName: "Autism Spectrum Disorder Therapy 10",
    therapyType: "Sensory Integration Therapy",
  },
];

export default function Therapy() {
  const [searchText, setSearchText] = useState("");
  const [filteredTherapy, setFilteredTherapy] = useState(therapyData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [checked, setChecked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [editTherapy, setEditTherapy] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [therapyToDelete, setTherapyToDelete] = useState(null);

  const handleChange = (event, therapyName) => {
    const updatedChecked = checked.includes(therapyName)
      ? checked.filter((item) => item !== therapyName)
      : [...checked, therapyName];
    setChecked(updatedChecked);
  };

  const filterTherapy = (search) => {
    let filtered = therapyData;

    if (search) {
      filtered = filtered.filter((therapy) =>
        therapy.therapyName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredTherapy(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (mode, therapy = null) => {
    setModalMode(mode); // "add" or "edit"
    setEditTherapy(therapy); // Set therapy data if it's edit mode
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditTherapy(null);
  };

  const handleSaveTherapy = () => {
    if (modalMode === "edit") {
      const updatedData = therapyData.map((therapy) =>
        therapy.therapyName === editTherapy.therapyName ? editTherapy : therapy
      );
      setFilteredTherapy(updatedData);
    } else if (modalMode === "add") {
      const newTherapy = {
        therapyName: editTherapy.therapyName,
        therapyType: editTherapy.therapyType,
      };
      therapyData.push(newTherapy);
      setFilteredTherapy([...therapyData]);
    }
    setOpenModal(false);
    setEditTherapy(null);
  };

  const handleDeleteTherapy = (therapyName) => {
    setTherapyToDelete(therapyName);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedData = therapyData.filter(
      (therapy) => therapy.therapyName !== therapyToDelete
    );
    setFilteredTherapy(updatedData);
    setOpenDeleteModal(false);
    setTherapyToDelete(null);
  };

  const cancelDelete = () => {
    setOpenDeleteModal(false);
    setTherapyToDelete(null);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    filterTherapy(search);
  };

  return (
    <div className="px-10 py-8 bg-[#fffffe] h-[92vh]">
      <div className="flex items-center justify-end gap-3">
        <TextField
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#CD8085", // Change border color on focus
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
          placeholder="Search by Therapy Name"
          value={searchText}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          }
        />
        <Button
          onClick={() => handleOpenModal("add")}
          sx={{
            bgcolor: "#CD8085",
            width: "150px",
            textTransform: "none",
            color: "white",
            height: "40px",
            fontSize: "14px",
            borderRadius: "50px",
          }}
        >
          + Add More
        </Button>
      </div>

      <div className="flex flex-col items-center mt-6">
        <TableContainer sx={{ border: "none", outline: "none" }}>
          <Table>
            <TableHead
              sx={{
                borderRadius: "50px",
              }}
            >
              <TableRow
                sx={{ backgroundColor: "#CD8085", borderRadius: "50px" }}
              >
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Therapy Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Therapy Type
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Action
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Select Visibility
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTherapy
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((therapy) => (
                  <TableRow key={therapy.therapyName}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {therapy.therapyName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {therapy.therapyType}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        onClick={() => handleOpenModal("edit", therapy)}
                      >
                        <AiOutlineEdit className="text-xl text-[#ffaa00]" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteTherapy(therapy.therapyName)}
                      >
                        <AiOutlineDelete className="text-xl text-[#ee443f]" />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Checkbox
                        checked={checked.includes(therapy.therapyName)}
                        onChange={(e) => handleChange(e, therapy.therapyName)}
                        sx={{
                          [`&, &.${checkboxClasses.checked}`]: {
                            color: "#CD8085", // This changes the color of the checkmark and the border when checked
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 8]}
          component="div"
          count={filteredTherapy.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Modal for Add/Edit Therapy */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="edit-therapy-modal"
        aria-describedby="modal-to-edit-therapy"
      >
        <Box
          className="modal-content"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            backgroundColor: "white",
            boxShadow: 24,
            padding: 4,
            borderRadius: 2,
          }}
        >
          <p className="text-center text-[#1A1A1A] font-semibold text-xl mb-4">
            {modalMode === "edit" ? "Edit Therapy" : "Add Therapy"}
          </p>
          <div className="flex flex-col gap-5 items-center">
            <TextField
              label="Therapy Name"
              value={editTherapy ? editTherapy.therapyName : ""}
              onChange={(e) =>
                setEditTherapy({
                  ...editTherapy,
                  therapyName: e.target.value,
                })
              }
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#CD8085", // Change border color on focus
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#CD8085", // Change label color on focus (optional)
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "20px", // Apply border-radius to the outline
                },
                height: "50px", // Set the height of the TextField
                "& .MuiInputBase-root": {
                  height: "100%", // Ensure the input base fills the TextField height
                },
              }}
            />
            <TextField
              label="Therapy Type"
              value={editTherapy ? editTherapy.therapyType : ""}
              onChange={(e) =>
                setEditTherapy({
                  ...editTherapy,
                  therapyType: e.target.value,
                })
              }
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#CD8085", // Change border color on focus
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#CD8085", // Change label color on focus (optional)
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "20px", // Apply border-radius to the outline
                },
                height: "50px", // Set the height of the TextField
                "& .MuiInputBase-root": {
                  height: "100%", // Ensure the input base fills the TextField height
                },
              }}
            />
            <div className="flex items-center justify-end w-full">
              <Button
                onClick={handleSaveTherapy}
                variant="contained"
                sx={{
                  bgcolor: "#CD8085",
                  width: "120px",
                  textTransform: "none",
                  borderRadius: "50px",
                }}
              >
                Save
              </Button>
              <Button
                onClick={handleCloseModal}
                sx={{
                  marginLeft: "10px",
                  width: "120px",
                  color: "#CD8085",
                  border: "1px solid #CD8085",
                  textTransform: "none",
                  borderRadius: "50px",
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDeleteModal}
        onClose={cancelDelete}
        aria-labelledby="delete-confirmation-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            backgroundColor: "white",
            boxShadow: 24,
            padding: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <p className="text-center text-[#1A1A1A] font-semibold text-xl">
            Confirm Delete
          </p>
          <p className="text-lg">
            Are you sure you want to delete this therapy?
          </p>
          <div className="flex items-center justify-end">
            <Button
              onClick={confirmDelete}
              sx={{
                bgcolor: "#CD8085",
                width: "120px",
                textTransform: "none",
                borderRadius: "50px",
                color: "white",
              }}
            >
              Confirm
            </Button>
            <Button
              onClick={cancelDelete}
              sx={{
                marginLeft: "10px",
                width: "120px",
                color: "#CD8085",
                border: "1px solid #CD8085",
                textTransform: "none",
                borderRadius: "50px",
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
