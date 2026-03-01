let image= document.getElementById("interface-image");

function redimensionnement(canvas, nombre_persos, numéro_perso) {
    let width = image.clientWidth;
    let height = image.clientHeight;
    canvas.style.width = (width * (1/nombre_persos)) + "px";
    canvas.style.height = (height * (90/950)) + "px";
    canvas.style.left = (width * ((690+(nombre_persos*120))/1030)) + "px";
    canvas.style.bottom = (height * (140/950)) + "px";
    canvas.querySelector('p').style.fontSize = (width * (110/1030)) + "px";
}
