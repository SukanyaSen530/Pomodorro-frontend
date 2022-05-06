import { useEffect, useReducer, useContext, createContext } from "react";
import taskReducer from "../reducers/taskReducer";
import { useAuthContext } from "../";

import { getTasks } from "../../services";

const taskContext = createContext();

const initialState = {
  loading: false,
  error: null,
  tasks: [],
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const {
    authState: {
      user: { token },
    },
  } = useAuthContext();

  useEffect(() => {
    if (state.tasks?.length === 0 && token) getTasks(dispatch);
    // eslint-disable-next-line
  }, [dispatch, token]);

  return (
    <taskContext.Provider
      value={{
        taskState: state,
        taskDispatch: dispatch,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};

const useTaskContext = () => useContext(taskContext);

export { TaskProvider, useTaskContext };
