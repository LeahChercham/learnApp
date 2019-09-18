
const logIn = function () {
    const username = $("#username").val()
    let password = $("#password").val()
    if(password){
    $.post('/login', { username }, function (u) {
        user = new User(username)
        render(LOGIN_TEMPLATE, { isLoggedIn: true, username }, LOGIN_AREA)
        //render(MAIN_TEMPLATE, , MAIN_AREA)
    })} else {
        alert("Please enter your password.")
    }
}

const logOut = function(){
    user = undefined
    render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)
    renderer.clear(MAIN_AREA)
}

render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)