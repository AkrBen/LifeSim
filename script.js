let chat = document.getElementById("js-chat");
let msg = document.getElementById("js-msg");
    
let chat_monde = document.getElementById("js-chat");
let msg_monde = document.getElementById("js-next-text-u");

let chat_stats = document.getElementById("js-chat");
let msg_stats = document.getElementById("js-next-text-ps");

let action_dice;

let pseudo = "";
let personnage = "";
let stats_nb = [];
let univers = "";
let statistiques = "";
let historique = [];
let fond = 1;

let list_perso = "";
let list_item = "";
let lancer_de = -1;

let new_character = 1;
let name_character = "";
let caracteristiques_character = [];
let personnages_scene = "";
let besoin_de = "non";

let monde = [
    { role: "system", content: "Agis comme un créateur d'univers de JDR. Décris-moi l'ambiance, le décor et l'objectif actuel de manière claire et immersive, sans utiliser de mots inutilement complexes ou de phrases pompeuses. Va droit au but avec un style direct : pas d'introduction, pas de conclusion, juste la description brute du monde et de ce qu'on doit y accomplir." }
];
let stats = [
    { role: "system", content: "Agis comme un moteur de calcul de statistiques JDR. Analyse le personnage et l'univers que je vais te décrire. Contraintes de calcul : Attribue des valeurs entre 3 et 18. Le total cumulé des six statistiques doit impérativement être compris entre 72 et 75 (pour un personnage équilibré mais capable). Format de réponse unique (strict) : FOR [NB] DEX [NB] CON [NB] INT [NB] WIS [NB] CHA [NB] Ne rédige aucun texte avant ou après les statistiques." }
];

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

async function sendmsg(w_histo, w_chat, w_msg){
    // Recuperer le texte (value) et supprimer l'ancien (trim)
    let msg_t="";
    
    // Accepter un DOM element (input/textarea) ou une chaîne directe
    if (typeof w_msg === 'string') {
        msg_t = w_msg.trim();
    } else if (w_msg && typeof w_msg.value === 'string') {
        msg_t = w_msg.value.trim();
    }

    if (msg_t) {
            if (w_histo == stats) {
            personnage = msg_t;
            msg_t = "univers : [" + univers + "] Personnage : [" + msg_t + "]";
        }
        if (w_histo==historique) {
            // Lancer le dé et stocker dans la variable correcte
            lancer_de = Math.floor(Math.random() * 18) + 1;
            msg_t=
            `Liste personnages : ` + list_perso + ` 
                Liste de variation : ` + list_item + `
                Stats sans items : ` + statistiques + `
                Dé: ` + lancer_de + `
                Action : ` + msg_t;
        }
    }
    // Ne vider la valeur que si c'est un élément DOM ayant .value
    /*if (w_msg && typeof w_msg === 'object' && 'value' in w_msg) {
        w_msg.value = "";
    }*/
    
    w_histo.push({ role: "user", content: msg_t });
    return await getrep(w_histo, w_chat);  
}

async function appendmsg(actmsg, w_chat){
    let action;
    let shouldDisplayAction = false;

    if (w_chat != chat) {
    const messageElement = document.createElement("div");
    messageElement.textContent = actmsg;
    w_chat.appendChild(messageElement);
    return;
    }

    console.log(actmsg);
    const lines = actmsg.split("\n");
    for (const line of lines) {
        if (line.startsWith("Action :")) {
            action = line.replace("Action :", "").trim();
            const messageElement = document.createElement("div");
            messageElement.textContent = action;
            action_dice = messageElement;
        } else if (line.startsWith("Personnages :")) {
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
        } else if (line.startsWith("A Nécessité un dé ? :")) {
            besoin_de = line.replace("A Nécessité un dé ? :", "").trim();
            console.log("Besoin de dé ? " + besoin_de);

            if (besoin_de === "oui") {
                besoin_de = "non";
                besoin_de_de();
            } else {
                shouldDisplayAction = true;
            }
        } else if (line.startsWith("Fond :")) {
            fond = parseInt(line.replace("Fond :", "").trim());
        }
    }
    
    if (shouldDisplayAction && action_dice) {
        w_chat.appendChild(action_dice);
    }
    
    return;
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
            model: "openai/gpt-oss-120b",
            messages: w_histo,  
        }),
        });

        const data = await response.json();
        console.log("API Response:", data); // Debug
        
        let botMessage = data?.choices?.[0]?.message?.content;
        if (!botMessage) {
            throw new Error("Pas de message reçu de l'API");
        }
        w_histo.push({ role: "assistant", content: botMessage });
        if (w_histo == monde) {
            univers = botMessage;
            console.log(univers);

        }
        else if (w_histo == stats) {
            recup_stats (stats_nb, botMessage);
            statistiques= botMessage;
        }
        else if (w_histo== historique){
            let parties = botMessage.split('\n');
            //botMessage=parties[5];
            stats_string=parties[1];
            recup_stats(stats_nb, stats_string);
        }
        appendmsg(botMessage, w_chat);
        return botMessage;
    }
    catch (error){
        console.error("No chatbot response:", error);
        await appendmsg("Le chatbot ne fonctionne pas. Redémarrer le site", w_chat);
        return null;
    }
}

