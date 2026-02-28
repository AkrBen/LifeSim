const popUpPseudo = document.getElementById("pop-up-pseudo");
const buttonPseudo = document.getElementById("js-next-button-p");
const textPseudo = document.getElementById("js-next-text-p");

const popUpUnivers = document.getElementById("pop-up-univers");
const buttonUnivers = document.getElementById("js-next-button-u");
const textUnivers = document.getElementById("js-next-text-u");

const popUpPersonnage = document.getElementById("pop-up-personnage");
const buttonPersonnage = document.getElementById("js-next-button-ps");
const textPersonnage = document.getElementById("js-next-text-ps");

buttonHistorique = document.getElementById("js-send");

const popUp = document.getElementById("pop-up");


buttonPseudo.addEventListener("click", () => {
    popUpPseudo.style.zIndex = "-10";
    pseudo = textPseudo.value;
    popUpUnivers.style.zIndex = "10";
});

buttonUnivers.addEventListener("click", async () => {
    await sendmsg(monde, chat_monde, msg_monde);
    popUpUnivers.style.zIndex = "-10";
    popUpPersonnage.style.zIndex = "10";
});

buttonPersonnage.addEventListener("click", async () => {
    await sendmsg(stats, chat_stats, msg_stats);
    await commence_partie();
    popUpPersonnage.style.zIndex = "-10";
    popUp.style.zIndex = "-10";
    
});

buttonHistorique.addEventListener("click", async () => {
    await sendmsg(historique, chat, msg);
});

window.addEventListener('load', () => {
    var img = document.getElementById('img-dice-modify'); 
    var button = document.getElementById('dice-button');
    var width = img.clientWidth;
    var height = img.clientHeight;
    button.style.width = width + "px";
    button.style.height = height + "px";

    var button = document.getElementById('js-dice-button');
    button.style.width = (width * (332/950)) + "px";
    button.style.height = (height * (150/1030)) + "px";
    button.style.left = (width * (580/1030)) + "px";
    button.style.bottom = (height * (710/950)) + "px";
});

window.addEventListener('resize', () => {
    var img = document.getElementById('img-dice-modify'); 
    var button_interface = document.getElementById('dice-button');
    var width = img.clientWidth;
    var height = img.clientHeight;
    button_interface.style.width = width + "px";
    button_interface.style.height = height + "px";

    dice_button.style.width = (width * (332/950)) + "px";
    dice_button.style.height = (height * (150/1030)) + "px";
    dice_button.style.left = (width * (580/1030)) + "px";
    dice_button.style.bottom = (height * (710/950)) + "px";
});

function besoin_de_de() {
    dice_frame.src = `./interface/dice/-3.png`;
    dice_button.style.zIndex = "1";
}