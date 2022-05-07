import "./chip.scss";

const Chip = ({ index, tag, handleDeleteTag }) => {
  return (
    <div className="chip secondaryLight">
      {tag} {"  "}
      <i
        className="fa-solid fa-circle-xmark"
        onClick={() => handleDeleteTag(index)}
      ></i>
    </div>
  );
};

export default Chip;
