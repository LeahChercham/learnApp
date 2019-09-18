const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PodcastSchema = new Schema({
    episodeTitle: String,
    podcastName: String,
    podcastLink: String,
    duration: Number,
    image: String,
    description: String,
    podcastSaved: Boolean
})

const PodcastModel = mongoose.model("podcast", PodcastSchema)
module.exports = PodcastModel