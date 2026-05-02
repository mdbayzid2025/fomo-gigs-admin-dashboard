import { CircularProgress, Divider, Modal } from "@mui/material";
import { IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useGetWithdrawalDetailsQuery } from "../../../Redux/api/withdrawalApi";

const STATUS_COLORS = {
    PENDING: { bg: "#fef9c3", text: "#854d0e" },
    PROCESSING: { bg: "#dbeafe", text: "#1e40af" },
    COMPLETED: { bg: "#dcfce7", text: "#166534" },
    REJECTED: { bg: "#fee2e2", text: "#991b1b" },
};

function DetailRow({ label, value }) {
    return (
        <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-500 font-medium">{label}</span>
            <span className="text-sm text-gray-800 font-semibold max-w-[240px] text-right break-all">
                {value || "—"}
            </span>
        </div>
    );
}

export default function WithdrawalDetailsModal({ open, onClose, withdrawalId }) {
    const { data, isLoading } = useGetWithdrawalDetailsQuery(withdrawalId, {
        skip: !withdrawalId,
    });

    const detail = data?.data;
    const statusStyle = STATUS_COLORS[detail?.status] || STATUS_COLORS.PENDING;

    return (
        <Modal open={open} onClose={onClose}>
            <div className="absolute top-1/2 left-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-5">
                    <h2 className="text-xl font-bold text-gray-800">Withdrawal Details</h2>
                    <IconButton onClick={onClose} size="small">
                        <IoClose />
                    </IconButton>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <CircularProgress />
                    </div>
                ) : detail ? (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs text-gray-400 font-mono truncate max-w-[300px]">
                                {detail.requestId}
                            </span>
                            <span
                                className="text-xs font-bold px-3 py-1 rounded-full"
                                style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                            >
                                {detail.status}
                            </span>
                        </div>

                        {/* Amount Highlight */}
                        <div className="bg-blue-50 rounded-xl p-4 mb-5 text-center">
                            <p className="text-sm text-blue-500 mb-1">Withdrawal Amount</p>
                            <p className="text-3xl font-bold text-blue-700">
                                {detail.currency} {detail.amount?.toLocaleString()}
                            </p>
                        </div>

                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Bank Details
                        </p>
                        <div className="bg-gray-50 rounded-xl px-4 mb-4">
                            <DetailRow label="Account Holder" value={detail.bankDetails?.accountHolderName} />
                            <Divider />
                            <DetailRow label="Bank Name" value={detail.bankDetails?.bankName} />
                            <Divider />
                            <DetailRow label="Account Number" value={detail.bankDetails?.accountNumber} />
                            <Divider />
                            <DetailRow label="Account Type" value={detail.bankDetails?.accountType} />
                            <Divider />
                            <DetailRow label="Branch Code" value={detail.bankDetails?.branchCode} />
                        </div>

                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Timeline
                        </p>
                        <div className="bg-gray-50 rounded-xl px-4">
                            <DetailRow
                                label="Requested"
                                value={new Date(detail.createdAt).toLocaleString()}
                            />
                            {detail.reviewedAt && (
                                <>
                                    <Divider />
                                    <DetailRow
                                        label="Reviewed"
                                        value={new Date(detail.reviewedAt).toLocaleString()}
                                    />
                                </>
                            )}
                            {detail.completedAt && (
                                <>
                                    <Divider />
                                    <DetailRow
                                        label="Completed"
                                        value={new Date(detail.completedAt).toLocaleString()}
                                    />
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-400 py-10">No details found.</p>
                )}
            </div>
        </Modal>
    );
}