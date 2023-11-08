import { Link } from "react-router-dom";

export default ({ id, room }) => {
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
