let db = new Localbase('alphatest');
let storage;
function set() {
    db.collection("storage").doc("hdd").get().then(document => {
        if (document == null)
        db.collection("storage").doc("hdd").set({
            drive:{
                user:[],
                skins:[],
                visuals:[],
                demos:[],
                misc:[]
            }
        }).then(res => {
            storage = res.data.drive;
            display();
        }).catch(err => {
            console.log(err);
        });
        else
        db.collection("storage").doc("hdd").get()
        .then(document => {
            storage = document.drive;
            display();
        });
    });
    function display() {
        if (profile.registered) {
            document.querySelector(".set-username").innerHTML = profile.username;
            document.querySelector(".set-qa").innerHTML = profile.qaKey;
            document.querySelector(".set-skin").innerHTML = storage.skins.length;
            document.querySelector(".set-visual").innerHTML = storage.visuals.length;
            document.querySelector(".set-demo").innerHTML = storage.demos.length;
            if (typeof storage.misc[0] == "object")
            document.querySelector(".set-avatar").src = storage.skins[storage.misc[0].skin].preview.front;
        };
        if (profile.playtesterID.length > 0) {
            document.querySelector(".set-id").innerHTML = profile.playtesterID;
        };
    };
};
function setup() {
    document.querySelector(".set-username").innerHTML = "<input></input> <button class='probutton' onclick='establish()'>Set Username</button> <span class='error-text'></span>";
};
function establish() {
    let user = document.querySelector("input").value;
    let err = document.querySelector(".error-text");
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
    storage.user = profile;
    db.collection("storage").doc("hdd").set({
        drive:{
            user:storage.user,
            skins:storage.skins,
            visuals:storage.visuals,
            demos:storage.demos,
            misc:storage.misc
        }
    }).then(res => {
        console.log(res);
        window.location.reload();
    }).catch(err => {
        console.log(err);
    });
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
function reset() {
    localStorage.removeItem("alphatest");
    db.collection("storage").delete();
    window.location.reload();
};