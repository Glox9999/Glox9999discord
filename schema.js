const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    bericht: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("tabel", schema, "tabel");