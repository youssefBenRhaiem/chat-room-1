const asyncHandler = require("express-async-handler");
const { ServerRoom } = require("../serverRoom");

// @desc Get A Room
// @route GET /room/:id
// @access Private
const accessRoom = asyncHandler(async (req, res) => {
  const { id, password } = req.params;
  if (!req.rooms[id]) return res.status(404).json({ msg: "No room found !" });
  if (req.rooms[id].password != password)
    return res.status(404).json({ msg: "Accessc denied ,Wrong password !" });
  res.status(200).json();
});

// // @desc Post Create a Room
// // @route Post /CreateRoom
// // @access Private
// const CreateRoom = asyncHandler(async (req, res) => {
//   const { id, name, password } = req.body.params;
//   console.log(req.body.params);
//   // {
//   //   msg: "All fields are required";
//   // }
//   if (!name)
//     return res.status(404).json({
//       name: "roomNameError",
//       error: "inputError",
//       msg: "Required Field !",
//     });

//   // const duplicate = await User.findOne({ username }).lean().exec();
//   // if (duplicate) res.status(409).json({ msg: "Duplicate user username" });
//   const serverRoom = new ServerRoom({
//     id,
//     name,
//     password,
//   });
//   if (!serverRoom)
//     return res
//       .status(400)
//       .json({ name: "serverError", error: "", msg: "Invalid data received !" });
//   console.log(`New room ${name} is created with password ${password}`);
//   // when passing an array ,its location in the memory get passed not the object
//   req.rooms[id] = serverRoom;
//   res.status(201).json({ id });
// });

module.exports = {
  accessRoom,
};
