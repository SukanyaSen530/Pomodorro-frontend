import "./layout.scss";

const Layout = ({ renderHeader = false, header, children }) => {
  return (
    <section className="layout flex flex-col">
      {renderHeader ? (
        <div className="layout__header b-margin-md"> {header} </div>
      ) : null}
      <div className="layout__body">{children}</div>
    </section>
  );
};

export default Layout;
