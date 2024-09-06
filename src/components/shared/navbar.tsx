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
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/api";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

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
        username: string;
        password: string;
      };
    }) => state.auth
  );
  // console.log(auth);
  const dispatch = useDispatch();

  const form = React.useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const editHandler = () => {
    const data = new FormData(form.current!);
    setLoading(true);
    const loadingT = toast.loading("Updating...", {
      position: "top-center",
    });
    axios
      .patch(`/admins/${auth?._id}`, data)
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: { ...res.data.payload, token: auth?.token },
        });
        toast.success(res.data.msg, {
          position: "top-center",
          id: loadingT,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.success(err.response.msg ?? "Something went wrong", {
          position: "top-center",
          id: loadingT,
        });
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(data.get("username"));
  };

  return (
    <nav className="py-4 sticky top-0 z-[999999999] bg-background">
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"outline"} className="w-full">
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            editHandler();
                          }}
                          ref={form}
                        >
                          <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="fname" className="text-left">
                                First Name
                              </Label>
                              <Input
                                id="fname"
                                name="fname"
                                defaultValue={auth?.fname}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="lname" className="text-left">
                                Last Name
                              </Label>
                              <Input
                                id="lname"
                                name="lname"
                                defaultValue={auth?.lname}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-left">
                                Username
                              </Label>
                              <Input
                                id="username"
                                name="username"
                                defaultValue={auth?.username}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="phone" className="text-left">
                                Phone number
                              </Label>
                              <Input
                                id="phone"
                                name="phone"
                                defaultValue={auth?.phone}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose>
                              <Button type="submit">Save changes</Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Button
                      variant={"default"}
                      className="w-full"
                      onClick={() => dispatch({ type: "LOGOUT" })}
                    >
                      Logout
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
