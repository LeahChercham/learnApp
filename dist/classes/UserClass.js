class User {
    constructor(name){
        this.name = name
    }

    async search(skill){
        await dataManager.getAllDataFromAPI()
        renderer.render()
    }

}