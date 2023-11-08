import { useEffect, useMemo, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Home.css";
import HomeReducer, { initState } from "./HomeReducer";
import {
  init,
  processData,
  handleServerError,
  handleClientError,
  handleInputChange,
} from "./HomeActions";

export default () => {
  const RoomForm = () => {
    return (
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          className={`mx-2 my-2 form-control w-25 ${
            state.roomNameError?.error ?? ""
          } `}
          id="roomName"
          name="roomName"
          onChange={(e) =>
            dispatch(
              handleInputChange({
                name: e.target.name,
                value: e.target.value,
              })
            )
          }
          value={state.roomName}
          required
        />
        <div className="errMsg" id="roomNameError" name="roomNameError">
          {state.roomNameError?.msg}
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          value="Create & Join a Room"
        />
      </form>
    );
  };
  const RoomCard = ({ id, room }) => {
    console.log("halloo");
    return (
      <div className="col-3 mr-5 mb-3" key={`Room_${id}`}>
        <div className="card">
          <div className="card-header">{room.name}</div>
          <div className="card-body">
            <Link className="btn btn-primary" to={`/room/${id}`}>
              Join
            </Link>
          </div>
          <div className="card-footer">{`${room.clients} people are in`}</div>
        </div>
      </div>
    );
  };

  const fetchRooms = async () => {
    try {
      dispatch(init());
      const res = await axios.get("api/home/getAllRooms");
      console.log(res);
      dispatch(processData(res.data.rooms));
    } catch (err) {
      console.error(`error: ${err} `);
      dispatch(handleError(err.config?.data));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/home/createRoom", {
        params: { id: uuidv4(), name: state.roomName },
      });
      if (res) {
        navigate(`room/${room.id}`, { state: { room } });
      }
    } catch (err) {
      console.log(err);
      dispatch(handleServerError(err.response.data));
    }
  };
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(HomeReducer, initState);
  const rooms = useMemo(() => {
    return (
      Object.keys(state.roomData).length != 0 &&
      Object.keys(state.roomData).map((key) => (
        <RoomCard key={key} id={key} room={state.roomData[key]} />
      ))
    );
  }, [state.roomData]);
  console.log(state);
  useEffect(() => {
    fetchRooms();
  }, []);
  // display error
  if (state.errorStatus) return <>{state.errorStatus.msg}</>;
  else {
    if (state.isLoading) return <>Loading Data</>;
    else {
      return (
        <div id="Home">
          <RoomForm />
          <div className="container">
            <h1>Rooms :</h1>
            <div className="row">{rooms}</div>
          </div>
        </div>
      );
    }
  }
};
