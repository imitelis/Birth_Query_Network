import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useLocation } from "react-router-dom";

import { useNotificationDispatchValue } from "../../NotificationContext";
import { useUserDispatchValue } from "../../UserContext";

import { setToken } from "../../services/queries";

const NavigationBar = ({ setIsCursorVisible, user, queries }) => {
  const [logoHovered, setLogoHovered] = useState();
  const location = useLocation();

  const setTokenMutation = useMutation(setToken);

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  const userUuid = String(location.pathname.split("/").pop());

  /*
  function doesUserExists(userUuid) {
    return users.some((user) => user.uuid === userUuid);
  }
  */

  const isAbout = location.pathname === "/about";
  const isUsers =
    location.pathname === "/users" ||
    location.pathname === `/users/${userUuid}`; // && doesQueryExists(userId)
  const isQueries = location.pathname === "/queries";
  const isBirthQuery = location.pathname === "/birth-query";

  const handleLogoHover = () => {
    setLogoHovered(true);
  };

  const handleLogoLeave = () => {
    setLogoHovered(false);
  };

  const handleLogout = () => {
    notificationDispatch({
      type: "GREEN_NOTIFICATION",
      payload: `good-bye ${props.user.username}!`,
    });
    window.localStorage.removeItem("loggedBirthQueryUser");
    userDispatch({ type: "END_SESSION", payload: null });
    setTokenMutation.mutate(null);
  };

  return (
    <div
      className="z-index-2"
      onMouseEnter={() => setIsCursorVisible(false)}
      onMouseLeave={() => setIsCursorVisible(true)}
    >
      <div className="navigation-bar navbar navbar-expand-md bg-zinc-50 flex items-center justify-between fixed top-0 h-20 z-50 w-full">
        <div className="navbar-brand w-30 h-auto ml-8" id="logo">
          <a
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
            href="/"
            className={`text-4xl ${
              logoHovered ? "text-teal-500" : "text-teal-400"
            } font-bold whitespace-nowrap`}
          >
            Birth Query
          </a>
        </div>
        <nav
          id="navbar"
          className="flex flex-row mx-0 mt-0 ml-12 hidden lg:block"
        >
          <a
            className={`nav-link text-gray-500 text-xl mx-2 ${
              isAbout
                ? "text-teal-500 hover:text-teal-400"
                : "text-teal-400 hover:text-teal-500"
            }`}
            href="/about"
          >
            About
          </a>
          <a
            className={`nav-link text-gray-500 text-xl mx-2 ${
              isQueries
                ? "text-teal-500 hover:text-teal-400"
                : "text-teal-400 hover:text-teal-500"
            }`}
            href="/queries"
          >
            Queries
          </a>
          <a
            className={`nav-link text-gray-500 text-xl mx-2 ${
              isUsers
                ? "text-teal-500 hover:text-teal-400"
                : "text-teal-400 hover:text-teal-500"
            }`}
            href="/users"
          >
            Users
          </a>
          <a
            className={`nav-link text-gray-500 text-xl mx-2 ${
              isBirthQuery
                ? "text-teal-500 hover:text-teal-400"
                : "text-teal-400 hover:text-teal-500"
            }`}
            href="/birth-query"
          >
            Birth Query
          </a>
        </nav>
        {!user || user === null ? (
          <div className="nav-login mr-8 whitespace-nowrap hidden lg:block">
            <button className="text-md px-10 text-teal-400 hover:text-teal-500 text-xl">
              <Link to="/login">Log in</Link>
            </button>
            <button className="text-md px-10 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md">
              Sign up
            </button>
          </div>
        ) : (
          <div className="nav-login mr-8 whitespace-nowrap hidden lg:block">
            <p className="text-teal-400">{user.username} logged in</p>
            <button className="text-md px-10 text-white text-xl hover:text-teal-500 ">
              Log out
            </button>
          </div>
        )}
        <div className="nav-login mr-8 whitespace-nowrap lg:inline-block lg:hidden">
          <button
            className="text-md px-4 py-2 bg-teal-500 hover:bg-yellow-400 text-white text-xl shadow-md rounded-md"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-microscope"></i> Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
