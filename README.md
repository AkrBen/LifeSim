# LifeSim

LifeSim est un prototype de jeu narratif en navigateur, inspiré des jeux de role papier.
Le joueur choisit un pseudonyme, un univers et un type de personnage, puis interagit avec une histoire generee dynamiquement.

## Ce que fait le projet

- Interface web avec zone de narration, message joueur, stats et dé.
- Generation de contexte (univers) et de personnage via une API de modele de langage.
- Boucle de jeu type "maitre du jeu" avec actions du joueur et resultat narratif.
- Affichage visuel avec decors, personnages et elements d'interface personnalises.

## Technologies

- HTML
- CSS
- JavaScript (vanilla)

## Structure rapide

- `index.html` : structure principale de la page et des zones de jeu.
- `script.js` : logique principale de conversation et gestion de partie.
- `buttons.js`, `calquage.js`, `image.js`, `personnage.js`, `stats.js` : gestion UI, visuels et gameplay.
- `interface/` et `Characters/` : assets graphiques (fonds, stats, des, personnages).

## Lancer le projet

1. Cloner ou telecharger le depot.
2. Ouvrir le dossier dans VS Code.
3. Ouvrir `index.html` dans un navigateur (ou via une extension type Live Server).

## Remarque

Le projet est un prototype. Certaines parties (equilibrage, robustesse des reponses, securisation de la cle API) peuvent etre ameliorées.
