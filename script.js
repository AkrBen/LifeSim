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

    let pseudo = "";
    let personnage = "";
    let stats_nb = [];
    let univers = "";

    let list_perso = "";
    let list_item = "";
    let new_stats = "";
    let lancer_de = -1;

    let new_character = 1;
    let name_character = "";
    let caracteristiques_character = [];
    let personnages_scene = "";
    let besoin_de = 1;


    let monde = [
        { role: "system", content: "Agis comme un créateur d'univers de JDR. En fonction de mon prochain message, décris uniquement le monde dans lequel je vis (ambiance, décor, lore). Ne rédige aucune introduction ni conclusion, donne-moi juste la description brute." }
    ];
    let stats = [
        { role: "system", content: "Agis comme un moteur de calcul de statistiques JDR. Analyse le personnage et l'univers que je vais te décrire. Contraintes de calcul : Attribue des valeurs entre 3 et 18. Le total cumulé des six statistiques doit impérativement être compris entre 72 et 75 (pour un personnage équilibré mais capable). Format de réponse unique (strict) : FOR [NB] DEX [NB] CON [NB] INT [NB] WIS [NB] CHA [NB] Ne rédige aucun texte avant ou après les statistiques." }
    ];

    let historique = [
  {
    role: "system",
    content: `Agis comme maître de jeu d'un jeu type donjons et dragons.
        Pseudo joueur : ` + pseudo + `
        Personnage : ` + personnage + `
        Univers : ` + univers + `
        À chaque tour :
        - tu écouteras la requête du joueur"
        - si une action nécessite un jet de dé, tu demanderas à l'utilisateur de lancer un dé et tu utiliseras les résultat du dé de la réponse
        - interprétation de VAL :
        * 1 à 5 : échec total
        * 6 à 12 : réussite avec conséquences
        * 13 à 18 : réussite totale

        Tu recevras :

        Liste personnages : EXEMPLE -> Sami (fils), Edward (frère), etc
        Liste d'item : EXEMPLE -> Épée [+4 ST], etc
        Stats avec items : FOR [NB] DEX [NB] CON [NB] INT [NB] WIS [NB] CHA [NB]
        Dé: -1 si inutile ou nombre entre 1 et 18
        Action : 

        Tu renverras :

        Personnages : EXEMPLE -> Sami (fils), Edward (frère), etc avec ou pas un nouveau personnage
        Liste d'item  : liste actuelle avec + ou - d'items
        Nouveau personnage : 0 oui 1 non
        Nom personnage : Vide si non ou EXEMPLE -> Sami (fils)
        Characteristiques personnages : vide si non sinon sexe race skin old (sexe 0 femme 1 homme) (race 0 humain 1 non humain) (skin 0 aléatoire 1 beige 2 metisse 3 noir 4 bleu 5 vert) (old 0 sans 1 ride)
        Action : blablabla
        Personnages dans la scène : EXEMPLE -> Sami (fils), Edward (frere), etc
        Nécessite un dé ? : 0 oui 1 non
        `
    }
    ];


    document.getElementById("css-msg-stats").classList.add("hidden");
    // Verifier si les boutons sont touchés pour envoyer le message
    send_monde.addEventListener("click", function () {
        if (!msg_monde.value.trim()) {
            msg_monde.placeholder = "Entrez une description de l'univers où vous voulez vous placer pour pouvoir jouer";
            msg_monde.focus();
            return;
        }
        sendmsg(monde, chat_monde, msg_monde);
        //Cacher la barre monde quand un message est envoyé
        document.getElementById("css-msg-monde").classList.add("hidden");
        //Afficher la barre stats quand un message est envoyé
        document.getElementById("css-msg-stats").classList.remove("hidden");
    });
    sendmsg(historique, chat, chat_monde.value);
    
    send_stats.addEventListener("click", function () {
        if (!msg_stats.value.trim()) {
            msg_stats.placeholder = "Entrez une description du personnage pour pouvoir jouer";
            msg_stats.focus();
        return;
        }
        sendmsg(stats, chat_stats, msg_stats);
        document.getElementById("css-msg-stats").classList.add("hidden");
        
    });
    recup_stats(stats_nb, chat_stats);
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
                    personnage = msg_t;
                    msg_t = "univers : [" + univers + "] Personnage : [" + msg_t + "]";
                }
                if (w_histo==historique) {
                    lancer_de = Math.floor(Math.random() * 18) + 1;
                    if (besoin_de==1){
                        lancer_de = -1;
                    }
                    msg_t= 
                    `Liste personnages : ` + list_perso + ` 
                    Liste d'item : ` + list_item + `
                    Stats avec items : ` + new_stats + `
                    Dé: ` + lancer_de + `
                    Action : ` + msg_t;
                }
            }
            w_msg.value = "";
        } 
        w_histo.push({ role: "user", content: msg_t });
        getrep(w_histo, w_chat);  
    }

    function appendmsg(actmsg, w_chat){
        if (w_chat != chat) {
        const messageElement = document.createElement("div");
        messageElement.textContent = actmsg;
        w_chat.appendChild(messageElement);
        return;
        }

        const lines = actmsg.split("\n");
        lines.forEach((line) => {
            if (line.startsWith("Personnages :")) {
                list_perso = line.replace("Personnages :", "").trim();
            } else if (line.startsWith("Liste d'item :")) {
                list_item = line.replace("Liste d'item :", "").trim();
            } else if (line.startsWith("Nouveau personnage :")) {
                new_character = parseInt(line.replace("Nouveau personnage :", "").trim());
            } else if (line.startsWith("Nom personnage :")) {
                name_character = line.replace("Nom personnage :", "").trim();
            } else if (line.startsWith("Characteristiques personnages :")) {
                const caracStr = line.replace("Characteristiques personnages :", "").trim();
                if (caracStr) {
                    caracteristiques_character = caracStr.split(",").map((val) => parseInt(val.trim()));
                } else {
                    caracteristiques_character = [];
                }
            } else if (line.startsWith("Personnages dans la scène :")) {
                personnages_scene = line.replace("Personnages dans la scène :", "").trim();
            } else if (line.startsWith("Nécessite un dé ? :")) {
                besoin_de = parseInt(line.replace("Nécessite un dé ? :", "").trim());
            } else if (line.startsWith("Action :")) {
                const action = line.replace("Action :", "").trim();
                const messageElement = document.createElement("div");
                messageElement.textContent = action;
                w_chat.appendChild(messageElement);
            }
        });
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