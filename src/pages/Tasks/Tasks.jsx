import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import "./tasks.scss";

import { TaskCard, TaskForm } from "../../components";
import Layout from "../Layout/Layout";
import { useTaskContext } from "../../context";

import {
  getTasks,
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
};

const Tasks = () => {
  const {
    taskState: { loading, error, tasks },
    taskDispatch,
  } = useTaskContext();

  useEffect(() => {
    if (tasks?.length === 0) getTasks(taskDispatch);
  }, [taskDispatch]);

  const [showForm, setShowForm] = useState(false);
  const [operationType, setOperationType] = useState(false);

  const handleClose = () => {
    setShowForm((val) => !val);
    setTaskData({ ...initialState });
  };

  const [taskData, setTaskData] = useState({ ...initialState });

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
  const handleCheck = (id) => toggleTaskCompletion(id, taskDispatch);

  //Tasks
  let content = null;

  if (loading) {
    content = <div>Loading...</div>;
  } else if (!loading && error) {
    content = <div>{error}</div>;
  } else if (tasks.length === 0) {
    content = <div>Empty!</div>;
  } else {
    content = (
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleCheck={handleCheck}
          />
        ))}
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
            {tasks.length === 0
              ? "You don't have any task added, add some! 🚀"
              : `You have ${tasks.length} tasks for today! All the best!`}
          </h4>
        </div>
      }
    >
      <div className="flex flex-space-between b-margin-md">
        <h4 className="h4">Todo-List</h4>
        <button
          className="btn-float defaultDark"
          onClick={() => setShowForm(true)}
        >
          +
        </button>
      </div>
      <div className="tasks-section__tasks">{content}</div>

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
