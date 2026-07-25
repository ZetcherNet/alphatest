const article = document.querySelector("article");
for (let w = 0; w < WORLD.length; w++) {
    const file = document.createElement("table");
    file.className = "world "+WORLD[w].category;
    file.innerHTML = `<tbody><tr><th class="world-left"><div class="world-title"><p>${WORLD[w].name}</p><p>${WORLD[w].author}</p></div><p class="world-desc">${WORLD[w].description}</p><p class="world-version">${WORLD[w].version}</p><div class="world-download"><a href="https://archive.org/download/alphatest-world-maps_001/${WORLD[w].file}.zip" download>[Download]</a><p>(${WORLD[w].size})</p></div></th><th class="world-right" style="background-image: url('./!db/worlds/!thumbnail/${WORLD[w].thumbnail}')"></th></tr></tbody>`;
    article.appendChild(file);
};
showWorldByCategory("singleplayer");
function showWorldByCategory(name) {
    let o = document.querySelectorAll(".world");
    for (let i = 0; i < o.length; i++) o[i].style.display = "none";
    let n = document.querySelectorAll(`.${name}`);
    for (let i = 0; i < n.length; i++) n[i].style.display = "table";
};