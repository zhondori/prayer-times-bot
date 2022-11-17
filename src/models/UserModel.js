const { model, Schema } = require("mongoose")
const { v4: uuid } = require("uuid")

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: uuid()
  },
  userId: {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  step: {
    type: String
  }
})

const UserModel = model("users", UserSchema)
module.exports = UserModel