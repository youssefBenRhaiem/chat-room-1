const express = require("express");

const { getAllRooms, CreateRoom } = require("../Controllers/HomeController");

const router = express.Router();

// Get all Rooms from the Server
router.get("/getAllRooms", getAllRooms);

// Create a Room
router.post("/createRoom", CreateRoom);

module.exports = router;
