import { IProduct } from "@/interfaces";

export const getFromStorage = (getter: "wishlist" | "cart" | "token") => {
  let res = "[]";
  try {
    res = localStorage.getItem(getter) || "[]";
  } catch (err) {
    console.warn(err);
  }
  return res;
};
export const saveToStorage = (
  setter: "wishlist" | "cart" | "token",
  data: IProduct[] | string
) => {
  try {
    localStorage.setItem(
      setter,
      typeof data !== "object" ? data : JSON.stringify(data)
    );
  } catch (err) {
    console.warn(err);
  }
};
