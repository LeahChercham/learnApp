class User {
    constructor(name){
        this.name = name
    }

   async search(skill){
       await dataManager.getAllDataFromAPI(skill)
        let data = {podcast: dataManager.podcasts }
        console.log("this is data: " + data)
        renderer.render(RESULTS_TEMPLATE, data, RESULTS_AREA)
    }

    saveToDB(podcast){
        let user = this.name
        dataManager.saveToDB(podcast, user).then(()=>{
            let data = dataManager.savedPodcasts
            console.log(data)
            renderer.render(DB_TEMPLATE, data, DB_AREA)
        })
    }
}