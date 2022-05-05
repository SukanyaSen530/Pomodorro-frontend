import { useEffect, useReducer, useContext, createContext } from "react";
import taskReducer from "../reducers/taskReducer";

import { getTasks } from "../../services";

const taskContext = createContext();

const initialState = {
  loading: false,
  error: null,
  tasks: [],
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    if (state.tasks?.length === 0) getTasks(dispatch);
    // eslint-disable-next-line
  }, [dispatch]);

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
