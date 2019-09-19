const express = require("express")
const router = express.Router()
const request = require("request")
const User = require("../modules/userModel")

// ======================================= USER DB REQUEST ===================================== // 

router.post("/login", function (req, res) {
    const username = req.body.username
    User.findOne({ name: username }, function (err, existingUser) {
        const user = existingUser ? existingUser : new User({ name: username, skillSearches: [], desiredJobSaved: false, books: [], podcasts: [], courses: [] })
        if (!existingUser) { user.save() }
        res.send(user)
    })
})


// Podcast DB
router.put("/podcast/:username", function (req, res) {
    let user = req.params.username
    User.findOneAndUpdate({ "name": user }, { $push: { "podcasts": req.body } }, { new: true }, function (error, response) {
        res.send(response)
    })
})
router.delete("/podcast/:username", function (req, res) {
    let user = req.params.username
    let episodeTitle = req.body.episodeTitle
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


//books DB
router.put("/book/:username", function (req, res) {
    let user = req.params.username
    User.findOneAndUpdate({ "name": user }, { $push: { "books": req.body } }, { new: true }, function (error, response) {
        res.send(response)
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
        url: `https://listen-api.listennotes.com/api/v2/search?q=${searchedSkill}&type=episode&offset=0&len_min=5&len_max=45&only_in=title&language=English&safe_mode=1&limit=3`,
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
                let max = length - 1
                let min = 0
                let randomNumber = getRandomInteger(max, min)
                let index = randomNumbers.findIndex(r => r.number == randomNumber)
                if (index != -1) {
                    i--
                } else {
                    randomNumbers.push({ "number": randomNumber })
                    resultsArray.push(resultsOfData[randomNumber])
                }
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


// ======================================= GET BOOKS REQUEST ================================ // 

router.get("/books/:searchedSkill", function (req, res) {
    let searchedSkill = req.params.searchedSkill
    request(`https://www.googleapis.com/books/v1/volumes?q=${searchedSkill}&langRestrict=en`, function (err, response) {
        if (err) { console.log(err) }
        let data = JSON.parse(response.body)
        let englishBooks = []
        data.items.forEach(d => {
            if (d.volumeInfo.language == "en") {
                englishBooks.push(d)
            }
        })

        let resultsArray = []
        let randomNumbers = []

        for (let i = 0; i < 3; i++) {
            let length = englishBooks.length
            let max = length - 1
            let min = 0
            let randomNumber = getRandomInteger(max, min)
            let index = randomNumbers.findIndex(r => r.number == randomNumber)
            if (index != -1) {
                i--
            } else {
                randomNumbers.push({ "number": randomNumber })
                resultsArray.push(englishBooks[randomNumber])
            }}

            let finalBooks = []
        resultsArray.forEach(r => {
            let book = {
                "authors" : r.volumeInfo.authors,
                "title": r.volumeInfo.title,
                "subtitle": r.volumeInfo.subtitle,
                "buyLink": r.volumeInfo.infoLink,
                "imgURL": r.volumeInfo.imageLinks.thumbnail,
                "description": r.volumeInfo.description 
            }
            finalBooks.push(book)
        })

            res.send(finalBooks) // array of book objects
        })
})

// ======================================= GET BOOKS REQUEST DONE ================================ // 

module.exports = router