import axios from "axios";
import { toast } from "react-toastify";

import { authActions } from "../context";
import { authURL } from "./url";

// Auth
export const loginUser = async (userData, dispatch) => {
  console.log(authURL);

  try {
    dispatch({ type: authActions.LOADING });
    const { status, data } = await axios.post(`${authURL}signin`, userData);

    if (status === 200) {
      dispatch({
        type: authActions.LOAD_USER,
        payload: { token: data?.token, user: data?.user },
      });
    }
  } catch (e) {
    dispatch({ type: authActions.ERROR });
    toast.error(e?.response?.data?.message || "Could not login! Try again..");
  }
};

export const registerUser = async (userData, dispatch) => {
  try {
    dispatch({ type: authActions.LOADING });
    const { status, data } = await axios.post(`${authURL}signup`, userData);

    if (status === 201) {
      dispatch({
        type: authActions.LOAD_USER,
        payload: { token: data?.token, user: data?.user },
      });
    }
  } catch (e) {
    dispatch({ type: authActions.ERROR });
    toast.error(
      e?.response?.data?.message || "Could not sign up the user! Try again.."
    );
  }
};
