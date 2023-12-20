const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  role_name: { type: String, default: 'user' } // Thêm trường admin với giá trị mặc định là true
});

module.exports = model("user", userSchema);
