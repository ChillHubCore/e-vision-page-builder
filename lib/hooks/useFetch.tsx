"use client";

import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import axios from "@/lib/axios";
import { selectUserInfo } from "@/lib/redux/User/UserSlice";
import { getError } from "@/lib/getError";
import { toast } from "@/components/ui/use-toast";

export const useFetch = (requestQuery: string) => {
  const [data, setData] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [status, setStatus] = useState<number>();
  const userInfo = useSelector(selectUserInfo);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.get(requestQuery, {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      setStatus(response.status);
      setData(response.data);
      setIsLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(true);
        setIsLoading(false);
        toast({
          title: getError(err),
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch, status };
};
