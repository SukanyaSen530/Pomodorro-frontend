import React from "react";

import { BiMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { CgMenuMotion } from "react-icons/cg";
import { IoIosSquare } from "react-icons/io";

import "./task-card.scss";

import { Link } from "react-router-dom";

const TaskCard = ({
  task,
  checkLoading,
  handleUpdate,
  handleDelete,
  handleCheck,
}) => {
  const { _id, isDone, title, priority } = task;

  return (
    <article className="task-card flex gap-md flex-center-y">
      <input
        type="checkbox"
        className="task-card__checkbox"
        checked={isDone}
        onChange={() => handleCheck(_id)}
        disabled={checkLoading}
      />
      <Link
        to={`/tasks/${_id}`}
        className={`task-card__details flex flex-space-between ${
          isDone ? "done" : ""
        }`}
      >
        <p>{title}</p>
        <div>
          <i
            class={`fa-solid fa-square task-card__icon task-card__icon--${priority}`}
          ></i>

          <i
            class="fa-solid fa-ellipsis-vertical task-card__icon task-card__icon"
            onClick={(e) => {
              e.preventDefault();
            }}
          ></i>

          <i
            className="fa-solid fa-pen-to-square task-card__icon task-card__icon"
            onClick={(e) => {
              e.preventDefault();
              handleUpdate(task);
            }}
          ></i>

          <i
            onClick={(e) => {
              e.preventDefault();
              handleDelete(_id);
            }}
            className="fa-solid fa-trash task-card__icon task-card__icon"
          ></i>
        </div>
      </Link>
    </article>
  );
};

export default TaskCard;
