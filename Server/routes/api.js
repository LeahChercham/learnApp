const express = require("express")
const router = express.Router()
const request = require("request")
const userModule = require("../modules/userModel.js")

router.get("/podcasts/:searchedSkill", async function (req, res) {
    const searchedSkill = req.params.searchedSkill
    const getLink = {
        url: `https://listen-api.listennotes.com/api/v2/search?q=${searchedSkill}&type=episode&offset=0&len_min=10&len_max=30&only_in=title&language=English&safe_mode=1&limit=3`,
        headers: {
            'X-ListenAPI-Key': 'c1c2187a1d5e462b9f49a13728df80de'
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            //const searchedSkill = req.params.skill
            //console.log(` Asking API for ${searchedSkill} podcasts`)
            
            let data = JSON.parse(body)
            let resultsOfData = data.results
            
            first3Podcasts(resultsOfData)
            resultsOfData.splice(3)
            res.send(resultsOfData)
        }
    }

    const first3Podcasts = function (resultsOfData) {
        for (let i = 0; i < 4; i++) {
            resultsOfData[i] = {
                episodeTitle: resultsOfData[i].title_original,
                podcastName: resultsOfData[i].podcast_title_original,
                podcastLink: resultsOfData[i].audio,
                duration: resultsOfData[i].audio_length_sec,
                image: resultsOfData[i].image,
                description: resultsOfData[i].description_original,
                podcastSaved: false
            }

        }
        return resultsOfData
    }

    request(getLink, callback);

})

module.exports = router