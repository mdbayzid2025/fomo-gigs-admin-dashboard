"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Modal,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "sonner";
import {
  useCreateFAQMutation,
  useDeleteFaqMutation,
  useGetFaqDataQuery,
  useUpdateFaqMutation,
} from "../../../Redux/api/faqApi";

export default function Faq() {
  const [expanded, setExpanded] = useState("panel1");
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [deletingFaqId, setDeletingFaqId] = useState(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });

  const {
    data: allFaqData,
    isLoading: loadingFaq,
    isError: faqError,
  } = useGetFaqDataQuery();

  const [createFaq, { isLoading: createLoading }] = useCreateFAQMutation();
  const [updateFaq, { isLoading: updateLoading }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: deleteLoading }] = useDeleteFaqMutation();

  const faqData = allFaqData?.data || [];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenModal = (faq = null) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({ question: faq.question, answer: faq.answer });
    } else {
      setEditingFaq(null);
      setFormData({ question: "", answer: "" });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingFaq(null);
    setFormData({ question: "", answer: "" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveFaq = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editingFaq) {
        const result = await updateFaq({
          id: editingFaq._id,
          ...formData,
        }).unwrap();
        if (result.success) {
          toast.success("FAQ updated successfully");
          handleCloseModal();
        }
      } else {
        const result = await createFaq(formData).unwrap();
        if (result.success) {
          toast.success("FAQ created successfully");
          handleCloseModal();
        }
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save FAQ");
    }
  };

  const handleOpenDeleteModal = (faqId) => {
    setDeletingFaqId(faqId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setDeletingFaqId(null);
  };

  const handleDeleteFaq = async () => {
    try {
      const result = await deleteFaq(deletingFaqId).unwrap();
      if (result.success) {
        toast.success("FAQ deleted successfully");
        handleCloseDeleteModal();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete FAQ");
    }
  };

  if (loadingFaq) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (faqError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading FAQ data.
      </div>
    );
  }

  return (
    <div className="bg-white px-[5%] lg:px-0 py-20">
      <Button
        onClick={() => window.history.back()}
        sx={{
          backgroundColor: "#131927",
          color: "white",
          padding: "10px",
          width: "15px",
          marginLeft: "15px",
          ":hover": {
            backgroundColor: "#0095FF",
          },
        }}
      >
        <MdArrowBackIosNew />
      </Button>

      <div className="max-w-4xl mx-auto text-center sm:text-left mb-8">
        <div className="flex justify-between items-center">
          <p className="text-lg sm:text-3xl lg:text-4xl text-black font-semibold mb-2">
            Frequently Asked Questions
          </p>
          <Button
            onClick={() => handleOpenModal()}
            sx={{
              backgroundColor: "#131927",
              color: "white",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#0095FF",
              },
            }}
          >
            + Add FAQ
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {faqData.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No FAQs available</p>
        ) : (
          faqData.map((faq) => (
            <div key={faq._id} className="mb-2">
              <Accordion
                expanded={expanded === faq._id}
                onChange={handleChange(faq._id)}
                sx={{
                  boxShadow: "none",
                  "&:before": { display: "none" },
                  borderRadius: "15px",
                }}
              >
                <AccordionSummary
                  expandIcon={<IoIosArrowDown className="text-lg text-white" />}
                  aria-controls={`${faq._id}-content`}
                  id={`${faq._id}-header`}
                  sx={{
                    color: expanded === faq._id ? "white" : "#131927",
                    fontSize: {
                      xs: "12px",
                      md: "14px",
                      lg: "16px",
                    },
                    px: 2,
                    borderRadius: expanded === faq._id ? "15px" : "10px",
                    background: expanded === faq._id ? "#131927" : "#64d2ff",
                    transition: "background-color 0.3s ease",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="flex-1">{faq.question}</p>
                  <div
                    // onClick={(e) => e.stopPropagation()}
                    className="flex gap-2"
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleOpenModal(faq)}
                      sx={{
                        color: expanded === faq._id ? "white" : "#131927",
                        ":hover": {
                          background:
                            expanded === faq._id
                              ? "rgba(255,255,255,0.2)"
                              : "rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDeleteModal(faq._id)}
                      sx={{
                        color: expanded === faq._id ? "white" : "#131927",
                        ":hover": {
                          background:
                            expanded === faq._id
                              ? "rgba(255,255,255,0.2)"
                              : "rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    background: "#0095FF",
                    color: "#fff",
                    px: 2,
                    fontSize: {
                      xs: "12px",
                      md: "14px",
                      lg: "16px",
                    },
                    borderRadius: "10px 10px 15px 15px",
                  }}
                >
                  {faq.answer}
                </AccordionDetails>
              </Accordion>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit FAQ Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="faq-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            backgroundColor: "#FDFDFD",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            borderRadius: "8px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <h2 className="text-2xl font-semibold mb-6">
            {editingFaq ? "Edit FAQ" : "Create New FAQ"}
          </h2>

          <div className="flex flex-col gap-4">
            <TextField
              fullWidth
              label="Question"
              name="question"
              value={formData.question}
              onChange={handleFormChange}
              placeholder="Enter the FAQ question"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#131927" },
                },
              }}
            />

            <TextField
              fullWidth
              label="Answer"
              name="answer"
              value={formData.answer}
              onChange={handleFormChange}
              multiline
              rows={4}
              placeholder="Enter the FAQ answer"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#131927" },
                },
              }}
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button
              onClick={handleCloseModal}
              sx={{
                backgroundColor: "#e0e0e0",
                color: "#131927",
                textTransform: "none",
                ":hover": { backgroundColor: "#d0d0d0" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveFaq}
              disabled={createLoading || updateLoading}
              sx={{
                backgroundColor: "#131927",
                color: "white",
                textTransform: "none",
                ":hover": { backgroundColor: "#0095FF" },
              }}
            >
              {createLoading || updateLoading ? "Saving..." : "Save FAQ"}
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "400px",
            backgroundColor: "#FDFDFD",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4">Delete FAQ</h2>
          <p className="text-gray-600 mb-8">
            Are you sure you want to delete this FAQ? This action cannot be
            undone.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              onClick={handleCloseDeleteModal}
              sx={{
                backgroundColor: "#e0e0e0",
                color: "#131927",
                textTransform: "none",
                ":hover": { backgroundColor: "#d0d0d0" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteFaq}
              disabled={deleteLoading}
              sx={{
                backgroundColor: "#d32f2f",
                color: "white",
                textTransform: "none",
                ":hover": { backgroundColor: "#b71c1c" },
              }}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
