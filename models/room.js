const mongoose = require("mongoose");



const roomSchema = mongoose.Schema({
    roomName: String,
    roomCode: Number,
    host: String
});

const joinSchema = mongoose.Schema({
    userName: String,
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" }
});



const Room = mongoose.model("Room", roomSchema);
const Joined = mongoose.model("Joined", joinSchema);


module.exports = { Room, Joined }