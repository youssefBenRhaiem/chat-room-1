import { useState } from "react";

export default ({ socket }) => {
  console.log("SendMessage");
  const initState = { message: "" };
  const [state, setState] = useState(initState);
  return (
    <div className="w-full h-fit bg-gray-100">
      <form
        className="flex justify-center items-center "
        onSubmit={(e) => e.preventDefault()}
        id="sendMessageForm"
      >
        <div className="relative pl-3 w-full h-full rounded-md-b">
          <input
            className="p-1 h-[80%] w-full min-w-[20%] rounded-md bg-white font-sans text-sm font-normal text-blue-gray-700 focus:outline-none"
            placeholder=" "
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
          />
          <button className="absolute w-0 h-0 right-7 top-[5%] text-gray-400 hover:text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
        {/* <div className="m-2 flex-grow">
          <div className="relative w-full ">
            <input
              type="text"
              className="pl-4 h-10 w-full min-w-10 border rounded-xl focus:outline-none focus:border-indigo-300 "
            />
            <button
              type="button"
              className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div> */}

        <div className="p-2">
          <button
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            type="submit"
            form="sendMessageForm"
            onClick={(e) => {
              if (state.message) socket.emit("sendMessage", state.message);
              return setState(initState);
            }}
          >
            <span>Send</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
