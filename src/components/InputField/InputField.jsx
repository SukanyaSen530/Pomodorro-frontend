import "./input-field.scss";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function InputField({ label, type, value, errorMessage, ...other }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="input-group-new">
      <input
        {...other}
        type={type === "password" ? (showPass ? "text" : "password") : type}
        className="input-group-new__input"
        placeholder={label}
        value={value}
      />
      <span className="input-group-new__focus-border"></span>

      {type === "password" ? (
        <span
          onClick={() => setShowPass((val) => !val)}
          className="input-group-new__show-pass"
        >
          {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      ) : null}
    </div>
  );
}

export default InputField;
