import React, { useState } from "react";
import { useMutation } from "react-query";

import { rebootQueries } from "../../services/queries";

import QueryCard from "./QueryCard";

const adminName = import.meta.env.VITE_ADMIN_USER;

const Queries = ({ user, queries }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const bootQueriesMutation = useMutation(rebootQueries);  

  if (user && queries) {
    const filteredQueries = queries
      .filter((query) =>
        query.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => b.created_at - a.created_at);

    const handleReboot = async (event) => {
      event.preventDefault();
      try {
        bootQueriesMutation.mutate();        
      } catch {
        
      }
    }

    return (
      <div className="z-index-0 flex flex-col min-h-screen max-w-screen mx-auto">
        <div className="col-span-2 flex flex-col justify-center pb-4 mb-0">
          <span className="text-center mt-24">
            <p className="text-6xl font-bold text-black mt-8">
              Our fancy <span className="text-teal-400">Queries</span>
            </p>
            <p className="text-lg text-gray-500 mt-4 mb-4">
              The most precious resource of the Birth Query Network
            </p>
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#2dd4bf"
                className="bi bi-search mt-2 mx-1"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 py-2 mx-4 mb-12 w-80"
              />
              {user.username == adminName ? (
                <span>
                  <button onClick={handleReboot} className="text-md px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md">
                    <i className="fa-solid fa-sync"></i>
                  </button>
                </span>
              ) : (
                <></>
              )}
            </div>
          </span>

          {filteredQueries.map((query) => (
            <QueryCard key={query.id} user={user} query={query} />
          ))}

          {filteredQueries.length === 0 ? (
            <div className="flex justify-center text-gray-500 text-lg px-36 w-100">
              None found.
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="z-index-0 flex flex-col min-h-screen max-w-screen mx-auto">
        <div className="col-span-2 flex flex-col justify-center pb-4 mb-0">
          <span className="text-center mt-24">
            <p className="text-6xl font-bold text-black mt-8">
              Our fancy <span className="text-teal-400">Queries</span>
            </p>
            <p className="text-lg text-gray-500 mt-4 mb-4">
              Please log in first!
            </p>
          </span>
        </div>
      </div>
    );
  }
};

export default Queries;
