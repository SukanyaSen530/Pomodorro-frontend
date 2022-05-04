import React, { useState } from "react";
import "./home.scss";

import homeImage from "../../assets/home-image.png";

import { AuthModal } from "../../components";

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
          <div className="features flex t-margin-hg">
            <div className="features__steps">
              <span className="features__steps__num">1</span>
              <p className="features__steps__text">
                Choose a task you want to work on!
              </p>
            </div>
            <div className="features__steps">
              <span className="features__steps__num">2</span>
              <p className="features__steps__text">Set the timer!</p>
            </div>
            <div className="features__steps">
              <span className="features__steps__num">3</span>
              <p className="features__steps__text">
                Work on the task until timer ends!
              </p>
            </div>
            <div className="features__steps">
              <span className="features__steps__num">4</span>
              <p className="features__steps__text">Take a short break!</p>
            </div>
            <div className="features__steps">
              <span className="features__steps__num">5</span>
              <p className="features__steps__text">Or take a longer break!</p>
            </div>
          </div>
        </div>

        <button
          className="btn btn-contained btn-md secondaryLight home-section__btn"
          onClick={() => setShowAuth(true)}
        >
          <i className="fa-solid fa-right-to-bracket"></i> Sign In
        </button>
      </section>
      {showAuth ? <AuthModal open={showAuth} onClose={handleAuthForm} /> : null}
    </>
  );
};

export default Home;
