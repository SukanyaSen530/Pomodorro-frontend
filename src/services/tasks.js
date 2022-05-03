import axios from "axios";
import { toast } from "react-toastify";

import { tasksActions } from "../context";
import { tasksURL } from "./url";

import getConfig from "./config";

export const getTasks = async (dispatch) => {
  const config = getConfig();

  try {
    dispatch({ type: tasksActions.LOADING });
    const { data, status } = await axios.get(tasksURL, config);

    if (status === 200) {
      dispatch({
        type: tasksActions.LOAD_ALL_TASKS,
        payload: data?.tasks || [],
      });
    }
  } catch (e) {
    dispatch({
      type: tasksActions.ERROR,
      payload: "Oops! Something went wrong :(",
    });
  }
};

export const getTask = async (id, dispatch) => {
  const config = getConfig();

  try {
    dispatch({ type: tasksActions.LOADING });
    const { data, status } = await axios.get(`${tasksURL}/${id}`, config);

    if (status === 200) {
      dispatch({
        type: tasksActions.LOAD_TASK,
        payload: data?.task || {},
      });
    }
  } catch (e) {
    toast.error(
      e?.response?.data?.message ||
        "Unable to get the details of the task at the moment!"
    );
  }
};

export const createTask = async (task, dispatch) => {
  const config = getConfig();

  try {
    dispatch({ type: tasksActions.LOADING });
    const { data, status } = await axios.post(tasksURL, config, task);

    if (status === 201) {
      dispatch({
        type: tasksActions.CREATE_TASK,
        payload: data?.task,
      });
    }
  } catch (e) {
    toast.error(
      e?.response?.data?.message || "Unable to create a task at the moment!"
    );
  }
};

export const updateTask = async (id, updatedTask, dispatch) => {
  const config = getConfig();

  try {
    dispatch({ type: tasksActions.LOADING });
    const { data, status } = await axios.put(
      `${tasksURL}/${id}`,
      config,
      updatedTask
    );

    if (status === 200) {
      dispatch({
        type: tasksActions.UPDATE_TASK,
        payload: data?.task,
      });
    }
  } catch (e) {
    toast.error(
      e?.response?.data?.message || "Unable to update the task at the moment!"
    );
  }
};

export const deleteTask = async (id, dispatch) => {
  const config = getConfig();

  try {
    dispatch({ type: tasksActions.LOADING });
    const { data, status } = await axios.delete(`${tasksURL}/${id}`, config);

    if (status === 200) {
      dispatch({
        type: tasksActions.UPDATE_TASK,
        payload: data?.id,
      });
    }
  } catch (e) {
    toast.error(
      e?.response?.data?.message || "Unable to delete the task at the moment!"
    );
  }
};

export const toggleTaskCompletion = async (id, dispatch) => {
  const config = getConfig();

  try {
    dispatch({ type: tasksActions.LOADING });
    const { data, status } = await axios.patch(`${tasksURL}/${id}`, config);

    if (status === 200) {
      dispatch({
        type: tasksActions.UPDATE_TASK,
        payload: data?.id,
      });
    }
  } catch (e) {
    toast.error(
      e?.response?.data?.message ||
        "Unable to update the completion status of task at the moment!"
    );
  }
};

