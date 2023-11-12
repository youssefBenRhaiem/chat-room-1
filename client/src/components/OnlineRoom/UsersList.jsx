import { useState } from "react";

export default ({ socket }) => {
  console.log("UsersList");
  const initState = {
    onlineUsers: {},
    annoucement: "",
    toggleUsersList: true,
  };
  const [state, setState] = useState(initState);
  socket.on("onlineUsers", ({ users }) => {
    setState({
      ...state,
      onlineUsers: users,
    });
  });
  return (
    <>
      <div className="flex flex-col items-center">
        <button
          className="p-1 my-1 items-center justify-center bg-blue-500 rounded-full"
          onClick={() =>
            setState({ ...state, toggleUsersList: !state.toggleUsersList })
          }
        >
          {state.toggleUsersList ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        <ul
          className={`text-sm text-center font-small break-words text-gray-900 dark:bg-gray-700 dark:text-white ${
            state.toggleUsersList ? " block " : " hidden "
          }`}
        >
          <li className="p-2 break-words border border-b-0 rounded-t-lg border-gray-200 dark:border-gray-600">
            Online Users
          </li>
          {Object.keys(state.onlineUsers).map((user) => {
            return (
              <li
                key={`User_${user}`}
                className="p-2 break-words text-xs border border-gray-200 dark:border-gray-600"
              >
                {`${user}`}
              </li>
            );
          })}
          <li className="p-2 break-words border border-t-0 rounded-b-lg border-gray-200 dark:border-gray-600">
            {Object.keys(state.onlineUsers).length} are online
          </li>
        </ul>
      </div>
    </>
  );
};
