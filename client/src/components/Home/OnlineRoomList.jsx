import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const path =
    import.meta.env.VITE_ENV == "development"
      ? "http://localhost:3000"
      : "https://little-chat-room-server.onrender.com";

  const getRooms = async () => {
    try {
      setState({ ...state, loadingRooms: true });
      const res = await axios.get(path + "/api/home/getAllRooms");
      setState({ ...state, loadingRooms: false, rooms: res.data.rooms });
    } catch (err) {
      console.error(`error: ${err} `);
      setState({ ...state, serverErr: "Servers are down!" });
    }
  };
  const joinRoom = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(path + "/api/room/accessRoom", {
        params: {
          id: state.roomID,
          password: state.roomPassword,
        }
      });
      setState(initState);
      return navigate(`/room/${res.data.id}`);
    } catch (err) {
      console.error(`error: ${err} `);
      if (!err.response.data)
        return setState({
          ...state,
          serverErr: "Servers are not working !",
        });
      setState({
        ...state,
        [err.response.data.name]: [err.response.data.msg],
      });
    }
  };

  const initState = {
    loadingRooms: false,
    rooms: {},
    toggleRoomPassword: false,
    roomPassword: "",
    roomPasswordErr: "",
    serverErr: "",
  };
  const [state, setState] = useState(initState);
  const navigate = useNavigate();

  useEffect(() => {
    getRooms();
  }, []);
  if (state.loadingRooms) return <h1>We are loading the rooms</h1>;
  if (state.err) return <h1>Something went Wrong </h1>;
  return (
    <>
      <table className="table-auto ">
        <thead className="bg-purple-100">
          <tr>
            <th className="px-4 border">Name</th>
            <th className="px-4 border">Joined</th>
            <th className="px-4 border">join</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(state.rooms).length != 0 &&
            Object.keys(state.rooms).map((key) => (
              <tr key={key}>
                <td className="px-4 py-1 border">{state.rooms[key].name}</td>
                <td className="px-4 py-1 border">{state.rooms[key].clients}</td>
                <td className="px-4 py-1 border">
                  <button
                    className="px-2 bg-pink-500 rounded text-white"
                    onClick={() => {
                      console.log(state.rooms[key].privacy);
                      if (state.rooms[key].privacy == "Public")
                        return navigate(`/room/${key}`);
                      return setState({
                        ...state,
                        roomID: key,
                        toggleRoomPassword: true,
                      });
                    }}
                  >
                    Join
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {state.toggleRoomPassword ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/*Transparent background*/}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>
          {/*Modal*/}
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  {/*Header*/}
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className=" text-center sm:mx-4 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900 mb-1 sm:mb-0"
                        id="modal-title"
                      >
                        Join the room
                      </h3>
                    </div>

                    <div className="sm:mx-0 sm:h-10 sm:w-10 mx-auto h-12 w-12 flex flex-shrink-0 items-center justify-center rounded-full bg-red-100 ">
                      <button
                        type="button"
                        className="p-2 inline-flex items-center justify-center rounded-full bg-red-100 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring focus:ring-red-300"
                        onClick={() =>
                          setState({ ...state, toggleRoomPassword: false })
                        }
                      >
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <hr className="mt-2 mb-6" />

                  {/*Body*/}
                  <div className="sm:flex sm:items-start justify-between">
                    <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <form
                        className="rounded"
                        onSubmit={(e) => joinRoom(e)}
                        id="RoomPasswordForm"
                      >
                        {/* Password Input */}
                        <div className="">
                          <label
                            className="block text-gray-500 font-bold sm:text-left mb-2"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <div className="sm:flex sm:justify-start sm:items-center mb-6">
                            <input
                              className="py-2 px-3 w-full rounded border focus:border-blue-500 bg-gray-100 focus:bg-white text-gray-700 shadow focus:shadow-outline focus:outline-none appearance-none leading-tight"
                              id="roomPassword"
                              type="password"
                              placeholder="*******"
                              required
                              value={state.roomPassword}
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  roomPassword: e.target.value,
                                })
                              }
                            />
                          </div>
                          {(state.roomPasswordErr || state.serverErr) && (
                            <p className="mt-1 text-red-500 text-xs italic">
                              {state.roomPasswordErr || state.serverErr}
                            </p>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    className="px-3 py-2 sm:ml-3 w-full sm:w-auto rounded-md inline-flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-semibold shadow-sm focus:outline-none focus:shadow-outline"
                    type="submit"
                    form="RoomPasswordForm"
                  >
                    join
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() =>
                      setState({ ...state, toggleRoomPassword: false })
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
