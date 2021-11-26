import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Input, Error } from "./Input";
import { authForm } from "../../actions/auth";
import { useForm } from "react-hook-form";

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { isLoading } = useSelector((state) => state.auth);

  const { register, reset, errors, handleSubmit, getValues } = useForm();
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // eslint-disable-line

  const handleError = async () => {
    const error = JSON.parse(localStorage.getItem("error"));

    const authErrorMessage = error?.message;

    if (
      error?.errors?.email[0] ||
      error?.errors?.password[0] ||
      error?.errors?.name[0]
    ) {
      await setError(
        error?.errors?.email[0] ||
          error?.errors?.password[0] ||
          error?.errors?.name[0]
      );
      await console.log(
        error?.errors?.email[0] ||
          error?.errors?.password[0] ||
          error?.errors?.name[0]
      );
    } else if (authErrorMessage) {
      await setError(authErrorMessage);
      await console.log(authErrorMessage);
    } else {
      await setError("");
    }
  };

  const handleSubmitData = async (data) => {
    const { name, email, password } = data;
    const user = { name, email, password };
    await setError("");

    if (isSignUp) {
      await dispatch(authForm(user, history, "signup"));
    } else {
      await dispatch(authForm({ email, password }, history, "signin"));
    }

    setShowPassword(false);
    await handleError();

    reset();
  };

  const handleShowPassword = () =>
    setShowPassword((currentShowPassword) => !currentShowPassword);

  const signUpOrIn = isSignUp ? "signUpContainer" : "signInContainer";

  const toggleActiveLogin = () => {
    const authContainer = document.querySelector(".authContainer");
    authContainer.classList.toggle("right-panel-active");
    setIsSignUp((currentSignUp) => !currentSignUp);
    setError(null);
  };

  return (
    <div className="mainContainer">
      {isLoading ? <div className="overlay2"></div> : null}
      <div className="authContainer">
        <div className={`formContainer ${signUpOrIn}`}>
          <form onSubmit={handleSubmit(handleSubmitData)} className="form">
            {error && (
              <Error message={error} title="Error" className="authError" />
            )}
            {isSignUp ? (
              <>
                <h1>Create Account</h1>
                <Input
                  className="input"
                  name="name"
                  label="Name"
                  autoFocus
                  inputRef={register({ required: "Name is required" })}
                />
                {errors.name && (
                  <Error message={errors.name.message} className="error" />
                )}
              </>
            ) : (
              <h1>Sign in</h1>
            )}
            <Input
              className="input"
              name="email"
              label="Email"
              type="email"
              autoFocus={!isSignUp}
              inputRef={register({
                required: "Email is required",
                pattern: { value: emailPattern, message: "Email is invalid" },
              })}
            />
            {errors.email && (
              <Error message={errors.email.message} className="error" />
            )}
            <Input
              className="input"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              inputRef={register({
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "passwords shouldn't be shorter than 8 characters",
                },
              })}
            />
            {errors.password && (
              <Error message={errors.password?.message} className="error" />
            )}
            {isSignUp && (
              <>
                <Input
                  className="confirmPassword input"
                  name="confirmPassword"
                  label="Repeat Password"
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                  inputRef={register({
                    required: "Repeat Password, please",
                    minLength: {
                      value: 8,
                      message:
                        "passwords shouldn't be shorter than 8 characters",
                    },
                    validate: {
                      checkPasswordConfirmationHandler: (value) => {
                        const { password } = getValues();
                        return password === value || "Passwords don't match";
                      },
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <Error
                    message={errors.confirmPassword.message}
                    className="error"
                  />
                )}
              </>
            )}
            <button
              type="submit"
              className="authButton"
              title="Submit button"
              disabled={isLoading}
            >
              {isLoading ? " Loading..." : isSignUp ? " Sign Up" : "Sign In"}
            </button>
            <div className="toggleForm">
              <h3>
                {isSignUp
                  ? "Already have an acount ?"
                  : "Done't have an account ?"}
              </h3>
              <button
                className="ghost authButton"
                onClick={() => {
                  handleShowPassword(false);
                  toggleActiveLogin();
                }}
                title="Sign In Button"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
        <div className="overlayContainer">
          <div className="overlay">
            {isSignUp ? (
              <div className="overlayPanel overlayLeft">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost authButton"
                  onClick={toggleActiveLogin}
                  title="Sign In Button"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <div className="overlayPanel overlayRight">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost authButton"
                  onClick={toggleActiveLogin}
                  title="Sign Up Button"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
