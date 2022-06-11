import { Modal, InputField } from "../";

import "./task-form.scss";

const options = ["low", "medium", "high"];

const TaskForm = ({
  open,
  onClose,
  type,
  taskData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="task-form">
        <InputField
          type="text"
          value={taskData.title}
          required
          autoFocus
          onChange={handleChange}
          labelName="Title"
          name="title"
        />
        <InputField
          type="textarea"
          value={taskData.description}
          onChange={handleChange}
          required
          labelName="Description"
          placeholder="Description"
          name="description"
          rows={4}
        />
        <div className="input-group">
          <label className="input-group__label">Select Priority</label>
          <select
            onChange={handleChange}
            className="input-group__input"
            name="priority"
            value={taskData.priority}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="input-group__focus-border"></span>
        </div>
        <InputField
          type="number"
          required
          value={taskData.workDuration}
          labelName="Work Duration (mins)"
          name="workDuration"
          onChange={handleChange}
          placeholder={"1 < m < 45"}
          min={1}
          max={45}
        />
        <InputField
          type="number"
          required
          value={taskData.shortBreakDuration}
          onChange={handleChange}
          labelName="Short Break (mins)"
          name="shortBreakDuration"
          placeholder={"1 < m < 10"}
          min={1}
          max={10}
        />
        <InputField
          type="number"
          required
          value={taskData.longBreakDuration}
          onChange={handleChange}
          labelName="Long Break (mins)"
          placeholder={"1 < m < 30"}
          name="longBreakDuration"
          min={1}
          max={30}
        />

        <div className="flex flex-space-between t-margin-md">
          <button onClick={onClose} className="btn btn-contained defaultLight">
            Cancel
          </button>
          <button type="submit" className="btn btn-contained defaultDark">
            {!type ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;
