const popUpPseudo = document.getElementById("pop-up-pseudo");
const buttonPseudo = document.getElementById("js-next-button-p");
const textPseudo = document.getElementById("js-next-text-p");

const popUpUnivers = document.getElementById("pop-up-univers");
const buttonUnivers = document.getElementById("js-next-button-u");
const textUnivers = document.getElementById("js-next-text-u");

const popUpPersonnage = document.getElementById("pop-up-personnage");
const buttonPersonnage = document.getElementById("js-next-button-ps");
const textPersonnage = document.getElementById("js-next-text-ps");

const hourglassElement = document.getElementById("hourglass");
const buttonSend = document.getElementById("js-send");

buttonHistorique = document.getElementById("js-send");

const popUp = document.getElementById("pop-up");

buttonPseudo.addEventListener("click", () => {
    popUpPseudo.style.display = "none";
    pseudo = textPseudo.value;
    popUpUnivers.style.zIndex = "10";
    hourglass();
});

buttonUnivers.addEventListener("click", async () => {
    hourglassElement.style.zIndex = "100";
    popUp.style.zIndex = "50";
    popUpUnivers.style.display = "none";
    await sendmsg(monde, chat_monde, msg_monde);
    popUp.style.zIndex = "3";
    hourglassElement.style.zIndex = "-100";
    
    popUpPersonnage.style.zIndex = "10";
});

buttonPersonnage.addEventListener("click", async () => {
    hourglassElement.style.zIndex = "100";
    popUp.style.zIndex = "50";
    popUpPersonnage.style.display = "none";
    await sendmsg(stats, chat_stats, msg_stats);
    await commence_partie();
    hourglassElement.style.zIndex = "-100";
    
    popUp.style.zIndex = "-10";
    
});

buttonHistorique.addEventListener("click", async () => {
    buttonSend.style.zIndex = "-1";
    msg.value = "";
    await sendmsg(historique, chat, msg);
});

window.addEventListener('load', () => {

    background();

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

    var dice_number = document.getElementById('dice-value'); 
    dice_number.style.width = (width * (110/1030)) + "px";
    dice_number.style.height = (height * (90/950)) + "px";
    dice_number.style.left = (width * (690/1030)) + "px";
    dice_number.style.bottom = (height * (140/950)) + "px";
    dice_number.querySelector('p').style.fontSize = (width * (110/1030)) + "px";
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

    var dice_number = document.getElementById('dice-value'); 
    dice_number.style.width = (width * (110/1030)) + "px";
    dice_number.style.height = (height * (90/950)) + "px";
    dice_number.style.left = (width * (690/1030)) + "px";
    dice_number.style.bottom = (height * (140/950)) + "px";
    dice_number.querySelector('p').style.fontSize = (width * (110/1030)) + "px";

});

function besoin_de_de() {
    dice_frame.src = `./interface/dice/-3.png`;
    dice_button.style.zIndex = "1";
    var dice_number = document.getElementById('dice-value');
    dice_number.querySelector('p').style.color = `rgba(255, 255, 255, 0)`;

}
