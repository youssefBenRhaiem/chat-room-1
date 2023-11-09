import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default () => {
  const path =
    import.meta.env.VITE_ENV == "development"
      ? "http://localhost:3000"
      : "https://little-chat-room-server.onrender.com";
  const [socket, setSocket] = useState(
    io(path, {
      autoConnect: false,
      withCredentials: false,
    })
  );
  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);
  return socket;
};
