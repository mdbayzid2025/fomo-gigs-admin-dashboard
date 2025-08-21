import { FaCheck } from "react-icons/fa";
import momentum from "../../../public/Images/subscriptionImages/momentum.png";
import acceleration from "../../../public/Images/subscriptionImages/acceleration.png";
import elevate from "../../../public/Images/subscriptionImages/elevate.png";
import ignite from "../../../public/Images/subscriptionImages/ignite.png";

// Initial mock data for subscriptions
const subscriptionsData = [
  {
    subscriptionId: "SUB123456",
    subscriberName: "John Doe",
    plan: "Momentum",
    status: "Active",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    price: "999/Year",
    image: momentum,
    description: {
      descriptionText: "First 7 days free - Then $999/Year",
      descriptionColor: "#FFC05C",
    },
    bgColor: "#F0FFE6",
    textColor: "#131927",
    badge: "BEST VALUE",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload any many as Events",
      "Unlimited Discounts",
    ],
  },
  {
    subscriptionId: "SUB123457",
    subscriberName: "Jane Smith",
    plan: "Acceleration",
    status: "Active",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    price: "999/Year",
    image: acceleration,
    description: {
      descriptionText: "First 7 days free - Then $99/Month",
      descriptionColor: "#D88500",
    },
    bgColor: "#FFFEEF",
    textColor: "#008259",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload any many as Events",
      "Unlimited Discounts",
    ],
  },
  {
    subscriptionId: "SUB123458",
    subscriberName: "Mike Johnson",
    plan: "Elevate",
    status: "Inactive",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    price: "999/Year",
    image: elevate,
    description: {
      descriptionText: "First 7 days free - Then $9/Month",
      descriptionColor: "#D88500",
    },
    bgColor: "#FFEFEF",
    textColor: "#7B2222",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload any many as Events",
      "Unlimited Discounts",
    ],
  },
  {
    subscriptionId: "SUB64536",
    subscriberName: "Sarah Wilson",
    plan: "Ignite",
    status: "Active",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    price: "999/Year",
    image: ignite,
    description: {
      descriptionText: "First 7 days free - Then $9/Month",
      descriptionColor: "#D88500",
    },
    bgColor: "#F8FFEF",
    textColor: "#749A00",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload any many as Events",
      "Unlimited Discounts",
    ],
  },
];

