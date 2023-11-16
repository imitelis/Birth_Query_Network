import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useNotificationDispatchValue } from "../../NotificationContext";
import { useUserDispatchValue } from "../../UserContext";

import { setToken } from "../../services/queries";

const NavigationBar = ({ setIsCursorVisible, user, users }) => {
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const setTokenMutation = useMutation(setToken);

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  const userUuid = String(location.pathname.split("/").pop());

  function doesUserExists(userUuid) {
    return users.some((user) => user.uuid === userUuid);
  }

  const isAbout = location.pathname === "/about";
  const isUsers =
    location.pathname === "/users" ||
    (location.pathname === `/users/${userUuid}` && doesUserExists(userUuid));
  const isQueries = location.pathname === "/queries";
  const isBirthQuery = location.pathname === "/birthquery";
  const isLogin = location.pathname === "/login";

  const handleLogout = () => {
    notificationDispatch({
      type: "GREEN_NOTIFICATION",
      payload: `good-bye ${user.username}!`,
    });
    window.localStorage.removeItem("loggedBirthQueryUser");
    userDispatch({ type: "END_SESSION", payload: null });
    setTokenMutation.mutate(null);
    navigate("/");
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div
      className="z-index-3"
      style={{ zIndex: 3 }}
      onMouseEnter={() => setIsCursorVisible(false)}
      onMouseLeave={() => setIsCursorVisible(true)}
    >
      <div className="navigation-bar navbar navbar-expand-md bg-zinc-50 flex items-center justify-between fixed top-0 h-20 z-50 w-full">
        <div className="navbar-brand w-30 h-auto ml-8" id="logo">
          <a
            href="/"
            className={`text-4xl  hover:text-teal-500 text-teal-400 font-bold whitespace-nowrap`}
          >
            Birth Query
          </a>
        </div>
        <nav
          id="navbar"
          className="flex flex-row mx-0 mt-0 ml-12 hidden lg:block"
        >
          <Link to="/about">
          <button
            className={`nav-link text-gray-500 text-xl mx-2 ${
              isAbout
                ? "text-teal-500 hover:text-teal-400"
                : "text-teal-400 hover:text-teal-500"
            }`}
          >
            About
          </button>
          </Link>
          <Link to="/queries">
          <button
            className={`nav-link text-gray-500 text-xl mx-2 ${
              isQueries
                ? "text-teal-500 hover:text-teal-400"
                : "text-teal-400 hover:text-teal-500"
            }`}
          >
            Queries
          </button>
          </Link>
          <Link to="/users">
          <button
            className={`nav-link text-gray-500 text-xl mx-2 ${
              isUsers
                ? "text-teal-500 hover:text-teal-400"
                : "text-teal-400 hover:text-teal-500"
            }`}
            href="/users"
          >
            Users
          </button>
          </Link>
          <Link to="/birthquery">
          <button
            className={`nav-link text-gray-500 text-xl mx-2 ${
              isBirthQuery
                ? "text-teal-500 hover:text-teal-400"
                : "text-teal-400 hover:text-teal-500"
            }`}
          >
            Birth Query
          </button>
          </Link>
        </nav>
        {!user || user === null ? (
          <div className="nav-login mr-8 whitespace-nowrap hidden lg:block">
            <Link to="/login">
            <button className="text-md px-10 text-teal-400 hover:text-teal-500 text-xl">
              Log in
            </button>
            </Link>
            <Link to="/signup">
            <button className="text-md px-10 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md">
              Sign up
            </button>
            </Link>
          </div>
        ) : (
          <div className="nav-login mr-8 whitespace-nowrap hidden lg:block lg:flex">
            <p className="text-teal-400 text-lg px-8 pt-2">
              {user.username} logged in
            </p>
            <button
              onClick={handleLogout}
              className="px-10 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md"
            >
              Log out
            </button>
          </div>
        )}
        <div className="nav-login mr-8 whitespace-nowrap inline-block lg:hidden">
          <button
            onClick={handleMenu}
            className="px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white text-2xl shadow-md rounded-md"
          >
            <i className="fa-solid fa-baby-carriage"></i> Menu
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="fixed right-0 -top-4 mt-24 px-12 bg-zinc-50 gap-2 flex flex-col inline-block lg:hidden rounded-bl-xl">
        <div className="lg:inline-block py-2 pr-12">
            <Link
              className={`text-2xl
                  ${
                    isAbout
                      ? "text-teal-500 hover:text-teal-400"
                      : "text-teal-400 hover:text-teal-500"
                  }
                  `}
              to="/about"
            >
              About
            </Link>
          </div>
          <div className="lg:inline-block py-2 pr-12">
            <Link
              className={`text-2xl
                  ${
                    isQueries
                      ? "text-teal-500 hover:text-teal-400"
                      : "text-teal-400 hover:text-teal-500"
                  }
                  `}
              to="/queries"
            >
              Queries
            </Link>
          </div>
          <div className="lg:inline-block py-2 pr-12">
            <Link
              className={`text-2xl
                  ${
                    isUsers
                      ? "text-teal-500 hover:text-teal-400"
                      : "text-teal-400 hover:text-teal-500"
                  }
                  `}
              to="/users"
            >
              Users
            </Link>
          </div>
          <div className="lg:inline-block py-2 pr-12">
            <Link
              className={`text-2xl
                  ${
                    isBirthQuery
                      ? "text-teal-500 hover:text-teal-400"
                      : "text-teal-400 hover:text-teal-500"
                  }
                  `}
              to="/birthquery"
            >
              Birth Query
            </Link>
          </div>
          {!user || user === null ? (
            <>
            <div className="lg:inline-block py-2 pr-12">
            <Link
              className={`text-2xl
                  ${
                    isLogin
                      ? "text-teal-500 hover:text-teal-400"
                      : "text-teal-400 hover:text-teal-500"
                  }
                  `}
              to="/login"
            >
              Login
            </Link>
            </div>
            <div className="lg:inline-block pt-2 pb-4 pr-12">
            <Link to="/signup">
            <button className="text-md px-10 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md">
              Sign up
            </button>
            </Link>
            </div>            
            </>
          ): (<>
            <div className="lg:inline-block py-2 pr-12">
            <p className="text-teal-400 text-xl">{user.username} logged in</p>
            </div>
            <div className="lg:inline-block py-2 pr-12">
            <button
              onClick={handleLogout}
              className="px-10 py-2 bg-teal-400 hover:bg-teal-500 text-white text-2xl shadow-md rounded-md"
            >
              Log out
            </button>
          </div>     
          </>       )}
      </div>
      )}
    </div>
  );
};

export default NavigationBar;
