import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default () => {
  const [socket, setSocket] = useState(
    io("http://127.0.0.1:3000", {
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
