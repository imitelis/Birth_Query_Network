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

      await loginService
        .login({
          username,
          password,
        })
        .then((user) => {
          userDispatch({ type: "BEGIN_SESSION", payload: user });
        })
        .catch((error) => {
          notificationDispatch({
            type: "RED_NOTIFICATION",
            payload: `fatal error: something wrong happened (${error?.response?.data.error})`,
          });
        });

      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBirthQueryUser", JSON.stringify(user));
      setTokenMutation.mutate(user.token);
      navigate("/queries");
      notificationDispatch({
        type: "GREEN_NOTIFICATION",
        payload: `welcome ${user.name}!`,
      });
    } catch (error) {
      if (!username || !password) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: username (${username}) and password (*) are required`,
        });
      } else if (error?.response?.status === 500) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: "fatal error: lost connection to Birth Query",
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
              <Link className="text-teal-400" href="/signup">
                here
              </Link>{" "}
              to register
            </p>
          </span>
          <form onSubmit={handleLogin} className="gap-12 mt-8 space-x-4">
            <label htmlFor="username" className="text-xl text-gray-500">
              Username:
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

            <label htmlFor="password" className="text-xl text-gray-500">
              Password:
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
                  showPassword ? "fas fa-eye" : "fas fa-eye-slash"
                }`}
              ></i>
            </button>
            <button
              type="submit"
              className="text-md px-10 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  } else if (user.name) {
    return (
      <div className="z-index-0 flex flex-col h-auto min-h-screen max-w-screen mx-auto">
        <div className="login-form col-span-2 flex flex-col justify-center pb-4 mb-0">
          <span className="text-center mt-36">
            <p className="text-6xl font-bold text-black mt-8">
              Please log <span className="text-teal-400">in</span>
            </p>
            <p className="text-lg text-gray-500 mt-4 mb-4">
              <em>
                <span className="text-teal-400">{user.username}</span> already
                logged in!
              </em>
            </p>
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
