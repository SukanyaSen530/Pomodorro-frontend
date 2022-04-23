import { Routes, Route } from "react-router-dom";

import { Home, TaskDetails, Tasks, Overview } from "../pages";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Prevented Route */}
      <Route path="/" element={<Home />} />
      {/* Protected Routes */}
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/tasks/:taskId" element={<TaskDetails />} />
      <Route path="/stats" element={<Overview />} />
      <Route path="*" element={<>Not Avaialble!</>} />
    </Routes>
  );
};

export default AllRoutes;
