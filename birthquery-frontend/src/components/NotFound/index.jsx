const NotFound = () => {
  return (
    <div className="bg-gray-100 z-0 w-full mt-20 min-h-screen">
      <div className="col-span-2 flex flex-col justify-center pt-16 mb-0 bg-teal-50">
        <span className="text-center">
          <p className="text-5xl font-serif font-bold text-black mt-8">
            Error <span className="text-teal-500">404</span>
          </p>
          <p className="text-lg text-gray-500 mt-4 mb-4">Page not found</p>
        </span>

        <div className="grid grid-cols-1 gap-4 w-100 mt-8 mb-0 relative inline-block top-[-9rem]">
          <div className="bg-teal-50 px-4 pt-0 pb-36 rounded-lg text-center flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              className="server-crash my-4"
              fill="none"
              stroke="#84cc16"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
              <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
              <path d="M6 6h.01" /> <path d="M6 18h.01" />
              <path d="m13 6-4 6h6l-4 6" />
            </svg>
            <h2 className="text-2xl font-semibold pt-4">Url error</h2>
            <p className="text-gray-600 pt-2">
              Sorry, but the page that you are looking for doesn't exists.
            </p>
            <a
              className="text-md mt-12 px-10 py-2 bg-teal-500 hover:bg-yellow-400 text-white shadow-md rounded-md w-40"
              href="/"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
