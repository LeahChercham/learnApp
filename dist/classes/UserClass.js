class User {
    constructor(name) {
        this.name = name
    }
    hide(){
        $(".hidden").hide()
        $(".show").show()
    }
    show(){
        $(".hidden").show()
        $(".show").hide()
    }
    async search(skill) {
        await dataManager.getAllDataFromAPI(skill)
        let data = { podcast: dataManager.podcasts, book: dataManager.books, video:dataManager.videos }
        console.log("this is data: " + data)
        let search=true
        accordion.init(RESULTS_TEMPLATE, data, RESULTS_AREA, search)
        //renderer.render(RESULTS_TEMPLATE, data, RESULTS_AREA)
    }

    async saveToDB(objectType, title) {
        debugger
        let user = this.name
        if (objectType == "Podcast") {
            await dataManager.saveToDB(objectType, title, user)
        } 
        else if (objectType == "Book") {
            await dataManager.saveToDB(objectType, title, user)
        }
        else if (objectType == "Video") {
            await dataManager.saveToDB(objectType, title, user)
        }
        let data = { podcast: dataManager.savedPodcasts, book: dataManager.savedBooks, video: dataManager.savedVideos }
        accordion.init(DB_TEMPLATE, data, DB_AREA)
        this.show()
    }

    async removeFromDB(objectType, title) {
        let user = this.name
        let promise = await dataManager.removeFromDB(objectType, title , user)
        console.log(promise)
        let data = { podcast: dataManager.savedPodcasts, book: dataManager.savedBooks, video: dataManager.savedVideos }
        accordion.init(DB_TEMPLATE, data, DB_AREA)
        this.show()
    }
}