async function commence_partie(){

    historique = [{ 
    role: "system",
    content: `Agis comme maître de jeu d'un jeu type donjons et dragons. (N'oublie pas la ponctuation et les majuscules)(Adopte un ton narratif fluide et naturel : évite le jargon technique, les phrases trop pompeuses ou répétitives. Utilise un vocabulaire simple mais évocateur).
        Pseudo joueur : ` + pseudo + `
        Personnage : ` + personnage + `
        Univers : ` + univers + `
        Stats personnage : ` + statistiques + `
        Statistiques definition : FOR = Force, DEX = Dextérité, CON = Constitution, INT = Intelligence, WIS = Sagesse, CHA = Charisme.
        En début de partie : Tu recevras le message "Commence" alors, en fonction de l'univers et du personnage, tu créeras une situation de départ immersive avec des personnages non joueurs (PNJ) et des éléments interactifs que tu décriras au joueur.
        À chaque tour :
        - tu écouteras la requête du joueur"
        - si tu estimes que l'action actuelle a nécessité un jet de dé (la premiere action ne necessite jamais de dé), Nécessite un dé ? = oui sinon non, et tu utiliseras les résultat du dé de la réponse
        - interprétation de VAL :
        * si VAL = 1, alors l'action est une reussite critique
        * si VAL < stat correspondante, alors l'action est une reussite
        * si VAL = stat correspondante, alors l'action est une reussite de justesse
        * si VAL > stat correspondante, alors l'action est un échec
        Tu recevras (sauf au premier tour):

        Liste personnages : EXEMPLE -> Sami (fils), Edward (frère), etc
        Liste de variation : EXEMPLE -> Épée [+4 ST], etc
        Stats sans items : FOR [NB] DEX [NB] CON [NB] INT [NB] WIS [NB] CHA [NB]
        Dé: -1 si inutile ou nombre entre 1 et 18
        Action : 

        Tu renverras (en suivant scrupuleusement les espaces et les retours à la ligne) :

        Action : blablabla (sans jamais utiliser un saut à la ligne. Il faut que l'action soit divisé en 2 : ce qu'il se passe (ou tu detailles ce qu'on voit dans la scene), et la question au joueur.)(Si l'action a necessité un jet de dé, tu integres le resultat dans l'action et quel stats tu as comparé)
        Personnages : EXEMPLE -> Sami (fils), Edward (frère), etc avec ou pas un nouveau personnage
        Liste de variations  : liste actuelle avec + ou - de variations (par exemple, épée +4 ST, commotion cérébrale -2 CON, etc)
        Nouveau personnage : 1 oui 0 non
        Nom personnage : Vide si non ou EXEMPLE -> Sami (fils)
        Characteristiques personnages : vide si non sinon sexe race skin old (sexe : 0 femme 1 homme) (race : 0 humain 1 non humain) (skin : 0 aléatoire 1 beige 2 metisse 3 noir 4 bleu 5 vert) (old : 0 sans 1 ride)
        Personnages dans la scène : EXEMPLE -> Sami (fils), Edward (frere), etc
        A Nécessité un dé ? : oui ou non
        Fond : 1 à 5 (1 : nuage clair ensoleillé, 2 : pluvieux, 3 : electrique, 4 : Brulant, 5 : Nuit étoilée)
        `
    }
    ];
    const debut = "Commence l'aventure en decrivant une situation ou le joueur se trouve, en fonction de son personnage et de son univers. Sois immersif et original.";
    await sendmsg(historique, chat, debut);
    console.log(pseudo);
    console.log(univers);
    console.log(personnage);
    console.log(statistiques);
    return;
}




    /*function maitre_de_jeu (chat_monde, chat_stats, msg) {
        sendmsg(historique, chat, msg);

    }*/
