import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string().min(6).max(50),
  password: z.string().min(6).max(50),
});
export const blogSchema = z.object({
  title: z.string().min(6).max(50),
  desc: z.string().min(6).max(50),
});

export const registerFormSchema = z.object({
  fname: z.string().min(6).max(50),
  lname: z.string().min(6).max(50),
  username: z.string().min(6).max(50),
  phone: z.string().min(6).max(50),
  password: z.string().min(6).max(50),
});
