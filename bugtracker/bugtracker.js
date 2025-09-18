function display() {
    let url = window.location.hash.toLowerCase().slice(1);
    let page = Number(url.slice(0, url.indexOf(":")).slice(5));
    let view = Number(url.slice(url.indexOf(":")+1).slice(5));
    if (url == "" || url.indexOf("page=") == -1 || url.indexOf("view=") == -1 || isNaN(page) || isNaN(view) || page <= 0 || view <= 0) {
        window.location.href = "#Page=1:View=5";
        url = "page=1:view=5";
        page = 1;
        view = 5;
    };
    const list = ["849", "726", "725", "724", "723", "722", "711", "7xx3", "7xx2", "7xx1", "79", "78", "7x3", "7x2", "7x1"];
    if (view > list.length) view = list.length;
    /*while (page * view > list.length) page--;*/
    document.querySelector(".js-count").innerHTML = "Showing " + view + " per page";
    let index = "Page:";
    for (let i = 0; i < Math.ceil(list.length/view); i++) i == page - 1 ? index += " "+(i+1) : index += " <a href='#Page="+(i+1)+":View="+view+"' onclick='refresh(\"#Page="+(i+1)+":View="+view+"\")'>"+(i+1)+"</a>";
    document.querySelector(".js-index").innerHTML = index;
    const BugReport = [
        {"title":"Weird Thing","author":"8ba0-74aa","status":"uid","url":"./id#849",},
        {"title":"parts of world rearrange themself","author":"19ba-50f3","status":"uid","url":"./id#726",},
        {"title":"falling below bedrock BROKE MY WORLD!!!","author":"531a-9390","status":"uid","url":"./id#725",},
        {"title":"Music doesnt play right","author":"20bc-308d","status":"uid","url":"./id#724",},
        {"title":"Chunk name generation bug","author":"0000-0001 [dev]","status":"uid","url":"./id#723",},
        {"title":"Hub Door spawns in illegal location","author":"0000-0001 [dev]","status":"uid","url":"./id#722",},
        {"title":"chunk with really weird name crashes game","author":"????-????","status":"uid","url":"",},
        {"title":"Who wrote the download page? You dumb fuck its Aug not Oct","author":"0000-0000 [dev]","status":"uid","url":"",},
        {"title":"WTF","author":"abd3-013f [suspended]","status":"uid_ban","url":"",},
        {"title":"ingame skin changer crashes the game on a dedicated server","author":"2132-ad90","status":"uid","url":"",},
        {"title":"Items in ID Input mode showing up as INVALID","author":"0000-0001 [dev]","status":"uid","url":"./id#79",},
        {"title":"Audio not working in the hub","author":"0000-0001 [dev]","status":"uid","url":"./id#78",},
        {"title":"PLAYER WITHOUT SKIN SPAWNED ??","author":"ad99-c9e8","status":"uid","url":"",},
        {"title":"WHY BAN MY ACCOUNT ????? WHAT IS THIS ???","author":"8436-b786 [suspended]","status":"uid_ban","url":"",},
        {"title":"Far render distance can crash the game","author":"78cd-f96d","status":"uid","url":"",},
    ];
   for (let i = (page-1)*view; i < page*view; i++) {
        /*
       try {
            fetch("./database/id"+list[i]+".json")
            .then(res => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then(data => {
                display(data);
            })
            .catch(err => {
                console.error("ERROR: ", err);
            });
        }catch{};
        */
       try {
           console.log(i)
           let div = document.createElement("div");
           div.className = "status-update";
           div.innerHTML = "<h3>Submitted by:</h3> <div class='"+BugReport[i].status+"'>"+BugReport[i].author+"</div>: "+linkable(BugReport[i].url,BugReport[i].title);
           document.querySelector(".reports").appendChild(div);
           document.querySelector(".reports").appendChild(document.createElement("br"));
        }catch{};
   };
   function linkable(linkURL, linkName) {
        return linkURL !== "" ? "<a href='./"+linkURL+"'>"+linkName+"</a>" : "<p>"+linkName+"</p>";
   };
};
function report() {
    let url = window.location.hash.toLowerCase().slice(1);
    try {
        fetch("./database/id"+url+".json")
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(data => {
            document.querySelector("title").innerHTML = "Bug Report ["+data.report+"]";
            document.querySelector(".id").innerHTML = "["+data.report+"] "+data.title;
            document.querySelector(".submitter").innerHTML = "Submitted by: <span class='"+data.status+"'>"+data.author+"</span>";
            document.querySelector(".status").innerHTML = "Status: "+data.page.status;
            document.querySelector(".description").innerHTML = data.page.information;
            if (data.page.attachments.length > 0) {
                document.querySelector(".file-list").innerHTML = "";
                for (let i = 0; i < data.page.attachments.length; i++) {
                    let attach = document.createElement("div");
                    attach.className = data.page.attachments[i].youtube ? "embed-attach" : "file-attach";
                    attach.innerHTML = data.page.attachments[i].youtube ? "You Tube video:<br><video width=\"560\" height=\"315\" src='./attachments/"+data.page.attachments[i].file+"' controls=\"\"></video>" : "<a href='./attachments/"+data.page.attachments[i].file+"'>"+data.page.attachments[i].name+"</a> ("+data.page.attachments[i].size+")";
                    document.querySelector(".file-list").appendChild(attach);
                };
            };
            for (let i = 0; i < data.page.comments.length; i++) {
                let comment = document.createElement("div");
                comment.className = "status-update";
                comment.innerHTML = " <h3>[######]</h3> <div class='"+data.page.comments[i].status+"'>"+data.page.comments[i].poster+"</div>"+action(data.page.comments[i].post)+data.page.comments[i].post;
                document.querySelector(".comment-section").appendChild(comment);
                document.querySelector(".comment-section").appendChild(document.createElement("br"));
            };
            function action(str) {
                return (str.includes("[#")||str.includes("Fixed")||str.includes("Resolved")||str.includes("Accepted")||str.includes("Closed")||str.includes("thread created")) ? ": " : " "; 
            };
        })
        .catch(err => {
            console.error("ERROR: ", err);
        });
    }catch{};
};
function refresh(hash) {
    window.location.href = hash;
    window.location.reload();
};