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
    let height = image.clientHeight;
    let ratio = canvas.width / canvas.height;
    //ctx.imageSmoothingEnabled = false;
    //ctx.imageSmoothingQuality = "low";
    canvas.style.width = (width * (1/(nombre_persos+5)) + "px");
    canvas.style.height = (parseFloat(canvas.style.width)/ratio) + "px";
    //canvas.style.left = ((parseFloat(canvas.style.width) * numéro_perso) +5) + "px";
    canvas.style.left = ((width - nombre_persos*parseFloat(canvas.style.width) - ((nombre_persos-1) *5))/2 + ((parseFloat(canvas.style.width)+5) * (numéro_perso-1))) + "px";
    canvas.style.bottom = (0) + "px";
    canvas.style.position = "absolute";
    //canvas.querySelector('p').style.fontSize = (width * (110/1030)) + "px";
}
