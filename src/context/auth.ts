"ue client";
import { saveToStorage } from "./local-storage";

export const auth = (
  state: string | null = null,
  action: { type: "LOGIN" | "LOGOUT"; payload: string }
) => {
  try {
    state = JSON.parse(localStorage.getItem("user")!) || null;
  } catch (err) {
    console.warn(err);
  }
  switch (action.type) {
    case "LOGIN":
      state = action.payload;
      try {
        saveToStorage("user", state);
      } catch (err) {
        console.warn(err);
      }
      return state;
    case "LOGOUT":
      try {
        localStorage.removeItem("user");
      } catch (err) {
        console.warn(err);
      }
      return null;
    default:
      return state;
  }
};
