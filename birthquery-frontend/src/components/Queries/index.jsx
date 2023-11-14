import React, { useState } from "react";

import QueryCard from "./QueryCard";

const Queries = ({ user, queries }) => {
  const [searchTerm, setSearchTerm] = useState("");

  
  /*  
  if (!user || user == null) {
    return(
      <div>You shall not pass</div>
    )
    }
    */
   if (queries) {
    const filteredQueries = queries
    .filter((query) =>
      query.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => b.created_at - a.created_at);

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
              width="24"
              height="24"
              fill="#f97316"
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
              className="h-10 w-80 ml-2 border rounded-md p-3 mb-4"
            />
          </div>
          </span>
  
          {filteredQueries.map((query) =>(
            <QueryCard key={query.id} query={query}/>
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
   }
  
};

export default Queries;
