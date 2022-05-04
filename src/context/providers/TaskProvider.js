import { useReducer, useContext, createContext } from "react";
import taskReducer from "../reducers/taskReducer";

const taskContext = createContext();

const initialState = {
  loading: false,
  error: null,
  tasks: [],
  task: {},
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

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
