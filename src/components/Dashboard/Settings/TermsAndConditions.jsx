import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

import { Button, CircularProgress } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";
import {
  useAddTermsAndConditionsMutation,
  useGetTermsAndConditionsQuery,
} from "../../../Redux/api/settingsApi";
import { toast } from "sonner";

const TermsAndConditions = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getTermsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetTermsAndConditionsQuery();
  console.log(getTermsData?.data.content);

  const [addTerms, { isLoading: isAdding }] =
    useAddTermsAndConditionsMutation();

  useEffect(() => {
    if (getTermsData?.data.content) {
      setContent(getTermsData.data.content);
    }
  }, [getTermsData]);

  const handleOnSave = async () => {
    try {
      const payload = {
        content: content,
        type: "terms",
      };

      // Add a new Terms and Conditions if not existing
      const response = await addTerms(payload).unwrap();
      console.log("add terms", response);
      if (response.success) {
        toast.success("Added Terms and Conditions successfully!");
      }
      refetch();
    } catch (error) {
      toast.error("Failed to save Terms and Conditions. Please try again.");
      console.error("Save error:", error);
    }
  };

  if (isFetching || isAdding) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size="large" tip="Loading Terms and Conditions..." />
      </div>
    );
  }

  if (!getTermsData) {
    return (
      <div className="text-white">
        Error loading Terms and Conditions. Please try again later.
      </div>
    );
  }
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Terms and Conditions. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[#fbfbfb] rounded-lg py-10 px-4">
      <Button
        onClick={() => window.history.back()}
        sx={{
          backgroundColor: "#131927",
          color: "white",
          padding: "10px",
          width: "15px",
          ":hover": {
            backgroundColor: "#0095FF",
          },
        }}
      >
        <MdArrowBackIosNew />
      </Button>
      <div className="p-2 rounded">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-4xl font-bold  text-[#222021]">
            Terms and Condition
          </h1>
          <Button
            onClick={handleOnSave}
            sx={{
              width: "150px",
              bgcolor: "#0095FF",
              color: "white",
              textTransform: "none",
              height: "40px",
              fontSize: "16px",
              ":hover": {
                bgcolor: "#131927",
                borderColor: "#0080FF",
              },
            }}
          >
            Save & Change
          </Button>
        </div>
        <div className="my-5">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>
    </div>
  );
};
export default TermsAndConditions;
