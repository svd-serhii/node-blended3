const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    // title:String
    title: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Task = mongoose.model("task", schema);

module.exports = { Task };
