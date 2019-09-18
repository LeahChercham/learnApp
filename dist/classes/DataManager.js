class DataManager {

    constructor() {
        // this.books = []
        this.podcasts = []
        this.savedPodcasts = []
        // this.course = []

    }
    async getPodcastsFromDB(){
        debugger
        let response = await $.get(`/savedPodcasts/${user.name}`)
        this.savedPodcasts = response
    }

    async getAllDataFromDB() {
        debugger
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

    async saveToDB(object, user){
        debugger

        await $.ajax({
            method:"put",
            url:`/podcast/${user}`,
            data: object,
            success: (res)=>{
             console.log("success")
            },
            error: function(xhr,text,error){console.log("error : "+ error + " - " + text)}
        }) 
        await this.getAllDataFromDB()
    }
}