import React, { useState, useEffect } from "react";

import "./tasks.scss";

import { TaskForm, TaskCard } from "../../components";

const initialState = {
  title: "",
  description: "",
  workDuration: "",
  shortBreakDuration: "",
  longBreakDuration: "",
};

const Tasks = () => {
  const [showForm, setShowForm] = useState(false);
  const handleForm = () => setShowForm((val) => !val);

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
          <button className="btn-float defaultDark" onClick={handleForm}>
            +
          </button>
        </div>
        <div className="tasks-section__content__details"></div>
      </div>

      <TaskForm
        open={showForm}
        onClose={handleForm}
        taskData={taskData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default Tasks;
