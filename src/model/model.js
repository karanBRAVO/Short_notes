const MONGOOSE = require("mongoose")
const { notesAppSchema } = require("../schema/schema")

const COLLECTION_NAME = "note"

const notesAppModel = new MONGOOSE.model(COLLECTION_NAME, notesAppSchema)

module.exports = notesAppModel