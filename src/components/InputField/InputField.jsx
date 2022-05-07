import "./input-field.scss";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function InputField({
  labelName,
  type,
  value,
  name,
  placeholder,
  errorMessage,
  ...other
}) {
  const [showPass, setShowPass] = useState(false);

  let content = null;

  if (type === "textarea") {
    content = (
      <textarea
        {...other}
        placeholder={labelName}
        className="input-group-new__input"
        name={name}
        value={value}
      />
    );
  } else {
    content = (
      <input
        {...other}
        type={type === "password" ? (showPass ? "text" : "password") : type}
        className="input-group-new__input"
        placeholder={placeholder ? placeholder : labelName}
        value={value}
        name={name}
      />
    );
  }

  return (
    <div className="input-group-new">
      <label className="input-group-new__label" htmlFor={name}>
        {labelName}
      </label>
      {content}

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
