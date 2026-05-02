import {
    Button,
    Chip,
    CircularProgress,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MdOutlineInfo } from "react-icons/md";
import { toast } from "sonner";





import WithdrawalDetailsModal from "./WithdrawalDetailsModal";
import {
    useApproveWithdrawalMutation,
    useGetAllWithdrawalsQuery,
    useMarkProcessingMutation,
    useRejectWithdrawalMutation
} from "../../../Redux/api/withdrawalApi";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import ManagePagination from "../../Shared/ManagePagination";
import SearchInput from "../../Shared/SearchInput";
import WithdrawalActionModal from "./WithdrawalActionModal";

const STATUS_CONFIG = {
    PENDING: { label: "Pending", color: "warning" },
    PROCESSING: { label: "Processing", color: "info" },
    COMPLETED: { label: "Completed", color: "success" },
    REJECTED: { label: "Rejected", color: "error" },
};

export default function WithdrawalManagement() {
    const [actionModal, setActionModal] = useState({ open: false, mode: "", item: null });
    const [detailsModal, setDetailsModal] = useState({ open: false, id: null });

    const { page, limit, searchTerm } = getSearchParams();
    const updateSearchParams = useUpdateSearchParams();

    const { data: allWithdrawals, isLoading, isError, refetch } = useGetAllWithdrawalsQuery();
    const withdrawals = allWithdrawals?.data || [];

    const [markProcessing, { isLoading: isMarkingProcessing }] = useMarkProcessingMutation();
    const [approveWithdrawal, { isLoading: isApproving }] = useApproveWithdrawalMutation();
    const [rejectWithdrawal, { isLoading: isRejecting }] = useRejectWithdrawalMutation();

    const isSubmitting = isMarkingProcessing || isApproving || isRejecting;

    useEffect(() => {
        refetch();
    }, [page, limit, searchTerm]);

    const openActionModal = (mode, item) => setActionModal({ open: true, mode, item });
    const closeActionModal = () => setActionModal({ open: false, mode: "", item: null });

    const openDetailsModal = (id) => setDetailsModal({ open: true, id });
    const closeDetailsModal = () => setDetailsModal({ open: false, id: null });

    const handleConfirmAction = async () => {
        const { mode, item } = actionModal;
        if (!item) return;

        try {
            let response;

            if (mode === "processing") response = await markProcessing(item._id).unwrap();
            else if (mode === "approve") response = await approveWithdrawal(item._id).unwrap();
            else if (mode === "reject") response = await rejectWithdrawal(item._id).unwrap();

            if (response?.success) {
                toast.success(response?.message || "Action completed successfully!");
                closeActionModal();
            } else {
                if (Array.isArray(response?.error)) {
                    response.error.forEach((err) =>
                        toast.error(err.message, { id: "withdrawal-action" })
                    );
                } else {
                    toast.error(response?.message || "Something went wrong!", {
                        id: "withdrawal-action",
                    });
                }
            }
        } catch (err) {
            console.error("WithdrawalManagement action error:", err);
            toast.error("Unexpected error occurred", { id: "withdrawal-action" });
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
                <p className="text-red-500 text-lg">Failed to load withdrawals.</p>
            </div>
        );
    }

    return (
        <div className="px-10 py-8 bg-[#fbfbfb] min-h-[92vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-xl font-semibold">Withdrawal Management</p>
                <SearchInput
                    placeholder="Search by request ID or name"
                    onSearch={(value) => updateSearchParams({ searchTerm: value })}
                    width={300}
                />
            </div>

            {/* Table */}
            <TableContainer className="rounded-xl shadow">
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
                            {["Account Holder", "Request ID", "Amount", "Method", "Status", "Date", "Actions"].map(
                                (head) => (
                                    <TableCell
                                        key={head}
                                        align={head === "Account Holder" ? "left" : "center"}
                                        sx={{ fontWeight: "600" }}
                                    >
                                        {head}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {withdrawals.map((item) => {
                            const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.PENDING;
                            return (
                                <TableRow key={item._id} hover>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium text-sm">
                                                {item.bankDetails?.accountHolderName}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {item.bankDetails?.bankName}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">
                                        <span className="text-xs font-mono text-gray-500">
                                            {item.requestId?.slice(0, 18)}…
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <span className="font-semibold text-gray-800">
                                            {item.currency} {item.amount?.toLocaleString()}
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <span className="text-xs text-gray-600">{item.withdrawalMethod}</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={statusCfg.label}
                                            color={statusCfg.color}
                                            size="small"
                                            sx={{ fontWeight: 600, fontSize: "0.7rem" }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <span className="text-sm text-gray-500">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className="flex justify-center items-center gap-1">
                                            <IconButton
                                                size="small"
                                                onClick={() => openDetailsModal(item._id)}
                                                title="View Details"
                                            >
                                                <MdOutlineInfo className="text-blue-500" />
                                            </IconButton>

                                            {item.status === "PENDING" && (
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    color="warning"
                                                    sx={{ textTransform: "none", fontSize: "0.7rem", px: 1 }}
                                                    onClick={() => openActionModal("processing", item)}
                                                >
                                                    Process
                                                </Button>
                                            )}

                                            {(item.status === "PENDING" || item.status === "PROCESSING") && (
                                                <>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="success"
                                                        sx={{ textTransform: "none", fontSize: "0.7rem", px: 1 }}
                                                        onClick={() => openActionModal("approve", item)}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="error"
                                                        sx={{ textTransform: "none", fontSize: "0.7rem", px: 1 }}
                                                        onClick={() => openActionModal("reject", item)}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <ManagePagination meta={allWithdrawals?.meta} />

            {/* Action Confirmation Modal */}
            <WithdrawalActionModal
                open={actionModal.open}
                onClose={closeActionModal}
                actionMode={actionModal.mode}
                selectedWithdrawal={actionModal.item}
                onConfirm={handleConfirmAction}
                isSubmitting={isSubmitting}
            />

            {/* Details Modal */}
            <WithdrawalDetailsModal
                open={detailsModal.open}
                onClose={closeDetailsModal}
                withdrawalId={detailsModal.id}
            />
        </div>
    );
}