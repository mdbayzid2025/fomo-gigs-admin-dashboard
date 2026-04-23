import {
    Button,
    Chip,
    CircularProgress,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { TbToggleLeft, TbToggleRight } from "react-icons/tb";
import { toast } from "sonner";
import {
    useAddCouponMutation,
    useDeleteCouponMutation,
    useEditCouponMutation,
    useGetCouponsQuery,
} from "../../Redux/api/couponApi";
import CouponModal from "../UI/Modals/CouponModal";
import ManagePagination from "../Shared/ManagePagination";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";
import { ErrorResponseHandler } from "../../utils/ErrorResponseHandler";

export default function CouponManage() {
    const [searchText, setSearchText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState(""); // 'add', 'edit', 'delete'
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    const initialFormData = {
        code: "",
        description: "",
        discountType: "PERCENTAGE",
        discountValue: "",
        minOrderAmount: "",
        maxDiscountAmount: "",
        expiryDate: "",
        usageLimit: "",
        perUserLimit: 1,
        applicableCategories: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const {
        data: allCouponData,
        isLoading,
        isError,
        refetch,
    } = useGetCouponsQuery();
    const coupons = allCouponData?.data || [];

    const [addCoupon, { isLoading: isLoadingAdd }] = useAddCouponMutation();
    const [editCoupon, { isLoading: isLoadingEdit }] = useEditCouponMutation();
    const [deleteCoupon, { isLoading: isLoadingDelete }] =
        useDeleteCouponMutation();

        console.log("allCouponData", allCouponData);
        


    const { page, limit, searchTerm } = getSearchParams()

    useEffect(() => {
        refetch()
    }, [page, limit, searchTerm])

    const handleOpenModal = (mode, coupon = null) => {
        setModalMode(mode);
        setSelectedCoupon(coupon);
        if (mode === "add") {
            setFormData(initialFormData);
        } else if (mode === "edit" && coupon) {
            setFormData({
                code: coupon.code,
                description: coupon.description || "",
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
                minOrderAmount: coupon.minOrderAmount,
                maxDiscountAmount: coupon.maxDiscountAmount,
                expiryDate: coupon.expiryDate
                    ? coupon.expiryDate.slice(0, 10)
                    : "",
                usageLimit: coupon.usageLimit,
                perUserLimit: coupon.perUserLimit,
                applicableCategories: (coupon.applicableCategories || []).join(", "),
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedCoupon(null);
        setModalMode("");
        setFormData(initialFormData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleStatus = async (coupon) => {
        try {
            const newStatus = coupon.isActive ? "inactive" : "active";
            const response = await editCoupon({
                id: coupon._id,
                data: { isActive: !coupon.isActive, status: newStatus },
            }).unwrap();
            if (response.success) {
                toast.success(
                    `Coupon ${!coupon.isActive ? "activated" : "deactivated"} successfully!`
                );
                refetch();
            } else {
                ErrorResponseHandler(response, "coupon");
            }
        } catch (error) {
            ErrorResponseHandler(error, 'coupon')            
        }
    };

    const handleSubmit = async () => {
        try {
            if (modalMode === "add") {
                if (!formData.code.trim()) {
                    toast.warning("Please enter a coupon code");
                    return;
                }
                if (!formData.discountValue) {
                    toast.warning("Please enter a discount value");
                    return;
                }
                if (!formData.expiryDate) {
                    toast.warning("Please select an expiry date");
                    return;
                }

                const payload = {
                    ...formData,
                    discountValue: Number(formData.discountValue),
                    minOrderAmount: Number(formData.minOrderAmount),
                    maxDiscountAmount: Number(formData.maxDiscountAmount),
                    usageLimit: Number(formData.usageLimit),
                    perUserLimit: Number(formData.perUserLimit),
                    applicableCategories: formData.applicableCategories
                        ? formData.applicableCategories.split(",").map((s) => s.trim()).filter(Boolean)
                        : [],
                };

                const response = await addCoupon(payload).unwrap();
                if (response.success) {
                    toast.success("Coupon added successfully!");
                    refetch();
                    handleCloseModal();
                }
            } else if (modalMode === "edit") {
                if (!formData.code.trim()) {
                    toast.warning("Please enter a coupon code");
                    return;
                }

                const payload = {
                    ...formData,
                    discountValue: Number(formData.discountValue),
                    minOrderAmount: Number(formData.minOrderAmount),
                    maxDiscountAmount: Number(formData.maxDiscountAmount),
                    usageLimit: Number(formData.usageLimit),
                    perUserLimit: Number(formData.perUserLimit),
                    applicableCategories: formData.applicableCategories
                        ? formData.applicableCategories.split(",").map((s) => s.trim()).filter(Boolean)
                        : [],
                };

                const response = await editCoupon({
                    id: selectedCoupon._id,
                    data: payload,
                }).unwrap();
                if (response.success) {
                    toast.success("Coupon updated successfully!");
                    refetch();
                    handleCloseModal();
                }
            } else if (modalMode === "delete") {
                const response = await deleteCoupon(selectedCoupon._id).unwrap();
                if (response.success) {
                    toast.success("Coupon deleted successfully!");
                    refetch();
                    handleCloseModal();
                }
            }
        } catch (error) {            
              ErrorResponseHandler(error?.data, "coupon");
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
                <p className="text-red-500 text-lg">Failed to load coupons.</p>
            </div>
        );
    }

    const isSubmitting = isLoadingAdd || isLoadingEdit || isLoadingDelete;

    return (
        <div className="px-10 py-8 bg-[#fbfbfb] h-[92vh]">
            {/* Header */}
            <div className="flex justify-between gap-3 items-center mb-4">
                <p className="text-xl font-semibold">Coupon Management</p>
                <div className="flex items-center gap-3">
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
                        Add Coupon
                    </Button>
                </div>
            </div>

            {/* Table */}
            <TableContainer className="rounded-xl shadow">
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
                            {[
                                "Code",
                                "Description",
                                "Discount",
                                "Min Order",
                                "Max Discount",
                                "Expiry",
                                "Usage",
                                "Status",
                                "Actions",
                            ].map((head) => (
                                <TableCell
                                    key={head}
                                    align="center"
                                    sx={{ fontWeight: "600" }}
                                >
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {coupons?.map((coupon) => (
                            <TableRow key={coupon._id}>
                                <TableCell align="center">
                                    <span className="font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                        {coupon.code}
                                    </span>
                                </TableCell>
                                <TableCell align="center" sx={{ maxWidth: 160 }}>
                                    <span className="text-sm text-gray-600 line-clamp-2">
                                        {coupon.description || "—"}
                                    </span>
                                </TableCell>
                                <TableCell align="center">
                                    {coupon.discountType === "PERCENTAGE"
                                        ? `${coupon.discountValue}%`
                                        : `$${coupon.discountValue}`}
                                    <div className="text-xs text-gray-400">
                                        {coupon.discountType}
                                    </div>
                                </TableCell>
                                <TableCell align="center">${coupon.minOrderAmount}</TableCell>
                                <TableCell align="center">
                                    ${coupon.maxDiscountAmount}
                                </TableCell>
                                <TableCell align="center">
                                    {new Date(coupon.expiryDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell align="center">
                                    {coupon.usageCount} / {coupon.usageLimit}
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={coupon.isExpired ? "Expired" : coupon.status}
                                        size="small"
                                        color={
                                            coupon.isExpired
                                                ? "error"
                                                : coupon.status === "active"
                                                    ? "success"
                                                    : "default"
                                        }
                                        sx={{ textTransform: "capitalize" }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip
                                        title={coupon.isActive ? "Deactivate" : "Activate"}
                                    >
                                        <IconButton
                                            onClick={() => handleToggleStatus(coupon)}
                                            disabled={coupon.isExpired}
                                            sx={{
                                                color: coupon.isActive ? "#2e7d32" : "#9e9e9e",
                                                "&:hover": {
                                                    color: coupon.isActive ? "#c62828" : "#2e7d32",
                                                },
                                            }}
                                        >
                                            {coupon.isActive ? (
                                                <TbToggleRight size={30} />
                                            ) : (
                                                <TbToggleLeft size={30} />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                    <IconButton
                                        onClick={() => handleOpenModal("edit", coupon)}
                                        color="primary"
                                    >
                                        <MdEdit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleOpenModal("delete", coupon)}
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

            <ManagePagination meta={allCouponData?.meta} />

            {/* Modal */}
            <CouponModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                modalMode={modalMode}
                selectedCoupon={selectedCoupon}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoadingAdd={isLoadingAdd}
                isLoadingEdit={isLoadingEdit}
                isLoadingDelete={isLoadingDelete}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}