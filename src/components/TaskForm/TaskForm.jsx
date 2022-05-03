import { Modal, InputField } from "../";

import "./task-form.scss";

const TaskForm = ({ open, onClose, taskData, handleChange, handleSubmit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="task-form">
        <InputField
          type="text"
          value={taskData.title}
          required
          autoFocus
          onChange={handleChange}
          label="Title"
          name="title"
        />
        <InputField
          type="textarea"
          value={taskData.description}
          onChange={handleChange}
          required
          label="Description"
          placeholder="Description"
          name="description"
          rows={4}
        />
        <InputField
          type="number"
          required
          value={taskData.workDuration}
          label="Work Duration"
          name="workDuration"
          onChange={handleChange}
          min={1}
          max={45}
        />
        <InputField
          type="number"
          required
          value={taskData.shortBreakDuration}
          onChange={handleChange}
          label="Short Break"
          name="shortBreakDuration"
          min={1}
          max={45}
        />
        <InputField
          type="number"
          required
          value={taskData.longBreakDuration}
          onChange={handleChange}
          label="Long Break"
          name="longBreakDuration"
          min={1}
          max={45}
        />

        <div className="flex flex-space-between">
          <button onClick={onClose} className="btn btn-contained defaultLight">
            Cancel
          </button>
          <button type="submit" className="btn btn-contained defaultDark">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;
