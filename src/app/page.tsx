"use client";
import Blogs from "@/components/shared/blogs";
import Hero from "@/components/shared/hero";
import { SkeletonCard } from "@/components/shared/skeleton";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { IBlog } from "@/interfaces";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Page = () => {
  const [limit, setLimit] = useState(8);
  const router = useRouter();
  const [updateCount, setupdateCount] = useState(0);

  const { data, loading }: { data: { payload?: IBlog[] }; loading: boolean } =
    useFetch("/blogs", { limit }, [updateCount, limit]);
  const auth = useSelector((state: { auth: { token: string } }) => state.auth);
  useEffect(() => {
    if (!auth?.token) {
      router.push("/login");
      toast.error("No access", {
        position: "top-center",
      });
    }
    console.log(auth);
  }, [auth]);
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [loading]);
  return (
    <>
      <Hero />
      <Blogs data={data?.payload || []} limit={limit} />
      {loading && <SkeletonCard length={8} />}
      <div className="container">
        <Button
          variant={"default"}
          className="w-full mb-4"
          disabled={loading}
          onClick={() => setLimit((prev) => prev + 8)}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Load more"
          )}
        </Button>
      </div>
    </>
  );
};

export default Page;
