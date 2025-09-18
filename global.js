let profile = JSON.parse(localStorage.getItem("alphatest"));
function auth() {
    if (profile === null) {
        const guest = {
            "registered":false,
            "username":"",
            "playtesterID":"",
            "qaKey":"",
        };
        localStorage.setItem("alphatest", JSON.stringify(guest));
        profile = JSON.parse(localStorage.getItem("alphatest"));
    }
    if (profile.username != "") {
        document.querySelector(".site-profile").innerHTML = profile.username;
        document.querySelector(":root").style.setProperty("--site-profile-registered", "cyan");
    };
    document.querySelector(".site-buttons a").remove();
};