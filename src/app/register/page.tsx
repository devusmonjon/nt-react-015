"use client";

import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "../schemas";
import { useDispatch } from "react-redux";
import axios from "@/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fname: "",
      lname: "",
      username: "",
      phone: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    axios
      .post("/sign-up", values)
      .then((res) => {
        // dispatch({ type: "LOGIN", payload: res.data.payload.token });
        toast.success(res.data.msg, {
          position: "top-center",
        });
        console.log(res.data);
        setTimeout(() => {
          toast.success("Redirecting...", {
            position: "top-center",
          });
        }, 500);
        setTimeout(() => {
          router.push("/login");
        }, 600);
      })
      .catch((err) => {
        toast.error("Invalid creadentials...", {
          position: "top-center",
        });
      });
  };
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12 order-2">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your creadentials below to create an account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="fname">First name</FormLabel>
                    <FormControl>
                      <Input
                        id="fname"
                        placeholder="enter your name"
                        aria-required={true}
                        // required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="lname">Last name</FormLabel>
                    <FormControl>
                      <Input
                        id="lname"
                        placeholder="enter your surname"
                        aria-required={true}
                        // required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="Etner username"
                        aria-required={true}
                        // required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        placeholder="Etner phone"
                        aria-required={true}
                        // required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Register
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block order-1">
        <Image
          src="https://aupairkitchen.com/wp-content/uploads/2015/03/csm_Research_Academy_Registration_Original_59841_cf57601246.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Page;
