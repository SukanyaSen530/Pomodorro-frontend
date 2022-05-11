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
          className={`task-card flex flex-space-between badge ${
            isDone ? "done" : ""
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="task-card__text-container">
            <p className="task-card__title">{title}</p>

            <div className="task-card__tags">
              {tags.map((tag, index) => (
                <span className="task-card__tag" key={index}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {tags?.length !== 0 ? (
            <span className="badge-count danger">{tags?.length}</span>
          ) : null}

          <div className="task-card__actions flex">
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
