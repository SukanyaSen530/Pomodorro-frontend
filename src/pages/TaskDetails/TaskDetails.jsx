import { useParams } from "react-router-dom";

import Layout from "../Layout/Layout";
import "./task-details.scss";
import { useTaskContext } from "../../context";

import loader from "../../assets/loader.gif";

import { Timer } from "../../components";

function TaskDetails() {
  const params = useParams();
  const taskId = params.taskId;

  const {
    taskState: { tasks, loading, error },
  } = useTaskContext();

  const currentTask = tasks.find((task) => task._id === taskId);
  let content = null;

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
          {/* <div>Tags</div> */}
        </div>
      </>
    );
  }

  return (
    <Layout>
      <section className="task-details flex flex-center flex-1">
        {content}
      </section>
    </Layout>
  );
}

export default TaskDetails;
