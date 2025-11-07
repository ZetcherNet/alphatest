let db = new Localbase('alphatest');
let storage;
function skinSetup() {
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
            displaySkins();
        }).catch(err => {
            console.log(err);
        });
        else
        db.collection("storage").doc("hdd").get()
        .then(document => {
            storage = document.drive;
            displaySkins();
        });
    });
};
function displaySkins() {
    const displays = document.querySelectorAll(".skin-list");
    /*OFFICIAL*/
    const skinListO = [
        "Default",
        "Saltsven",
        "Bot0",
        "Bot1",
        "Bot2",
        "Bot3",
        "Bot4",
        "Bot5",
        "Bot6",
        "Bot7",
        "Bot8",
        "Bot9",
        "Bot10",
        "Bot11",
        "Bot12",
        "Zombie",
        "Collosal"
    ];
    for (let i = 0; i < skinListO.length; i++)
    fetch(`../+db+/skins/${skinListO[i]}.ztaskin`)
    .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.text();
    })
    .then(data => {
        const fetchedSkin = JSON.parse(atob(data));
        const entry = document.createElement("div");
        entry.className = "skin-entry";
        entry.innerHTML =
        `<div class="skin-preview">`+
        `<img class="sk-d-f" src="${fetchedSkin.preview.front}">`+
        `<img class="sk-d-b" src="${fetchedSkin.preview.back}">`+
        `</div>`+
        `<p class="sk-d-n">${fetchedSkin.name}</p>`+
        `<p class="sk-d-u">${fetchedSkin.uploader}</p>`+
        `<a class="sk-d-a" download="${fetchedSkin.name}.png" href="${fetchedSkin.png}"><button>Download</button></a>`;
        displays[0].appendChild(entry);
    })
    .catch(err => {
        console.log(err);
    });
    /*ARCHIVED*/
    const skinListA = [
        "DJ_155"
    ];
    for (let i = 0; i < skinListA.length; i++)
    fetch(`../+db+/skins/${skinListA[i]}.ztaskin`)
    .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.text();
    })
    .then(data => {
        const fetchedSkin = JSON.parse(atob(data));
        const entry = document.createElement("div");
        entry.className = "skin-entry";
        entry.innerHTML =
        `<div class="skin-preview">`+
        `<img class="sk-d-f" src="${fetchedSkin.preview.front}">`+
        `<img class="sk-d-b" src="${fetchedSkin.preview.back}">`+
        `</div>`+
        `<p class="sk-d-n">${fetchedSkin.name}</p>`+
        `<p class="sk-d-u">${fetchedSkin.uploader}</p>`+
        `<a class="sk-d-a" download="${fetchedSkin.name}.png" href="${fetchedSkin.png}"><button>Download</button></a>`;
        displays[1].appendChild(entry);
    })
    .catch(err => {
        console.log(err);
    });
    /*DOWNLOAD*/
    for (let i = storage.skins.length-1; i >= 0; i--) {
        if (!storage.skins[i].deleted) {
            const entry = document.createElement("div");
            entry.className = "skin-entry";
            entry.innerHTML =
            `<div class="skin-preview">`+
            `<img class="sk-d-f" src="${storage.skins[i].preview.front}">`+
            `<img class="sk-d-b" src="${storage.skins[i].preview.back}">`+
            `</div>`+
            `<p class="sk-d-n">${storage.skins[i].name}</p>`+
            `<p class="sk-d-u">${storage.skins[i].uploader}</p>`+
            `<a class="sk-d-a" download="${storage.skins[i].name}.png" href="${storage.skins[i].png}"><button>Download</button></a>`;
            displays[2].appendChild(entry);
        }
    };
};