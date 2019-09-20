const renderer = new Renderer()
const dataManager = new DataManager()
const accordion = new Accordion()

let user

const LOGIN_TEMPLATE = "login-template"
const LOGIN_AREA = "login-area"

const MAIN_TEMPLATE = "main-template"
const MAIN_AREA = "main-area"

const DB_TEMPLATE = "db-template"
const DB_AREA = "db-area"

const RESULTS_TEMPLATE = "results-template"
const RESULTS_AREA = "results-area"
//--------- Constants file above ---------


// ============= Log In and Log Out
const logIn = function () {
    const username = $("#username").val()
    let password = $("#password").val()
    if (username) {
        if (password) {
            $.post('/login', { username }, async function (u) {
                user = new User(username)
                renderer.render(LOGIN_TEMPLATE, { isLoggedIn: true, username }, LOGIN_AREA)
                let data = "" // because we need data to use handlebars
                let saved = await dataManager.getAllDataFromDB()
                saved = { podcast: dataManager.savedPodcasts, book: dataManager.savedBooks }
                renderer.render(MAIN_TEMPLATE, data, MAIN_AREA)
                renderer.render(RESULTS_TEMPLATE, data, RESULTS_AREA)
                renderer.render(DB_TEMPLATE, saved, DB_AREA)

            })
        } else {
            alert("Please enter your password.")
        }
    } else {
        alert("Please enter username.")
    }
}

const logOut = function () {
    user = undefined
    renderer.render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)
    renderer.clear(MAIN_AREA)
    renderer.clear(RESULTS_AREA)
    renderer.clear(DB_AREA)
}
// ==================================================================================

// =============================== Search and Render ================================

const setPreloader = function(){
    $(".results-area").append(`<div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`)
}

const search = function () {
    let skill = $("#skillInput").val()
    if(skill){
    setPreloader()
    user.search(skill).then(() => {
    console.log("done")})}
    else {alert("Please enter a keyword")}
}

renderer.render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)
$(".main-area").on("click", "#searchButton", search)

// ================================== save and remove buttons =================================

const saveToDB = function () {
    //debugger
    let objectType = $(this).data("button")
    //objectType = objectType.slice(4)

    if (objectType == "Podcast") {
        let episodeName = $(this).closest(".podcast").find(".episodeTitle").text()
        user.saveToDB(objectType, episodeName)
    }
    else if (objectType == "Book") {
        //debugger
        let bookTitle = $(this).closest(".book").find(".bookTitle").text()
        user.saveToDB(objectType, bookTitle)
    }
    else if (objectType == "Video") {
        let videoTitle = $(this).closest(".video").find(".videoTitle").text()
        user.saveToDB(objectType, videoTitle)
    }
}

const removeFromDB = function () {
    //debugger
    let objectType = $(this).data("button")
    //objectType = objectType.slice(6)

    if (objectType == "Podcast") {
        let episodeName = $(this).closest(".savedPodcast").find(".savedEpisodeTitle").text()
        user.removeFromDB(objectType, episodeName)
    } else if (objectType == "Book") {
        let title = $(this).closest(".savedBook").find(".savedBookTitle").text()
        user.removeFromDB(objectType, title)
    }
    else if (objectType == "Video") {
        let title = $(this).closest(".savedVideo").find(".savedVideoTitle").text()
        user.removeFromDB(objectType, title)
    }
}


$("body").on("click", ".savePodcast", saveToDB)
$("body").on("click", ".removePodcast", removeFromDB)
$("body").on("click", ".saveBook", saveToDB)
$("body").on("click", ".removeBook", removeFromDB)
$("body").on("click", ".saveVideo", saveToDB)
$("body").on("click", ".removeVideo", removeFromDB)

// ============================================================================================




//------------ Read more feature -------------

// For Podcast
const showMorePodcast = function () {
    const podcastDiv = $(this).closest(".podcast")
    const allDescription = $(this).closest(".podcast").find(".podcastDescription").data("id")
    let words = allDescription.split(" ")
    let restOfDesc = words.splice(30).join(" ")
    $(this).empty()
    podcastDiv.append(`<span class= expandedDesc >${restOfDesc}</span> <span class="readLessPodcast"> <button class="descButton">Read Less </button></span>`)
}
const showLessPodcast = function () {
    const expandedDesc = $(this).closest(".podcast").find(".expandedDesc")
    expandedDesc.empty()
}
// For Book
const showMoreBook = function () {
    const BookDiv = $(this).closest(".book")
    const allDescription = $(this).closest(".book").find(".bookDescription").data("id")
    let words = allDescription.split(" ")
    let restOfDesc = words.splice(30).join(" ")
    $(this).empty()
    BookDiv.append(`<span class= expandedDesc >${restOfDesc}</span> <span class="readLessBook"> <button class="descButton">Read Less </button></span>`)
}
const showLessBook = function () {
    const expandedDesc = $(this).closest(".book").find(".expandedDesc")
    expandedDesc.empty()
}

// For Video
const showMoreVideo = function () {
    const videoDiv = $(this).closest(".video")
    const allDescription = $(this).closest(".video").find(".videoDescription").data("id")
    let words = allDescription.split(" ")
    let restOfDesc = words.splice(30).join(" ")
    $(this).empty()
    videoDiv.append(`<span class= expandedDesc >${restOfDesc}</span> <span class="readLessVideo"> <button class="descButton">Read Less </button></span>`)
}
const showLessVideo = function () {
    const expandedDesc = $(this).closest(".video").find(".expandedDesc")
    expandedDesc.empty()
}



$("body").on("click", ".showMorePodcast", showMorePodcast)
$("body").on("click", ".readLessPodcast", showLessPodcast)
$("body").on("click", ".showMoreBook", showMoreBook)
$("body").on("click", ".readLessBook", showLessBook)
$("body").on("click", ".showMoreVideo", showMoreVideo)
$("body").on("click", ".readLessVideo", showLessVideo)

//Handlebar custom HELPER 
Handlebars.registerHelper('shortDesc', function (description) {
    if (description) {
        let words = description.split(" ")
        let fewWords = words.splice(0, 30).join(" ")
        if (words.length > 30) {
            return fewWords
        }
        else { return description }
    }
});
// =============================================================================================



