import React, { useState } from "react";
import { useMutation } from "react-query";

import { useNotificationDispatchValue } from "../../NotificationContext";

import { removeUser } from "../../services/queries";

const UserCard = ({ userItem, user, adminName }) => {
  const [showQueries, setShowQueries] = useState(false);

  const notificationDispatch = useNotificationDispatchValue();

  const removeUserMutation = useMutation(removeUser, {
    onSuccess: () => {
      notificationDispatch({
        type: "GREEN_NOTIFICATION",
        payload: `user "${userItem.username}" successfully removed`,
      });
    },
    onError: (error) => {
      handleErrorResponse(error, user);
    },
  });

  const handleErrorResponse = (error, user) => {
    if (error?.response?.status === 500) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: "fatal error: lost connection to Birth Query Network",
      });
    } else if (error?.response?.status === 401) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `session expired: please log in ${user.username} and try again`,
      });
    } else if (error?.response?.status === 404) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `resource not found: the resource you were working on doesn't exists`,
      });
    } else if (error?.response?.data.error) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${error?.response?.data.error})`,
      });
    }
  };

  const handleShowQueries = () => {
    setShowQueries(!showQueries);
  };

  const handleDeleteUser = async (event) => {
    event.preventDefault();

    const isConfirmed = window.confirm("Delete this user?");
    if (isConfirmed) {
      try {
        console.log(userItem.uuid);
        removeUserMutation.mutate(userItem.uuid);
      } catch (error) {
        handleErrorResponse(user, error);
      }
    }
  };

  return (
    <div className="bg-slate-50 bg-opacity-60 backdrop-blur-md shadow-md p-4 mb-4 rounded-lg mx-12">
      <span className="flex items-center px-4 pt-4 text-2xl w-100">
        {userItem.username == adminName ? (
          <svg
            width="92"
            height="92"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#2dd4bf"
              d="M352 128C352 198.7 294.7 256 224 256C153.3 256 96 198.7 96 128C96 57.31 153.3 0 224 0C294.7 0 352 57.31 352 128zM209.1 359.2L176 304H272L238.9 359.2L272.2 483.1L311.7 321.9C388.9 333.9 448 400.7 448 481.3C448 498.2 434.2 512 417.3 512H30.72C13.75 512 0 498.2 0 481.3C0 400.7 59.09 333.9 136.3 321.9L175.8 483.1L209.1 359.2z"
            />
          </svg>
        ) : (
          <svg
            width="92"
            height="92"
            viewBox="0 0 640 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#2dd4bf"
              d="M496 224c-79.63 0-144 64.38-144 144s64.38 144 144 144s144-64.38 144-144S575.6 224 496 224zM544 384h-54.25C484.4 384 480 379.6 480 374.3V304c0-8.836 7.164-16 16-16c8.838 0 16 7.164 16 16v48h32c8.838 0 16 7.164 16 15.1S552.8 384 544 384zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM320 368c0-19.3 3.221-37.82 8.961-55.2C311.9 307.2 293.6 304 274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512H395C349.7 480.2 320 427.6 320 368z"
            />
          </svg>
        )}
        <div className="px-4 break-all overflow-hidden text-gray-500">
          <p className="text-4xl text-teal-400 font-bold">
            {userItem.username}
          </p>
          <br />
        </div>
      </span>
      <div className="text-2xl px-4 text-gray-500">
        <span className="font-bold text-teal-400">Total queries:</span>{" "}
        {userItem.queries.length}
      </div>
      <div className="w-100 px-4 pt-4 space-x-4">
        <button
          onClick={handleShowQueries}
          className="text-md px-4 py-2 bg-lime-400 hover:bg-lime-500 text-white text-2xl shadow-md rounded-md"
        >
          <i class="fas fa-database"></i>
        </button>
        {user.username == adminName || user.username == userItem.username ? (
          <span>
            <button
              onClick={handleDeleteUser}
              className="text-md px-4 py-2 bg-red-400 hover:bg-red-500 text-white text-2xl shadow-md rounded-md"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </span>
        ) : (
          <></>
        )}
      </div>
      <br />
      {showQueries ? (
        <div className="mx-4">
          <p className="font-bold text-2xl text-teal-400">All queries</p>
          {userItem.queries.length == 0 ? (
            <p className="text-xl text-gray-500">No queries yet...</p>
          ) : (
            <>
              {userItem.queries.map((query, index) => (
                <p key={index} className="text-xl text-gray-500">
                  <span className="text-teal-500 my-2 mx-4">●</span>{" "}
                  {query.name}{" "}
                </p>
              ))}
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserCard;
