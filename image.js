const dice_frame = document.getElementById("img-dice-modify");
const dice_button = document.getElementById("js-dice-button");

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

dice_button.addEventListener('click', async () => {
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
});

