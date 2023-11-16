import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="z-index-0 flex flex-col min-h-screen max-w-screen mx-auto">
      <div className="col-span-2 flex flex-col justify-center pb-4 mb-0">
        <span className="text-center mt-36">
          <p className="text-6xl font-bold text-black mt-8">
            Error <span className="text-teal-400">404</span>
          </p>
          <p className="text-lg text-gray-500 mt-4 mb-4">
            Sorry, but the page that you are looking for doesn't exists
          </p>
        </span>

        <div className="grid grid-cols-1 gap-4 px-20 mt-48 mb-0 relative inline-block top-[-9rem]">
          <div className="bg-slate-50 bg-opacity-60 backdrop-blur-md shadow-md p-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80px"
              height="80px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
              <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
              <path d="M6 6h.01" /> <path d="M6 18h.01" />{" "}
              <path d="m13 6-4 6h6l-4 6" />
            </svg>
            <h2 className="text-2xl font-semibold pt-4">Page not found</h2>
            <p className="text-gray-600 pt-2">
              <button className="text-md px-10 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md">
                <Link to="/home">Home</Link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
