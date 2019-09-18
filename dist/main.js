
const logIn = function () {
    //debugger
    const username = $("#username").val()
    let password = $("#password").val()
    if(password){
    $.post('/login', { username }, function (u) {
        user = new User(username)
        renderer.render(LOGIN_TEMPLATE, { isLoggedIn: true, username }, LOGIN_AREA)
        let data = "" // because we need data to use handlebars
        renderer.render(MAIN_TEMPLATE, data, MAIN_AREA)
        renderer.render(RESULTS_TEMPLATE, data, RESULTS_AREA)
        renderer.render(DB_TEMPLATE, data, DB_AREA)

    })} else {
        alert("Please enter your password.")
    }
}

const logOut = function(){
    user = undefined
    renderer.render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)
    renderer.clear(MAIN_AREA)
    renderer.clear(RESULTS_AREA)
    renderer.clear(DB_AREA)
}

const search = function(){
    let skill = $("#skillInput").val()
    user.search(skill).then(()=>console.log("done"))
}

renderer.render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)
$(".main-area").on("click", "#searchButton", search)

//------------Simona's Read more feature -------------

const showMore = function(){
        debugger
        const allDescription = $(this).closest(".podcast").find(".podcastDescription").data("id")
        console.log(allDescription)
        
        podcastDiv.append(`<div>${allDescription}</div>`)
    let data = $(this).siblings(".podcastDescription")
    $(this).siblings(".podcastDescription").append(data)
}

$("body").on("click", ".showMore", showMore)

Handlebars.registerHelper('shortDesc', function(str) {
    if (str.length > 200) 
    return `${str.substring(0,200)}`;
    return str;
  });

//   Handlebars.registerHelper('showMore', function(str) {
//     if (str.length > 200) 
//     return `${str.substring(200)}`;
//   });


//   Handlebars.registerHelper('clickFunction', function(str) {
//     if (str.length > 200)
//     return <span class="showMore">...Show more </span>;
//   });
