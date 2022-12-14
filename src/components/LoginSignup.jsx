import React, { useRef, useState } from "react";
import styled from "styled-components";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { loginUser, registerUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import ReactLoading from "react-loading";

const LoginSignup = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [login, setLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { loading } = useSelector((store) => store.user);

  const handleRegister = (e) => {
    e.preventDefault();

    let timestamp = Date.now();
    let username = fullName.toLocaleLowerCase().replace(/\s/g, "");
    username = username + "_" + timestamp;
    const password = passwordRef.current.value;

    dispatch(registerUser({ username, email, password }));
  };

  const validatePassword = () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (confirmPassword !== password) {
      setShowPasswordError(true);
    } else setShowPasswordError(false);
  };

  return (
    <Wrapper>
      <div className="login-signup-btns">
        <button
          type="button"
          className={login ? "active" : ""}
          onClick={() => setLogin(true)}
        >
          Login
        </button>
        <button
          type="button"
          className={!login ? "active" : ""}
          onClick={() => setLogin(false)}
        >
          Sign up
        </button>
      </div>
      {login ? (
        <div id="login">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-div">
              <input
                type={visible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {visible ? (
                <AiFillEye
                  className="show-hide-pass-btn"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="show-hide-pass-btn"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
            <div className="remember-me">
              <input
                type="checkbox"
                name="remember_me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </div>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ReactLoading
                  type="spinningBubbles"
                  color="blue"
                  className="loading-spinner"
                />
              </div>
            ) : (
              <button
                type="submit"
                className="login-btn"
                onClick={() => dispatch(loginUser({ email, password }))}
              >
                Login
              </button>
            )}
            <div className="to-sign-in">
              <p>Don't have an account?</p>
              <span onClick={() => setLogin(false)}>Sign In</span>
            </div>
          </form>
        </div>
      ) : (
        <div id="signup">
          {/* <form onSubmit={(e) => e.preventDefault()}> */}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-div">
              <input
                type={visible ? "text" : "password"}
                placeholder="Password"
                ref={passwordRef}
                onChange={validatePassword}
                required
              />
              {visible ? (
                <AiFillEye
                  className="show-hide-pass-btn"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="show-hide-pass-btn"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
            <div className="confirm-password-div">
              <input
                type={visible ? "text" : "password"}
                placeholder="Confirm password"
                ref={confirmPasswordRef}
                onChange={validatePassword}
                required
              />
              {showPasswordError && (
                <span className="error">Passwords do not match</span>
              )}
            </div>
            <div className="remember-me">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                name="remember_me"
              />
              I agree with terms and conditions
            </div>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ReactLoading
                  type="spinningBubbles"
                  color="blue"
                  className="loading-spinner"
                />
              </div>
            ) : (
              <button
                type="submit"
                className="login-btn"
                // onClick={handleRegister}
                disabled={showPasswordError}
              >
                Sign up
              </button>
            )}
            <div className="to-log-in">
              <p>Already have an account?</p>
              <span onClick={() => setLogin(true)}>Login</span>
            </div>
          </form>
        </div>
      )}
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  text-align: center;
  /* padding: 5rem; */

  .login-signup-btns {
    display: flex;
    justify-content: space-between;

    .active {
      background-color: var(--primary-black);
      color: var(--primary-white);
    }

    button {
      width: 50%;
      border: none;

      font-size: 1.8rem;
      font-weight: 700;
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      cursor: pointer;
      margin: 1.2rem 2.4rem;
    }
  }

  form {
    input:not([type="checkbox"]) {
      display: block;
      width: 100%;
      border-radius: 4px;
      border: 2px solid var(--border-gray);
      margin: 0.4rem 0;
      margin-bottom: 0.8rem;
      height: 3rem;
      font-size: 1.2rem;
      padding: 0 1.2rem;
    }
  }

  .password-div {
    position: relative;
    display: flex;
    align-items: center;
  }

  .show-hide-pass-btn {
    font-size: 19px;
    position: absolute;
    right: 1.6rem;
    cursor: pointer;
    color: var(--primary-color);
  }

  .confirm-password-div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .error {
      color: red;
      margin-top: -6px;
      font-weight: 500;
      font-size: 1.2rem;
    }
  }

  .remember-me {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 0.8rem 0;
    input {
      accent-color: var(--primary-color);
      width: 1.8rem;
      height: 1.8rem;
    }
  }

  button[type="submit"] {
    text-transform: uppercase;
    width: 100%;
    border: none;
    background-color: var(--primary-color);
    color: var(--primary-white);
    font-size: 1.8rem;
    font-weight: 700;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.7;
    cursor: default;
  }

  .to-log-in,
  .to-sign-in {
    margin: 1.2rem 0;
    font-size: 1.2rem;

    span {
      color: var(--primary-color);
      font-size: 1.4rem;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;

export default LoginSignup;
