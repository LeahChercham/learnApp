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
}