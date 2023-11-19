import React, { useState } from "react";

const adminName = import.meta.env.VITE_ADMIN_USER;

const QueryCard = ({ user, query }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-slate-50 bg-opacity-60 backdrop-blur-md shadow-md p-4 mb-4 rounded-lg max-w-80">
      <span className="flex items-center px-4 text-2xl">
        <svg
          width="36"
          height="36"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            d="M20.5 20.5L22 22"
            stroke="#2dd4bf"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M16 18.5C16 19.8807 17.1193 21 18.5 21C19.1916 21 19.8175 20.7192 20.2701 20.2654C20.7211 19.8132 21 19.1892 21 18.5C21 17.1193 19.8807 16 18.5 16C17.1193 16 16 17.1193 16 18.5Z"
            stroke="#2dd4bf"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M4 6V12C4 12 4 15 11 15C18 15 18 12 18 12V6"
            stroke="#2dd4bf"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M11 3C18 3 18 6 18 6C18 6 18 9 11 9C4 9 4 6 4 6C4 6 4 3 11 3Z"
            stroke="#2dd4bf"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M11 21C4 21 4 18 4 18V12"
            stroke="#2dd4bf"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </svg>
        <p className="px-4">
          asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
          by {query.user_username}
        </p>
      </span>
      created at: {query.created_at.substring(0, 10)}{" "}
      {user.username == adminName ? (
        <>
          primal: {query.user_username == adminName ? "true" : "false"} visible:{" "}
          {query.visible ? "true" : "false"}
        </>
      ) : (
        <></>
      )}
      <br />
      {query.user_comment}
      <button className="text-md px-4 py-2 bg-green-400 hover:bg-green-500 text-white text-xl shadow-md rounded-md">
        <i className="fa-solid fa-play"></i>
      </button>
      <button
        onClick={handleShowComments}
        className="text-md px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md"
      >
        <i className="fa fa-comment"></i>
      </button>
      {user.username == adminName || user.username == query.user_username ? (
        <span>
          <button className="text-md px-4 py-2 bg-red-400 hover:bg-red-500 text-white text-xl shadow-md rounded-md">
            <i className="fa-solid fa-trash"></i>
          </button>
        </span>
      ) : (
        <></>
      )}
      <br />
      {showComments ? (
        <>
          <p className="text-2xl text-teal-400">All comments</p>
          {query.comments.length}

          <p className="text-2xl text-teal-400">New comment</p>
          <input
            type="text"
            placeholder="Your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 py-2 mx-4 mb-12 w-80"
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QueryCard;

/*
<div className="z-index-0 flex flex-col min-h-screen max-w-screen mx-auto">
      <div className="col-span-2 flex flex-col justify-center pb-4 mb-0">
        <span className="text-center mt-36">
          <p className="text-6xl font-bold text-black mt-8">
            About <span className="text-teal-400">Birth Query Network</span>
          </p>
          <p className="text-lg text-gray-500 mt-4 mb-4">
            The best of the very best data scientists use Birth Query Network
          </p>
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-20 mt-48 mb-0 relative inline-block top-[-9rem]">
          <div className="bg-slate-50 bg-opacity-60 backdrop-blur-md shadow-md p-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#2dd4bf"
              width="80px"
              height="80px"
              viewBox="0 0 24 24"
            >
              <path d="M10.501 11.724.631 7.16c-.841-.399-.841-1.014 0-1.376l9.87-4.563c.841-.399 2.194-.399 2.998 0l9.87 4.563c.841.398.841 1.014 0 1.376l-9.87 4.563c-.841.362-2.194.362-2.998 0zm0 5.468-9.87-4.563c-.841-.399-.841-1.014 0-1.376l3.363-1.558 6.507 3.006c.841.398 2.194.398 2.998 0l6.507-3.006 3.363 1.558c.841.398.841 1.014 0 1.376l-9.87 4.563c-.841.398-2.194.398-2.998 0zm0 0.0001-9.87-4.563c-.841-.399-.841-1.014 0-1.376l3.363-1.558 6.507 3.006c.841.398 2.194.398 2.998 0l6.507-3.006 3.363 1.558c.841.398.841 1.014 0 1.376l-9.87 4.563c-.841.398-2.194.398-2.998 0zm0 5.613-9.87-4.563c-.841-.398-.841-1.014 0-1.376l3.436-1.593 6.398 2.97c.84.398 2.193.398 2.997 0l6.398-2.97 3.436 1.593c.841.399.841 1.014 0 1.376l-9.87 4.563c-.768.362-2.12.362-2.925 0z" />
            </svg>
            <h2 className="text-2xl font-semibold pt-4">
              Someone has work for you
            </h2>
            <p className="text-gray-600 pt-2">
              You require large amounts of organized data
            </p>
          </div>

          <div className="bg-slate-50 bg-opacity-60 backdrop-blur-md shadow-md p-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#2dd4bf"
              width="80px"
              height="80px"
              viewBox="0 0 24 24"
            >
              <path d="M20.52,3.87A5,5,0,0,0,11.44,4H7A3,3,0,0,0,4,7v4a1,1,0,0,0,2,0V7A1,1,0,0,1,7,6H9.78A3,3,0,0,0,9,8a3,3,0,0,0,3,3h7.33a3.66,3.66,0,0,0,1.19-7.13ZM19.33,9H12a1,1,0,0,1,0-2,1,1,0,0,0,1-1,3,3,0,0,1,5.84-1,1,1,0,0,0,.78.67A1.65,1.65,0,0,1,21,7.33,1.67,1.67,0,0,1,19.33,9ZM19,13a1,1,0,0,0-1,1v3a1,1,0,0,1-1,1H14.74a3.66,3.66,0,0,0-2.22-2.13,5,5,0,0,0-9.45,1.28A3,3,0,0,0,4,23h7.33a3.66,3.66,0,0,0,3.6-3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13Zm-7.67,8H4a1,1,0,0,1,0-2,1,1,0,0,0,1-1,3,3,0,0,1,5.84-1,1,1,0,0,0,.78.67A1.65,1.65,0,0,1,13,19.33,1.67,1.67,0,0,1,11.33,21Z" />
            </svg>
            <h2 className="text-2xl font-semibold pt-4">
              You use Birth Query Network
            </h2>
            <p className="text-gray-600 pt-2">
              You log in your account and retrieve some data
            </p>
          </div>

          <div className="bg-slate-50 bg-opacity-60 backdrop-blur-md shadow-md p-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#2dd4bf"
              width="80px"
              height="80px"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />{" "}
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />{" "}
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />{" "}
            </svg>
            <h2 className="text-2xl font-semibold pt-4">Life is good again</h2>
            <p className="text-gray-600 pt-2">
              You can use your data for the projects you have
            </p>
          </div>
        </div>
      </div>
    </div>
*/
