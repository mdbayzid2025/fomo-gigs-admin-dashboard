import { Button, CircularProgress, IconButton, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { MdImage } from 'react-icons/md'



const EventCategoryModal = ({openModal, handleCloseModal}) => {

    
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
  return (
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
  )
}

export default EventCategoryModal