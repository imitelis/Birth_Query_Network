const Home = () => {
  return (
    <div className="z-index-0 flex flex-col h-auto max-w-screen mx-auto">
      <div className="w-full lg:w-auto mx-4 md:mt-36 md:mx-4 lg:mx-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-2 px-4 md:px-12 lg:px-12">
          <div className="lg:col-span-1 pt-32 lg:pt-0 text-center lg:text-left">
            <p className="text-6xl lg:text-7xl xl:text-8xl font-bold text-black">
              Visualizing
              <span className="text-teal-400"> birth data</span> made it
              <span className="text-teal-400"> easy</span>
            </p>
            <p className="text-2xl mt-6 lg:mt-10 text-gray-500">
              We're a small lab founded in 2023 at GitHub with research focused
              on data analysis
            </p>
            <a
              className="btn btn-icon text-2xl px-6 lg:px-8 py-2 bg-slate-50 text-teal-400 hover:bg-teal-400 hover:text-slate-50 border-2 border-teal-400 rounded-lg shadow-lg relative inline-block mb-0 top-[3rem] mx-auto md:mb-24"
              href="/about"
            >
              More details
            </a>
          </div>

          <div className="lg:col-span-1 text-center">
            <div className="relative inline-block mb-0 top-[-1rem] left-0 md:top-0 md:left-0 md:mx-0 lg:mb-40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="420px"
                height="420px"
              >
                <path
                  fill="#2dd4bf"
                  d="M445.057,345.134,464,274.1V232c-8.136-93.993-87.933-168-184-168H248V232H132.158l-17.844-78.768A32.155,32.155,0,0,0,83.038,128H16v32H83.038l40.475,178.67A80,80,0,1,0,224,416q0-4.05-.4-8H328.4q-.395,3.948-.4,8a80,80,0,1,0,117.057-70.866ZM280,96c78.411,0,143.145,59.678,151.164,136H280ZM144,464a48,48,0,1,1,48-48A48.055,48.055,0,0,1,144,464Zm194.763-88H213.237a80.166,80.166,0,0,0-57.316-39.108L139.408,264H432v5.9l-17.7,66.368c-2.082-.163-4.179-.271-6.3-.271A80.026,80.026,0,0,0,338.763,376ZM408,464a48,48,0,1,1,48-48A48.055,48.055,0,0,1,408,464Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
