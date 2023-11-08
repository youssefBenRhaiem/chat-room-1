const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const { ServerRoom } = require("../serverRoom");

// @desc Get All Rooms
// @route GET /Home
// @access Private
const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = {};
  Object.keys(req.rooms).forEach((roomID) => {
    rooms[roomID] = req.rooms[roomID].clientViewData();
  });
  res.json({ rooms });
});

// @desc Post Create a Room
// @route Post /CreateRoom
// @access Private
const CreateRoom = asyncHandler(async (req, res) => {
  const { id, name, password } = req.body.params;
  console.log(req.body.params);
  // {
  //   msg: "All fields are required";
  // }
  if (!name)
    return res.status(404).json({
      name: "roomNameErr",
      msg: "Required Field !",
    });

  // const duplicate = await User.findOne({ username }).lean().exec();
  // if (duplicate) res.status(409).json({ msg: "Duplicate user username" });
  const serverRoom = new ServerRoom({ id, name, password });
  if (!serverRoom)
    return res.status(400).json({ name: "serverErr", msg: "Invalid Data !" });
  console.log(`New room ${name} is created with password ${password}`);
  // when passing an array ,its location in the memory get passed not the object
  req.rooms[id] = serverRoom;
  res.status(201).json();
});

module.exports = {
  getAllRooms,
  CreateRoom,
};
