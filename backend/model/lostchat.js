const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const lostchatSchema = new mongoose.Schema({
  fromsid: {
    type: ObjectId,
    ref: "user",
  },
  tosid: {
    type: ObjectId,
    ref: "user",
  },
  lid: {
    type: ObjectId,
    ref: "lostitem",
  },
  message: {
    type: String,
  },
  date:{
    type: Date
  }
});

module.exports = mongoose.model("lostchat", lostchatSchema);
