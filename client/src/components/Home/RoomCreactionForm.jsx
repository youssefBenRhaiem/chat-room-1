import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default () => {
  const initState = {
    modalShow: false,
    privacy: "Public",
    roomName: "",
    roomNameErr: false,
    roomPassword: "",
    serverErr: false,
    roomNameErrMsg: "",
    serverErrMsg: "",
  };

  const [state, setState] = useState(initState);
  console.log(state);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = uuidv4();
      const res = await axios.post("api/home/createRoom", {
        params: { id, name: state.roomName, password: state.roomPassword },
      });
      if (res) {
        setState(initState);
        return navigate(`room/${id}`);
      }
    } catch (err) {
      console.log(err);
      if (!err.response.data)
        return setState({
          ...state,
          serverErr: true,
          serverErrMsg: "Servers are not working !",
        });
      setState({
        ...state,
        [err.response.data.name]: true,
        [err.response.data.name + "Msg"]: err.response.data.msg,
      });
    }
  };
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setState({ ...state, modalShow: true })}
      >
        Create Room +
      </button>
      {state.modalShow ? (
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
                        Create A Room
                      </h3>
                    </div>

                    <div className="sm:mx-0 sm:h-10 sm:w-10 mx-auto h-12 w-12 flex flex-shrink-0 items-center justify-center rounded-full bg-red-100 ">
                      <button
                        type="button"
                        className="p-2 inline-flex items-center justify-center rounded-full bg-red-100 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring focus:ring-red-300"
                        onClick={() => setState({ ...state, modalShow: false })}
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
                        onSubmit={(e) => handleSubmit(e)}
                        id="NewRoomForm"
                      >
                        {/* Name Input */}
                        <div className="mb-6">
                          <label
                            className="block text-gray-500 font-bold sm:text-left mb-2"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <input
                            className={`py-2 px-3 w-full rounded border focus:border-blue-500 bg-gray-100 focus:bg-white text-gray-700 shadow focus:shadow-outline focus:outline-none appearance-none leading-tight 
                              ${state.roomNameErr ? " border-red-500 " : " "}`}
                            id="name"
                            type="text"
                            placeholder="Room Name"
                            value={state.roomName}
                            onChange={(e) =>
                              setState({ ...state, roomName: e.target.value })
                            }
                            required
                          />
                          {state.roomNameErr && (
                            <p className="mt-1 text-red-500 text-xs italic">
                              {state.roomNameErrMsg}
                            </p>
                          )}
                        </div>
                        {/* Password Input */}
                        <div
                          className="mb-6"
                          hidden={state.privacy == "Public"}
                        >
                          <label
                            className="block text-gray-500 font-bold sm:text-left mb-2"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <div className="sm:flex sm:justify-start sm:items-center mb-6">
                            <input
                              className="py-2 px-3 w-full rounded border focus:border-blue-500 bg-gray-100 focus:bg-white text-gray-700 shadow focus:shadow-outline focus:outline-none appearance-none leading-tight"
                              id="password"
                              type="password"
                              placeholder="*******"
                              required={state.privacy == "Private"}
                              value={state.roomPassword}
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  roomPassword: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* Privacy Button */}
                    <div className="items-start">
                      <button
                        type="button"
                        className={`sm:mx-0 sm:h-10 sm:w-10 mx-auto sm:mb-4 h-12 w-12 flex flex-shrink-0 items-center justify-center rounded-full ${
                          state.privacy == "Private"
                            ? "bg-red-300"
                            : "bg-green-300"
                        }`}
                        onClick={() => {
                          setState({
                            ...state,
                            privacy:
                              state.privacy == "Private" ? "Public" : "Private",
                          });
                        }}
                      >
                        {state.privacy == "Private" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    className="px-3 py-2 sm:ml-3 w-full sm:w-auto rounded-md inline-flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-semibold shadow-sm focus:outline-none focus:shadow-outline"
                    type="submit"
                    form="NewRoomForm"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setState({ ...state, modalShow: false })}
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
