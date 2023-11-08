import { useParams } from "react-router";
import { useEffect, useState } from "react";

import useSocketHook from "../useSocketHook";
import UsersList from "./UsersList";
import SendMessage from "./SendMessage";
import MessagesBox from "./MessagesBox";

export default () => {
  const { roomID } = useParams();
  const initState = {
    annoucement: "",
    showUsersList: true,
  };
  const [state, setState] = useState(initState);
  const socket = useSocketHook(roomID);
  socket.on("disconnect", () => {
    //
  });
  socket.on("connect", () => {
    socket.emit("join", roomID);
  });
  socket.on("annoucement", (msg) => {
    setState({ ...state, annoucement: msg });
    setTimeout(() => {
      setState({ ...state, annoucement: "" });
    }, 2500);
  });
  socket.on("disconnect", () => {
    // setError("Servers are down");
  });
  useEffect(() => {}, []);
  return (
    <>
      {state.annoucement && (
        <div className="absolute top-0 left-1/2 w-full max-w-sm p-5 m-2 bg-blue-500 transform -translate-x-1/2 rounded-xl shadow-lg">
          <div className="text-center space-x-4">{state.annoucement}</div>
        </div>
      )}
      <div className="flex flex-row bg-gray-700 ">
        <div className="min-w-fit w-full bg-white">
          <MessagesBox socket={socket} />
          <SendMessage socket={socket} />
        </div>
        <div className="max-w-fit min-w-fit bg-white justify-center">
          <button
            className="mt-2 p-1 items-center justify-center bg-blue-500 rounded-full"
            onClick={() =>
              setState({ ...state, showUsersList: !state.showUsersList })
            }
          >
            {state.showUsersList ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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
                className="h-8 w-8"
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
          <div className={`${state.showUsersList ? "block" : "hidden"}`}>
            <UsersList socket={socket} />
          </div>
        </div>
      </div>
    </>
  );
};
