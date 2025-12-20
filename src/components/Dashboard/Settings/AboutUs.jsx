import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";

import { Button, CircularProgress } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";
import {
  useAddAboutUsMutation,
  useGetAboutUsQuery,
} from "../../../Redux/api/settingsApi";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetAboutUsQuery();
  console.log(getSettingsData?.data.content);

  const [addSettings, { isLoading: isAdding }] = useAddAboutUsMutation();

  useEffect(() => {
    if (getSettingsData?.data.content) {
      setContent(getSettingsData.data.content);
    }
  }, [getSettingsData]);

  const handleOnSave = async () => {
    try {
      const payload = {
        content: content,
        type: "about",
      };

      // Add a new Terms and Conditions if not existing
      const response = await addSettings(payload).unwrap();
      console.log("add about us", response);
      if (response.success) {
        toast.success("About Us added successfully!");
      }
      refetch();
    } catch (error) {
      toast.error("Failed to save About Us. Please try again.");
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
      </Button>{" "}
      <div className="p-2 rounded">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-4xl font-bold  text-[#222021]">About Us</h1>
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
export default AboutUs;
