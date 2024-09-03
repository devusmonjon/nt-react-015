"use client";
import { useEffect, useState } from "react";
import axios from "@/api";

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
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(path, { params })
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [path, ...deps]);

  return { data, loading, error };
};
