import { Schema, model } from "mongoose";


const noteSchema = new Schema({
  title: {
    type: String,
    required: [true, "The title is required"]
  },
  description: {
    type: String,
  }
},
  {
    timestamps: true,
    versionKey: false
  }
)


export default model("Note", noteSchema);