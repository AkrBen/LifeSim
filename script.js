document.addEventListener("DOMContentLoaded", function () {

    const chat = document.getElementById("js-chat");
    const msg = document.getElementById("js-msg");
    const send = document.getElementById("js-send");

    let historique = [
        { role: "system", content: "tu es le maître du jeu d'un jeu type dongeons et dragons, mais sans le cadre fantastique " }
    ]; 
    
    // Verifier si Enter ou le bouton sont touchés pour envoyer le message
    /*send.addEventListener("click", function () {
        sendmsg();
    });*/
    msg.addEventListener("keydown", function (e) {
        if (e.key == "Enter"){
            sendmsg();
        }
    });


    function sendmsg(){
        // Recuperer le texte (value) et supprimer l'ancien (trim)
        const msg_t = msg.value.trim();
        if (msg_t) {
            historique.push({ role: "user", content: msg_t });
            msg.value = "";
            getrep(msg_t);
        }
    }

    function appendmsg(actmsg){
        const messageElement = document.createElement("div");
        messageElement.textContent = actmsg;
        chat.appendChild(messageElement);
    }
    
    async function getrep(actmsg){
        const apiKey = "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"; // Replace with your OpenAI API key
        const apiUrl = "https://openrouter.ai/api/v1/chat/completions";
        const valeur_de = Math.floor(Math.random() * 18) + 1;
        //const thinkingEl = appendTempMsg("Je réfléchis...");

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            body: JSON.stringify({
                model: "meta-llama/llama-3.3-70b-instruct:free",
                messages: historique,
            }),
            });

            const data = await response.json();
            const botMessage = data.choices[0].message.content;
            //thinkingEl.remove();
            historique.push({ role: "assistant", content: botMessage });
            appendmsg(botMessage);
        }
        catch (error){
            console.error("No chatbot response:", error);
            appendmsg("Le chatbot ne fonctionne pas. Redémarrer le site");
        }
    }



});