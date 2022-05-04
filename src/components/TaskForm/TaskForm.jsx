import { Modal, InputField } from "../";

import "./task-form.scss";

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
        <InputField
          type="number"
          required
          value={taskData.workDuration}
          labelName="Work Duration"
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
          labelName="Short Break"
          name="shortBreakDuration"
          min={1}
          max={45}
        />
        <InputField
          type="number"
          required
          value={taskData.longBreakDuration}
          onChange={handleChange}
          labelName="Long Break"
          name="longBreakDuration"
          min={1}
          max={45}
        />

        <div className="flex flex-space-between">
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
