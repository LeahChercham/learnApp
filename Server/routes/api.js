const express = require("express")
const router = express.Router()
const request = require("request")
const User = require("../modules/userModel")

// ======================================= USER DB REQUEST ===================================== // 

router.post("/login", function (req, res) {
    const username = req.body.username
    console.log(username)

    User.findOne({ name: username }, function (err, existingUser) {

        const user = existingUser ? existingUser : new User({ name: username, skillSearches: [], desiredJobSaved: false, books: [], podcasts: [], courses: [] })

        if (!existingUser) { user.save() }

        res.send(user)
    })

})

router.put("/podcast/:username", function(req,res){
    let user = req.params.username
    User.findOneAndUpdate({"name": user}, {$push: {"podcasts" : req.body}}, {new: true}, function(error, response){
        res.send(response)
    })
})

router.delete("/podcast/:username/:podcastName", function(req,res){
    let user = req.params.username
    let podcastName = req.params.podcastName
    User.findOneAndUpdate({"name": user}, {$pull: {"podcasts" :{"podcastName" : podcastName}}}, {new: true}, function(error,response){
        res.send(response)
    })
})

// ======================================= GET PODCAST REQUEST ================================ // 
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
// ======================================= GET PODCAST REQUEST DONE ================================ // 

module.exports = router