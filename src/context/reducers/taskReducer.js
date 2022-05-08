import { tasksActions } from "../";

const taskReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case tasksActions.LOADING:
      return { ...state, loading: true };

    case tasksActions.ERROR:
      return { ...state, loading: false, error: payload };

    case tasksActions.LOAD_ALL_TASKS:
      return { ...state, loading: false, tasks: payload, error: null };

    case tasksActions.LOAD_TASK:
      return { ...state, task: payload };

    case tasksActions.CREATE_TASK: {
      return { ...state, tasks: [...state.tasks, { ...payload }] };
    }

    case tasksActions.UPDATE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload._id ? payload : task
        ),
      };
    }

    case tasksActions.UPDATE_TAGS: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload._id ? payload : task
        ),
      };
    }

    case tasksActions.DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks?.filter((task) => task._id !== payload),
      };
    }

    case tasksActions.TOGGLE_COMPLETION_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload ? { ...task, isDone: !task.isDone } : task
        ),
      };
    }

    default:
      return state;
  }
};

export default taskReducer;
