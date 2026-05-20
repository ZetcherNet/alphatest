let article = document.querySelector("article");
for (let i = 0; i < NEWS.length; i++) {
    let a = document.createElement("div");
    a.className = "announcement";
    a.innerHTML = `<div class="title">${NEWS[i].header} - ${NEWS[i].author} - ${NEWS[i].postDate}</div><table class="news"><tbody><th><img class="pfp" src="./!db/forum/${MEMBER[findMember(NEWS[0].author)].pfp}" height="64"></th><th class="broadcast">${NEWS[i].innerHTML}</th></tbody></table>`;
    article.appendChild(a);
};