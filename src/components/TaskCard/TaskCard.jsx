import React from "react";

import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const TaskCard = ({ task, onEdit }) => {
  const { _id, isDone, title } = task;

  return (
    <article className="task-card">
      <input type="checkbox" checked={isDone} className="task-card__checkbox" />
      <div className="task-card__details flex flex-space-between">
        <p>{title}</p>
        <div>
          <RiEditBoxFill onClick={() => onEdit(task)} />
          <MdDelete />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
