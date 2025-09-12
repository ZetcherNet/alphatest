const www = {
    "domain":"https://zetcher.net/alphatest/",
    "page":{
        "login":"login",
        "register":"register",
        "profile":"profile",
        "downloads":"version/",
        "bugtracker":"bugtracker/",
        "lilypedia":"lilypedia",
        "faq":"faq",
    },
};
let profile = JSON.parse(localStorage.getItem("alphatest"));
function js(x) {
    auth();
    headerDisplay(x);
    switch(x) {
        case -1: login(); break;
        case 0: mainPage(); break;
        case 1: versionList(); break
    };
};
function versionList() {
    let list = [
        {"name":"v1.0.16.05_20 Cypress","lock":1,"page":"101605_20_cypress"},
        {"name":"v1.0.16.05_19 R4","lock":2,"page":"101605_19"},
        {"name":"v1.0.16.05_18 R4","lock":2,"page":"101605_18"},
        {"name":"v1.0.16.05_17 R4","lock":2,"page":"101605_17"},
        {"name":"v1.0.16.05_16 R4","lock":2,"page":"101605_16"},
        {"name":"v1.0.16.05_15 R4","lock":2,"page":"101605_15"},
        {"name":"v1.0.16.05_14 R4","lock":2,"page":"101605_14"},
        {"name":"v1.0.16.05_13 R4","lock":2,"page":"101605_13"},
        {"name":"v1.0.16.05_13 Lilypad","lock":2,"page":"101605_13_lilypad"},
        {"name":"v1.0.16.05_13 Lilypad QA","lock":1,"page":"101605_13_lilypad_qa"},
        {"name":"v1.0.16.05_13","lock":2,"page":"101605_13"},
        {"name":"v1.0.16.05_12","lock":2,"page":"101605_12"},
        {"name":"v1.0.16.05_11","lock":2,"page":"101605_11"},
        {"name":"v1.0.16.05 [UNR.PREVIEW2]","lock":1,"page":"101605_preview2"},
        {"name":"v1.0.16.05_10","lock":2,"page":"101605_10"},
        {"name":"v1.0.16.05_09","lock":2,"page":"101605_09"},
        {"name":"v1.0.16.05_08","lock":2,"page":"101605_08"},
        {"name":"v1.0.16.05 [PREVIEW]","lock":0,"page":"101605_preview"},
        {"name":"v1.0.16.05_07","lock":2,"page":"101605_07"},
        {"name":"v1.0.16.05_06","lock":2,"page":"101605_06"},
        {"name":"v1.0.16.05_05","lock":2,"page":"101605_05"},
        {"name":"v1.0.16.05_04","lock":2,"page":"101605_04"},
        {"name":"v1.0.16.05_03","lock":2,"page":"101605_03"},
        {"name":"v1.0.16.05_02","lock":2,"page":"101605_02"},
        {"name":"v1.0.16.05_01","lock":2,"page":"101605_01"},
        {"name":"v1.0.16.05","lock":2,"page":"101605"},
    ];
    let security = 0;
    if (profile.registered) security = 1;
    if (profile.playtesterID.length > 0) security = 2;
    let req = [
        "Free",
        "Registration Required",
        "Playtester ID Required"
    ];
    for (let i = 0; i < list.length; i++) {
        let a = document.createElement("a");
        a.style.textDecoration = "none";
        a.href = www.domain+www.page.downloads+list[i].page;
        let af = document.createElement("p");
        let div = document.createElement("div");
        div.style.backgroundImage = security >= list[i].lock ? "url('../assets/top-bg.png')" : "url('../assets/nav-bg.png')";
        div.style.backgroundSize = "auto 100%";
        let h2 = document.createElement("h2");
        h2.innerHTML = list[i].name;
        h2.style.textAlign = "left";
        h2.style.cursor = security >= list[i].lock ? "pointer" : "not-allowed";
        let p = document.createElement("p");
        p.innerHTML = req[list[i].lock];
        p.style.textAlign = "right";
        p.style.cursor = security >= list[i].lock ? "pointer" : "not-allowed";
        div.appendChild(h2);
        div.appendChild(p);
        security >= list[i].lock ? a.appendChild(div) : af.appendChild(div);
        let l = document.getElementById("list");
        security >= list[i].lock ? l.appendChild(a) : l.appendChild(af);
        l.appendChild(document.createElement("br"));
    };
    document.getElementById("list").style.display = "block";
};
function mainPage() {
    profile.registered ? document.getElementById("accountViewers").style.display = "block" : document.getElementById("anonViewers").style.display = "block";
    let a = document.querySelectorAll(".a");
    a[0].href = www.domain+www.page.login;
    a[1].href = www.domain+www.page.register;
    a[2].href = "./download/101605_preview";
};
function login() {
    let c = [
        "Connecting",
        "Connecting.",
        "Connecting..",
        "Connecting...",
    ];
    let connectionSuccessful = Math.floor(Math.random() * 3);
    for (let i = 0; i < 40; i++) {
        setTimeout(function(){
            document.getElementById("connext").innerHTML = c[i%4];
        },i*250);
    };
    setTimeout(function(){
        document.getElementById("connecting").style.display = "none";
        connectionSuccessful == 0 ? document.getElementById("success").style.display = "block" : document.getElementById("failed").style.display = "block";
    },10000);
};
function playtesterAuth() {
    let i1 = "0000".slice(document.getElementById("i1").value.toString().length)+document.getElementById("i1").value;
    let i2 = "0000".slice(document.getElementById("i2").value.toString().length)+document.getElementById("i2").value;
    let id = i1 + "-" + i2;
    let pass = document.getElementById("i3").value;
    pass == pass ? true : false;
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("login-process").style.display = "block";
    let c = [
        "Logging in",
        "Logging in.",
        "Logging in..",
        "Logging in...",
    ];
    for (let i = 0; i < 40; i++) {
        setTimeout(function(){
            document.getElementById("loggext").innerHTML = c[i%4];
        },i*250);
    };
    setTimeout(function(){
        document.getElementById("login-error").innerHTML = Math.floor(Math.random() * 2) == 0 ?
        "The password \""+pass+"\" is incorrect for ID "+id+", please check if your ID and/or password is correct and try again."
        :
        "ERROR: Unable to connect to main servers, please try again.";
        document.getElementById("login-screen").style.display = "block";
        document.getElementById("login-process").style.display = "none";
    },10000);
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
function headerDisplay(x) {
    let a = document.querySelectorAll(".acc");
    a[0].href = www.domain;
    a[1].innerHTML = "[" + profile.username + "]";
    a[2].href = www.domain+www.page.login;
    a[3].href = www.domain+www.page.register;
    profile.registered ? document.getElementById("identity").style.display = "block" : document.getElementById("anonymous").style.display = "block";
    let m = document.getElementById("menu");
    let l = ["Home","Downloads","FAQ","Bug Reports"/*,"Lilypedia"*/];
    let w = [
        www.domain,
        www.domain+www.page.downloads,
        www.domain+www.page.faq,
        www.domain+www.page.bugtracker/*,
        www.domain+www.page.lilypedia*/
    ];
    for (let i = 0; i < l.length; i++) {
        if (i == 0 || profile.registered) {
            let e = i == x ? document.createElement("p") : document.createElement("a");
            e.innerHTML = "[" + l[i] + "]";
            if (i != x) e.href = w[i];
            m.appendChild(e);
        };
    };
};
function registerQA() {
    let user = document.getElementById("username").value;
    let err = document.getElementById("error");
    if (user == "") {
        return;
    };
    if (user.toLowerCase().startsWith("dev") || user == "#") {
        err.innerHTML = "This username is invalid.";
        setTimeout(function(){err.innerHTML="";},1000);
        return;
    };
    if (user.length >= 15) {
        err.innerHTML = "This username is too long.";
        setTimeout(function(){err.innerHTML="";},1000);
        return;
    };
    let key = qaKeyGen(user);
    profile.username = user;
    profile.qaKey = key;
    profile.registered = true;
    localStorage.setItem("alphatest", JSON.stringify(profile));
    window.location.href = www.domain;
};
function qaKeyGen(name) {
    let EndBytes = [39, 86, 26, 72, 13, 91, 23];
    name = name.toUpperCase();
    if (name.length >= 15){
        console.log("Name too long");
        return "#";
    };
    for (let i = 0; i < name.length; i++){
        let a = name.charAt(i);
        if ((a < 'A' || a > 'Z') && a != "_" && (a < '0' || a > '9')){
            console.log("Invalid character, use only A to Z uppercase");
            return "#";
        };
    };
    let encName = "";
    let writtenBytes = 0;
    for (let i = 0; i < name.length; i++){
        encName += (70 - (26 - (name.charCodeAt(i) - 'A'.charCodeAt(0)))).toString();
        writtenBytes++;
    };
    encName += (EndBytes[Math.floor(Math.random() * EndBytes.length)]).toString();
    writtenBytes++;
    console.log("Encoded name as: " + encName);
    let fullNameStr = encName;
    while (writtenBytes != 15){
        fullNameStr += (10+Math.floor(Math.random() * 89)).toString();
        writtenBytes++;
    };
    let checksumFullName = 0;
    for (let i = 0; i < fullNameStr.length; i++){
        checksumFullName += (fullNameStr.charCodeAt(i) - '0'.charCodeAt(0));
    };
    let checksumName = 0;
    for (let i = 0; i < encName.length; i++){
        checksumName += (encName.charCodeAt(i) - '0'.charCodeAt(0));
    };
    checksumName %= 100;
    console.log("checksum of full name: " + checksumFullName);
    let checkSumPart1 = checksumFullName + Math.floor(Math.random() * (999-checksumFullName));
    let checkSumPart2 = checkSumPart1 - checksumFullName;
    let retStr = "";
    retStr += ('000'+checkSumPart1).slice(-3);
    retStr = retStr.split("").reverse().join("");
    retStr += fullNameStr;
    retStr += ('000'+checkSumPart2).slice(-3);
    retStr += ('00'+checksumName).slice(-2);
    retStr = retStr.slice(0, 6) + "-" + retStr.slice(6);
    retStr = retStr.slice(0, 15) + "-" + retStr.slice(15);
    retStr = retStr.slice(0, 23) + "-" + retStr.slice(23);
    retStr = retStr.slice(0, 31) + "-" + retStr.slice(31);
    retStr = retStr.slice(0, 36) + "-" + retStr.slice(36);
    return retStr;
};