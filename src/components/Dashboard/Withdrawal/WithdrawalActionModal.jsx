import {
    Button,
    CircularProgress,
    Modal,
    Chip,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";

const ACTION_CONFIG = {
    processing: {
        title: "Mark as Processing",
        description: (name) =>
            `Mark withdrawal request from "${name}" as processing?`,
        confirmLabel: "Mark Processing",
        confirmColor: "#f59e0b",
        hoverColor: "#d97706",
    },
    approve: {
        title: "Approve Withdrawal",
        description: (name) =>
            `Are you sure you want to approve the withdrawal request from "${name}"?`,
        confirmLabel: "Approve",
        confirmColor: "#16a34a",
        hoverColor: "#15803d",
    },
    reject: {
        title: "Reject Withdrawal",
        description: (name) =>
            `Are you sure you want to reject the withdrawal request from "${name}"? This action cannot be undone.`,
        confirmLabel: "Reject",
        confirmColor: "#dc2626",
        hoverColor: "#b91c1c",
    },
};

export default function WithdrawalActionModal({
    open,
    onClose,
    actionMode,
    selectedWithdrawal,
    onConfirm,
    isSubmitting,
}) {
    const config = ACTION_CONFIG[actionMode] || {};
    const holderName = selectedWithdrawal?.bankDetails?.accountHolderName || "Unknown";

    return (
        <Modal open={open} onClose={onClose}>
            <div className="absolute top-1/2 left-1/2 w-[460px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{config.title}</h2>
                    <IconButton onClick={onClose} size="small">
                        <IoClose />
                    </IconButton>
                </div>

                <p className="text-gray-600 mb-4">{config.description?.(holderName)}</p>

                {selectedWithdrawal && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span className="font-medium">Request ID:</span>
                            <span className="text-gray-500 truncate max-w-[200px]">
                                {selectedWithdrawal.requestId}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Amount:</span>
                            <span className="font-semibold text-gray-900">
                                {selectedWithdrawal.currency} {selectedWithdrawal.amount?.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Bank:</span>
                            <span>{selectedWithdrawal.bankDetails?.bankName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Account:</span>
                            <span>{selectedWithdrawal.bankDetails?.accountNumber}</span>
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <Button
                        onClick={onClose}
                        disabled={isSubmitting}
                        sx={{
                            textTransform: "none",
                            color: "#555",
                            bgcolor: "#f0f0f0",
                            "&:hover": { bgcolor: "#e0e0e0" },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        sx={{
                            textTransform: "none",
                            bgcolor: config.confirmColor,
                            "&:hover": { bgcolor: config.hoverColor },
                            color: "#fff",
                            minWidth: 100,
                        }}
                    >
                        {isSubmitting ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            config.confirmLabel
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}