import "./Home.css";
import RoomCreactionForm from "./RoomCreactionForm";
import OnlineRoomList from "./OnlineRoomList";

export default () => {
  return (
    <div id="Home">
      <RoomCreactionForm className="mb-2" />
      <OnlineRoomList />
    </div>
  );
};
