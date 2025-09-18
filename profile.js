function set() {
    if (profile.registered) {
        document.querySelector(".set-username").innerHTML = profile.username;
        document.querySelector(".set-qa").innerHTML = profile.qaKey;
        document.querySelector(":root").style.setProperty("--account-status", "yellow");
        document.querySelector(".acc-status").innerHTML = "Registered Public Account";
        document.querySelector(".why").title = "You are eligible for QA testing and have limited download access to our releases.";
    };
    if (profile.playtesterID.length > 0) {
        document.querySelector(".set-id").innerHTML = profile.playtesterID;
        document.querySelector(":root").style.setProperty("--account-status", "lime");
        document.querySelector(".acc-status").innerHTML = "Registered Private Account";
        document.querySelector(".why").title = "You are eligible for full download access to our releases.";
    };
};
function setup() {
    document.querySelector(".set-username").innerHTML = "<input></input> <button onclick='establish()'>Set Username</button> <span class='error-text'></span>";
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
    window.location.reload();
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
    window.location.reload();
};