const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PodcastSchema = new Schema({
    author: String,
    title: String,
    buyLink: String,
    image: String,
    description: String,
    podcastSaved: Boolean
})

const PodcastModel = mongoose.model("podcast", PodcastSchema)
module.exports = PodcastModel