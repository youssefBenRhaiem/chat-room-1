import { useEffect, useState } from "react";

export default ({ socket }) => {
  const initState = {
    onlineUsers: {},
    annoucement: "",
  };
  const [state, setState] = useState(initState);
  socket.on("onlineUsers", (users) => {
    setState({
      ...state,
      onlineUsers: users,
    });
  });

  useEffect(() => {}, []);
  return (
    <>
      <ul className="w-full mx-1 text-sm text-center font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="px-4 py-2 w-full border-gray-200 rounded-t-lg dark:border-gray-600">
          Online Users
        </li>
        {Object.keys(state.onlineUsers).map((user) => {
          return (
            <li
              key={user}
              className="px-4 py-2 w-full text-xs border-y border-gray-200 dark:border-gray-600"
            >
              {`${user}`}
            </li>
          );
        })}
        <li className="px-4 py-2 w-full rounded-b-lg">
          {Object.keys(state.onlineUsers).length} are online
        </li>
      </ul>
    </>
  );
};
