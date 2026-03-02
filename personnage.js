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
    let width = image.clientWidth;
    let height = image.clientHeight;
    let ratio = canvas.style.width / canvas.style.height;
    canvas.style.width = (width * (1/(nombre_persos+5)) + "px");
    canvas.style.height = (canvas.style.width/ratio) + "px";
    canvas.style.left = ((canvas.style.width * numéro_perso) +5) + "px";
    canvas.style.bottom = (0) + "px";
    //canvas.querySelector('p').style.fontSize = (width * (110/1030)) + "px";
}
