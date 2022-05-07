import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./tasks.scss";

import { TaskCard, TaskForm } from "../../components";
import Layout from "../Layout/Layout";
import { useTaskContext } from "../../context";

import loader from "../../assets/images/loader.gif";
import emptyImage from "../../assets/images/empty.png";

import {
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "../../services";

const initialState = {
  title: "",
  description: "",
  workDuration: "",
  shortBreakDuration: "",
  longBreakDuration: "",
  priority: "low",
};

const Tasks = () => {
  const {
    taskState: { loading, error, tasks },
    taskDispatch,
  } = useTaskContext();

  const completedTasks = tasks.filter((task) => task.isDone === true);
  const unCompletedTasks = tasks.filter((task) => task.isDone === false);

  const [taskData, setTaskData] = useState({ ...initialState });
  const [showForm, setShowForm] = useState(false);
  const [operationType, setOperationType] = useState(false);

  const [checkLoading, setCheckLoading] = useState(false);

  const handleClose = () => {
    setShowForm((val) => !val);
    setTaskData({ ...initialState });
  };

  const handleChange = ({ target: { name, value } }) =>
    setTaskData((prevVal) => ({ ...prevVal, [name]: value }));

  //Create a task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!operationType) {
      createTask(taskData, taskDispatch);
      handleClose();
    } else {
      updateTask(taskData, taskDispatch);
      setOperationType(false);
      handleClose();
    }
  };

  //Delete a task
  const handleDelete = (id) => deleteTask(id, taskDispatch);

  //Update a task
  const handleUpdate = (task) => {
    setTaskData({ ...task });
    setShowForm(true);
    setOperationType(true);
  };

  //UPdate the completion status
  const handleCheck = (id) =>
    toggleTaskCompletion(id, taskDispatch, setCheckLoading);

  //Tasks
  let content = null;

  if (loading) {
    content = (
      <div className="flex flex-center">
        <img src={loader} alt="loader" className="loader-img" />
      </div>
    );
  } else if (!loading && error) {
    content = (
      <div className="flex flex-center">
        <p className="error">{error}</p>
      </div>
    );
  } else if (tasks.length === 0) {
    content = (
      <div className="flex flex-col gap-md flex-center">
        <img src={emptyImage} alt="empty_image" className="loader-img" />
        <p>Task list is empty!</p>
      </div>
    );
  } else {
    content = (
      <div className="tasks-section__tasks__container flex">
        {!unCompletedTasks?.length ? null : (
          <div>
            <h5 className="h5 b-margin-md">Yet to Complete</h5>
            {unCompletedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                checkLoading={checkLoading}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                handleCheck={handleCheck}
              />
            ))}
          </div>
        )}
        {!completedTasks?.length ? null : (
          <div>
            <h5 className="h5 b-margin-md">Completed</h5>
            {completedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                checkLoading={checkLoading}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                handleCheck={handleCheck}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Layout
      renderHeader={true}
      header={
        <div className="b-margin-md">
          <h2 className="h2 b-margin-sm">
            {`Welcome back, ${window.localStorage.getItem(
              "pomodorroUsername"
            )}!`}
          </h2>
          <h4 className="h4">
            {loading ? (
              <p className="tasks-section__skeletal"></p>
            ) : tasks.length === 0 ? (
              "You don't have any task added, add some! 🚀"
            ) : (
              `You have ${tasks.length} tasks for today! All the best!`
            )}
          </h4>
        </div>
      }
    >
      <div className="flex flex-space-between">
        <h4 className="h4">Task-List</h4>
        <button
          className="btn-float defaultDark"
          onClick={() => setShowForm(true)}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="tasks-section__tasks flex-1">{content}</div>

      <CSSTransition
        in={showForm}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <TaskForm
          open={showForm}
          onClose={handleClose}
          type={operationType}
          taskData={taskData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </CSSTransition>
    </Layout>
  );
};

export default Tasks;
