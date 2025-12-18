import { Button, Chip, Modal, Stack, IconButton } from "@mui/material";
import React from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FaClock, FaRegUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { getImageUrl } from "../../../utils/baseUrl";
import { toast } from "sonner";

export default function ProviderDetailsModal({
  selectedProvider,
  isModalOpen,
  handleCloseModal,
  refetchProviders,
  updateProviderStatus,
  updatingStatus,
}) {
  if (!selectedProvider) return null;

  const {
    about,
    businessProfileImage,
    pricing,
    experience,
    service_days,
    time_slot,
    skills,
    status,
    street,
    suburb,
    city,
    country,
    serviceArea,
    serviceCategory,
    userId,
    _id,
  } = selectedProvider;

  const imageUrl = getImageUrl();

  const statusColor = {
    APPROVED: "#1EC74F",
    REJECTED: "#EE5252",
    PENDING: "#FFCC00",
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await updateProviderStatus({
        providerId: _id,
        status: newStatus,
      });
      console.log("update api response", response);
      if (response.data.success) {
        toast.success("Provider status updated successfully");
        await refetchProviders();
        handleCloseModal();
      }
    } catch (error) {
      toast.error("Failed to update provider status");
      console.error("Failed to update provider status", error);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="absolute top-1/2 left-1/2 w-[90%] max-w-[1200px] max-h-[90vh] p-5 bg-white rounded-xl transform -translate-x-1/2 -translate-y-1/2 shadow-xl overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <p className="text-xl font-semibold">Provider Details</p>
          <IconButton onClick={handleCloseModal}>
            <IoClose />
          </IconButton>
        </div>

        <div className="flex justify-center gap-10 px-10">
          {/* Left Section */}
          <div className="flex flex-col gap-5 flex-1">
            <img
              src={`${imageUrl}/${businessProfileImage}`}
              alt={userId.name}
              className="w-4/5 h-4/5 object-contain rounded-lg"
            />

            <div className="flex flex-col gap-3">
              {/* Description */}
              <div>
                <p className="text-sm text-[#666]">Description</p>
                <p className="text-sm">{about}</p>
              </div>

              {/* Pricing */}
              <div>
                <div className="flex items-center gap-1 text-sm text-[#666]">
                  <AiOutlineDollar />
                  <p>Pricing</p>
                </div>
                <p className="text-sm font-semibold text-green-700">
                  Hourly: ${pricing.hourlyRate} <br />
                  Daily: ${pricing.dailyRate} <br />
                  Fixed: ${pricing.fixedRate}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <p className="text-sm text-[#666]">Current Status:</p>
                <span
                  className="py-2 px-4 font-semibold text-white rounded-xl text-sm "
                  style={{ backgroundColor: statusColor[status] || "#9e9e9e" }}
                >
                  {status
                    ? status.charAt(0).toUpperCase() +
                      status.slice(1).toLowerCase()
                    : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-5 flex-1">
            {/* Provider Info */}
            <div>
              <div className="flex items-center gap-2 text-sm text-[#666]">
                <FaRegUser />
                <p>Provider Name</p>
              </div>
              <p className="text-lg font-semibold">{userId.name}</p>
            </div>

            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                {/* Category */}
                <div>
                  <p className="text-sm text-[#666]">Service Category</p>
                  <p className="text-lg font-semibold">{serviceCategory}</p>
                </div>

                {/* Experience */}
                <div>
                  <p className="text-sm text-[#666]">Experience</p>
                  <p className="text-lg font-semibold">{experience}</p>
                </div>

                {/* Time Slots */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#666]">
                    <FaClock />
                    <p>Time Slots</p>
                  </div>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {time_slot.map((time, i) => (
                      <Chip key={i} label={time} size="small" />
                    ))}
                  </Stack>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* Email */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#666]">
                    <CiMail />
                    <p>Email</p>
                  </div>
                  <p className="text-lg font-semibold">{userId.email}</p>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#666]">
                    <FaLocationDot />
                    <p>Location</p>
                  </div>
                  <p className="text-lg font-semibold">
                    {street}, {suburb}, {city}, {country}
                  </p>
                  <p className="text-sm text-gray-500">{serviceArea}</p>
                </div>
              </div>
            </div>

            {/* Service Days */}
            <div>
              <p className="text-sm text-[#666]">Service Days</p>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {service_days.map((day, i) => (
                  <Chip key={i} label={day} size="small" color="primary" />
                ))}
              </Stack>
            </div>

            {/* Skills */}
            <div>
              <p className="text-sm text-[#666]">Skills</p>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {skills.map((skill, i) => (
                  <Chip key={i} label={skill} size="small" color="secondary" />
                ))}
              </Stack>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="contained"
            sx={{ bgcolor: "#1EC74F", textTransform: "none" }}
            disabled={status === "APPROVED" || updatingStatus}
            onClick={() => handleUpdateStatus("APPROVED")}
          >
            Approve
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#EE5252",
              textTransform: "none",
            }}
            disabled={status === "REJECTED" || updatingStatus}
            onClick={() => handleUpdateStatus("REJECTED")}
          >
            Reject
          </Button>
        </div>
      </div>
    </Modal>
  );
}
