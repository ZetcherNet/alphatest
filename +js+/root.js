let profile = JSON.parse(localStorage.getItem("alphatest"));
function i(d = "", f = "") {
    auth();
    const l = ["header", "footer"];
    for (let i = 0; i < 2; i++)
    fetch(`${d}./+html+/${f}${l[i]}.html`)
    .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.text();
    })
    .then(data => {
        document.querySelector(l[i]).innerHTML = data;
        if (l[i] == "header") nav();
    })
    .catch(err => {
        console.log(err);
    });
};
function c() {

};
function nav() {
    let i = document.querySelectorAll("[data-page]");
    let j = document.querySelectorAll("[data-ico]");
    function style(t, n) {
        switch(t) {
            case 0: i[n].style.color="cyan"; break;
            case 1: i[n].style.color="white"; break;
        };
        i[n].style.textDecoration="none";
        i[n].style.cursor="default";
        i[n].style.pointerEvents="none";
        if (n > 0) j[n-1].style.backgroundPosition = `${-32 * (n-1)}px -32px`;
    };
    for (let l = 0; l < j.length; l++) {
        j[l].style.backgroundPosition = `${-32 * l}px 0px`;
    };
    switch(index) {
        case "profile": style(0, 0); break;
        case "skins": style(0, 1); break;
        case "visuals": style(0, 2); break;
        case "demos": style(0, 3); break;
        case "cypress": style(1, 4); break;
        case "decraft": style(1, 5); break;
        case "bugtracker": style(1, 6); break;
        case "faq": style(1, 7); break;
        case "lilypedia": style(1, 8); break;
    };
    if (profile.username != "") i[0].innerHTML = profile.username;
};
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
    };
};