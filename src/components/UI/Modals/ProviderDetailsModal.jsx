import {
  Button,
  Chip,
  Modal,
  Paper,
  Stack,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FaClock, FaPhone, FaRegUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function ProviderDetailsModal({
  selectedProvider,
  isModalOpen,
  handleCloseModal,
  handleStatusUpdate,
}) {
  if (!selectedProvider) return null;

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="provider-details-modal"
    >
      <div className="absolute top-1/2 left-1/2 w-[90%] max-w-[1200px] max-h-[90vh] p-5 bg-white rounded-xl transform -translate-x-1/2 -translate-y-1/2 shadow-xl overflow-auto">
        <div>
          {/* Modal Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "24px",
            }}
          >
            <p className="text-xl font-semibold">Provider Details</p>
            <IconButton onClick={handleCloseModal} color="inherit">
              <IoClose />
            </IconButton>
          </div>

          <div className="flex justify-center gap-10 px-10">
            <div className="flex flex-col gap-5 flex-1">
              {/* Cover Image */}
              <img
                src={selectedProvider.coverImage}
                alt={selectedProvider.name}
                className="w-4/5 h-4/5 object-contain rounded-lg"
              />
              <div className="flex flex-col gap-3">
                {/* Description */}
                <div>
                  <p className="text-sm text-[#666]">Description</p>
                  <p className="text-sm text-[#111]">
                    {selectedProvider.description}
                  </p>
                </div>

                {/* Pricing */}
                <div>
                  <div className="flex items-center gap-1 text-sm text-[#666]">
                    <AiOutlineDollar />
                    <p>Pricing</p>
                  </div>
                  <p className="text-xl font-semibold text-green-700">
                    ${selectedProvider.pricing.amount} /{" "}
                    {selectedProvider.pricing.type}
                  </p>
                </div>

                {/* Current Status */}
                <div className="flex items-center gap-3">
                  <p className="text-sm text-[#666]">Current Status:</p>
                  <span
                    className="py-2 px-4 capitalize font-semibold text-white rounded-xl text-sm"
                    style={{
                      backgroundColor:
                        selectedProvider.status.toLowerCase() === "accepted"
                          ? "#1EC74F"
                          : selectedProvider.status.toLowerCase() === "declined"
                          ? "#EE5252"
                          : selectedProvider.status.toLowerCase() === "pending"
                          ? "#FFCC00"
                          : "#9e9e9e",
                    }}
                  >
                    {selectedProvider.status}
                  </span>
                </div>
              </div>
            </div>

            {/* info */}
            <div className="flex flex-col gap-5 flex-1">
              {/* Basic Info */}
              <div>
                <div className="flex items-center gap-2 text-sm text-[#666]">
                  <FaRegUser />
                  <p>Provider Name</p>
                </div>
                <p className="text-lg font-semibold">{selectedProvider.name}</p>
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col gap-5">
                  {/* Username */}
                  <div>
                    <div className="flex items-center gap-2 text-sm text-[#666]">
                      <FaRegUser />
                      <p>Username</p>
                    </div>
                    <p className="text-lg font-semibold">
                      @{selectedProvider.userName}
                    </p>
                  </div>
                  {/* Phone */}
                  <div>
                    <div className="flex items-center gap-2 text-sm text-[#666]">
                      <FaPhone />
                      <p>Phone Number</p>
                    </div>
                    <p className="text-lg font-semibold">
                      {selectedProvider.phoneNumber}
                    </p>
                  </div>
                  {/* Service Category */}
                  <div>
                    <p className="text-sm text-[#666]">Service Category</p>
                    <p className="text-lg font-semibold">
                      {selectedProvider.serviceCategory}
                    </p>
                  </div>
                  {/* Time Slot */}
                  <div>
                    <div className="flex items-center gap-2 text-sm text-[#666]">
                      <FaClock />
                      <p>Time Slot</p>
                    </div>
                    <p className="text-lg font-semibold">
                      {selectedProvider.timeSlot}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-10">
                    {/* Email */}
                    <div>
                      <div className="flex items-center gap-2 text-sm text-[#666]">
                        <CiMail />
                        <p>Email</p>
                      </div>
                      <p className="text-lg font-semibold">
                        {selectedProvider.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    {/* Location */}
                    <div>
                      <div className="flex items-center gap-2 text-sm text-[#666]">
                        <FaLocationDot />
                        <p>Location</p>
                      </div>
                      <p className="text-lg font-semibold">
                        {selectedProvider.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    {/* Experience */}
                    <div>
                      <p className="text-sm text-[#666]">Experience</p>
                      <p className="text-lg font-semibold">
                        {selectedProvider.experience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Days */}
              <div className="flex flex-col gap-2">
                <p className="text-sm text-[#666]">Service Days</p>
                <Stack direction="row" flexWrap="wrap" gap={1.2}>
                  {selectedProvider.serviceDays.map((day, index) => (
                    <Chip
                      key={index}
                      label={day}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Stack>
              </div>
              {/* Skills */}
              <div className="flex flex-col gap-2">
                <p className="text-sm text-[#666]">Skills</p>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {selectedProvider.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      variant="outlined"
                      color="secondary"
                    />
                  ))}
                </Stack>
              </div>
            </div>
          </div>

          {/* Provider Information */}
          <div className="flex justify-end gap-4">
            <Button
              variant="contained"
              onClick={() =>
                handleStatusUpdate(selectedProvider.email, "accepted")
              }
              disabled={selectedProvider.status === "accepted"}
              sx={{
                padding: "8px 24px",
                bgcolor: "#1EC74F",
                textTransform: "none",
              }}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                handleStatusUpdate(selectedProvider.email, "declined")
              }
              disabled={selectedProvider.status === "declined"}
              sx={{
                padding: "8px 24px",
                bgcolor: "#EE5252",
                textTransform: "none",
              }}
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
