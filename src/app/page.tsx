"use client";
import Blogs from "@/components/shared/blogs";
import Hero from "@/components/shared/hero";
import { useFetch } from "@/hooks/useFetch";
import { IBlog } from "@/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [updateCount, setupdateCount] = useState(0);

  const { data, loading }: { data: { payload?: IBlog[] }; loading: boolean } =
    useFetch("/blogs", {}, [updateCount]);
  const token = useSelector((state: { token: string }) => state.token);
  useEffect(() => {
    if (!token) {
      router.push("/login");
      toast.error("No access", {
        position: "top-center",
      });
    }
    console.log(token);
  }, [token]);
  return (
    <>
      <Hero />
      <Blogs data={data?.payload || []} setupdateCount={setupdateCount} />
    </>
  );
};

export default Page;
