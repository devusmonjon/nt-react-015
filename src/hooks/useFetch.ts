"use client";
import { useEffect, useState } from "react";
import axios from "@/api";
import { useDispatch } from "react-redux";

interface iUseFetch {
  data: { payload?: [] };
  loading: boolean;
  error: Error | null;
}

export const useFetch = (
  path: string,
  params: {},
  deps: number[] | string[] = []
): iUseFetch => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(path, { params })
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.status === 401) {
          setError(err);
          dispatch({ type: "LOGOUT" });
        }
      })
      .finally(() => setLoading(false));
  }, [path, ...deps]);

  return { data, loading, error };
};
