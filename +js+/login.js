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