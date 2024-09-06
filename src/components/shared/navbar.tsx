"use client";
import Link from "next/link";
import { ModeToggle } from "./theme-changer";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Navbar = () => {
  const router = useRouter();
  const auth = useSelector(
    (state: {
      auth: {
        token: string;
        _id: number;
        fname: string;
        lname: string;
        phone: string;
      };
    }) => state.auth
  );
  // console.log(auth);
  const dispatch = useDispatch();

  // profile
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <nav className="py-4">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl">LOGO</h1>
        </Link>
        <div className="flex items-center gap-3">
          <div>
            <div className={`${auth !== null ? "" : "hidden"}`}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Profile</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>id: {auth?._id}</DropdownMenuLabel>
                  <DropdownMenuLabel>Name: {auth?.fname}</DropdownMenuLabel>
                  <DropdownMenuLabel>Surname: {auth?.lname}</DropdownMenuLabel>
                  <DropdownMenuLabel>Phone: {auth?.phone}</DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Button
                      variant={"default"}
                      className="w-full"
                      onClick={() => dispatch({ type: "LOGOUT" })}
                    >
                      Logout
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Button variant={"outline"} className="w-full">
                      Edit
                    </Button>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              onClick={() => router.push("/login")}
              className={`${auth !== null ? "hidden" : ""}`}
            >
              Login
            </Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
