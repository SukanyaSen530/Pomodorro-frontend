import { useState, useEffect } from "react";

import { Modal, InputField } from "..";
import { useAuthContext } from "../../context";

import { loginUser, registerUser } from "../../services";

import "./auth-modal.scss";

const AuthModal = ({ open, onClose }) => {
  const {
    authState: { loading },
    authDispatch,
  } = useAuthContext();

  const [type, setType] = useState(true);

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = ({ target: { name, value } }) =>
    setUserData((data) => ({ ...data, [name]: value }));

  const handleAuth = (e) => {
    e.preventDefault();
    if (type) {
      loginUser(
        { email: userData.email, password: userData.password },
        authDispatch
      );
    } else {
      registerUser(
        {
          email: userData.email,
          password: userData.password,
          fullName: userData.fullName,
        },
        authDispatch
      );
    }
  };

  //Test Credentials
  const handleAuthwithTestCred = (e) => {
    e.preventDefault();
    setUserData({ email: "test@gmail.com", password: "test@123" });
  };

  //To clear inputs as soon as modal is closed
  useEffect(() => {
    setUserData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [type]);

  let content = null;

  //   if true --> login
  if (type) {
    content = (
      <form onSubmit={(e) => handleAuth(e)}>
        <InputField
          type="email"
          labelNameName="Email"
          name="email"
          autoFocus
          required
          value={userData.email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          labelNameName="Password"
          name="password"
          required
          value={userData.password}
          onChange={handleChange}
        />

        <button className="btn btn-contained default block-btn" type="submit">
          {loading ? (
            <>
              <i className="fas fa-cog fa-spin"> </i> <span>Loading...</span>
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <button className="test-cred-btn" onClick={handleAuthwithTestCred}>
          Fill With Test Credentials
        </button>
      </form>
    );
  } else {
    content = (
      <form onSubmit={(e) => handleAuth(e)}>
        <InputField
          type="text"
          labelName="Full Name"
          name="fullName"
          required
          autoFocus
          value={userData.fullName}
          onChange={handleChange}
        />

        <InputField
          type="email"
          labelName="Email"
          name="email"
          required
          value={userData.email}
          onChange={handleChange}
        />

        <InputField
          type="password"
          labelName="Password"
          name="password"
          required
          minLength={8}
          value={userData.password}
          onChange={handleChange}
        />

        <InputField
          type="password"
          labelName="Confirm Password"
          name="confirmPassword"
          required
          minLength={8}
          pattern={userData.password}
          title="Password must be same"
          value={userData.confirmPassword}
          onChange={handleChange}
        />

        <button className="btn btn-contained default block-btn">
          {loading ? (
            <>
              <i className="fas fa-cog fa-spin"> </i> <span>Loading...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="auth-section flex flex-col">
        <div className="auth-section__toggler flex">
          <button
            className={`${type && "active"}`}
            onClick={() => setType(true)}
          >
            Sign In
          </button>
          <button
            className={`${!type && "active"}`}
            onClick={() => setType(false)}
          >
            Sign Up
          </button>
        </div>
        <div className="auth-section__form flex flex-center-y">{content}</div>
      </div>
    </Modal>
  );
};

export default AuthModal;
