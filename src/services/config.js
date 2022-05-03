import { tokenName } from "../context/providers/AuthProvider";

const getConfig = () => {
  const token = localStorage.getItem(`${tokenName}`);

  if (token)
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  else return "";
};


export default getConfig;
