import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Layout from "../Layout/Layout";
import "./task-details.scss";
import { useTaskContext } from "../../context";

import loader from "../../assets/images/loader.gif";

import { Chip, Timer } from "../../components";

import { updateTags } from "../../services";

function TaskDetails() {
  const params = useParams();
  const taskId = params.taskId;
  const navigate = useNavigate();

  const {
    taskState: { tasks, loading, error },
    taskDispatch,
  } = useTaskContext();

  const currentTask = tasks.find((task) => task._id === taskId);
  let content = null;

  const [updatedTags, setUpdatedTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tagsLoading, setTagsLoading] = useState(false);

  useEffect(() => {
    setUpdatedTags(currentTask?.tags || []);
  }, [currentTask]);

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      const exists = updatedTags.find(
        (tag) => tag === newTag?.trim().toLowerCase()
      );
      if (exists || newTag?.trim().length === 0) {
        setNewTag("");
      } else {
        setUpdatedTags((oldTags) => [...oldTags, newTag?.trim().toLowerCase()]);
        setNewTag("");
      }
    }
  };

  const handleDeleteTag = (val) => {
    const filteredTags = updatedTags.filter((item, index) => index !== val);
    setUpdatedTags(filteredTags);
  };

  const handleUpdateTaskWithTags = () => {
    if (JSON.stringify(updatedTags) === JSON.stringify(currentTask.tags)) {
      toast.info("Nothing to update!");
    } else {
      console.log(updatedTags);
      updateTags(currentTask._id, updatedTags, taskDispatch, setTagsLoading);
    }
  };

  if (loading) {
    content = (
      <div className="flex flex-center">
        <img src={loader} alt="loader" className="loader-img" />
      </div>
    );
  } else if (!loading && error) {
    content = (
      <div className="flex flex-center">
        <p className="error">{error}</p>
      </div>
    );
  } else if (!currentTask) {
    content = (
      <div className="flex flex-center">
        <p className="error">You are trying to access invalid task!</p>
      </div>
    );
  } else {
    content = (
      <>
        <Timer
          work={parseInt(currentTask.workDuration)}
          shortBreak={parseInt(currentTask.shortBreakDuration)}
          longBreak={parseInt(currentTask.longBreakDuration)}
        />

        <div className="task-details__content">
          <h3 className="h3 task-details__content__title">
            {currentTask.title}
          </h3>
          <p className="task-details__content__description">
            {currentTask.description}
          </p>
          <div className="task-details__tags">
            <p className="h4">Tags :</p>
            <div
              className={`task-details__tags__input-container flex flex-1 flex-wrap ${
                tagsLoading ? "disable" : ""
              }`}
            >
              {updatedTags?.map((tag, index) => (
                <Chip
                  key={index}
                  tag={tag}
                  index={index}
                  handleDeleteTag={handleDeleteTag}
                />
              ))}
              <input
                className="task-details__tags__input-container__input"
                autoFocus
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add Tag"
                value={newTag}
                maxLength={15}
                minLength={3}
                onKeyPress={(e) => handleAddTag(e)}
              />
            </div>
            <button
              className="btn btn-contained secondaryDark t-margin-sm"
              onClick={handleUpdateTaskWithTags}
            >
              Save
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <Layout
      renderHeader={true}
      header={
        <button
          className="btn btn-icon btn-lg b-margin-sm secondaryLight"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      }
    >
      <section className="task-details flex flex-1">{content}</section>
    </Layout>
  );
}

export default TaskDetails;
