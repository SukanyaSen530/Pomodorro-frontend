import { Outlet } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={1200}
        hideProgressBar
        closeOnClick
        theme="colored"
      />
      <Outlet />
    </div>
  );
}

export default App;
