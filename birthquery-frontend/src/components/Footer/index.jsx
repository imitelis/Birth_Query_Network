/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
const Footer = ({ setIsCursorVisible }) => {
  return (
    <div
      className="z-index-2"
      style={{ zIndex: 5 }}
      onMouseEnter={() => setIsCursorVisible(false)}
      onMouseLeave={() => setIsCursorVisible(true)}
    >
      <div className="static bottom-0 w-full bg-zinc-50 py-4 bottom-0 mt-2 text-center">
        <div className="hidden lg:block container mx-auto px-4">
          <div className="flex flex-col justify-center lg:flex-row">
            <div className="w-full flex justify-center space-x-2 py-2 mt-1 md:w-1/2">
              <p className="text-teal-400 text-lg">
                © 2023 The Birth Query Network
              </p>
            </div>
            <div className="w-full flex justify-center space-x-2 py-2 mt-1 md:w-1/2">
              <p className="text-teal-400 text-lg">All rights reserved</p>
            </div>
          </div>
        </div>

        <div className="lg:inline-block lg:hidden text-2xl">
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center">
              <div className="w-full flex justify-center space-x-2 py-3 mt-1 md:w-1/2">
                <p className="text-teal-400 text-lg">
                  © 2023 The Birth Query Network
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full flex justify-center space-x-2 py-3 mt-1 md:w-1/2">
                <p className="text-teal-400 text-lg">All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
