import {
    Button,
    CircularProgress,
    IconButton,
    MenuItem,
    Modal,
    TextField,
} from "@mui/material";
import { IoClose } from "react-icons/io5";

const CouponModal = ({
    openModal,
    handleCloseModal,
    modalMode,
    selectedCoupon,
    formData,
    handleInputChange,
    handleSubmit,
    isLoadingAdd,
    isLoadingEdit,
    isLoadingDelete,
    isSubmitting,
}) => {
    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <div className="absolute top-1/2 left-1/2 w-[560px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                <IconButton onClick={handleCloseModal} className="float-right">
                    <IoClose />
                </IconButton>

                {modalMode === "delete" ? (
                    <>
                        <h2 className="text-xl font-bold mb-4">Delete Coupon</h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete coupon{" "}
                            <span className="font-mono font-semibold text-red-600">
                                "{selectedCoupon?.code}"
                            </span>
                            ? This action cannot be undone.
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
                            {modalMode === "add" ? "Add Coupon" : "Edit Coupon"}
                        </h2>

                        {/* Row 1: Code + Discount Type */}
                        <div className="flex gap-3">
                            <TextField
                                fullWidth
                                label="Coupon Code"
                                name="code"
                                value={formData.code}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                inputProps={{ style: { textTransform: "uppercase" } }}
                            />
                            <TextField
                                fullWidth
                                select
                                label="Discount Type"
                                name="discountType"
                                value={formData.discountType}
                                onChange={handleInputChange}
                                margin="normal"
                            >
                                <MenuItem value="PERCENTAGE">PERCENTAGE</MenuItem>
                                <MenuItem value="FIXED">FIXED</MenuItem>
                            </TextField>
                        </div>

                        {/* Row 2: Discount Value + Min Order */}
                        <div className="flex gap-3">
                            <TextField
                                fullWidth
                                label={
                                    formData.discountType === "PERCENTAGE"
                                        ? "Discount Value (%)"
                                        : "Discount Value ($)"
                                }
                                name="discountValue"
                                type="number"
                                value={formData.discountValue}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Min Order Amount ($)"
                                name="minOrderAmount"
                                type="number"
                                value={formData.minOrderAmount}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                        </div>

                        {/* Row 3: Max Discount + Usage Limit */}
                        <div className="flex gap-3">
                            <TextField
                                fullWidth
                                label="Max Discount Amount ($)"
                                name="maxDiscountAmount"
                                type="number"
                                value={formData.maxDiscountAmount}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Usage Limit"
                                name="usageLimit"
                                type="number"
                                value={formData.usageLimit}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                        </div>

                        {/* Row 4: Per User Limit + Expiry Date */}
                        <div className="flex gap-3">
                            <TextField
                                fullWidth
                                label="Per User Limit"
                                name="perUserLimit"
                                type="number"
                                value={formData.perUserLimit}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Expiry Date"
                                name="expiryDate"
                                type="date"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>

                        {/* Applicable Categories */}
                        <TextField
                            fullWidth
                            label="Applicable Categories (comma separated)"
                            name="applicableCategories"
                            value={formData.applicableCategories}
                            onChange={handleInputChange}
                            margin="normal"
                            placeholder="e.g. electronics, fashion, home-decor"
                        />

                        {/* Description */}
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            margin="normal"
                            multiline
                            rows={2}
                        />

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
    );
};

export default CouponModal;