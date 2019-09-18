const express = require("express")
const router = express.Router()
const unirest = require("unirest")
const request = require("request")
const userModule = require("../modules/userModel.js")

router.get("/podcasts/:searchedSkill", async function (req, res) {
    const searchedSkill = req.params.skill
    const getLink = {
        url: `https://listen-api.listennotes.com/api/v2/search?q=${searchedSkill}&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&only_in=title%2Cdescription&language=English&safe_mode=1`,
        headers: {
            'X-ListenAPI-Key': 'c1c2187a1d5e462b9f49a13728df80de'
        }
      };
       
      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const searchedSkill = req.params.skill
            let data = JSON.parse(body)
          console.log(` Asking API for ${searchedSkill} podcasts`)
          res.send(data)
        }
    }
     
    request(getLink, callback);
    
})
    
    
    
    
    
    
    // await unirest.get(`https://listen-api.listennotes.com/api/v2/search?q=${searchedSkill}&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1390190241000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=1`)
    //     .header('X-ListenAPI-Key', 'c1c2187a1d5e462b9f49a13728df80de')
   // res.toJSON()

//     request(`https://listen-api.listennotes.com/api/v2/search?q=${searchedSkill}&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1390190241000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=1`, function (error, res, body) {
//         let data = JSON.parse(body)
//         res.send(data)
//     })
//         .header('X-ListenAPI-Key', 'c1c2187a1d5e462b9f49a13728df80de')
// })

module.exports = router