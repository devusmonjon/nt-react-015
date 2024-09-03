"ue client";
import { getFromStorage, saveToStorage } from "./local-storage";

export const token = (
  state: string | null = null,
  action: { type: "LOGIN" | "LOGOUT"; payload: string }
) => {
  try {
    state = localStorage.getItem("token") || null;
  } catch (err) {
    console.warn(err);
  }
  switch (action.type) {
    case "LOGIN":
      state = action.payload;
      try {
        saveToStorage("token", state);
      } catch (err) {
        console.warn(err);
      }
      return state;
    case "LOGOUT":
      try {
        localStorage.removeItem("token");
      } catch (err) {
        console.warn(err);
      }
      return null;
    default:
      return state;
  }
};
