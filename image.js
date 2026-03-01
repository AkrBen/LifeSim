const dice_frame = document.getElementById("img-dice-modify");
const dice_button = document.getElementById("js-dice-button");

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

dice_button.addEventListener('click', async () => {
    var dice_number = document.getElementById('dice-value');
    dice_number.querySelector('p').textContent = lancer_de;
    dice_button.style.zIndex = "-1";
    for (let i = -2; i <= 13; i++) {
        dice_frame.src = `./interface/dice/${i}.png`;
        if (i >= 0) {
            await sleep(100);
        }
        else {
            await sleep(10);
        }
    }
    await sleep(10);
    for (let i = 0; i <= 10; i++) {
        dice_number.querySelector('p').style.color = `rgba(255, 255, 255, ${i/10})`;
        await sleep(5);
    }
    await sleep(100);
    chat.appendChild(action_dice);
    action_dice = null;
});

async function background(){
    const backgroundSelector = document.querySelector('#js-background');

    const backgroundBorder = document.querySelector('#interface-image #border');
    backgroundBorder.style.backgroundImage = `linear-gradient(rgba(89, 86, 82, 0), rgba(89, 86, 82, 0))`;
    
    
    let chargedImages = [];
    for (let j = 0; j <= 5; j++) {
        chargedImages[j] = [];
        let max = 8;
        if (j === 3 || j === 4) max = 2;
        for (let i = 0; i <= max; i++) {
            chargedImages[j].push(`./interface/backgrounds/${j}${i}.png`);
        }
    }
    
    while(true){
        let act_fond = fond;
        
        if (chargedImages[act_fond]) {
            for (let i = 0; i < chargedImages[act_fond].length; i++) {
                backgroundSelector.style.backgroundImage = `url('${chargedImages[act_fond][i]}')`;
                await sleep(1000);
            }
        }
    }
}