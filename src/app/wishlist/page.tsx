"use client";
import Products from "@/components/shared/products";
import { IProduct } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Page = () => {
  const wishlist = useSelector(
    (state: { wishlist: IProduct[] }) => state.wishlist
  );
  const token = useSelector((state: { token: string }) => state.token);
  const router = useRouter();
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
      <Products data={wishlist} loading={false} />
    </>
  );
};

export default Page;
