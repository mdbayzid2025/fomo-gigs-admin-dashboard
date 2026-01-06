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
  InputAdornment,
  IconButton,
  Modal,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete, MdAdd, MdImage } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import { getImageUrl } from "../../utils/baseUrl";
import { toast } from "sonner";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetEventCategoriesQuery,
} from "../../Redux/api/eventApi";

export default function EventCategory() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState(""); // 'add', 'edit', 'delete'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const imageUrl = getImageUrl();

  const {
    data: allCategoryData,
    isLoading,
    isError,
    refetch,
  } = useGetEventCategoriesQuery();
  const categories = allCategoryData?.data || [];
  console.log("categories data", categories);

  const [addCategory, { isLoading: isLoadingAdd }] = useAddCategoryMutation();
  const [editCategory, { isLoading: isLoadingEdit }] =
    useEditCategoryMutation();
  const [deleteCategory, { isLoading: isLoadingDelete }] =
    useDeleteCategoryMutation();

  const filteredCategories = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOpenModal = (mode, category = null) => {
    setModalMode(mode);
    setSelectedCategory(category);
    if (mode === "add") {
      setFormData({ categoryName: "" });
      setImageFile(null);
      setImagePreview(null);
    } else if (mode === "edit" && category) {
      setFormData({
        categoryName: category.categoryName,
      });
      setImagePreview(category.image || null);
      setImageFile(null);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
    setModalMode("");
    setFormData({ categoryName: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    try {
      if (modalMode === "add") {
        // Validate input
        if (!formData.categoryName.trim()) {
          toast.warning("Please enter a category name");
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append(
          "data",
          JSON.stringify({ categoryName: formData.categoryName })
        );
        if (imageFile) {
          formDataToSend.append("image", imageFile);
        }

        const response = await addCategory(formDataToSend).unwrap();
        console.log("add response", response);
        if (response.success) {
          toast.success("Category added successfully!");
          refetch();
          handleCloseModal();
        }
      } else if (modalMode === "edit") {
        // Validate input
        if (!formData.categoryName.trim()) {
          toast.warning("Please enter a category name");
          return;
        }

        const formDataToSend = new FormData();
        // formDataToSend.append(
        //   "data",
        //   JSON.stringify({ categoryName: formData.categoryName })
        // );
        if (imageFile) {
          formDataToSend.append("image", imageFile);
        }

        const response = await editCategory({
          id: selectedCategory._id,
          data: formDataToSend,
        }).unwrap();
        console.log("edit response", response);
        if (response.success) {
          toast.success("Category updated successfully!");
          refetch();
          handleCloseModal();
        }
      } else if (modalMode === "delete") {
        const response = await deleteCategory(selectedCategory._id).unwrap();
        console.log("delete response", response);
        if (response.success) {
          toast.success("Category deleted successfully!");
          refetch();
          handleCloseModal();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Operation failed. Please try again.";
      toast.error(errorMessage);
    }
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
        <p className="text-red-500 text-lg">Failed to load categories.</p>
      </div>
    );
  }

  const isSubmitting = isLoadingAdd || isLoadingEdit || isLoadingDelete;

  return (
    <div className="px-10 py-8 bg-[#fbfbfb] h-[92vh]">
      {/* Header with Search and Add Button */}
      <div className="flex justify-between gap-3 items-center mb-4">
        <p className="text-xl font-semibold">Event Categories</p>{" "}
        <div className="flex items-center gap-3">
          <TextField
            sx={{ width: 300 }}
            placeholder="Search Category"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={() => handleOpenModal("add")}
            sx={{
              backgroundColor: "#1976d2",
              textTransform: "none",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Add Category
          </Button>
        </div>
      </div>

      {/* Table */}
      <TableContainer className="rounded-xl shadow">
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                }}
              >
                Category Name
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                }}
              >
                Created
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCategories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => (
                <TableRow key={category._id}>
                  <TableCell align="center">{category.categoryName}</TableCell>
                  <TableCell align="center">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleOpenModal("edit", category)}
                      color="primary"
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenModal("delete", category)}
                      color="error"
                    >
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredCategories.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />

      {/* Add/Edit/Delete Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="absolute top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <IconButton onClick={handleCloseModal} className="float-right">
            <IoClose />
          </IconButton>

          {modalMode === "delete" ? (
            <>
              <h2 className="text-xl font-bold mb-4">Delete Category</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "
                {selectedCategory?.categoryName}
                "? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#555",
                    bgcolor: "#f0f0f0",
                    "&:hover": { bgcolor: "#e0e0e0" },
                  }}
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    bgcolor: "red",
                    "&:hover": { bgcolor: "#d32f2f" },
                    color: "#fff",
                  }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isLoadingDelete ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">
                {modalMode === "add" ? "Add Category" : "Edit Category"}
              </h2>

              <TextField
                fullWidth
                label="Category Name"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleInputChange}
                margin="normal"
                required
              />

              {/* Image Upload Section */}
              <div className="mt-4 mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
                </label>

                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={
                        imageFile ? imagePreview : `${imageUrl}${imagePreview}`
                      }
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "white",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <IoClose />
                    </IconButton>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <MdImage className="text-4xl text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Click to upload image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#555",
                    bgcolor: "#f0f0f0",
                    "&:hover": { bgcolor: "#e0e0e0" },
                  }}
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    bgcolor: "#1976d2",
                    "&:hover": { bgcolor: "#1565c0" },
                    color: "#fff",
                  }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isLoadingAdd || isLoadingEdit ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : modalMode === "add" ? (
                    "Add"
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
