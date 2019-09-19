const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    skillSearches: Array,
    desiredJob: String,
    desiredJobSaved: Boolean,
    books: Array,
    podcasts: Array,
    videos: Array
})

const User = mongoose.model('user', UserSchema)
module.exports = User
