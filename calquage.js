function chargerImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Erreur de chargement : " + src));
  });
}

async function calquage(imageFond, imageCalque) {
  // 1. Création du canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 2. Chargement des images
  const fond = await chargerImage(imageFond);
  const calque = await chargerImage(imageCalque);

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
