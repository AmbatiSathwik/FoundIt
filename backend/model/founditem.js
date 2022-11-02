const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const founditemSchema = new mongoose.Schema({
  itemname: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  details: {
    type: String,
    default: null,
  },
  fsid: {
    type: ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: null,
  },
  isRecovered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("founditem", founditemSchema);
