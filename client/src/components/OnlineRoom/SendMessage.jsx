import { useState } from "react";

export default ({ socket }) => {
  const initState = { message: "" };
  const [state, setState] = useState(initState);
  return (
    <form className="mx-2 mb-2 flex" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Type a message"
        className="w-full px-3 py-2 border rounded-bl-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={state.message}
        onChange={(e) => setState({ ...state, message: e.target.value })}
      />
      <button
        type="submit"
        className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-br-md transition duration-300 focus:ring-1"
        onClick={(e) => {
          if (state.message) socket.emit("sendMessage", state.message);
          return setState(initState);
        }}
      >
        Send
      </button>
    </form>
  );
};
