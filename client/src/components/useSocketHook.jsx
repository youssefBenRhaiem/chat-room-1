import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default () => {
  const [socket, setSocket] = useState(
    io(import.meta.env.VITE_API_BASE_URL, {
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
