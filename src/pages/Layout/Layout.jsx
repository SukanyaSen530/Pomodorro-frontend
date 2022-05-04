import { useState } from "react";

import useClickOutside from "../../hooks/useClickOutside";
import { authActions, useAuthContext } from "../../context";

import "./layout.scss";

const Layout = ({ renderHeader = false, header, children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const domNode = useClickOutside(() => setOpenMenu(false));
  const { authDispatch } = useAuthContext();

  return (
    <section className="layout flex flex-col">
      {renderHeader ? (
        <div className="layout__header b-margin-md"> {header} </div>
      ) : null}
      <div className="layout__body">{children}</div>

      <div
        className="layout__user-settings flex flex-col flex-center gap-md"
        ref={domNode}
      >
        <button
          className="btn btn-icon secondaryLight btn-lg menu-trigger"
          onClick={() => setOpenMenu((val) => !val)}
        >
          <i className="fa-solid fa-user-gear"></i>
        </button>

        <div className={`menu ${openMenu ? "active" : ""}`}>
          <button className="menu__options">
            <i className="fa-solid fa-user-large"></i> Profile
          </button>
          <button
            className="menu__options"
            onClick={() => authDispatch({ type: authActions.LOGOUT })}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Layout;
