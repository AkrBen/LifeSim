function getRandomInt(max) {
  return 1 + Math.floor(Math.random() * max);
}

function chargerImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Erreur de chargement : " + src));
  });
}

async function preparerSource(source) {
  if (typeof source === "string") {
    return await chargerImage(source);
  }
  return source;
}

  async function calquage(imageFond, imageCalque) {
    // 1. Création du canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    //ctx.imageSmoothingEnabled = false;
    //ctx.imageSmoothingQuality = "low";

    // 2. Chargement des images
    const fond = await preparerSource(imageFond);
    const calque = await preparerSource(imageCalque);

    // 3. Dimension du canvas = image de fond
    canvas.width = fond.width;
    canvas.height = fond.height;

    // 4. Dessin du fond
    ctx.drawImage(fond, 0, 0);

    // 5. Dessin du calque par-dessus
    ctx.drawImage(calque, 0, 0);

    // 6. Retour du canvas (résultat final)
    return canvas;
  }

  async function ModifierImg(image, saturation, teinte) {
    // 1. Création du canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = "low";

    // 2. Chargement des images
    const fond = await preparerSource(image);

    // 3. Dimension du canvas = image de fond
    canvas.width = fond.width;
    canvas.height = fond.height;

    ctx.filter = "hue-rotate(" + teinte + "deg) saturate(" + saturation + "%)";

    // 4. Dessin du filtre par-dessus
    ctx.drawImage(fond, 0, 0);

    // 5. On reset le filtre pour ne pas qu'il soit aàppliqué sur d'autres images
    ctx.filter = "none";

    // 6. Retour du canvas (résultat final)
    return canvas;
  }



async function newCharacter (sexe,race,skin,old){
  const v = getRandomInt(2);
  let act_face = "Characters/"+ v + ".png";
  let act_skin;
  if (skin > 0) {
    act_skin = "Characters/Skin" + v + "/" + skin + ".png";
  }
  else {
    act_skin = "Characters/Skin" + v + "/" + (race ? 3 + getRandomInt(2) : getRandomInt(2)) + ".png";
  }
  let act_sexe = "Characters/Skin" + v + "/sexe/" + sexe;

  let act_eyes = act_sexe + "/" + (race ? 3 + getRandomInt(3) : getRandomInt(3)) + ".png";
  let hair = act_sexe + "/Coupes/" + getRandomInt(4) + ".png";
  let habit = act_sexe + "/Coupes/Habits/" +(race ? getRandomInt(4) : getRandomInt(3)) + ".png";
  let act_age = "Characters/old.png";

  let rendu = await calquage(act_face, act_skin);
  if (old) {
    rendu = await calquage(rendu, act_age);
  }
  const new_eyes = await ModifierImg(act_eyes, getRandomInt(100) - 50, getRandomInt(360) - 180);
  rendu = await calquage(rendu, new_eyes);
  const satur_hair = old ? 0 : getRandomInt(100) - 50;
  const new_hair = await ModifierImg(hair, satur_hair, getRandomInt(360) - 180);
  rendu = await calquage(rendu, new_hair);
  const new_habit = await ModifierImg(habit, getRandomInt(100) - 50, getRandomInt(360) - 180);
  return await calquage(rendu, new_habit);
  
}

newCharacter (1,0,0,1)
  .then(canvas => {
    document.body.appendChild(canvas);
  })
  .catch(err => {
    console.error(err);
  });
