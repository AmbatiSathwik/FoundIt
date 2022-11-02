const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const lostitemSchema = new mongoose.Schema({
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
  lsid: {
    type: ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: null,
  },
  isDiscovered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("lostitem", lostitemSchema);
