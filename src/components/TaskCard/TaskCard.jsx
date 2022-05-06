import React from "react";

import { BiMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import "./task-card.scss";

import { Link } from "react-router-dom";

const TaskCard = ({
  task,
  checkLoading,
  handleUpdate,
  handleDelete,
  handleCheck,
}) => {
  const { _id, isDone, title } = task;

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
          isDone ? "done" : null
        }`}
      >
        <p>{title}</p>
        <div>
          <BiMessageSquareEdit
            onClick={(e) => {
              e.preventDefault();
              handleUpdate(task);
            }}
            className="task-card__icon task-card__icon"
          />
          <MdDelete
            onClick={(e) => {
              e.preventDefault();
              handleDelete(_id);
            }}
            className="task-card__icon task-card__icon"
          />
        </div>
      </Link>
    </article>
  );
};

export default TaskCard;
