const mongoose = require("mongoose");

const { Schema } = mongoose;

const PLC_Data = new Schema({
  tagId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Boolean,
    required: true,
  },
});

const plc = new Schema(
  {
    payload: [PLC_Data],
  },
  { collection: "plc" }
);

module.exports = mongoose.model("MqttData", plc);
