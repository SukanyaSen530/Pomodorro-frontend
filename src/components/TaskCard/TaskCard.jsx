import React from "react";

import { RiEditCircleFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import "./task-card.scss";


const TaskCard = ({ task, handleUpdate, handleDelete, handleCheck }) => {
  const { _id, isDone, title } = task;

  return (
    <article className="task-card flex gap-md flex-center-y">
      <input
        type="checkbox"
        className="task-card__checkbox"
        checked={isDone}
        onChange={() => handleCheck(_id)}
      />
      <div
        className={`task-card__details flex flex-space-between ${
          isDone ? "done" : null
        }`}
      >
        <p>{title}</p>
        <div>
          <RiEditCircleFill
            onClick={() => handleUpdate(task)}
            className="task-card__icon task-card__icon--edit"
          />
          <MdDelete
            onClick={() => handleDelete(_id)}
            className="task-card__icon task-card__icon--delete"
          />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
