const mongoose = require("mongoose");

const { Schema } = mongoose;

const Dicedata = new Schema(
  {
    DiceNumber: {
      type: Number,
      required: true,
    },
  },
  { collection: "diceNums" }
);

module.exports = mongoose.model("test", Dicedata);
