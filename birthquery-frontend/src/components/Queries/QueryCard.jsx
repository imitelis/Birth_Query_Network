import React, { useState } from "react";
import { useMutation } from "react-query";

import { useNotificationDispatchValue } from "../../NotificationContext";

import {
  commentQuery,
  editQuery,
  removeQuery,
  removeComment,
} from "../../services/queries";

const QueryCard = ({ user, query, adminName }) => {
  const [showComments, setShowComments] = useState(false);
  const [showEditQuery, setShowEditQuery] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [newQueryName, setNewQueryName] = useState("");
  const [newQueryComment, setNewQueryComment] = useState("");

  const notificationDispatch = useNotificationDispatchValue();

  const commentQueryMutation = useMutation(commentQuery, {
    onSuccess: () => {
      notificationDispatch({
        type: "GREEN_NOTIFICATION",
        payload: `new commment "${commentText}" successfully added`,
      });
    },
    onError: (error) => {
      handleErrorResponse(error, user);
    },
  });

  const editQueryMutation = useMutation(editQuery, {
    onSuccess: () => {
      notificationDispatch({
        type: "GREEN_NOTIFICATION",
        payload: `query "${newQueryName}" successfully edited`,
      });
    },
    onError: (error) => {
      handleErrorResponse(error, user);
    },
  });

  const removeQueryMutation = useMutation(removeQuery, {
    onSuccess: () => {
      notificationDispatch({
        type: "GREEN_NOTIFICATION",
        payload: `query "${query.name}" successfully removed`,
      });
    },
    onError: (error) => {
      handleErrorResponse(error, user);
    },
  });

  const removeCommentMutation = useMutation(removeComment, {
    onSuccess: () => {
      notificationDispatch({
        type: "GREEN_NOTIFICATION",
        payload: `commment successfully removed`,
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

  const handleAddComment = async (event) => {
    event.preventDefault();
    /*
    To remember:
    class QueryCommentBase(BaseModel):
    text: constr(min_length=8, max_length=200)
    like_count: int
    */
    try {
      const commentObject = {
        text: commentText,
        like_count: 0,
        query_id: query.id,
      };
      if (commentText.length < 8) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: comment (${commentText}) must be at least 8 char long`,
        });
      } else {
        // console.log(commentObject.commentText);
        commentQueryMutation.mutate(commentObject);
        setCommentText("");
      }
    } catch (error) {
      handleErrorResponse(user, error);
    }
  };

  const handleEditQuery = async (event) => {
    /*
    To remember:
    name: constr(min_length=8, max_length=80)
    query_url: constr(min_length=8, max_length=200)
    user_comment: constr(min_length=8, max_length=200)
    */
    event.preventDefault();
    try {
      const queryObject = {
        name: newQueryName,
        query_url: query.query_url,
        user_comment: newQueryComment,
        query_id: query.id,
      };
      if (newQueryName.length < 8 || newQueryComment.length < 8) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: new query name (${newQueryName}) and new query comment (${newQueryComment}) must be at least 8 char long`,
        });
      } else if (newQueryName.length > 80) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: new query name must be less than 80 char long`,
        });
      } else if (newQueryComment.length > 200) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: new query comment must be less than 200 char long`,
        });
      } else {
        editQueryMutation.mutate(queryObject);
      }
    } catch (error) {
      handleErrorResponse(user, error);
    }
  };

  const handleDeleteComment = async (comment) => {
    try {
      const commentObject = {
        query_id: query.id,
        id: comment.id,
        text: comment.text,
      };
      removeCommentMutation.mutate(commentObject);
    } catch (error) {
      handleErrorResponse(user, error);
    }
  };

  const handleDeleteQuery = async (event) => {
    event.preventDefault();
    try {
      removeQueryMutation.mutate(query.id);
    } catch (error) {
      handleErrorResponse(user, error);
    }
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
    setShowEditQuery(false);
    setNewQueryName("");
    setNewQueryComment("");
  };

  const handleShowEditQuery = () => {
    setShowEditQuery(!showEditQuery);
    setShowComments(false);
    setCommentText("");
  };

  return (
    <div className="bg-slate-50 bg-opacity-60 backdrop-blur-md shadow-md p-4 mb-4 rounded-lg mx-12">
      <span className="flex items-center px-4 pt-4 text-2xl w-100">
        <svg
          width="92"
          height="92"
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
        <div className="px-4 break-all overflow-hidden text-gray-500">
          <p className="text-4xl text-teal-400 font-bold">{query.name}</p>
          by {query.user_username} at {query.created_at.substring(0, 10)}
          <br />
          {user.username == adminName ? (
            <>
              {" "}
              admin query: {query.user_username == adminName ? "yes" : "no"},
              visible to users: {query.visible ? "yes" : "no"}
            </>
          ) : (
            <></>
          )}
        </div>
      </span>

      <br />
      <div className="text-2xl px-4 text-gray-500">
        <span className="font-bold text-teal-400">Comment:</span>{" "}
        {query.user_comment}
      </div>
      <div className="w-100 px-4 pt-4 space-x-4">
        <a
          href={`/birthquery${query.query_url}&query_name=${query.name}&query_comment=${query.user_comment}`}
          className="text-md px-4 py-2 bg-green-400 hover:bg-green-500 text-white text-2xl shadow-md rounded-md"
        >
          <i className="fa-solid fa-play"></i> Run
        </a>
        <button
          onClick={handleShowComments}
          className="text-md px-4 py-2 bg-lime-400 hover:bg-lime-500 text-white text-2xl shadow-md rounded-md"
        >
          <i className="fa fa-comment"></i>
        </button>
        {user.username == adminName || user.username == query.user_username ? (
          <span>
            <button
              onClick={handleShowEditQuery}
              className="text-md px-4 py-2 bg-amber-400 hover:bg-amber-500 text-white text-2xl shadow-md rounded-md"
            >
              <i className="fas fa-edit"></i>
            </button>
          </span>
        ) : (
          <></>
        )}
        {user.username == adminName || user.username == query.user_username ? (
          <span>
            <button
              onClick={handleDeleteQuery}
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
      {showComments ? (
        <div className="mx-4">
          <p className="font-bold text-2xl text-teal-400">All comments</p>
          {query.comments.length == 0 ? (
            <p className="text-xl text-gray-500">No comments yet...</p>
          ) : (
            <>
              {query.comments.map((comment, index) => (
                <p key={index} className="text-xl text-gray-500">
                  <span className="text-teal-400 my-2">
                    {comment.commented_by}:
                  </span>{" "}
                  {comment.text}{" "}
                  {user.username == adminName ||
                  user.username == query.user_username ? (
                    <span>
                      <button
                        onClick={() => handleDeleteComment(comment)}
                        className="text-md px-4 py-2 my-1 bg-red-400 hover:bg-red-500 text-white text-lg shadow-md rounded-md"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </span>
                  ) : (
                    <></>
                  )}
                </p>
              ))}
            </>
          )}
          <p className="font-bold text-2xl text-teal-400">New comment</p>
          <input
            type="text"
            placeholder="New comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-2 my-2 mr-4 w-80"
          />
          <button
            onClick={handleAddComment}
            className="text-md px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white text-2xl shadow-md rounded-md"
          >
            <i className="fa fa-plus"></i> Add
          </button>
        </div>
      ) : (
        <></>
      )}
      {showEditQuery ? (
        <div className="mx-4">
          <p className="font-bold text-2xl text-teal-400">Edit Query</p>
          <label htmlFor="query-name" className="text-xl text-gray-500 mt-2">
            Query name:{" "}
          </label>
          <input
            type="text"
            placeholder="New query name..."
            value={newQueryName}
            onChange={(e) => setNewQueryName(e.target.value)}
            className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-2 mb-2 mr-4 w-80"
          />
          <br />
          <label htmlFor="query-comment" className="text-xl text-gray-500 mt-2">
            Query comment:{" "}
          </label>
          <input
            type="text"
            placeholder="New query comment..."
            value={newQueryComment}
            onChange={(e) => setNewQueryComment(e.target.value)}
            className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-2 mb-2 mr-4 w-80"
          />

          <br />
          <button
            onClick={handleEditQuery}
            className="text-md px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white text-2xl shadow-md rounded-md"
          >
            <i className="fas fa-save"></i> Save
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QueryCard;
