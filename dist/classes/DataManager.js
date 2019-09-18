class DataManager{

    constructor(){
        this.Books = []
        this.Podcasts = []
        this.Courses = []
    }

    // v2 getAllDataFromDB(){
    // }

    async getAllDataFromAPI(){
        await getPodcastsFromAPI()
        // v4 await getCoursesFromAPI()
        // v3 await getBooksFromAPI()
    }

    async getPodcastsFromAPI(){
        await $.ajax({
            method:"get",
            url:"/podcasts",
            success: (podcasts)=>{
                this.podcasts = podcasts
            },
            error: function(xhr,text,error){
                console.log("error: " + error + " - " + text)
            }
        })

    }


}