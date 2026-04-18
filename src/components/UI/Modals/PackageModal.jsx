import {
    Button,
    CircularProgress,
    IconButton,
    MenuItem,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { IoClose, IoAdd, IoTrash } from "react-icons/io5";

const PackageModal = ({
    openModal,
    handleCloseModal,
    modalMode,
    selectedPackage,
    formData,
    handleInputChange,
    handleFeatureChange,
    addFeatureField,
    removeFeatureField,
    handleSubmit,
    isSubmitting,
    isLoadingAdd,
    isLoadingEdit,
    isLoadingDelete,
}) => {
    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <div className="absolute top-1/2 left-1/2 w-[620px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                <IconButton onClick={handleCloseModal} className="float-right">
                    <IoClose />
                </IconButton>

                {modalMode === "delete" ? (
                    <>
                        <h2 className="text-xl font-bold mb-4">Delete Package</h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete package{" "}
                            <span className="font-semibold text-red-600">"{selectedPackage?.name}"</span>?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button
                                sx={{ textTransform: "none", color: "#555", bgcolor: "#f0f0f0" }}
                                onClick={handleCloseModal}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                sx={{ textTransform: "none", bgcolor: "red", color: "#fff" }}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isLoadingDelete ? <CircularProgress size={20} color="inherit" /> : "Delete"}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-4">
                            {modalMode === "add" ? "Add New Package" : "Edit Package"}
                        </h2>

                        <div className="space-y-4">
                            <TextField
                                fullWidth
                                label="Package Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />

                            <div className="flex gap-3 mt-4">
                                <TextField
                                    fullWidth
                                    select
                                    label="Type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="USER">USER</MenuItem>
                                    <MenuItem value="SERVICE">SERVICE</MenuItem>
                                </TextField>

                                <TextField
                                    fullWidth
                                    select
                                    label="Duration"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="MONTHLY">MONTHLY</MenuItem>
                                    <MenuItem value="YEARLY">YEARLY</MenuItem>
                                    <MenuItem value="LIFETIME">LIFETIME</MenuItem>
                                </TextField>
                            </div>

                            <div className="flex gap-3">
                                <TextField
                                    fullWidth
                                    label="Price ($)"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Discount (%)"
                                    name="discount"
                                    type="number"
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex gap-3">
                                <TextField
                                    fullWidth
                                    label="Google Product ID"
                                    name="googleProductId"
                                    value={formData.googleProductId}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    fullWidth
                                    label="Apple Product ID"
                                    name="appleProductId"
                                    value={formData.appleProductId}
                                    onChange={handleInputChange}
                                />
                            </div>                            
                                <TextField
                                    fullWidth
                                    select
                                    label="Provider"
                                    name="provider"
                                    value={formData.provider}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                >
                                    <MenuItem value="GOOGLE">GOOGLE</MenuItem>
                                    <MenuItem value="APPLE">APPLE</MenuItem>
                                    <MenuItem value="BOTH">BOTH</MenuItem>
                                </TextField>

                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={3}
                                    sx={{ mb: 2 }}
                                />                            

                            {/* Features Section */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Typography variant="subtitle1" fontWeight="600">
                                        Features
                                    </Typography>
                                    <Button
                                        startIcon={<IoAdd />}
                                        size="small"
                                        onClick={addFeatureField}
                                        variant="outlined"
                                    >
                                        Add Feature
                                    </Button>
                                </div>

                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2 mb-3 items-start">
                                        <TextField
                                            fullWidth
                                            label="Feature Name"
                                            value={feature.name}
                                            onChange={(e) =>
                                                handleFeatureChange(index, "name", e.target.value)
                                            }
                                            size="small"
                                        />
                                        <TextField
                                            label="Limit"
                                            type="number"
                                            value={feature.limit}
                                            onChange={(e) =>
                                                handleFeatureChange(index, "limit", Number(e.target.value))
                                            }
                                            size="small"
                                            sx={{ width: 120 }}
                                        />
                                        <IconButton
                                            color="error"
                                            onClick={() => removeFeatureField(index)}
                                            disabled={formData.features.length === 1}
                                        >
                                            <IoTrash />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <Button
                                sx={{ textTransform: "none", color: "#555", bgcolor: "#f0f0f0" }}
                                onClick={handleCloseModal}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                sx={{ textTransform: "none", bgcolor: "#1976d2", color: "#fff" }}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isLoadingAdd || isLoadingEdit ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : modalMode === "add" ? (
                                    "Create Package"
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default PackageModal;