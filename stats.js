const statFor = document.getElementById("value_for");
const statDex = document.getElementById("value_dex");
const statCon = document.getElementById("value_con");
const statInt = document.getElementById("value_int");
const statWis = document.getElementById("value_wis");
const statCha = document.getElementById("value_cha");

async function new_stats() {
    if (!Array.isArray(stats_nb) || stats_nb.length < 6) {
        return;
    }

    const values = {
        forr: stats_nb[0],
        dex: stats_nb[1],
        con: stats_nb[2],
        int: stats_nb[3],
        wis: stats_nb[4],
        cha: stats_nb[5]
    };

    statFor.src = `interface/stats/stats_${Math.floor(stats_nb[0] / 3)}.png`;
    statDex.src = `interface/stats/stats_${Math.floor(stats_nb[1] / 3)}.png`;
    statCon.src = `interface/stats/stats_${Math.floor(stats_nb[2] / 3)}.png`;
    statInt.src = `interface/stats/stats_${Math.floor(stats_nb[3] / 3)}.png`;
    statWis.src = `interface/stats/stats_${Math.floor(stats_nb[4] / 3)}.png`;
    statCha.src = `interface/stats/stats_${Math.floor(stats_nb[5] / 3)}.png`;

    statFor.title = `${values.forr}`;
    statDex.title = `${values.dex}`;
    statCon.title = `${values.con}`;
    statInt.title = `${values.int}`;
    statWis.title = `${values.wis}`;
    statCha.title = `${values.cha}`;

    statFor.alt = `${values.forr}`;
    statDex.alt = `${values.dex}`;
    statCon.alt = `${values.con}`;
    statInt.alt = `${values.int}`;
    statWis.alt = `${values.wis}`;
    statCha.alt = `${values.cha}`;
}
