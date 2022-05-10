import { Link } from "react-router-dom";

import "./task-card.scss";

import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ id, index, task, handleUpdate, handleDelete }) => {
  const { isDone, title, priority, tags } = task;

  return (
    <Draggable draggableId={`${id.toString()}`} index={index}>
      {(provided) => (
        <Link
          to={`/tasks/${id}`}
          className={`task-card task-card__details flex flex-space-between badge ${
            isDone ? "done" : ""
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{title}</p>

          {tags?.length !== 0 ? (
            <span className="badge-count secondaryDark">{tags?.length}</span>
          ) : null}
          <div>
            <i
              className={`fa-solid fa-square task-card__icon task-card__icon--${priority}`}
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
                handleDelete(id);
              }}
              className="fa-solid fa-trash task-card__icon task-card__icon"
            ></i>
          </div>
        </Link>
      )}
    </Draggable>
  );
};

export default TaskCard;
