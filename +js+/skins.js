let db = new Localbase('alphatest');
let storage;
let tempSkin;
function s() {
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
            d();
        }).catch(err => {
            console.log(err);
        });
        else
        db.collection("storage").doc("hdd").get()
        .then(document => {
            storage = document.drive;
            d();
        });
    });
};
function d() {
    function anyReadableData() {
        let b = false;
        for (let i = 0; i < storage.skins.length; i++)
        if (storage.skins[i].deleted == false)
        b = true;
        return b;
    };
    function readableData(i) {
        return storage.skins[i].deleted;
    };
    let p = new URLSearchParams(window.location.search);
    let share = p.get("share");
    if (share != null) q(share);
    let article = document.querySelector("article");
    if (!anyReadableData()) return;
    article.innerHTML = "";
    for (let i = storage.skins.length-1; i >= 0; i--) {
        if (!readableData(i)) {
            const entry = document.createElement("div");
            entry.className = "skin";
            entry.innerHTML =
            `<div class="preview">`+
            `<img class="img-front" src="${storage.skins[i].preview.front}">`+
            `<img class="img-back" src="${storage.skins[i].preview.back}">`+
            `</div>`+
            `<p class="meta-name">${storage.skins[i].name}</p>`+
            `<p class="meta-creator">${storage.skins[i].uploader}</p>`;
            entry.onclick = () => {
                displayView(i);
            };
            article.appendChild(entry);
        };
    };
};
function u() {
    const img = document.createElement("img");
    const file = document.querySelector("#file").files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
        img.src = reader.result;
        img.onload = () => {
            p(img);
        };
    });
};
function p(img) {
    const texture = new Image();
    texture.src = img.src;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let newSkin = {
        "id":storage.skins.length,
        "deleted":false,
        "dateCreated":"",
        "name":"",
        "uploader":"",
        "description":"",
        "png":"",
        "preview":{
            "left":"",
            "front":"",
            "right":"",
            "back":""
        }
    };
    /*Display OG (Most Likely 64x64)*/
    canvas.width = 64; canvas.height = 64;
    /*ctx.drawImage(texture,0,0,64,64,0,0,64,64);*/
    ctx.drawImage(texture,0,0);
    document.querySelector(".upload-old").src = canvas.toDataURL();
    /*Display NEW (64x32)*/
    canvas.width = 64; canvas.height = 32;
    ctx.drawImage(texture,0,0,64,32,0,0,64,32);
    ctx.drawImage(texture,0,32,64,16,0,16,64,16);
    newSkin.png = canvas.toDataURL();
    document.querySelector(".upload-new").src = newSkin.png;
    const x32 = new Image();
    x32.src = newSkin.png;
    x32.onload = () => {
        /*Display Left*/
        canvas.width = 8; canvas.height = 32;
        ctx.drawImage(x32,16,8,8,8,0,0,8,8);
        ctx.drawImage(x32,48,8,8,8,0,0,8,8);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(x32,40,20,4,12,-2,8,-4,12);
        ctx.drawImage(x32,0,20,4,12,-2,20,-4,12);
        ctx.restore();
        newSkin.preview.left = canvas.toDataURL();
        document.querySelector(".upload-left").src = newSkin.preview.left;
        /*Display Front*/
        canvas.width = 16; canvas.height = 32;
        ctx.drawImage(x32,8,8,8,8,4,0,8,8);
        ctx.drawImage(x32,40,8,8,8,4,0,8,8);
        ctx.drawImage(x32,20,20,8,12,4,8,8,12);
        ctx.drawImage(x32,44,20,4,12,0,8,4,12);
        ctx.drawImage(x32,4,20,4,12,4,20,4,12);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(x32,44,20,4,12,-12,8,-4,12);
        ctx.drawImage(x32,4,20,4,12,-8,20,-4,12);
        ctx.restore();
        newSkin.preview.front = canvas.toDataURL();
        document.querySelector(".upload-front").src = newSkin.preview.front;
        /*Display Right*/
        canvas.width = 8; canvas.height = 32;
        ctx.drawImage(x32,0,8,8,8,0,0,8,8);
        ctx.drawImage(x32,32,8,8,8,0,0,8,8);
        ctx.drawImage(x32,40,20,4,12,2,8,4,12);
        ctx.drawImage(x32,0,20,4,12,2,20,4,12);
        newSkin.preview.right = canvas.toDataURL();
        document.querySelector(".upload-right").src = newSkin.preview.right;
        /*Display Back*/
        canvas.width = 16; canvas.height = 32;
        ctx.drawImage(x32,24,8,8,8,4,0,8,8);
        ctx.drawImage(x32,56,8,8,8,4,0,8,8);
        ctx.drawImage(x32,32,20,8,12,4,8,8,12);
        ctx.drawImage(x32,52,20,4,12,12,8,4,12);
        ctx.drawImage(x32,12,20,4,12,8,20,4,12);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(x32,52,20,4,12,0,8,-4,12);
        ctx.drawImage(x32,12,20,4,12,-4,20,-4,12);
        ctx.restore();
        newSkin.preview.back = canvas.toDataURL();
        document.querySelector(".upload-back").src = newSkin.preview.back;
        tempSkin = newSkin;
        document.querySelector(".display-new-preview").style.display = "block";
    };
};
function createSkin() {
    const date = new Date();
    if (storage.user != "")
    tempSkin.uploader = storage.user.username;
    else
    tempSkin.uploader = "???";
    tempSkin.dateCreated = date;
    if (document.querySelector(".upl-user").value != "")
    tempSkin.name = document.querySelector(".upl-user").value;
    else
    tempSkin.name = "Untitled";
    tempSkin.description = document.querySelector(".upl-desc").value;
    if (document.querySelector(".upl-prof").checked) storage.misc[0] = {"skin":tempSkin.id};
    storage.skins[storage.skins.length] = tempSkin;
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
function displayUpload() {
    document.querySelector(".upload-screen").style.display = "block";
};
function hideUpload() {
    document.querySelector(".upload-screen").style.display = "none";
};
function displayView(i) {
    const acts = document.querySelectorAll(".stored-skin-action");
    document.querySelector(".stored-left").src = storage.skins[i].preview.left;
    document.querySelector(".stored-front").src = storage.skins[i].preview.front;
    document.querySelector(".stored-right").src = storage.skins[i].preview.right;
    document.querySelector(".stored-back").src = storage.skins[i].preview.back;
    const meta = document.querySelectorAll(".stored-metadata");
    meta[0].innerHTML = storage.skins[i].name;
    meta[1].innerHTML = `Uploader: ${storage.skins[i].uploader}`;
    meta[2].innerHTML = storage.skins[i].description;
    acts[0].download = `${storage.skins[i].name}.png`;
    acts[0].href = storage.skins[i].png;
    acts[1].onclick = () => {
        shareSkin(i);
    };
    acts[2].onclick = () => {
        setProfileSkin(i);
    };
    acts[3].download = `${storage.skins[i].name}.ztaskin`;
    acts[3].href = `data:text/plain;charset=utf-8,${btoa(JSON.stringify(storage.skins[i]))}`;
    acts[4].onclick = () => {
        deleteSkin(i);
    };
    document.querySelector(".view-skin-screen").style.display = "block";
};
function hideView() {
    document.querySelector(".view-skin-screen").style.display = "none";
};
function shareSkin(i) {
    const packedSkin = {
        "dateCreated":storage.skins[i].dateCreated,
        "name":storage.skins[i].name,
        "uploader":storage.skins[i].uploader,
        "description":storage.skins[i].description,
        "png":storage.skins[i].png
    };
    navigator.clipboard.writeText(`https://zetcher.net/alphatest/skins?share=${btoa(JSON.stringify(packedSkin))}`);
    alert("Copied Link to Clipboard!");
};
function setProfileSkin(i) {
    storage.misc[0] = {"skin":i};
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
function deleteSkin(i) {
    storage.skins[i] = {
        "id":i,
        "deleted":true
    };
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
function q(share) {
    let querySkin = JSON.parse(atob(share));
    let newSkin = {
        "id":storage.skins.length,
        "deleted":false,
        "dateCreated":querySkin.dateCreated,
        "name":querySkin.name,
        "uploader":querySkin.uploader,
        "description":querySkin.description,
        "png":querySkin.png,
        "preview":{
            "left":"",
            "front":"",
            "right":"",
            "back":""
        }
    };
    const texture = new Image();
    texture.src = newSkin.png;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    texture.onload = () => {
        /*Display Left*/
        canvas.width = 8; canvas.height = 32;
        ctx.drawImage(texture,16,8,8,8,0,0,8,8);
        ctx.drawImage(texture,48,8,8,8,0,0,8,8);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(texture,40,20,4,12,-2,8,-4,12);
        ctx.drawImage(texture,0,20,4,12,-2,20,-4,12);
        ctx.restore();
        newSkin.preview.left = canvas.toDataURL();
        /*Display Front*/
        canvas.width = 16; canvas.height = 32;
        ctx.drawImage(texture,8,8,8,8,4,0,8,8);
        ctx.drawImage(texture,40,8,8,8,4,0,8,8);
        ctx.drawImage(texture,20,20,8,12,4,8,8,12);
        ctx.drawImage(texture,44,20,4,12,0,8,4,12);
        ctx.drawImage(texture,4,20,4,12,4,20,4,12);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(texture,44,20,4,12,-12,8,-4,12);
        ctx.drawImage(texture,4,20,4,12,-8,20,-4,12);
        ctx.restore();
        newSkin.preview.front = canvas.toDataURL();
        /*Display Right*/
        canvas.width = 8; canvas.height = 32;
        ctx.drawImage(texture,0,8,8,8,0,0,8,8);
        ctx.drawImage(texture,32,8,8,8,0,0,8,8);
        ctx.drawImage(texture,40,20,4,12,2,8,4,12);
        ctx.drawImage(texture,0,20,4,12,2,20,4,12);
        newSkin.preview.right = canvas.toDataURL();
        /*Display Back*/
        canvas.width = 16; canvas.height = 32;
        ctx.drawImage(texture,24,8,8,8,4,0,8,8);
        ctx.drawImage(texture,56,8,8,8,4,0,8,8);
        ctx.drawImage(texture,32,20,8,12,4,8,8,12);
        ctx.drawImage(texture,52,20,4,12,12,8,4,12);
        ctx.drawImage(texture,12,20,4,12,8,20,4,12);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(texture,52,20,4,12,0,8,-4,12);
        ctx.drawImage(texture,12,20,4,12,-4,20,-4,12);
        ctx.restore();
        newSkin.preview.back = canvas.toDataURL();
        storage.skins[storage.skins.length] = newSkin;
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
            history.replaceState(null, "", "./skins");
            d();
            displayView(newSkin.id);
        }).catch(err => {
            console.log(err);
        });
    };
};