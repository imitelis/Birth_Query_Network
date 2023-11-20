// import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import { useUserDispatchValue } from "../../UserContext";
import { useNotificationDispatchValue } from "../../NotificationContext";

import { setToken } from "../../services/queries";

import loginService from "../../services/login";

const Login = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  const setTokenMutation = useMutation(setToken);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      await loginService.login({
        username,
        password,
      });

      userDispatch({ type: "BEGIN_SESSION", payload: user });
      setTokenMutation.mutate(user.token);

      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBirthQueryUser", JSON.stringify(user));
      navigate("/queries");
      window.location.reload();
    } catch (error) {
      if (!username || !password) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: username (${username}) and password (*) are required`,
        });
      } else if (username.length < 8 || password.length < 8) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: username (${username}) or password (*) must be at least 8 char long`,
        });
      } else if (username.length > 20 || password.length > 20) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: username (${username}) or password (*) must be less than 20 char long`,
        });
      } else if (error?.response?.status === 500) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: "fatal error: lost connection to Birth Query Network",
        });
      } else if (error?.response?.status === 401) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `wrong credentials or non-existing user (${username})`,
        });
      } else {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `fatal error: something wrong happened (${error?.response?.data.error})`,
        });
      }
    }
  };

  if (!user || user === null) {
    return (
      <div className="z-index-0 flex flex-col h-auto min-h-screen max-w-screen mx-auto">
        <div className="login-form col-span-2 flex flex-col justify-center pb-4 mb-0">
          <span className="text-center mt-36">
            <p className="text-6xl font-bold text-black mt-8">
              Please log <span className="text-teal-400">in</span>
            </p>
            <p className="text-lg text-gray-500 mt-4 mb-4">
              Log in as existing User
              <br />
              Don't have an account? Go{" "}
              <a className="text-teal-400" href="/signup">
                here
              </a>
            </p>
          </span>
          <div className="gap-12 mt-8 flex flex-col lg:flex-row">
            <div className="items-center space-x-4">
              <label htmlFor="username" className="text-xl text-gray-500 mt-2">
                Username:{" "}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                pattern=".{8,}"
                required
                value={username}
                onChange={({ target }) => setUsername(target.value)}
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
                pattern=".{8,}"
                required
                value={password}
                onChange={({ target }) => setPassword(target.value)}
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
            <div className="items-center">
              <button
                onClick={handleLogin}
                type="submit"
                className="text-md px-10 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (user.username) {
    return (
      <div className="z-index-0 flex flex-col h-auto min-h-screen max-w-screen mx-auto">
        <div className="login-form col-span-2 flex flex-col justify-center pb-4 mb-0">
          <span className="text-center mt-36">
            <p className="text-6xl font-bold text-black mt-8">
              You already <span className="text-teal-400">in</span>
            </p>
            <p className="text-lg text-gray-500 mt-4 mb-4">
              {user.username} you've logged in!
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
Login.propTypes = {
  user: PropTypes.object
};
*/

export default Login;
