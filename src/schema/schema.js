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
    },
    count: {
        type: Number,
        required: true
    },
    optionsLinksCont_id: {
        type: String,
        required: true
    },
    optionsDots_id: {
        type: String,
        required: true
    },
    editBtn_id: {
        type: String,
        required: true
    },
    deleteBtn_id: {
        type: String,
        required: true
    }
})

const authSchema = new MONGOOSE.Schema({
    username: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = { notesAppSchema, authSchema }