import "./Home.css";
import RoomCreactionForm from "./RoomCreactionForm";
import OnlineRoomList from "./OnlineRoomList";

export default () => {
  return (
    <div id="Home" className="flex flex-col justify-center">
      <RoomCreactionForm />
      <OnlineRoomList />
    </div>
  );
};
