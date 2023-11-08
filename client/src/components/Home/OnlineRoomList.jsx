import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default () => {
  const getRooms = async () => {
    try {
      setState({ ...state, isLoading: true });
      const res = await axios.get("api/home/getAllRooms");
      setState({ ...state, isLoading: false, rooms: res.data.rooms });
    } catch (err) {
      console.error(`error: ${err} `);
      setState({ ...state, err });
    }
  };
  const joinRoom = async (id) => {
    try {
      setState({ ...state, isLoading: true });
      const res = await axios.get("api/home/getAllRooms");
      setState({ ...state, isLoading: false, rooms: res.data.rooms });
    } catch (err) {
      console.error(`error: ${err} `);
      setState({ ...state, err });
    }
  };
  const initState = {
    isLoading: false,
    rooms: {},
    password: "",
    err: null,
  };
  const [state, setState] = useState(initState);
  useEffect(() => {
    getRooms();
  }, []);
  if (state.isLoading) return <h1>We are loading the rooms</h1>;
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
                    onClick={() =>
                      joinRoom({ id: key, privacy: state.rooms[key].privacy })
                    }
                  >
                    Join
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
