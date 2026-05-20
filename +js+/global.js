function findMember(username) {
    if (typeof MEMBER != "object") return 0;
    for (let i = 0; i < MEMBER.length; i++) if (MEMBER[i].username == username) return i;
};