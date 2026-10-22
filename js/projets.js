/* =====================================================================
   CONTENU DU SITE
   C'est le seul fichier à modifier pour changer tes textes.
   (Le comportement du site est dans main.js, le style dans css/style.css)

   Sommaire
     1. PROFIL   : textes de la page « Profil »
     2. PROJETS  : un bloc par projet, dans l'ordre d'affichage

   ---------------------------------------------------------------------
   MODÈLE POUR AJOUTER UN PROJET (copie-colle, puis remplis)
   ---------------------------------------------------------------------
   {
     titre: "Nom du projet",
     date: "SAE · mois année",            // affiché dans la fiche
     annee: "2026",                       // affiché dans la liste : [2026]
     accroche: "Une phrase courte",       // sous le titre dans la liste
     couverture: "images/mon-image.webp", // image de fond au survol ("" = fond coloré)
     contexte: "D'où vient le projet, à quoi il sert.",
     actions: [["Titre de l'action", "Ce que j'ai fait précisément."]],
     outils: ["Outil 1", "Outil 2"],      // facultatif
     retenu: "Ce que j'en retiens, ce que je sais refaire.",
     competences: ["C1 · Concevoir", "Autonomie"],
     photos: [["images/photo.webp", "Légende : ce qu'on voit et pourquoi"]],
     pasAPas: [],                         // voir l'emplacement expliqué plus bas
   },
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. PROFIL
   --------------------------------------------------------------------- */
const PROFIL = {
  presentation:
    "Étudiant en 2e année de BUT GEII, parcours Automatisme et Informatique Industrielle. J'automatise des lignes, je programme des microcontrôleurs et je construis mes propres robots.",
  recherche:
    "Je cherche un stage de 10 semaines dès le 20 avril 2027, en automatisme, électronique embarquée ou robotique.",
  // Petits blocs « titre / texte » affichés dans « Parcours en bref »
  parcours: [
    ["Formation", "BUT GEII, parcours AII, à l'IUT de Toulouse (depuis 2025)."],
    ["Vie associative", "Co-fondateur et président du FabLab GEII : j'organise l'asso et j'anime ses réseaux sociaux."],
    ["Contenu", "Je filme mes projets techniques sur YouTube et Instagram."],
    [
      "Expérience",
      "Animateur au festival Futur Proche (Toulouse, 15 oct. 2026) : atelier sur la consommation électrique et présentation de projets techniques au public.",
    ],
  ],
  legende:
    "C1 Concevoir, C2 Vérifier, C3 Maintenir : les compétences communes du BUT GEII. Clique sur un projet pour voir les détails.",
  cv: "cv.pdf", // le fichier doit être à côté de index.html
};

/* ---------------------------------------------------------------------
   2. PROJETS
   ---------------------------------------------------------------------
   EMPLACEMENT « PAS À PAS » (champ pasAPas de chaque projet)
   Pour raconter un projet en détail, remplis la liste pasAPas. Chaque étape
   devient un point sur une ligne verticale dans la fiche du projet.
   Tant que la liste est vide ([]), la section n'apparaît pas.

   pasAPas: [
     {
       titre: "L'idée",
       texte: "D'où m'est venue l'idée, ce que je voulais obtenir.",
       image: "images/krokmou-idee.webp",   // facultatif
       legende: "Ce qu'on voit sur l'image", // facultatif
     },
     { titre: "Premiers essais", texte: "..." },
   ],
   --------------------------------------------------------------------- */
