class DataManager{

    constructor(){
       // this.books = []
        this.podcasts = []
       // this.course = []

    }

    // v2 getAllDataFromDB(){
    // }
     async getPodcastFromAPI(skill){
        
        // return $.ajax({
        //     method:"get",
        //     url:`/podcasts/${skill}`,
        //     success: (data)=>{
        //         this.podcasts = data
        //     },
        //     error: function(xhr,text,error){
        //         console.log("error: " + error + " - " + text)
        //     }
        // })
        let response = await $.get(`/podcasts/${skill}`)
        if(response){
            this.podcasts = response
        }
    }

    async getAllDataFromAPI(skill){
        
        await this.getPodcastFromAPI(skill)
        console.log(this.podcasts)
        // v4 await getCourseFromAPI()
        // v3 await getBookFromAPI()
    }




}