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

const diagnosisData = [
  {
    diagnosisName: "Autism Spectrum Therapy 1",
    diagnosisType: "Applied Behavior Analysis (ABA)",
  },
  {
    diagnosisName: "Autism Spectrum Therapy 2",
    diagnosisType: "Speech Therapy",
  },
  {
    diagnosisName: "Autism Spectrum Therapy 3",
    diagnosisType: "Occupational Therapy",
  },
  {
    diagnosisName: "Autism Spectrum Therapy 4",
    diagnosisType: "Developmental Therapy",
  },
  {
    diagnosisName: "Autism Spectrum Therapy 5",
    diagnosisType: "Play Therapy",
  },
  {
    diagnosisName: "Autism Spectrum Therapy 6",
    diagnosisType: "Early Intervention Therapy",
  },
  {
    diagnosisName: "Autism Spectrum Therapy 7",
    diagnosisType: "Social Skills Therapy",
  },
  {
    diagnosisName: "Autism Spectrum Therapy 8",
    diagnosisType: "Cognitive Behavioral Therapy (CBT)",
  },
  {
    diagnosisName: "Autism Spectrum Therapy 9",
    diagnosisType: "Parent Training Therapy",
  },
  {
    diagnosisName: "Autism Spectrum Therapy 10",
    diagnosisType: "Sensory Integration Therapy",
  },
];

export default function Diagnosis() {
  const [searchText, setSearchText] = useState("");
  const [filteredDiagnosis, setFilteredDiagnosis] = useState(diagnosisData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [checked, setChecked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [editDiagnosis, setEditDiagnosis] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [diagnosisToDelete, setDiagnosisToDelete] = useState(null);

  const handleChange = (event, diagnosisName) => {
    const updatedChecked = checked.includes(diagnosisName)
      ? checked.filter((item) => item !== diagnosisName)
      : [...checked, diagnosisName];
    setChecked(updatedChecked);
  };

  const filterDiagnosis = (search) => {
    let filtered = diagnosisData;

    if (search) {
      filtered = filtered.filter((diagnosis) =>
        diagnosis.diagnosisName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredDiagnosis(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (mode, diagnosis = null) => {
    setModalMode(mode); // "add" or "edit"
    setEditDiagnosis(diagnosis); // Set diagnosis data if it's edit mode
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditDiagnosis(null);
  };

  const handleSaveDiagnosis = () => {
    if (modalMode === "edit") {
      const updatedData = diagnosisData.map((diagnosis) =>
        diagnosis.diagnosisName === editDiagnosis.diagnosisName
          ? editDiagnosis
          : diagnosis
      );
      setFilteredDiagnosis(updatedData);
    } else if (modalMode === "add") {
      const newDiagnosis = {
        diagnosisName: editDiagnosis.diagnosisName,
        diagnosisType: editDiagnosis.diagnosisType,
      };
      diagnosisData.push(newDiagnosis);
      setFilteredDiagnosis([...diagnosisData]);
    }
    setOpenModal(false);
    setEditDiagnosis(null);
  };

  const handleDeleteDiagnosis = (diagnosisName) => {
    setDiagnosisToDelete(diagnosisName);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedData = diagnosisData.filter(
      (diagnosis) => diagnosis.diagnosisName !== diagnosisToDelete
    );
    setFilteredDiagnosis(updatedData);
    setOpenDeleteModal(false);
    setDiagnosisToDelete(null);
  };

  const cancelDelete = () => {
    setOpenDeleteModal(false);
    setDiagnosisToDelete(null);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    filterDiagnosis(search);
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
          placeholder="Search by Diagnosis Name"
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
            <TableHead>
              <TableRow sx={{ backgroundColor: "#CD8085" }}>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Diagnosis Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Diagnosis Type
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
                  Select Visibilty
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDiagnosis
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((diagnosis) => (
                  <TableRow key={diagnosis.diagnosisName}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {diagnosis.diagnosisName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {diagnosis.diagnosisType}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        onClick={() => handleOpenModal("edit", diagnosis)}
                      >
                        <AiOutlineEdit className="text-xl text-[#ffaa00]" />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleDeleteDiagnosis(diagnosis.diagnosisName)
                        }
                      >
                        <AiOutlineDelete className="text-xl text-[#ee443f]" />
                      </IconButton>
                    </TableCell>{" "}
                    <TableCell sx={{ textAlign: "center" }}>
                      <Checkbox
                        checked={checked.includes(diagnosis.diagnosisName)}
                        onChange={(e) =>
                          handleChange(e, diagnosis.diagnosisName)
                        }
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
          count={filteredDiagnosis.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Modal for Add/Edit Diagnosis */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="edit-diagnosis-modal"
        aria-describedby="modal-to-edit-diagnosis"
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
            {modalMode === "edit" ? "Edit Diagnosis" : "Add Diagnosis"}
          </p>
          <div className="flex flex-col gap-5 items-center">
            <TextField
              label="Diagnosis Name"
              value={editDiagnosis ? editDiagnosis.diagnosisName : ""}
              onChange={(e) =>
                setEditDiagnosis({
                  ...editDiagnosis,
                  diagnosisName: e.target.value,
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
              label="Diagnosis Type"
              value={editDiagnosis ? editDiagnosis.diagnosisType : ""}
              onChange={(e) =>
                setEditDiagnosis({
                  ...editDiagnosis,
                  diagnosisType: e.target.value,
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
                onClick={handleSaveDiagnosis}
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
            Are you sure you want to delete this diagnosis?
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
