const getUserName = (name = "") => {
  return name
    .match(/(\b\S)?/g)
    .join("")
    .match(/(^\S|\S$)?/g)
    .join("")
    .toUpperCase();
};
export default getUserName;
