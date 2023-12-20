const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
    title: { type: String, default: null },
    author: { type: String, default: null },
    genre: { type: String, default: null },

});

module.exports = model("book", bookSchema);
