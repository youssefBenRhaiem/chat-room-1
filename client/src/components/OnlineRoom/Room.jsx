import { useEffect, useState } from "react";
import { useParams } from "react-router";

import useSocketHook from "../useSocketHook";

export default () => {
  const { roomID } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [messagesContainer, setMessagesContainer] = useState([]);
  const socket = useSocketHook(roomID);

  useEffect(() => {
    socket.on("disconnect", () => {
      setError("Servers are down");
    });
    socket.on("connect", () => socket.emit("join", roomID));
    
    socket.on("message", function (data) {
      console.log(`${data.userID} : ${data.msg} `);
      setMessagesContainer([
        ...messagesContainer,
        `${data.userID} : ${data.msg} `,
      ]);
      // displayMessages("container", `${data.userID} : ${data.msg} `);
    });
    socket.on("error", function (msg) {
      setError(msg);
    });
  }, []);

  function sendMessage(e) {
    e.preventDefault();

    if (message) {
      socket.emit("message", roomID, message);
      // setMessagesContainer([...messagesContainer, message]);
      // displayMessages(message);
      setMessage("");
    }
  }
  return (
    <>
      {!error && (
        <>
          <div className="mx-4 my-4 bg-black">
            {/* Chat box UI */}
            {/* ... (previous HTML structure) */}
            <div id="chatbox" className="p-4 h-80 overflow-y-auto bg-blue">
              {" "}
            </div>
            {/* ... (remaining HTML structure) */}
          </div>
        </>
      )}
      {error && <h1>{error}</h1>}
    </>
  );
};
