class DataManager{

    constructor(){
       // this.books = []
        this.podcasts = []
       // this.course = []

    }

    // v2 getAllDataFromDB(){
    // }
    async getPodcastFromAPI(skill){
        debugger
        await $.ajax({
            method:"get",
            url:`/podcasts/${skill}`,
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
        // v4 await getCourseFromAPI()
        // v3 await getBookFromAPI()
    }




}