const PROJETS = [
  /* ----- 01 · Krokmou ----- */
  {
    titre: "Krokmou, réplique volante",
    date: "Perso · depuis sept. 2025",
    annee: "2025",
    accroche: "Un robot dragon qui vole en battant des ailes",
    couverture: "images/krokmou-vol.webp",
    contexte:
      "Robot biomimétique inspiré de Krokmou, le dragon du film Dragons : des ailes battantes motorisées reproduisent un vol d'oiseau, sans hélices. C'est mon projet perso phare, et il m'occupe depuis septembre 2025.",
    actions: [
      [
        "Le principe",
        "Faire voler une structure avec le seul mouvement de ses ailes, comme un oiseau, plutôt qu'avec des hélices.",
      ],
      [
        "Le défi",
        "Concevoir un ensemble léger, motorisé et pilotable, où la mécanique des ailes, la motorisation et l'électronique restent cohérentes.",
      ],
      ["Où j'en suis", "Projet toujours en cours, que je documente étape par étape."],
    ],
    retenu:
      "Un projet de longue durée m'a appris à avancer par essais successifs : tester une petite partie, corriger, puis assembler.",
    competences: ["C1 · Concevoir", "C2 · Vérifier", "Autonomie"],
    photos: [
      ["images/krokmou-sourire.webp", "Référence du projet : Krokmou en vol, tiré du film Dragons."],
      ["images/krokmou-foret.webp", "Le modèle à reproduire : Krokmou, le dragon du film."],
    ],
    pasAPas: [], // ← EMPLACEMENT : l'idée, la conception, les essais, etc.
  },

  /* ----- 02 · Chaîne de production ----- */
  {
    titre: "Chaîne de production automatisée",
    date: "SAE · mai. 2026",
    annee: "2026",
    accroche: "Une ligne multi-stations qui trie des jetons par couleur",
    couverture: "",
    contexte:
      "Tri et stockage de jetons par couleur sur une ligne de production à plusieurs stations, réalisés en SAE à l'IUT.",
    actions: [
      ["Programmation des automates", "Programmation d'automates Siemens et Schneider en Ladder et en GRAFCET."],
      ["Pilotage", "Commande de vérins et de capteurs pneumatiques Festo."],
      [
        "Communication",
        "Mise en place de la communication entre les stations pour que la ligne fonctionne comme un ensemble.",
      ],
    ],
    outils: ["Siemens", "Schneider", "TIA Portal", "Ladder", "GRAFCET", "Pneumatique Festo"],
    retenu:
      "J'ai appris à structurer un système automatisé en étapes (GRAFCET), à le programmer en Ladder et à faire communiquer plusieurs stations entre elles.",
    competences: ["C1 · Concevoir", "C2 · Vérifier", "Travail en équipe"],
    photos: [],
    pasAPas: [],
  },

  /* ----- 03 · Smart Car ----- */
  {
    titre: "Smart Car",
    date: "SAE · dec. 2025",
    annee: "2025",
    accroche: "Un véhicule autonome qui évite les obstacles",
    couverture: "",
    contexte: "Véhicule autonome capable d'éviter des obstacles, réalisé en SAE à l'IUT.",
    actions: [
      ["Lecture des capteurs", "Lecture de capteurs à ultrasons pour détecter les obstacles."],
      ["Pilotage", "Pilotage du véhicule par un microcontrôleur STM32 Nucleo-L476RG."],
    ],
    outils: ["STM32 Nucleo-L476RG", "Capteurs à ultrasons", "C/C++"],
    retenu:
      "J'ai appris à relier des capteurs à un microcontrôleur et à transformer leurs mesures en décisions de pilotage.",
    competences: ["C1 · Concevoir", "C2 · Vérifier", "Travail en équipe"],
    photos: [],
    pasAPas: [],
  },

  /* ----- 04 · Console de morpion ----- */
  {
    titre: "Console de morpion Arduino",
    date: "SAE · oct. 2026",
    annee: "2026",
    accroche: "Un morpion à deux joueurs sur écran TFT",
    couverture: "",
    contexte:
      "Une petite console de jeu : un morpion sur écran TFT, jouable à deux, chaque joueur ayant ses quatre flèches et un bouton de validation.",
    actions: [
      ["Affichage", "Écran TFT ILI9341 piloté par l'Arduino."],
      ["Boutons", "Lecture des boutons des deux joueurs grâce à un MCP23018, un extenseur d'entrées relié en I²C."],
      [
        "Logique de jeu",
        "Menu de départ avec deux modes (contre un ami ou contre un bot à trois niveaux), que je simplifie pour garder une version claire à deux joueurs.",
      ],
    ],
    outils: ["Arduino", "Écran TFT ILI9341", "MCP23018 (I²C)"],
    retenu:
      "J'ai appris à faire communiquer un microcontrôleur avec plusieurs composants en I²C et à structurer un programme avec un menu et plusieurs modes.",
    competences: ["C1 · Concevoir", "Autonomie"],
    photos: [],
    pasAPas: [],
  },

  /* ----- 05 · Amplificateur audio ----- */
  {
    titre: "Amplificateur audio à composants discrets",
    date: "Projet perso",
    annee: "Perso",
    accroche: "Un ampli audio fait de composants discrets",
    couverture: "",
    contexte:
      "Un amplificateur audio réalisé avec des composants individuels plutôt qu'avec un circuit intégré tout fait.",
    actions: [
      ["Conception", "Choix et dimensionnement des composants de l'amplificateur."],
      ["Réalisation", "Montage et soudure du circuit, puis essais et réglages."],
    ],
    outils: ["Composants discrets", "Soudure"],
    retenu:
      "J'ai appris à comprendre ce que fait chaque composant dans un circuit, au lieu de m'appuyer sur un circuit intégré.",
    competences: ["C1 · Concevoir", "C2 · Vérifier", "Autonomie"],
    photos: [],
    pasAPas: [],
  },

  /* ----- 06 · Serveur maison ----- */
  {
    titre: "Serveur maison sous Docker",
    date: "Projet perso",
    annee: "Perso",
    accroche: "Mes services hébergés chez moi",
    couverture: "images/home-serveur.webp",
    contexte:
      "Un serveur Linux maison qui héberge mes propres services avec Docker Compose : Nextcloud, un serveur Minecraft (Crafty), Portainer et Filebrowser.",
    actions: [
      ["Mise en place", "Installation d'Ubuntu Server et déploiement de la stack avec Docker Compose."],
      ["Réseau", "Résolution de problèmes réseau et de NAT Docker pendant la mise en service."],
      [
        "Accès à distance",
        "Je n'ai pas la main sur le routeur : j'ai choisi Tailscale pour accéder à Nextcloud depuis mon téléphone, sans ouvrir de ports.",
      ],
      ["Matériel", "Comparaison de composants d'occasion (DDR3/DDR4, processeurs i3 LGA1155) pour monter le serveur."],
    ],
    outils: ["Ubuntu Server", "Docker Compose", "Nextcloud", "Crafty", "Portainer", "Filebrowser", "Tailscale"],
    retenu:
      "J'ai appris à diagnostiquer un problème réseau avant de toucher à la configuration, et à adapter la solution à une contrainte (ici, pas d'accès au routeur).",
    competences: ["C3 · Maintenir", "C1 · Concevoir", "Autonomie"],
    photos: [],
    pasAPas: [],
  },

  /* ----- 07 · PC mini-ITX ----- */
  {
    titre: "PC mini-ITX GEEEK A30",
    date: "Projet perso",
    annee: "Perso",
    accroche: "Un PC compact et ses limites",
    couverture: "images/pc-mini-itx.webp",
    contexte: "Un PC en boîtier GEEEK A30 : Ryzen 5 4500, GT 1030 et carte mère A520M-ITX.",
    actions: [
      ["Analyse", "J'ai identifié les points faibles de la machine : l'alimentation et la carte graphique."],
      ["Contraintes", "Le format FlexATX limite fortement les évolutions possibles."],
    ],
    retenu: "Concevoir, c'est composer avec des contraintes d'encombrement, de coût et de disponibilité du matériel.",
    competences: ["C1 · Concevoir", "Adaptabilité"],
    photos: [],
    pasAPas: [],
  },

  /* ----- 08 · FabLab GEII ----- */
  {
    titre: "FabLab GEII",
    date: "Asso · depuis fév. 2026",
    annee: "2026",
    accroche: "L'asso que j'ai cofondée et que je préside",
    couverture: "images/fablab-impression3d.webp",
    contexte:
      "Co-fondateur et président de l'association FabLab de l'IUT : j'organise la vie de l'asso et je m'occupe de sa communication sur les réseaux sociaux.",
    actions: [
      ["Organisation", "Pilotage de l'association au quotidien."],
      ["Communication", "Animation des réseaux sociaux de l'asso."],
    ],
    retenu: "Présider une asso m'apprend à organiser, à communiquer clairement et à faire avancer un projet collectif.",
    competences: ["Travail en équipe", "Communication"],
    photos: [],
    pasAPas: [],
  },
];
