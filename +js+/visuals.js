function arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
    return `data:image/png;base64,${window.btoa(binary)}`;
};
function displayBadge(badgeArray) {
    if (!badgeArray) return "";
    return `<img class="visual-featured" src="./!db/featured-visual.png" title="Featured Visual!">`;
};
function loadVisual(fileName, destination) {
    let dir = [
        ["pack.png","arraybuffer"],
        ["pack-cover.png","arraybuffer"],
        ["pack.txt","string"],
    ];
    for (let i = 0; i < 3; i++)
    fetch(`./!db/visuals/data/${fileName}.zip`)
    .then(function(res) {
        if (res.status === 200 || res.status === 0) return Promise.resolve(res.blob());
        else return Promise.reject(new Error(res.statusText));
    })
    .then(JSZip.loadAsync)
    .then(function(zip) {
        if (zip.file(dir[i][0]) !== null)
        return zip.file(dir[i][0]).async(dir[i][1]);
    })
    .then(function success(data) {
        switch(i) {
            case 0:{
                if (typeof data !== "undefined")
                document.getElementById(`v-1-${destination}`).src = arrayBufferToBase64(data);
            };break;
            case 1:{
                if (typeof data !== "undefined")
                document.getElementById(`v-0-${destination}`).style.backgroundImage = `linear-gradient(to right, black, #0008), url(${arrayBufferToBase64(data)})`;
            };break;
            case 2:{
                if (typeof data !== "undefined")
                document.getElementById(`v-3-${destination}`).innerHTML = data;
            };break;
        };
    }), function error(e) {
        console.log(e);
    };
};
const article = document.querySelector("article");
for (let v = 0; v < VISUAL.length; v++) {
    const file = document.createElement("div");
    file.className = "file "+VISUAL[v].category;
    file.innerHTML = `<table id="v-0-${v}" class="visual" style="background-image: linear-gradient(to right, black, #0008), url('./!db/visuals/cover/Unknown.png');" title="${VISUAL[v].name} ${VISUAL[v].author}"><tbody><th><img id="v-1-${v}" class="pack-png" src="./!db/visuals/pack/Unknown.png"></th><th><div class="visual-top"><p>${VISUAL[v].name}</p><p class="visual-author">${VISUAL[v].author}</p></div><p id="v-3-${v}" class="visual-middle"></p><a class="visual-bottom" href="${VISUAL[v].download}" download>[Download ${VISUAL[v].version}]</a></th></tbody></table>`;
    article.appendChild(file);
    loadVisual(VISUAL[v].name,v);
};
showVisualByCategory("fanmade");
function showVisualByCategory(name) {
    let o = document.querySelectorAll(".file");
    for (let i = 0; i < o.length; i++) o[i].style.display = "none";
    let n = document.querySelectorAll(`.${name}`);
    for (let i = 0; i < n.length; i++) n[i].style.display = "inline-block";
};