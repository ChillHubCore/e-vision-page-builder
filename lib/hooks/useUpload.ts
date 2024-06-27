import { useState } from "react";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../redux/User/UserSlice";

/**
 * Custom hook for uploading files.
 * @returns An object containing the uploaded data, loading state, error, and a function to send a file.
 */
const useUpload = () => {
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const api = process.env.NEXT_PUBLIC_API || "http://localhost:5000";
  const userInfo = useSelector(selectUserInfo);

  /**
   * Sends a file to the server.
   * @param requestQuery - The query string for the API request.
   * @param fileData - The file to be uploaded.
   * @param successMessage - The success message to be displayed.
   * @param errorMessage - The error message to be displayed.
   * @param onSuccess - Optional callback function to be executed after a successful upload.
   */
  const sendFile = async (
    requestQuery: string,
    fileData: File,
    successMessage: string,
    errorMessage: string,
    onSuccess?: (url: string) => void // Optional argument for the function to run after success
  ) => {
    setIsLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.append("file", fileData);
    try {
      const response = await axios.post(api + requestQuery, bodyFormData, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
      setSuccess(true);
      toast({
        title: successMessage,
      });

      if (onSuccess) {
        onSuccess(response.data); // Run the function after success if provided
      }
      // Handle successful response
    } catch (err: AxiosError | any) {
      toast({
        title: errorMessage,
      });
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, sendFile, success };
};

export default useUpload;
