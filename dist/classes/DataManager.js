class DataManager {

    constructor() {
        this.books = []

        this.podcasts = []
        this.savedPodcasts = []

        this.videos = []
        this.savedVideos = []

        this.route = "" // we need this for the podcasts in case a podcast starts with a # or contains a colon.

    }

    // =========================== GET FROM DB ======================================

    async getPodcastsFromDB() {
        let response = await $.get(`/savedPodcasts/${user.name}`)
        this.savedPodcasts = response
    }

    async getBooksFromDB() {
        let response = await $.get(`/savedBooks/${user.name}`)
        this.savedBooks = response
    }

    async getVideosFromDB() {
        let response = await $.get(`/savedVideos/${user.name}`)
        this.savedVideos = response
    }

    async getAllDataFromDB() {
        await this.getPodcastsFromDB()
        await this.getBooksFromDB()
        await this.getVideosFromDB()
        //console.log(this.savedBooks)
    }


    // =========================== GET FROM API ======================================

    async getPodcastFromAPI(skill) {
        let response = await $.get(`/podcasts/${skill}`)
        if (response) {
            this.podcasts = response
        }
    }

    async getBooksFromAPI(skill) {
        let response = await $.get(`/books/${skill}`)
        if (response) {
            this.books = response
            console.log (this.books)
        }
    }

    async getVideosFromAPI(skill) {
        let response = await $.get(`/videos/${skill}`)
        if (response) {
            this.videos = response
            console.log(this.videos)
        }
    }


    async getAllDataFromAPI(skill) {
        await this.getPodcastFromAPI(skill)
        await this.getBooksFromAPI(skill)
        await this.getVideosFromAPI(skill)
        
    }

    async saveToDB(objectType, title, user) {
        if (objectType == "Podcast") {
            let data = this.podcasts.find(p => p.episodeTitle == title)
            console.log(data)

            await $.ajax({
                method: "put",
                url: `/podcast/${user}`,
                data: data,
                success: (res) => {
                    console.log("success adding podcast")
                },
                error: function (xhr, text, error) { console.log("error : " + error + " - " + text) }
            })

        } else if (objectType == "Book") {
            let data = this.books.find(p => p.title == title)
            console.log(data)

            await $.ajax({
                method: "put",
                url: `/book/${user}`,
                data: data,
                success: (res) => {
                    console.log("success adding book")
                },
                error: function (xhr, text, error) { console.log("error : " + error + " - " + text) }
            })
        }

        else if (objectType == "Video") {
            let data = this.videos.find(v => v.title == title)
            console.log(data)

            await $.ajax({
                method: "put",
                url: `/video/${user}`,
                data: data,
                success: (res) => {
                    console.log("success adding video")
                },
                error: function (xhr, text, error) { console.log("error : " + error + " - " + text) }
            })
        }

        await this.getAllDataFromDB()
    }

    async removeFromDB(objectType, title, user) {
        if (objectType == "Podcast") {
            let data = this.savedPodcasts.find(p => p.episodeTitle == title)
            await $.ajax({
                method: "delete",
                url: `/podcast/${user}`,
                data: data,
                success: (res) => {
                    console.log("success")
                },
                error: function (xhr, text, error) { console.log("error : " + error + " - " + text) }
            })
        } else if (objectType == "Book") {
            let data = this.savedBooks.find(p => p.title == title)
            await $.ajax({
                method: "delete",
                url: `/book/${user}`,
                data: data,
                success: (res) => {
                    console.log("success")
                },
                error: function (xhr, text, error) { console.log("error : " + error + " - " + text) }
            })
        }

        else if (objectType == "Video") {
            let data = this.savedVideos.find(p => p.title == title)
            await $.ajax({
                method: "delete",
                url: `/video/${user}`,
                data: data,
                success: (res) => {
                    console.log("success")
                },
                error: function (xhr, text, error) { console.log("error : " + error + " - " + text) }
            })
        }

        await this.getAllDataFromDB()
    }
}