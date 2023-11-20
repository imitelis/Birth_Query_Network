// import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import { useNotificationDispatchValue } from "../../NotificationContext";

import createUser from "../../services/signup";

const Signup = ({ user }) => {
  const [username, setUsername] = useState("");
  const [repeatedUsername, setRepeatedUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

  const navigate = useNavigate();

  const notificationDispatch = useNotificationDispatchValue();

  const newUserMutation = useMutation(createUser, {
    onSuccess: () => {
      notificationDispatch({
        type: "GREEN_NOTIFICATION",
        payload: `successfully signed up ${username}! now you can log in`,
      });
      navigate("/login");
    },
    onError: (error) => {
      handleErrorResponse(error, user);
    },
  });

  const handleErrorResponse = (error) => {
    if (error?.response?.status === 500) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: "fatal error: lost connection to Birth Query Network",
      });
    } else if (error?.response?.status === 400) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `user sign up failed: username (${username}) already exists`,
      });
    } else if (error?.response?.data.error) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${error?.response?.data.error})`,
      });
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      if (!username || !repeatedUsername || !password || !repeatedPassword) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: username (${username}), repeated username (${username}), password (*) and repeated password (*) are required`,
        });
      } else if (password !== repeatedPassword) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: password (*) and repeated password (*) don't match`,
        });
        setPassword("");
        setRepeatedPassword("");
      } else if (username !== repeatedUsername) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: username (${username}) and repeated username (${repeatedUsername}) don't match`,
        });
        setPassword("");
        setRepeatedPassword("");
      } else if (username.length < 8 || password.length < 8) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: username (${username}) and password (*) must be at least 8 char long`,
        });
        setPassword("");
        setRepeatedPassword("");
      } else if (username.length > 20 || password.length > 20) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: username (${username}) and password (*) must be less than 20 char long`,
        });
        setPassword("");
        setRepeatedPassword("");
      } else {
        const userObject = {
          username: username,
          password: password,
        };
        newUserMutation.mutate(userObject);
        setName("");
        setUsername("");
        setPassword("");
        setRepeatedPassword("");
      }
    } catch (error) {
      handleErrorResponse(error);
      // console.log(error.response.data);
    }
  };

  if (!user || user === null) {
    return (
      <div className="z-index-0 flex flex-col h-auto min-h-screen max-w-screen mx-auto">
        <div className="signup-form col-span-2 flex flex-col justify-center pb-4 mb-0">
          <span className="text-center mt-36">
            <p className="text-6xl font-bold text-black mt-8">
              Please sign <span className="text-teal-400">up</span>
            </p>
            <p className="text-lg text-gray-500 mt-4 mb-4">
              Sign up a new User
            </p>
          </span>
          <div className="gap-12 mt-8 grid grid-cols-1 lg:grid-cols-2 ">
            <div className="items-center space-x-4">
              <label htmlFor="username" className="text-xl text-gray-500 mt-2">
                Username:{" "}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 py-1"
              />
            </div>
            <div className="items-center space-x-4">
              <label htmlFor="username" className="text-xl text-gray-500 mt-2">
                Repeat Username:{" "}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                value={repeatedUsername}
                onChange={({ target }) => setRepeatedUsername(target.value)}
                className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 py-1"
              />
            </div>
            <div className="items-center space-x-4">
              <label htmlFor="password" className="text-xl text-gray-500 mt-2">
                Password:{" "}
              </label>
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                id="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
                className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 py-1"
              />
              <button
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="text-md px-3 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-full"
              >
                <i
                  className={`${
                    showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                  }`}
                ></i>
              </button>
            </div>
            <div className="items-center space-x-4">
              <label htmlFor="password" className="text-xl text-gray-500 mt-2">
                Repeat password:{" "}
              </label>
              <input
                type={`${showRepeatedPassword ? "text" : "password"}`}
                name="repeated-password"
                id="repeated-password"
                value={repeatedPassword}
                onChange={({ target }) => setRepeatedPassword(target.value)}
                required
                className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 py-1"
              />
              <button
                onClick={() => {
                  setShowRepeatedPassword(!showRepeatedPassword);
                }}
                className="text-md px-3 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-full"
              >
                <i
                  className={`${
                    showRepeatedPassword ? "fas fa-eye-slash" : "fas fa-eye"
                  }`}
                ></i>
              </button>
            </div>
            <div className="items-center">
              <button
                onClick={handleSignup}
                type="submit"
                className="text-md px-10 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (user.username) {
    return (
      <div className="z-index-0 flex flex-col h-auto min-h-screen max-w-screen mx-auto">
        <div className="signup-form col-span-2 flex flex-col justify-center pb-4 mb-0">
          <span className="text-center mt-36">
            <p className="text-6xl font-bold text-black mt-8">
              You already <span className="text-teal-400">up</span>
            </p>
            <p className="text-lg text-gray-500 mt-4 mb-4">
              {user.username} you've signed up!
            </p>
            <br />
            <button className="text-md px-10 py-3 bg-teal-400 hover:bg-teal-500 text-white text-xl text-center shadow-md rounded-md">
              <Link to="/queries">Queries</Link>
            </button>
          </span>
        </div>
      </div>
    );
  }
};

/*
Signup.propTypes = {
  // user: PropTypes.object,
};
*/

export default Signup;
