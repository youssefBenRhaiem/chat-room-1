import { useEffect, useRef, useState } from "react";

export default ({ socket }) => {
  console.log("MessagesBox");
  const initState = { chatMsgs: [], announcementMsg: "" };
  const [state, setState] = useState(initState);
  const chatBoxRef = useRef();
  const lastSenderRef = useRef(null);
  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [state.chatMsgs]);
  socket.on("receiveMessages", function (data) {
    setState({ ...state, chatMsgs: data });
  });
  socket.on("chat", function ({ user, msg }) {
    setState({ ...state, chatMsgs: [...state.chatMsgs, { user, msg }] });
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
        className="w-full h-[85%] flex flex-col border border-b-0 rounded-t-md overflow-auto scroll-y"
      >
        {state.chatMsgs.map((msg, index) => {
          const isSameSender = lastSenderRef.current == msg.user;
          lastSenderRef.current = msg.user; // Update last sender

          /* <div key={`Msg_${index}`} className="mb-2 text-righ max-w-smt">
          <p className="py-2 px-4 bg-blue-500 text-white rounded-lg inline-block">
            {` ${msg.msg}`}
          </p>
        </div> */
          if (socket.id == msg.user)
            return (
              <div
                key={`Msg_${index}`}
                className="p-3 relative flex flex-row items-center justify-end rounded-lg"
              >
                <div className="py-2 px-4 mr-3 relative text-sm text-white bg-blue-500 shadow rounded-xl">
                  <div className="whitespace-normal break-words max-w-[250px]">
                    {msg.msg}
                  </div>
                </div>
              </div>
            );
          {
            /* <div key={`Msg_${index}`} className="mb-2 max-w-sm">
              {!isSameSender && ( // Only show the sender's name if it changes
                <p className="pb-2 text-gray-500 text-xs block">{msg.user}</p>
              )}
              <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                {`${msg.msg}`}
              </p>
            </div> */
          }
          return (
            <div key={`Msg_${index}`} className="p-3 rounded-lg">
              <div className="flex flex-row items-center">
                <div className="relative group">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    Y
                  </div>
                  <div className="p-2 absolute hidden group-hover:block bg-black text-white text-xs rounded-lg">
                    {msg.user}
                  </div>
                </div>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                  <div>{` ${msg.msg}`}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="grid grid-cols-12 gap-y-2">
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
          <div className="flex flex-row items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              A
            </div>
            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
              <div>Hey How are you today?</div>
            </div>
          </div>
        </div>
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
          <div className="flex flex-row items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              A
            </div>
            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                ipsa commodi illum saepe numquam maxime asperiores voluptate
                sit, minima perspiciatis.
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
          <div className="flex items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              A
            </div>
            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
              <div>I'm ok what about you?</div>
            </div>
          </div>
        </div>
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
          <div className="flex items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              A
            </div>
            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
              <div>Lorem ipsum dolor sit, amet consectetur adipisicing. ?</div>
            </div>
          </div>
        </div>
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
          <div className="flex flex-row items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              A
            </div>
            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
              <div>Lorem ipsum dolor sit amet !</div>
            </div>
          </div>
        </div>
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
          <div className="flex items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              A
            </div>
            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
              <div>Lorem ipsum dolor sit, amet consectetur adipisicing. ?</div>
              <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                Seen
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
