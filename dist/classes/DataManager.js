class DataManager {

    constructor() {
        this.books = []

        this.podcasts = []
        this.savedPodcasts = []

        // this.course = []

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


    async getAllDataFromDB() {
        await this.getPodcastsFromDB()
        await this.getBooksFromDB()
        console.log(this.savedBooks)
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
        }
    }


    async getAllDataFromAPI(skill) {
        await this.getPodcastFromAPI(skill)
        await this.getBooksFromAPI(skill)
        console.log(this.books)
        // v4 await getCourseFromAPI()
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
                    console.log("success")
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
                    console.log("success")
                },
                error: function (xhr, text, error) { console.log("error : " + error + " - " + text) }
            })
        }
        await this.getAllDataFromDB()
    }

    async removeFromDB(objectType, title, user) {
        debugger
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
        await this.getAllDataFromDB()
    }
}