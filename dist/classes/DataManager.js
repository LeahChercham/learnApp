class DataManager{

    constructor(){
       // this.Book = []
        this.Podcast = []
       // this.Course = []

    }

    // v2 getAllDataFromDB(){
    // }
    async getPodcastFromAPI(skill){
        debugger
        await $.ajax({
            method:"get",
            url:`/podcasts/{skill}`,
            success: (podcasts)=>{
                this.podcasts = podcasts
            },
            error: function(xhr,text,error){
                console.log("error: " + error + " - " + text)
            }
        })
    }

    async getAllDataFromAPI(skill){
        await getPodcastFromAPI(skill)
        console.log(this.Podcasts)
        // v4 await getCoursesFromAPI()
        // v3 await getBooksFromAPI()
    }




}