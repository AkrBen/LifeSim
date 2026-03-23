let image= document.getElementById("interface-image");

function extraireNoms(personnages_scene_str) {
    const noms = personnages_scene_str
        .split(",")
        .map(p => {
            const nom = p.trim().split("(")[0].trim();
            return nom;
        })
        .filter(nom => nom !== ""); 
    
    return noms;
}

function redimensionnement(canvas, nombre_persos, numéro_perso) {
    //const ctx = canvas.getContext("2d");
    let width = image.clientWidth;
    const borderElement = image.querySelector("#border");
    let ratio = canvas.width / canvas.height;
    const gap = 5;
    const totalPersos = Math.max(1, nombre_persos);
    const canvasWidth = width * (1 / (totalPersos + 5));
    const totalWidth = totalPersos * canvasWidth + (totalPersos - 1) * gap;
    const startX = (width - totalWidth) / 2;

    //ctx.imageSmoothingEnabled = false;
    //ctx.imageSmoothingQuality = "low";
    canvas.style.width = (canvasWidth + "px");
    canvas.style.height = (parseFloat(canvas.style.width)/ratio) + "px";
    //canvas.style.left = ((parseFloat(canvas.style.width) * numéro_perso) +5) + "px";
    canvas.style.left = (startX + (numéro_perso - 1) * (canvasWidth + gap)) + "px";
    const containerHeight = image.clientHeight;
    const canvasHeight = parseFloat(canvas.style.height);
    canvas.style.top = ((containerHeight - canvasHeight) / 2) + "px";
    canvas.style.position = "absolute";
    canvas.style.imageRendering = "pixelated";
    //canvas.querySelector('p').style.fontSize = (width * (110/1030)) + "px";
}

function redimensionnerTousLesPersonnages() {
    const canvases = Array.from(image.querySelectorAll("canvas")).filter((canvas) => !canvas.hidden);
    const nombre_persos = canvases.length;

    canvases.forEach((canvas, index) => {
        redimensionnement(canvas, nombre_persos, index + 1);
    });
}

window.addEventListener("load", () => {
    redimensionnerTousLesPersonnages();
});

window.addEventListener("resize", () => {
    redimensionnerTousLesPersonnages();
});
