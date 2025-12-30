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
    let lancer_dé=1;

    let monde = [
        { role: "system", content: "Agis comme un créateur d'univers de JDR. En fonction de mon prochain message, décris uniquement le monde dans lequel je vis (ambiance, décor, lore). Ne rédige aucune introduction ni conclusion, donne-moi juste la description brute." }
    ];
    let stats = [
        { role: "system", content: "Agis comme un moteur de calcul de statistiques JDR. Analyse le personnage et l'univers que je vais te décrire. Contraintes de calcul : Attribue des valeurs entre 3 et 18. Le total cumulé des six statistiques doit impérativement être compris entre 72 et 75 (pour un personnage équilibré mais capable). Format de réponse unique (strict) : FOR [NB] DEX [NB] CON [NB] INT [NB] WIS [NB] CHA [NB] Ne rédige aucun texte avant ou après les statistiques." }
    ];

    /*let historique = [
        { role: "system", content: "Agis comme maître de jeu d'un jeu type dongeons et dragons. Tu recevras une description d'univers où se tiendra le jeu en début de partie, ainsi que les statistiques du personnage, sous le format FOR [NB] DEX [NB] CON [NB] INT [NB] WIS [NB] CHA [NB]. A chaque tour: 
            -tu écouteras la requête du joueur pour savoir ce qu'il veut faire, sous le format "[requête du joueur]||Lancer de dé=VAL", et si il veut faire certaines actions qui ne peuvent marcher que dans certaines circomstances, tu lui demanderas de jeter un dé. 
            -Dans le cas où tu auras dit à l'utilisateur de lancer un dé tu utiliseras VAL: Entre 1 et 5, le joueur échoue totalement son action, entre 6 et 12 le joueur réussit son action avec certaines répercussions. Entre 12 et 18, le joueur réussit totalement son action.
            -Tu répondras en donnant une résultante de la décision du joueur, et si cette décision a impacté ses points de statistiques, et si oui comment, ainsi que ses nouveux choix en fonction de sa situation actuelle. Tu calculeras et donneras ensuite les nouvelles statistiques, de sorte que ta réponse sera sous le format: [réponse écrite]||FOR [NB] DEX [NB] CON [NB] INT [NB] WIS [NB] CHA [NB]. Tu suiveras cet exact format dans toutes tes réponses. "
             }
    ];*/

    let historique = [
    {
        role: "system",
        content: `Agis comme maître de jeu d'un jeu type donjons et dragons.
    Tu recevras une description d'univers où se tiendra le jeu en début de partie,
    ainsi que les statistiques du personnage, sous le format :
    FOR [NB] DEX [NB] CON [NB] INT [NB] WIS [NB] CHA [NB].

    À chaque tour :
    - tu écouteras la requête du joueur sous le format "[requête du joueur]||Lancer de dé=VAL"
    - si une action nécessite un jet de dé, tu demanderas à l'utilisateur de lancer un dé
    - interprétation de VAL :
    * 1 à 5 : échec total
    * 6 à 12 : réussite avec conséquences
    * 13 à 18 : réussite totale

    Tu répondras sous le format exact :
    [résultat narratif]||FOR [NB] DEX [NB] CON [NB] INT [NB] WIS [NB] CHA [NB].
    Tu respecteras strictement ce format.`
    }
    ];

    
    // Verifier si les boutons sont touchés pour envoyer le message
    send_monde.addEventListener("click", function () {
        sendmsg(monde, chat_monde, msg_monde);
    });
    sendmsg(historique, chat, chat_monde);
    
    send_stats.addEventListener("click", function () {
        sendmsg(stats, chat_stats, msg_stats);
    });
    //recup_stats(stats_nb, chat_stats);
    sendmsg(historique, chat, stats_nb);

    
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
        let msg_t="";
        if (Array.isArray(w_msg)){
                msg_t = "FOR ["+ w_msg[0] +"] DEX ["+ w_msg[1] +"] CON ["+ w_msg[2] +"] INT ["+ w_msg[3] +"] WIS ["+ w_msg[4] +"] CHA ["+ w_msg[5] +"]"
        } else {

            msg_t = w_msg.value.trim();
            if (msg_t) {

                if (w_histo == stats) {
                    msg_t = "univers : [" + univers + "] Personnage : [" + msg_t + "]";
                }
                if (w_histo==historique) {
                    lancer_dé=Math.floor(Math.random() * 18) + 1;
                    msg_t=msg_t+"||Lancer de dé=" + lancer_dé;
                }
            }
            w_msg.value = "";
        } 
        w_histo.push({ role: "user", content: msg_t });
        getrep(w_histo, w_chat);  
    }

    function appendmsg(actmsg, w_chat){
        const messageElement = document.createElement("div");
        messageElement.textContent = actmsg;
        w_chat.appendChild(messageElement);
    }
    
    async function getrep(w_histo, w_chat){
        const apiKey = "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"; // Replace with your OpenAI API key
        const apiUrl = "https://openrouter.ai/api/v1/chat/completions";
        let stats_string="";

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
            let botMessage = data.choices[0].message.content;
            w_histo.push({ role: "assistant", content: botMessage });
            if (w_histo == monde) {
                univers = botMessage;
            }
            else if (w_histo == stats) {
                recup_stats (stats_nb, botMessage);
            }
            else if (w_histo== historique){
                let parties = botMessage.split("||");
                botMessage=parties[0];
                stats_string=parties[1];
                recup_stats(stats_nb, stats_string);
            }
            appendmsg(botMessage, w_chat);
        }
        catch (error){
            console.error("No chatbot response:", error);
            appendmsg("Le chatbot ne fonctionne pas. Redémarrer le site", w_chat);
        }
    }

    /*function maitre_de_jeu (chat_monde, chat_stats, msg) {
        sendmsg(historique, chat, msg);

    }*/


});