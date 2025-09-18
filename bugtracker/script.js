const BugReport = [
    {
        "title":"Weird Thing",
        "author":"8ba0-74aa",
        "status":"uid",
        "url":"id849.html",
    },
    {
        "title":"parts of world rearrange themself",
        "author":"19ba-50f3",
        "status":"uid",
        "url":"id726.html",
    },
    {
        "title":"falling below bedrock BROKE MY WORLD!!!",
        "author":"531a-9390",
        "status":"uid",
        "url":"id725.html",
    },
    {
        "title":"Music doesnt play right",
        "author":"20bc-308d",
        "status":"uid",
        "url":"id724.html",
    },
    {
        "title":"Chunk name generation bug",
        "author":"0000-0001 [dev]",
        "status":"uid",
        "url":"id723.html",
    },
    {
        "title":"Hub Door spawns in illegal location",
        "author":"0000-0001 [dev]",
        "status":"uid",
        "url":"id722.html",
    },
    {
        "title":"chunk with really weird name crashes game",
        "author":"????-????",
        "status":"uid",
        "url":"",
    },
    {
        "title":"Who wrote the download page? You dumb fuck its Aug not Oct",
        "author":"0000-0000 [dev]",
        "status":"uid",
        "url":"",
    },
    {
        "title":"WTF",
        "author":"abd3-013f [suspended]",
        "status":"uid_ban",
        "url":"",
    },
    {
        "title":"ingame skin changer crashes the game on a dedicated server",
        "author":"2132-ad90",
        "status":"uid",
        "url":"",
    },
    {
        "title":"Items in ID Input mode showing up as INVALID",
        "author":"0000-0001 [dev]",
        "status":"uid",
        "url":"id079.html",
    },
    {
        "title":"Audio not working in the hub",
        "author":"0000-0001 [dev]",
        "status":"uid",
        "url":"id078.html",
    },
    {
        "title":"PLAYER WITHOUT SKIN SPAWNED ??",
        "author":"ad99-c9e8",
        "status":"uid",
        "url":"",
    },
    {
        "title":"WHY BAN MY ACCOUNT ????? WHAT IS THIS ???",
        "author":"8436-b786 [suspended]",
        "status":"uid_ban",
        "url":"",
    },
    {
        "title":"Far render distance can crash the game",
        "author":"78cd-f96d",
        "status":"uid",
        "url":"",
    }
];


function displayReports() {
    for (let i = 0; i < BugReport.length; i++) {
        let div = document.createElement("div");
        div.className = "statusupdate";
        div.innerHTML = "<h3>Submitted by:</h3> <div class='"+BugReport[i].status+"'>"+BugReport[i].author+"</div>: <a href='./"+BugReport[i].url+"'>"+BugReport[i].title+"</a>";
        document.getElementById("reports").appendChild(div);
        document.getElementById("reports").appendChild(document.createElement("br"));
    };
};