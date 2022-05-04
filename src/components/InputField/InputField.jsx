import "./input-field.scss";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function InputField({ labelName, type, value, name, errorMessage, ...other }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="input-group-new">
      <label className="input-group-new__label" htmlFor={name}>
        {labelName}
      </label>
      {type === "textarea" ? (
        <textarea
          {...other}
          className="input-group-new__input"
          placeholder={labelName}
          name={name}
          value={value}
        />
      ) : (
        <input
          {...other}
          type={type === "password" ? (showPass ? "text" : "password") : type}
          className="input-group-new__input"
          placeholder={labelName}
          value={value}
          name={name}
        />
      )}

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
