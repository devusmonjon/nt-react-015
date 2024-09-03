"use client";
import Link from "next/link";
import { ModeToggle } from "./theme-changer";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [loginText, setLoginText] = useState<"Login" | "Logut">("Login");
  const router = useRouter();
  const token = useSelector((state: { token: string }) => state.token);
  console.log(token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setLoginText("Logut");
    } else {
      setLoginText("Login");
    }
  }, [token]);

  return (
    <nav className="py-4">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl">LOGO</h1>
        </Link>
        <div className="flex items-center gap-3">
          <div>
            {token !== null ? (
              <Button onClick={() => dispatch({ type: "LOGOUT" })}>
                {loginText}
              </Button>
            ) : (
              <Button onClick={() => router.push("/login")}>{loginText}</Button>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
