const dataManager = new DataManager()
const renderer = new Renderer()

class UserClass {
    constructor(name){
        this.name = name
    }

    async search(skill){
        await dataManager.getAllDataFromAPI()
        renderer.render()
    }

}