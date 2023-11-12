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
      <div className="w-full flex flex-row bg-white ">
        <div className="w-fit h-screen p-1">
          <UsersList socket={socket} />
        </div>
        <div className="w-fit sm:w-full h-screen p-1 ms-1">
          <MessagesBox socket={socket} />
          <SendMessage socket={socket} />
        </div>
      </div>
    </>
  );
};