export default function SubscriptionPage() {
  //   const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  //   const [openModal, setOpenModal] = useState(false);
  //   const [selectedSubscription, setSelectedSubscription] = useState(null);
  //   const [newSubscription, setNewSubscription] = useState({
  //     subscriptionId: "",
  //     subscriberName: "",
  //     plan: "",
  //     status: "Active",
  //     startDate: "",
  //     endDate: "",
  //     price: "",
  //     description: "",
  //     bgColor: "bg-blue-50",
  //     textColor: "bg-blue-500 hover:bg-blue-600",
  //     features: [],
  //   });

  //   const handleOpenModal = (subscription = null) => {
  //     if (subscription) {
  //       setSelectedSubscription(subscription);
  //       setNewSubscription(subscription);
  //     } else {
  //       setNewSubscription({
  //         subscriptionId: "",
  //         subscriberName: "",
  //         plan: "",
  //         status: "Active",
  //         startDate: "",
  //         endDate: "",
  //         price: "",
  //         description: "",
  //         bgColor: "bg-blue-50",
  //         textColor: "bg-blue-500 hover:bg-blue-600",
  //         features: [],
  //       });
  //     }
  //     setOpenModal(true);
  //   };

  //   const handleCloseModal = () => {
  //     setOpenModal(false);
  //     setSelectedSubscription(null);
  //   };

  //   const handleAddOrEditSubscription = () => {
  //     if (selectedSubscription) {
  //       setSubscriptions((prev) =>
  //         prev.map((sub) =>
  //           sub.subscriptionId === selectedSubscription.subscriptionId
  //             ? { ...newSubscription }
  //             : sub
  //         )
  //       );
  //     } else {
  //       const newSub = {
  //         ...newSubscription,
  //         subscriptionId: `SUB${Date.now()}`,
  //       };
  //       setSubscriptions((prev) => [...prev, newSub]);
  //     }
  //     handleCloseModal();
  //   };

  //   const handleDeleteSubscription = (subscriptionId) => {
  //     setSubscriptions((prev) =>
  //       prev.filter((sub) => sub.subscriptionId !== subscriptionId)
  //     );
  //   };

  //   const handleFeatureChange = (index, value) => {
  //     const updatedFeatures = [...newSubscription.features];
  //     updatedFeatures[index] = value;
  //     setNewSubscription({
  //       ...newSubscription,
  //       features: updatedFeatures,
  //     });
  //   };

  //   const addFeature = () => {
  //     setNewSubscription({
  //       ...newSubscription,
  //       features: [...newSubscription.features, ""],
  //     });
  //   };

  //   const removeFeature = (index) => {
  //     const updatedFeatures = newSubscription.features.filter(
  //       (_, i) => i !== index
  //     );
  //     setNewSubscription({
  //       ...newSubscription,
  //       features: updatedFeatures,
  //     });
  //   };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
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
          {/* <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <FiPlus size={20} />
            Add Subscription
          </button> */}
        </div>

        {/* Subscription Cards Flex Layout */}
        <div className="flex flex-wrap gap-6">
          {subscriptionsData.map((subscription) => (
            <div
              key={subscription.subscriptionId}
              style={{ backgroundColor: subscription.bgColor }}
              className="rounded-xl p-4 relative shadow-sm border border-gray-200 hover:shadow-md transition-shadow w-72 flex-shrink-0"
            >
              <div className="flex flex-col items-center mb-4">
                <img
                  src={subscription?.image}
                  alt="Subscription Image"
                  className="w-36 h-36"
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-[#131927]">
                  {subscription.plan}
                </h2>
                {subscription.badge && (
                  <div className=" bg-[#26CB63] text-white text-xs font-medium px-2 py-1 rounded-full">
                    {subscription.badge}
                  </div>
                )}
              </div>
              {/* Plan Name */}

              {/* Description */}
              <p
                className="text-xs font-semibold mb-2"
                style={{ color: subscription.description.descriptionColor }}
              >
                {subscription.description.descriptionText}
              </p>

              {/* Price */}
              <div className="mb-3">
                <p
                  style={{ color: subscription.textColor }}
                  className="text-xl font-bold"
                >
                  ${subscription.price}
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
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {/* {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedSubscription ? "Edit Subscription" : "Add Subscription"}
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subscriber Name
                  </label>
                  <input
                    type="text"
                    value={newSubscription.subscriberName}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        subscriberName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    value={newSubscription.plan}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        plan: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={newSubscription.status}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    value={newSubscription.price}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        price: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newSubscription.startDate}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newSubscription.endDate}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={newSubscription.description}
                  onChange={(e) =>
                    setNewSubscription({
                      ...newSubscription,
                      description: e.target.value,
                    })
                  }
                  placeholder="e.g., First 7 days free - Then $99/Month"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <select
                    value={newSubscription.bgColor}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        bgColor: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bg-blue-50">Blue</option>
                    <option value="bg-green-50">Green</option>
                    <option value="bg-yellow-50">Yellow</option>
                    <option value="bg-pink-50">Pink</option>
                    <option value="bg-purple-50">Purple</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Color
                  </label>
                  <select
                    value={newSubscription.buttonColor}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        buttonColor: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bg-blue-500 hover:bg-blue-600">Blue</option>
                    <option value="bg-green-500 hover:bg-green-600">
                      Green
                    </option>
                    <option value="bg-teal-500 hover:bg-teal-600">Teal</option>
                    <option value="bg-red-500 hover:bg-red-600">Red</option>
                    <option value="bg-lime-500 hover:bg-lime-600">Lime</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Features
                  </label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {newSubscription.features?.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter feature"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEditSubscription}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                {selectedSubscription ? "Save Changes" : "Add Subscription"}
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
