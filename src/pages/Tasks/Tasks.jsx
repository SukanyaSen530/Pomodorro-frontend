import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./tasks.scss";

import { TaskCard, TaskForm } from "../../components";
import Layout from "../Layout/Layout";
import { useTaskContext } from "../../context";

import loader from "../../assets/images/loader.gif";
import emptyImage from "../../assets/images/empty.png";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

  const [taskData, setTaskData] = useState({ ...initialState });
  const [showForm, setShowForm] = useState(false);
  const [operationType, setOperationType] = useState(false);

  const [completedTasks, setCompletedTasks] = useState([]);
  const [inCompletedTasks, setIncompletedTasks] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);

  useEffect(() => {
    setCompletedTasks(tasks.filter((task) => task.isDone === true));
    setIncompletedTasks(tasks.filter((task) => task.isDone === false));
  }, [tasks]);

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

  //Update the completion status
  const handleCheck = async (id) =>
    await toggleTaskCompletion(id, taskDispatch, setCheckLoading);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add;
    let active = inCompletedTasks;
    let complete = completedTasks;

    // Source Logic
    if (source.droppableId === "incomplete_board") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "incomplete_board") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTasks(complete);
    setIncompletedTasks(active);

    const taskId = result.draggableId;

    if (source.droppableId !== destination.droppableId) {
      handleCheck(taskId);
    }
  };

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
        <Droppable
          droppableId="incomplete_board"
          isDropDisabled={checkLoading}
          key="b1"
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <h4 className="h4 b-margin-md center-aligned">Yet to Complete</h4>

              {inCompletedTasks.map((task, index) => (
                <TaskCard
                  id={task._id}
                  key={task._id}
                  index={index}
                  task={task}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable
          droppableId="completed_board"
          isDropDisabled={checkLoading}
          key="b2"
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <h4 className="h4 b-margin-md center-aligned">Completed</h4>

              {completedTasks.map((task, index) => (
                <TaskCard
                  id={task._id}
                  index={index}
                  key={task._id}
                  task={task}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
            className="btn-float default"
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
    </DragDropContext>
  );
};

export default Tasks;
