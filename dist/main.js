
const logIn = function () {
    //debugger
    const username = $("#username").val()
    let password = $("#password").val()
    if(password){
    //$.post('/login', { username }, function (u) {
        user = new User(username)
        renderer.render(LOGIN_TEMPLATE, { isLoggedIn: true, username }, LOGIN_AREA)
        let data = "" // because we need data to use handlebars
        renderer.render(MAIN_TEMPLATE, data, MAIN_AREA)
        renderer.render(MAIN_TEMPLATE, data, MAIN_AREA)
        renderer.render(DB_TEMPLATE, data, DB_AREA)

        //render(MAIN_TEMPLATE, , MAIN_AREA)
    } else {
        alert("Please enter your password.")
    }
}

const logOut = function(){
    user = undefined
    renderer.render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)
    renderer.clear(MAIN_AREA)
}

renderer.render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)