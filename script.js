document.addEventListener("DOMContentLoaded", function () {

    const chat_monde = document.getElementById("js-chat-monde");
    const msg_monde = document.getElementById("js-msg-monde");
    const send_monde = document.getElementById("js-send-monde");

    const chat_stats = document.getElementById("js-chat-stats");
    const msg_stats = document.getElementById("js-msg-stats");
    const send_stats = document.getElementById("js-send-stats");

    const chat = document.getElementById("js-chat");
    const msg = document.getElementById("js-msg");
    const send = document.getElementById("js-send");

    let stats_nb = [];
    let univers = "";

    let monde = [
        { role: "system", content: "Agis comme un créateur d'univers de JDR. En fonction de mon prochain message, décris uniquement le monde dans lequel je vis (ambiance, décor, lore). Ne rédige aucune introduction ni conclusion, donne-moi juste la description brute." }
    ];
    let stats = [
        { role: "system", content: "Agis comme un moteur de calcul de statistiques JDR. Analyse le personnage et l'univers que je vais te décrire. Contraintes de calcul : Attribue des valeurs entre 3 et 18. Le total cumulé des six statistiques doit impérativement être compris entre 72 et 75 (pour un personnage équilibré mais capable). Format de réponse unique (strict) : FOR [NB] DEX [NB] CON [NB] INT [NB] WIS [NB] CHA [NB] Ne rédige aucun texte avant ou après les statistiques." }
    ];

    let historique = [
        { role: "system", content: "tu es un dragon extremement timide " }
    ];
    
    // Verifier si les boutons sont touchés pour envoyer le message
    send_monde.addEventListener("click", function () {
        sendmsg(monde, chat_monde, msg_monde);
    });
    
    send_stats.addEventListener("click", function () {
        sendmsg(stats, chat_stats, msg_stats);
    });
    
    send.addEventListener("click", function () {
        sendmsg(historique, chat, msg);
    });
    
    function recup_stats (st_list, st_string){
        let i = 0;
        let to_add = "";

        while (i < st_string.length){
            const act = st_string.charAt(i);
            i++;
            if (act >= '0' && act <= '9') {
                to_add += act;
            }
            else if (to_add !== ""){
                st_list.push(parseInt(to_add));
                to_add = "";
            }

        }
        if (to_add !== ""){
            st_list.push(parseInt(to_add));
            to_add = "";
        }
    }

    function sendmsg(w_histo, w_chat, w_msg){
        // Recuperer le texte (value) et supprimer l'ancien (trim)
        let msg_t = w_msg.value.trim();
        if (msg_t) {

            if (w_histo == stats) {
                msg_t = "univers : [" + univers + "] Personnage : [" + msg_t + "]";
            }

            w_histo.push({ role: "user", content: msg_t });
            w_msg.value = "";
            getrep(w_histo, w_chat);
        }   
    }

    function appendmsg(actmsg, w_chat){
        const messageElement = document.createElement("div");
        messageElement.textContent = actmsg;
        w_chat.appendChild(messageElement);
    }
    
    async function getrep(w_histo, w_chat){
        const apiKey = "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"; // Replace with your OpenAI API key
        const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            body: JSON.stringify({
                model: "meta-llama/llama-3.3-70b-instruct:free",
                messages: w_histo,
            }),
            });

            const data = await response.json();
            const botMessage = data.choices[0].message.content;
            w_histo.push({ role: "assistant", content: botMessage });

            if (w_histo == monde) {
                univers = botMessage;
                appendmsg(botMessage, w_chat);
            }
            else if (w_histo == stats) {
                recup_stats (stats_nb, botMessage);
                appendmsg(botMessage, w_chat);
            }
            else appendmsg(botMessage, w_chat);
        }
        catch (error){
            console.error("No chatbot response:", error);
            appendmsg("Le chatbot ne fonctionne pas. Redémarrer le site", w_chat);
        }
    }



});