const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    skillSearches: Array,
    desiredJob: String,
    desiredJobSaved: Boolean,
    books: Array,
    podcasts: Array,
    courses: Array
})

const UserModel = mongoose.model('user', UserSchema)
module.export = UserModel
