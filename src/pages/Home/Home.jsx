import React, { useState } from "react";
import "./home.scss";
import { CSSTransition } from "react-transition-group";

import homeImage from "../../assets/images/home-image.png";

import { AuthModal } from "../../components";
import { pomodoroDetails, featuresData } from "./data";

const Home = () => {
  const [showAuth, setShowAuth] = useState(false);
  const handleAuthForm = () => setShowAuth((val) => !val);

  return (
    <>
      <section className="home-section">
        <div className="home-section__content">
          <img
            src={homeImage}
            alt="home_image"
            className="home-section__content__img"
          />
          <h1 className="h1">Time and tide wait for none!</h1>
        </div>

        <button
          className="btn btn-contained btn-md secondaryLight home-section__btn"
          onClick={() => setShowAuth(true)}
        >
          <i className="fa-solid fa-right-to-bracket"></i> Sign In
        </button>
      </section>

      <section className="features-section">
        <div className="features-section__about">
          <h3 className="h3">What is pomodoro technique?</h3>
          <ol>
            {pomodoroDetails.map((step, index) => (
              <li key={index}>
                <span>{step.title} </span> : {step.description}
              </li>
            ))}
          </ol>
        </div>

        <div className="features-section__details">
          {featuresData.map(({ title, description, imgUrl }, index) => (
            <div className={`flex flex-center-y flex-${index % 2}`} key={index}>
              <div className="flex-1">
                <h4 className="h4">{title}</h4>
                <p>{description}</p>
              </div>
              <img src={imgUrl} alt={title} />
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>Made with ❤️ Sukanya Sen</p>

        <div className="flex gap-sm">
          <a href="#here">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="#here">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="#here">
            <i className="fa-brands fa-twitter-square"></i>
          </a>
        </div>
      </footer>

      <CSSTransition
        in={showAuth}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <AuthModal open={showAuth} onClose={handleAuthForm} />
      </CSSTransition>
    </>
  );
};

export default Home;
