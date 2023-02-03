const MONGOOSE = require("mongoose");

const notesAppSchema = new MONGOOSE.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    }
})

module.exports = notesAppSchema