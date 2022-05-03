import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./tasks.scss";

import { TaskForm } from "../../components";

const initialState = {
  title: "",
  description: "",
  workDuration: "",
  shortBreakDuration: "",
  longBreakDuration: "",
};

const Tasks = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => {
    setShowForm((val) => !val);
    setTaskData({ ...initialState });
  };

  const [taskData, setTaskData] = useState({ ...initialState });

  const handleChange = ({ target: { name, value } }) => {
    setTaskData((prevVal) => ({ ...prevVal, [name]: value }));
    console.log(taskData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //Edit a task
  // const editTask = (task) => {
  //   setTaskData({ ...task });
  //   handleForm();
  // };

  return (
    <section className="tasks-section flex flex-col">
      <div className="tasks-section__title b-margin-md">
        <h2 className="h2">Welcome back, Sukanya!</h2>
        <h4 className="h4">You have 4 tasks for today! All the best!</h4>
      </div>
      <div className="tasks-section__content">
        <div className="flex flex-space-between">
          <h4 className="h4">Todo-List</h4>
          <button
            className="btn-float defaultDark"
            onClick={() => setShowForm(true)}
          >
            +
          </button>
        </div>
        <div className="tasks-section__content__details"></div>
      </div>

      <CSSTransition
        in={showForm}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <TaskForm
          open={showForm}
          onClose={handleClose}
          taskData={taskData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </CSSTransition>
    </section>
  );
};

export default Tasks;
