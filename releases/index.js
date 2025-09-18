function set() {
    const publicSet = [
        "./v1.0.16.05_20_cypress",
        "./v1.0.16.05_13_lilypad_qa",
        "./v1.0.16.05_unr.preview2",
        "./v1.0.16.05_preview"
    ];
    let entry = document.querySelectorAll(".entry");
    let security = 0;
    if (profile.registered) security = 1;
    if (profile.playtesterID.length > 0) security = 2;
    let c = 0
    for (let i = 0; i < entry.length; i++) {
        if (security >= entry[i].dataset.security) {
            entry[i].style.backgroundImage = "url('../assets/top-bg.png')";
            entry[i].style.cursor = "pointer";
            entry[i].href = publicSet[i];
            c++
        }else {
            entry[i].style.backgroundImage = "url('../assets/nav-bg.png')";
            entry[i].style.cursor = "not-allowed";
            entry[i].href = "../profile";
        };
    };
    document.querySelector(".count").innerHTML = c;
};