class DataManager {

    constructor() {
        // this.books = []
        this.podcasts = []
        this.savedPodcasts = []
        // this.course = []

    }
    async getPodcastsFromDB(){
        let response = await $.get(`/savedPodcasts/${user.name}`)
        this.savedPodcasts = response
    }

    async getAllDataFromDB() {
        await this.getPodcastsFromDB()
        console.log(this.savedPodcasts)
    }

    async getPodcastFromAPI(skill) {
        let response = await $.get(`/podcasts/${skill}`)
        if (response) {
            this.podcasts = response
        }
    }

    async getAllDataFromAPI(skill) {
        await this.getPodcastFromAPI(skill)
        console.log(this.podcasts)
        // v4 await getCourseFromAPI()
        // v3 await getBookFromAPI()
    }

    saveToDB(object, user){
        return $.ajax({
            method:"put",
            url:`/podcast/${user}`,
            data: object,
            success: ()=>{
                 this.getAllDataFromDB()
            },
            error: function(xhr,text,error){console.log("error : "+ error + " - " + text)}
        })

    }
}