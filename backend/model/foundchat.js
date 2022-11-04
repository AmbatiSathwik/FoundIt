const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const foundchatSchema = new mongoose.Schema({
  fromsid: {
    type: ObjectId,
    ref: "user",
  },
  tosid: {
    type: ObjectId,
    ref: "user",
  },
  fid: {
    type: ObjectId,
    ref: "lostitem",
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("foundchat", foundchatSchema);
