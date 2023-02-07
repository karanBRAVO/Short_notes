const MONGOOSE = require("mongoose")
const { authSchema } = require("../schema/schema")

const AUTH_COLLECTION_NAME = "authentication"

const authModel = new MONGOOSE.model(AUTH_COLLECTION_NAME, authSchema)

module.exports = authModel