import { toast } from "sonner";

export const ErrorResponseHandler = (response, toastId = "page-name") => {
  
  if (response?.errorMessages && Array.isArray(response.errorMessages)) {
    response.errorMessages.forEach((err) => {
      toast.error(err.message, { id: toastId });
    });
  } else {
    toast.error(
      response?.message ||
        response?.data?.message ||
        response?.error?.data?.message ||
        "Something went wrong!",
      { id: toastId }
    );
  }

  if (response?.statusCode && Number(response.statusCode) === 401) {    
     sessionStorage.removeItem("accessToken");
    window.location.replace("/sign-in");
  }
};