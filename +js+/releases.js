function set() {
    const publicSet = [
        "./cypress",
        "./lilypad",
        "./preview2",
        "./preview"
    ];
    let entry = document.querySelectorAll(".entry");
    let security = 0;
    if (profile.registered) security = 1;
    if (profile.playtesterID.length > 0) security = 2;
    let c = 0
    for (let i = 0; i < entry.length; i++) {
        if (security >= entry[i].dataset.security) {
            entry[i].style.backgroundImage = "url('./+db+/top-bg.png')";
            entry[i].style.cursor = "pointer";
            entry[i].href = publicSet[i];
            c++
        }else {
            entry[i].style.backgroundImage = "url('./+db+/nav-bg.png')";
            entry[i].style.cursor = "not-allowed";
            entry[i].href = "../profile";
        };
    };
    document.querySelector(".count").innerHTML = c;
};