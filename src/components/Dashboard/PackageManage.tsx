
import PackageModal from "../UI/Modals/PackageModal";
import ManagePagination from "../Shared/ManagePagination";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";
import { useAddPackageMutation, useDeletePackageMutation, useEditPackageMutation, useGetPackagesQuery, useToggleStatusMutation } from "../../Redux/api/packageApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, Chip, CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { TbToggleLeft, TbToggleRight } from "react-icons/tb";

export default function PackageManage() {

    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState(""); // 'add', 'edit', 'delete'
    const [selectedPackage, setSelectedPackage] = useState<any>(null);

    const initialFormData = {
        name: "",
        type: "USER",
        price: "",
        duration: "MONTHLY",
        googleProductId: "",
        appleProductId: "",
        provider: "BOTH",
        description: "",
        discount: "",
        features: [
            { name: "", isAvailable: true, limit: -1 }
        ],
    };

    const [formData, setFormData] = useState<any>(initialFormData);

    const {
        data: allPackageData,
        isLoading,
        isError,
        refetch,
    } = useGetPackagesQuery({});

    const packages = allPackageData?.data || [];

    const [addPackage, { isLoading: isLoadingAdd }] = useAddPackageMutation();
    const [editPackage, { isLoading: isLoadingEdit }] = useEditPackageMutation();
    const [deletePackage, { isLoading: isLoadingDelete }] = useDeletePackageMutation();
    const [toggleStatus, { isLoading: isLoadingToggle }] = useToggleStatusMutation();

    const { page, limit, searchTerm } = getSearchParams();

    useEffect(() => {
        refetch();
    }, [page, limit, searchTerm]);

    const handleOpenModal = (mode: string, pkg: any = null) => {
        setModalMode(mode);
        setSelectedPackage(pkg);

        if (mode === "add") {
            setFormData(initialFormData);
        } else if (mode === "edit" && pkg) {
            setFormData({
                name: pkg.name,
                type: pkg.type,
                price: pkg.price,
                duration: pkg.duration,
                googleProductId: pkg.googleProductId || "",
                appleProductId: pkg.appleProductId || "",
                provider: pkg.provider,
                description: pkg.description || "",
                discount: pkg.discount || "",
                features: pkg.features?.length
                    ? pkg.features
                    : [{ name: "", isAvailable: true, limit: -1 }],
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedPackage(null);
        setModalMode("");
        setFormData(initialFormData);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleFeatureChange = (index: any, field: any, value: any) => {
        const updatedFeatures = [...formData.features];
        updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
        setFormData((prev: any) => ({ ...prev, features: updatedFeatures }));
    };

    const addFeatureField = () => {
        setFormData((prev: any) => ({
            ...prev,
            features: [...prev.features, { name: "", isAvailable: true, limit: -1 }],
        }));
    };

    const removeFeatureField = (index: any) => {
        if (formData.features.length === 1) return;
        const updatedFeatures = formData.features.filter((_: any, i: any) => i !== index);
        setFormData((prev: any) => ({ ...prev, features: updatedFeatures }));
    };

    const handleToggleStatus = async (pkg: any) => {        
        try {
            const response = await toggleStatus(pkg._id?.toString()).unwrap();

            if (response.success) {
                toast.success(
                    `Package ${!pkg.isActive ? "activated" : "deactivated"} successfully!`
                );
                refetch();
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update package status.");
        }
    };

    const handleSubmit = async () => {
        try {
            if (modalMode === "add" || modalMode === "edit") {
                // Validate discount field
                if (formData.discount && isNaN(Number(formData.discount))) {
                    toast.warning("Discount must be a valid number");
                    return;
                }

                if (!formData.name.trim()) {
                    toast.warning("Package name is required");
                    return;
                }
                if (!formData.price) {
                    toast.warning("Price is required");
                    return;
                }

                if (formData.features.some((f: any) => f.name.trim() === "")) {
                    toast.warning("Feature name cannot be empty");
                    return;
                }

                const payload = {
                    ...formData,
                    price: Number(formData.price),
                    discount: formData.discount ? Number(formData.discount) : 0,
                    features: formData.features.filter((f: any) => f.name.trim() !== ""),
                };

                let response;
                if (modalMode === "add") {
                    response = await addPackage(payload).unwrap();
                } else {
                    response = await editPackage({
                        id: selectedPackage._id,
                        data: payload,
                    }).unwrap();
                }

                if (response.success) {
                    toast.success(
                        modalMode === "add"
                            ? "Package added successfully!"
                            : "Package updated successfully!"
                    );
                    refetch();
                    handleCloseModal();
                }
            } else if (modalMode === "delete") {
                const response = await deletePackage(selectedPackage._id).unwrap();
                if (response.success) {
                    toast.success("Package deleted successfully!");
                    refetch();
                    handleCloseModal();
                }
            }
        } catch (error: any) {
            console.error("Error:", error);
            toast.error(error?.data?.message || "Operation failed.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[92vh]">
                <CircularProgress size={50} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-[92vh]">
                <p className="text-red-500 text-lg">Failed to load packages.</p>
            </div>
        );
    }

    const isSubmitting = isLoadingAdd || isLoadingEdit || isLoadingDelete;

    return (
        <div className="px-10 py-8 h-screen">
            {/* Header */}
            <div className="flex justify-between gap-3 items-center mb-4">
                <p className="text-xl font-semibold">Package Management</p>
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
                    Add Package
                </Button>
            </div>

            {/* Table */}
            <TableContainer className="rounded-xl shadow">
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
                            {[
                                "Package Name",
                                "Type",
                                "Price",
                                "Duration",
                                "Provider",
                                "Features",
                                "Discount",
                                "Status",
                                "Actions",
                            ].map((head) => (
                                <TableCell key={head} align="center" sx={{ fontWeight: "600" }}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {packages.map((pkg: any) => (
                            <TableRow key={pkg._id}>
                                <TableCell align="center" className="font-semibold">
                                    {pkg.name}
                                </TableCell>
                                <TableCell align="center">
                                    <Chip label={pkg.type} size="small" color="primary" />
                                </TableCell>
                                <TableCell align="center">
                                    ${pkg.price}
                                    {pkg.discount > 0 && (
                                        <div className="text-xs text-green-600">
                                            -{pkg.discount}%
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell align="center">{pkg.duration}</TableCell>
                                <TableCell align="center">
                                    <Chip label={pkg.provider} size="small" variant="outlined" />
                                </TableCell>
                                <TableCell align="center">
                                    {pkg.features?.length || 0} features
                                </TableCell>
                                <TableCell align="center">
                                    {pkg.discount ? `${pkg.discount}%` : "—"}
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={pkg.isExpired ? "Expired" : pkg.status || "active"}
                                        size="small"
                                        color={
                                            pkg.isExpired
                                                ? "error"
                                                : (pkg.status || "active") === "active"
                                                    ? "success"
                                                    : "default"
                                        }
                                        sx={{ textTransform: "capitalize" }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title={pkg.isActive ? "Deactivate" : "Activate"}>
                                        <IconButton
                                            onClick={() => handleToggleStatus(pkg)}
                                            disabled={pkg.isExpired}
                                            sx={{
                                                color: pkg.isActive ? "#2e7d32" : "#9e9e9e",
                                                "&:hover": {
                                                    color: pkg.isActive ? "#c62828" : "#2e7d32",
                                                },
                                            }}
                                        >
                                            {pkg.isActive ? (
                                                <TbToggleRight size={30} />
                                            ) : (
                                                <TbToggleLeft size={30} />
                                            )}
                                        </IconButton>
                                    </Tooltip>

                                    <IconButton
                                        onClick={() => handleOpenModal("edit", pkg)}
                                        color="primary"
                                    >
                                        <MdEdit />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => handleOpenModal("delete", pkg)}
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

            <ManagePagination meta={allPackageData?.meta} />

            {/* Modal */}
            <PackageModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                modalMode={modalMode}
                selectedPackage={selectedPackage}
                formData={formData}
                handleInputChange={handleInputChange}
                handleFeatureChange={handleFeatureChange}
                addFeatureField={addFeatureField}
                removeFeatureField={removeFeatureField}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isLoadingAdd={isLoadingAdd}
                isLoadingEdit={isLoadingEdit}
                isLoadingDelete={isLoadingDelete}
            />
        </div>
    );
}