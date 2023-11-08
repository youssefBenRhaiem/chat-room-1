import { useEffect, useRef, useState } from "react";

export default ({ socket }) => {
  const initState = { chatMsgs: [], announcementMsg: "" };
  const [state, setState] = useState(initState);
  const chatBoxRef = useRef();
  const lastSenderRef = useRef(null);
  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [state.chatMsgs, socket]);
  socket.on("receiveMessages", function (data) {
    setState({ ...state, chatMsgs: data });
  });
  // socket.on("announcement", function (user) {
  //   setState({
  //     ...state,
  //     announcementMsg: `${user.username} has ${
  //       user.status == "online" ? "joined" : "left"
  //     } `,
  //   });
  // });
  return (
    <>
      <div
        id="chatBox"
        ref={chatBoxRef}
        className="mx-1 mt-2 p-4 h-96 border rounded-t-md bg-white overflow-auto scroll-auto"
      >
        {state.chatMsgs.map((msg, index) => {
          const isSameSender = lastSenderRef.current == msg.user;
          lastSenderRef.current = msg.user; // Update last sender

          if (socket.id == msg.user)
            return (
              <>
                <div key={index} className="mb-2 text-right">
                  <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                    {msg.msg}
                  </p>
                </div>
              </>
            );
          return (
            <>
              <div key={index} className="mb-2">
                {!isSameSender && ( // Only show the sender's name if it changes
                  <p className="pb-2 text-gray-500 text-xs block">{msg.user}</p>
                )}
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                  {msg.msg}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
