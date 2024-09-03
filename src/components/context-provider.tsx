"use client";
import { store } from "@/context";
import { Provider } from "react-redux";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider store={store}>{children}</Provider>;
};
