const { REACT_APP_APP_MODE, REACT_APP_BASE_URL, REACT_APP_DEV_URL } =
  process.env;

const api = REACT_APP_APP_MODE === "" ? REACT_APP_DEV_URL : REACT_APP_BASE_URL;

console.log(api);

const tasksURL = `${api}tasks`;
const authURL = `${api}auth/`;

export { tasksURL, authURL };
