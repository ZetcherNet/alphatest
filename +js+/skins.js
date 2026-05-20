const article = document.querySelector("article");
for (let s = 0; s < SKIN.length; s++) {
    const file = document.createElement("div");
    file.className = "file "+SKIN[s].category;
    file.innerHTML = `<p class="skin-title">${SKIN[s].name}</p><img class="skin" src="./!db/skins/${SKIN[s].file}.png"><p class="skin-author">${SKIN[s].author}</p><a class="skin-download" href="./!db/skins/${SKIN[s].file}.png" download>[Download]</a>`;
    article.appendChild(file);
};
showSkinsByCategory("fanmade");
function showSkinsByCategory(name) {
    let o = document.querySelectorAll(".file");
    for (let i = 0; i < o.length; i++) o[i].style.display = "none";
    let n = document.querySelectorAll(`.${name}`);
    for (let i = 0; i < n.length; i++) n[i].style.display = "inline-block";
};