import {
  Button,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { toast } from "sonner";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetServiceCategoriesQuery,
} from "../../Redux/api/serviceApi";
import { getImageUrl } from "../../utils/baseUrl";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";
import ManagePagination from "../Shared/ManagePagination";
import SearchInput from "../Shared/SearchInput";
import ServiceCategoryModal from "../UI/Modals/ServiceCategoryModal";

export default function ServiceCategory() {

  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState(""); // 'add', 'edit', 'delete'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    serviceName: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const imageUrl = getImageUrl();

  const {
    data: allCategoryData,
    isLoading,
    isError,
    refetch,
  } = useGetServiceCategoriesQuery();
  const categories = allCategoryData?.data || [];

  console.log("formData", formData);


  const [addCategory, { isLoading: isLoadingAdd }] = useAddCategoryMutation();
  const [editCategory, { isLoading: isLoadingEdit }] =
    useEditCategoryMutation();
  const [deleteCategory, { isLoading: isLoadingDelete }] =
    useDeleteCategoryMutation();

  const { page, limit, searchTerm } = getSearchParams()

  const updateSearchParams = useUpdateSearchParams()
  /* ✅ Sync filtered users when API data loads */
  useEffect(() => {
    refetch()
  }, [page, limit, searchTerm]);

  const handleOpenModal = (mode, category = null) => {
    setModalMode(mode);
    setSelectedCategory(category);
    if (mode === "add") {
      setFormData({ serviceName: "" });
      setImageFile(null);
      setImagePreview(null);
    } else if (mode === "edit" && category) {
      setFormData({
        serviceName: category.serviceName,
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
    setFormData({ serviceName: "" });
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
        if (!formData.serviceName.trim()) {
          toast.warning("Please enter a category name");
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append(
          "data",
          JSON.stringify({ serviceName: formData.serviceName })
        );
        if (imageFile) {
          formDataToSend.append("image", imageFile);
        }

        const response = await addCategory(formDataToSend).unwrap();
        if (response.success) {
          toast.success("Category added successfully!");
          refetch();
          handleCloseModal();
        }
      } else if (modalMode === "edit") {
        // Validate input
        if (!formData.serviceName.trim()) {
          toast.warning("Please enter a category name");
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append(
          "data",
          JSON.stringify({ serviceName: formData.serviceName })
        );
        if (imageFile) {
          formDataToSend.append("image", imageFile);
        }

        const response = await editCategory({
          id: selectedCategory._id,
          data: formDataToSend,
        }).unwrap();

        if (response.success) {
          toast.success("Category updated successfully!");
          refetch();
          handleCloseModal();
        }
      } else if (modalMode === "delete") {
        const response = await deleteCategory(selectedCategory._id).unwrap();

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
        <p className="text-xl font-semibold">Service Categories</p>{" "}
        <div className="flex justify-end mb-10 gap-3">
          <SearchInput
            placeholder="Search by user Name or Email"
            onSearch={(value) => updateSearchParams({ searchTerm: value })}
            width={300}
          />

          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={() => handleOpenModal("add")}
            sx={{
              backgroundColor: "#1976d2",
              textTransform: "none",
              "&:hover": { backgroundColor: "#1565c0" },
              paddingBlock: "14px",
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
            {categories
              .map((category) => (
                <TableRow key={category._id}>
                  <TableCell >
                    <div className="flex items-center gap-2 pl-5">
                      <img
                        src={`${imageUrl}${category.image}`}
                        alt={category.serviceName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{category.serviceName}</span>
                    </div>
                  </TableCell>
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

      <ManagePagination meta={allCategoryData?.meta} />


      {/* Add/Edit/Delete Modal */}
      <ServiceCategoryModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        modalMode={modalMode}
        selectedCategory={selectedCategory}
        formData={formData}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
        handleSubmit={handleSubmit}
        isLoadingAdd={isLoadingAdd}
        isLoadingEdit={isLoadingEdit}
        isLoadingDelete={isLoadingDelete}
        imageUrl={imageUrl}
        imageFile={imageFile}
        imagePreview={imagePreview}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
