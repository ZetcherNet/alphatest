let demos = [[],[],[],[],[],[]];
function fetchDemo(d) {
    fetch(`./!db/demos/${LEADERBOARD.Freerun[d]}.mcdem`)
    .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.text();
    })
    .then(data => {
        let val = {
            "user":data.split(/\r?\n/)[2].replace("+player:",""),
            "levl":Number(data.split(/\r?\n/)[1].replace("+dwmeta:RECDEMO ON 1.0.16.05R4 [/freerun/WorldFreerun","").replace("]","")),
            "time":(5*((data.split(/\r?\n/)).length-4))/100,
            "file":`./!db/demos/${LEADERBOARD.Freerun[d]}.mcdem`
        };
        demos[val.levl][demos[val.levl].length] = val
        if (d == LEADERBOARD.Freerun.length-1) setTimeout(function(){displayFreerun(demos)},100);
        else {
            d++;
            fetchDemo(d);
        };
    })
    .catch(err => {
        console.log(err);
    });
};
fetchDemo(0);
function displayFreerun(demos) {
    for (let i = 0; i < 6; i++) demos[i].sort(function(a,b){return a.time - b.time});
    for (let i = 0; i < 6; i++) {
        const entries = document.querySelector(`.rf-${i}`);
        for (let f = 0; f < demos[i].length; f++) {
            const entry = document.createElement("div");
            entry.className = "entry";
            entry.innerHTML = `<p class="fr-name">${demos[i][f].user}</p><p class="fr-time">${setCorrectDemoTime(demos[i][f].time)}</p><a class="fr-file" href="${demos[i][f].file}" download>[Download]</a>`;
            entries.appendChild(entry);
        };
    };
};
function setCorrectDemoTime(data) {
    let ms = Math.round((data % 1)*100)
    let s = Math.trunc(data) % 60;
    let m = getM(data);
    return `${"00".slice(m.toString().length)+m.toString()}:${"00".slice(s.toString().length)+s.toString()}.${ms.toString()+"000".slice(ms.toString().length)}`;
    function getM(d) {
        let nm = 0;
        let fs = Math.trunc(d);
        while (fs >= 60) {
            fs -= 60;
            nm++
        };
        return nm;
    };
};