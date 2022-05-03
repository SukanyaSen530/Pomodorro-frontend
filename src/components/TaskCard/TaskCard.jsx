import React from "react";

import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import "./task-card.scss";

const TaskCard = ({ task, handleUpdate, handleDelete }) => {
  const { _id, title } = task;

  return (
    <article className="task-card">
      <input type="checkbox" className="task-card__checkbox" />
      <div className="task-card__details flex flex-space-between">
        <p>{title}</p>
        <div>
          <RiEditBoxFill
            onClick={() => handleUpdate(task)}
            className="task-card__icon"
          />
          <MdDelete
            onClick={() => handleDelete(_id)}
            className="task-card__icon"
          />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
