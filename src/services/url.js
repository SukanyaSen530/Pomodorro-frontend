const api =
  import.meta.env.VITE_APP_MODE === "dev"
    ? import.meta.env.VITE_DEV_URL
    : import.meta.env.VITE_BASE_URL;

console.log(api);

const tasksURL = `${api}tasks`;
const authURL = `${api}auth/`;

export { tasksURL, authURL };
