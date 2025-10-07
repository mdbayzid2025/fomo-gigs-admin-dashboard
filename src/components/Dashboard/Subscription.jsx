import { Button, IconButton, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

import { FiPlus } from "react-icons/fi";

// Initial mock data for subscriptions
const subscriptionsData = [
  {
    subscriptionId: "SUB123456",
    plan: "Momentum",
    status: "Active",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    price: "999/Year",
    description: "First 7 days free - Then $999/Year",
    badge: "BEST VALUE",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload as many as Events",
      "Unlimited Discounts",
    ],
  },
  {
    subscriptionId: "SUB123457",
    plan: "Acceleration",
    status: "Active",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    price: "999/Year",
    description: "First 7 days free - Then $99/Month",
    textColor: "#008259",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload as many as Events",
      "Unlimited Discounts",
    ],
  },
  {
    subscriptionId: "SUB123458",
    plan: "Elevate",
    status: "Inactive",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    price: "999/Year",
    description: "First 7 days free - Then $9/Month",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload as many as Events",
      "Unlimited Discounts",
    ],
  },
  {
    subscriptionId: "SUB64536",
    plan: "Ignite",
    status: "Active",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    price: "999/Year",
    description: "First 7 days free - Then $9/Month",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload as many as Events",
      "Unlimited Discounts",
    ],
  },
];

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState(subscriptionsData);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [newSubscription, setNewSubscription] = useState({
    subscriptionId: "",
    plan: "",
    status: "Active",
    startDate: "",
    endDate: "",
    price: "",
    description: "",
    features: [],
  });

  // Open modal to add or edit a subscription
  const handleOpenModal = (subscription = null) => {
    if (subscription) {
      setSelectedSubscription(subscription);
      setNewSubscription({ ...subscription });
    } else {
      setSelectedSubscription(null);
      setNewSubscription({
        subscriptionId: "",
        plan: "",
        status: "Active",
        startDate: "",
        endDate: "",
        price: "",
        description: "",
        features: [],
      });
    }
    setOpenModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSubscription(null);
  };

  // Add or Edit subscription
  const handleAddOrEditSubscription = () => {
    if (selectedSubscription) {
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.subscriptionId === selectedSubscription.subscriptionId
            ? { ...newSubscription }
            : sub
        )
      );
    } else {
      const newSub = {
        ...newSubscription,
        subscriptionId: `SUB${Date.now()}`, // Generate unique ID
      };
      setSubscriptions((prev) => [...prev, newSub]);
    }
    handleCloseModal();
  };

  // Handle feature input change
  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...newSubscription.features];
    updatedFeatures[index] = value;
    setNewSubscription({
      ...newSubscription,
      features: updatedFeatures,
    });
  };

  // Add a new feature
  const addFeature = () => {
    setNewSubscription({
      ...newSubscription,
      features: [...newSubscription.features, ""],
    });
  };

  // Remove a feature
  const removeFeature = (index) => {
    const updatedFeatures = newSubscription.features.filter(
      (_, i) => i !== index
    );
    setNewSubscription({
      ...newSubscription,
      features: updatedFeatures,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-[90%] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Subscription Plans
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and process customer subscriptions
            </p>
          </div>
          <Button
            onClick={() => handleOpenModal()}
            sx={{
              textTransform: "none",
              bgcolor: "#0095FF",
              color: "white",
              paddingX: "10px",
              paddingY: "6px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              ":hover": {
                bgcolor: "#131927",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <FiPlus size={20} />
            Add Subscription
          </Button>
        </div>

        {/* Subscription Cards Flex Layout */}
        <div className="flex flex-wrap gap-6 ">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.subscriptionId}
              className="rounded-xl p-4 relative shadow-sm bg-white border border-gray-200 hover:shadow-md transition-shadow w-80 flex-shrink-0"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-[#131927]">
                  {subscription.plan}
                </h2>
                {subscription.badge && (
                  <div className="bg-[#26CB63] text-white text-xs font-medium px-2 py-1 rounded-full">
                    {subscription.badge}
                  </div>
                )}
              </div>

              <p className="text-xs font-semibold mb-2">
                {subscription.description}
              </p>

              {/* Price */}
              <div className="mb-3">
                <p className="text-xl font-bold text-[#131927]">
                  {subscription.price}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {subscription.features?.slice(0, 5).map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-xs text-gray-700"
                  >
                    <FaCheck
                      size={12}
                      className="text-green-500 flex-shrink-0"
                    />
                    <p className="text-sm font-medium text-[#545454]">
                      {feature}
                    </p>
                  </li>
                ))}
                {subscription.features?.length > 5 && (
                  <li className="text-sm text-[#545454] pl-5">
                    +{subscription.features.length - 5} more features
                  </li>
                )}
              </ul>

              {/* Edit button */}
              <Button
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  textTransform: "none",
                  bgcolor: "#0095FF",
                  color: "white",
                  width: "80px",
                  height: "30px",
                  ":hover": {
                    bgcolor: "#131927",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => handleOpenModal(subscription)}
              >
                Edit
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding or Editing Subscription */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="subscription-modal"
        aria-describedby="modal-to-add-or-edit-subscription"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-3xl shadow-2xl bg-[#fdfdfd] p-5 rounded-lg overflow-y-auto max-h-[90vh]">
          <p className="mb-6 text-center font-semibold">
            {selectedSubscription ? "Edit Subscription" : "Add Subscription"}
          </p>

          <div className="flex flex-col gap-3">
            <TextField
              label="Plan Name"
              value={newSubscription.plan}
              onChange={(e) =>
                setNewSubscription({ ...newSubscription, plan: e.target.value })
              }
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                },
              }}
            />

            <TextField
              label="Price"
              value={newSubscription.price}
              onChange={(e) =>
                setNewSubscription({
                  ...newSubscription,
                  price: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                },
              }}
            />

            <TextField
              label="Description"
              value={newSubscription.description}
              onChange={(e) =>
                setNewSubscription({
                  ...newSubscription,
                  description: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                },
              }}
            />

            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Features
                  </label>
                  <Button
                    onClick={addFeature}
                    sx={{
                      textTransform: "none",
                      bgcolor: "#0095FF",
                      color: "white",
                      width: "120px",
                      height: "30px",
                      ":hover": {
                        bgcolor: "#131927",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 mb-2"
                  >
                    + Add Feature
                  </Button>
                </div>
                {newSubscription.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <TextField
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      fullWidth
                      placeholder="Enter feature"
                      sx={{
                        height: "40px",
                        padding: "10px",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                    />

                    <IconButton
                      onClick={() => removeFeature(index)}
                      color="error"
                      sx={{
                        height: "30px",
                        width: "30px",
                        marginTop: "15px",
                      }}
                    >
                      <IoClose className="text-lg" />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={handleCloseModal}
                sx={{
                  textTransform: "none",
                  bgcolor: "#ddd",
                  outline: "1px solid black",
                  color: "black",
                  width: "80px",
                  height: "38px",
                  ":hover": {
                    bgcolor: "#eee",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddOrEditSubscription}
                sx={{
                  textTransform: "none",
                  bgcolor: "#0095FF",
                  color: "white",
                  width: "140px",
                  height: "40px",
                  ":hover": {
                    bgcolor: "#131927",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {selectedSubscription ? "Save Changes" : "Add Subscription"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
