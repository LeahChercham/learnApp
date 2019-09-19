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

router.put("/podcast/:username", function (req, res) {
    let user = req.params.username
    User.findOneAndUpdate({ "name": user }, { $push: { "podcasts": req.body } }, { new: true }, function (error, response) {
        console.log(response)
        res.send(response)
    })
})

router.delete("/podcast/:username/:episodeTitle", function (req, res) {
    let user = req.params.username
    let episodeTitle = req.params.episodeTitle
    console.log("episode title:" + episodeTitle)
    User.findOneAndUpdate({ "name": user }, { $pull: { "podcasts": { "episodeTitle": episodeTitle } } }, { new: true }, function (error, response) {
        res.send(response)
    })
})

router.get("/savedPodcasts/:username", function (req, res) {
    let user = req.params.username
    User.findOne({ "name": user }, function (error, response) {
        res.send(response.podcasts)
    })
})

// ======================================= GET PODCAST REQUEST ================================ // 
const getRandomInteger = function (max, min) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNumber
}

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

            let data = JSON.parse(body)
            let resultsOfData = data.results

            let resultsArray = []
            let randomNumbers = []

            for (let i = 0; i < 3; i++) {
                let length = resultsOfData.length
                let max = length-1
                let min = 0
                let randomNumber = getRandomInteger(max, min)
                randomNumbers.push(randomNumber)
                if(randomNumbers.randomNumber){
                    
                }
                resultsArray.push(resultsOfData[randomNumber])
            }


            first3Podcasts(resultsArray)

            res.send(resultsArray)
        }
    }

    const first3Podcasts = function (resultsOfData) {
        
        for (let i = 0; i < 3; i++) {
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