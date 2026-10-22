/* =====================================================================
   COMPORTEMENT DU SITE
   Le contenu (projets, profil) est dans projets.js : ne modifie pas ici
   pour changer un texte.

   Sommaire
     1. Outils                      4. Pages (fiche projet + profil)
     2. Liste des projets           5. Thème, horloge, bandeau
     3. Couverture en fond + glitch 6. Avion en papier (curseur)
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. OUTILS
   --------------------------------------------------------------------- */
const $ = (sel) => document.querySelector(sel);
const pad = (n) => String(n).padStart(2, "0"); // 3 -> "03"
const SYMBOLES = "#%&@/\\<>[]{}=+*01";

// Effet « texte qui se décode » : des symboles qui laissent place aux vraies lettres
function scramble(el) {
  const original = el.dataset.o || (el.dataset.o = el.textContent);
  let etape = 0;
  clearInterval(el._timer);
  el._timer = setInterval(() => {
    el.textContent = [...original]
      .map((c, i) => (c === " " || i < etape / 2 ? c : SYMBOLES[(Math.random() * SYMBOLES.length) | 0]))
      .join("");
    if (++etape > original.length * 2) {
      clearInterval(el._timer);
      el.textContent = original;
    }
  }, 22);
}

// Pastilles de compétences : ["C1 · Concevoir", ...] -> <span>…</span>
const pastilles = (liste) => `<span class="tg">${liste.map((t) => `<span>${t}</span>`).join("")}</span>`;

/* ---------------------------------------------------------------------
   2. LISTE DES PROJETS (accueil)
   --------------------------------------------------------------------- */
const liste = $("#list");

PROJETS.forEach((p, i) => {
  const ligne = document.createElement("button");
  ligne.className = "row hide"; // "hide" = cachée jusqu'à l'animation d'apparition
  ligne.dataset.i = i;
  ligne.innerHTML = `
    <span>[${pad(i + 1)}]</span>
    <span><b>${p.titre.toUpperCase()}</b><small>${p.accroche}</small></span>
    <span>[${p.annee}]</span>`;
  liste.append(ligne);
});

// Les lignes apparaissent l'une après l'autre quand on arrive sur la liste
new IntersectionObserver(
  (entrees, observateur) => {
    if (!entrees[0].isIntersecting) return;
    [...liste.children].forEach((ligne, i) =>
      setTimeout(() => {
        ligne.classList.remove("hide");
        scramble(ligne.querySelector("b"));
      }, i * 90),
    );
    observateur.disconnect();
  },
  { threshold: 0.2 },
).observe(liste);

/* ---------------------------------------------------------------------
   3. COUVERTURE EN FOND + GLITCH HORIZONTAL (au survol d'un projet)
   --------------------------------------------------------------------- */
const couverture = $("#cv");
const NB_BANDES = 12; // l'image est découpée en bandes qui se décalent
let dernierSurvol = -1;

for (let i = 0; i < NB_BANDES; i++) {
  const bande = document.createElement("i");
  const haut = (i * 100) / NB_BANDES;
  const bas = 100 - ((i + 1) * 100) / NB_BANDES;
  bande.style.clipPath = `inset(${haut}% 0 ${bas}% 0)`;
  bande.style.setProperty("--d", (i % 2 ? 1 : -1) * (14 + Math.random() * 60) + "px"); // décalage de la bande
  couverture.append(bande);
}

// Fond coloré (orange / bleu) quand un projet n'a pas d'image
function fondParDefaut(i) {
  const [a, b] = i % 2 ? ["#90D5FF", "#FFBF00"] : ["#FFBF00", "#90D5FF"];
  return `repeating-linear-gradient(0deg, #0000001f 0 2px, #0000 2px 6px),
          linear-gradient(${100 + i * 35}deg, ${a} 0 50%, ${b} 50% 100%)`;
}

function glitch() {
  couverture.classList.remove("gl");
  void couverture.offsetWidth; // force le navigateur à relancer l'animation
  couverture.classList.add("gl");
}

function afficherCouverture(ligne) {
  if (!ligne) return;
  const i = +ligne.dataset.i;
  const image = PROJETS[i].couverture;
  scramble(ligne.querySelector("b"));
  couverture.style.setProperty("--img", image ? `url("${image}")` : fondParDefaut(i));
  couverture.classList.add("on");
  if (i !== dernierSurvol) {
    glitch();
    dernierSurvol = i;
  }
}

function masquerCouverture() {
  couverture.classList.remove("on");
  dernierSurvol = -1;
}

liste.addEventListener("pointerover", (e) => afficherCouverture(e.target.closest(".row")));
liste.addEventListener("focusin", (e) => afficherCouverture(e.target.closest(".row")));
liste.addEventListener("pointerleave", masquerCouverture);
liste.addEventListener("focusout", masquerCouverture);
setInterval(() => couverture.classList.contains("on") && glitch(), 2200); // petit glitch régulier

// Précharge les couvertures pour qu'elles s'affichent sans délai
addEventListener("load", () =>
  PROJETS.forEach((p) => {
    if (p.couverture) new Image().src = p.couverture;
  }),
);

/* ---------------------------------------------------------------------
   4. PAGES : fiche projet et profil (plein écran par-dessus l'accueil)
   --------------------------------------------------------------------- */
const page = $("#dt");
const pageContenu = $("#db");
const site = $("#app");
const btnRetour = $("#bk");
const btnSuivant = $("#nx");
let projetCourant = 0;
let elementAvantOuverture; // pour rendre le focus à la fermeture
let retourVersProfil = false; // true si la fiche a été ouverte depuis le profil

// Affiche une page : html = contenu, depuisProfil = bouton retour vers le profil,
// avecSuivant = montrer le bouton « Projet suivant »
function afficherPage(html, depuisProfil, avecSuivant) {
  retourVersProfil = depuisProfil;
  if (page.hidden) elementAvantOuverture = document.activeElement;
  masquerCouverture();
  pageContenu.innerHTML = html;
  btnRetour.textContent = depuisProfil ? "← Profil" : "← Retour";
  btnSuivant.hidden = !avecSuivant;
  page.hidden = false;
  page.classList.remove("open");
  void page.offsetWidth; // relance l'animation d'ouverture
  page.classList.add("open");
  site.inert = true; // l'accueil n'est plus cliquable derrière
  document.body.style.overflow = "hidden";
  page.scrollTop = 0;
  btnRetour.focus();
}

function fermerPage() {
  page.hidden = true;
  site.inert = false;
  document.body.style.overflow = "";
  if (elementAvantOuverture) elementAvantOuverture.focus({ preventScroll: true });
  masquerCouverture(); // évite que la couverture reste après le retour
}

/* ----- Fiche d'un projet ----- */
function ouvrirProjet(i, depuisProfil = false) {
  projetCourant = i;
  const p = PROJETS[i];

  const actions = p.actions.map(([titre, texte]) => `<h4>${titre}</h4><p>${texte}</p>`).join("");

  const photos = (p.photos || [])
    .map(
      ([src, legende]) =>
        `<figure><img src="${src}" alt="${legende}" loading="lazy"><figcaption>${legende}</figcaption></figure>`,
    )
    .join("");

  // « Pas à pas » : n'apparaît que si la liste pasAPas du projet n'est pas vide
  const pas = (p.pasAPas || [])
    .map((e, k) => {
      const image = e.image
        ? `<figure><img src="${e.image}" alt="${e.legende || e.titre}" loading="lazy"><figcaption>${e.legende || ""}</figcaption></figure>`
        : "";
      return `<li><b>${pad(k + 1)} · ${e.titre}</b><p>${e.texte}</p>${image}</li>`;
    })
    .join("");

  afficherPage(
    `<div class="l">
       <p>${pad(i + 1)} / ${pad(PROJETS.length)} · ${p.date}</p>
       <h2 id="dt-t">${p.titre}</h2>
       ${pastilles(p.competences)}
       ${p.outils ? `<p class="outils">Outils : ${p.outils.join(" · ")}</p>` : ""}
     </div>
     <div class="r">
       <h3>Contexte</h3><p>${p.contexte}</p>
       <h3>Ce que j'ai fait</h3>${actions}
       ${photos ? `<div class="figs">${photos}</div>` : ""}
       ${pas ? `<h3>Pas à pas</h3><ol class="pas">${pas}</ol>` : ""}
       <h3>Ce que j'en retiens</h3><p>${p.retenu}</p>
     </div>`,
    depuisProfil,
    true,
  );
}

/* ----- Page Profil ----- */
function ouvrirProfil() {
  const competencesParProjet = PROJETS.map(
    (p, i) => `<button class="pj" data-i="${i}"><b>[${pad(i + 1)}] ${p.titre}</b>${pastilles(p.competences)}</button>`,
  ).join("");
  const parcours = PROFIL.parcours.map(([titre, texte]) => `<h4>${titre}</h4><p>${texte}</p>`).join("");

  afficherPage(
    `<div class="l">
       <p>BUT 2 GEII · parcours AII · IUT de Toulouse</p>
       <h2 id="dt-t">Profil</h2>
       <p>${PROFIL.recherche}</p>
     </div>
     <div class="r">
       <h3>Qui je suis</h3><p>${PROFIL.presentation}</p>
       <h3>Compétences par projet</h3>${competencesParProjet}
       <p class="lg">${PROFIL.legende}</p>
       <h3>Parcours en bref</h3>${parcours}
       <h3>CV</h3>
       <p>Le détail de mes formations et de mes expériences.</p>
       <a class="go" href="${PROFIL.cv}" target="_blank" rel="noopener">Ouvrir mon CV (PDF)</a>
     </div>`,
    false,
    false,
  );
}

/* ----- Clics et clavier ----- */
liste.addEventListener("click", (e) => {
  const ligne = e.target.closest(".row");
  if (ligne) ouvrirProjet(+ligne.dataset.i);
});
$("#prof").onclick = ouvrirProfil;
$("#prof").addEventListener("pointerover", () => scramble($("#prof b")));
pageContenu.addEventListener("click", (e) => {
  const ligne = e.target.closest(".pj"); // projet cliqué depuis le profil
  if (ligne) ouvrirProjet(+ligne.dataset.i, true);
});
btnRetour.onclick = () => (retourVersProfil ? ouvrirProfil() : fermerPage());
btnSuivant.onclick = () => ouvrirProjet((projetCourant + 1) % PROJETS.length, retourVersProfil);
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !page.hidden) fermerPage();
});

/* ---------------------------------------------------------------------
   5. THÈME, HORLOGE, BANDEAU
   --------------------------------------------------------------------- */
const TEXTE_BANDEAU = "AUTOMATISME · EMBARQUÉ · ROBOTIQUE · ÉLECTRONIQUE · IMPRESSION 3D · FABLAB · CONTENU · ";
$("#tk").textContent = TEXTE_BANDEAU.repeat(8);

setInterval(() => {
  $("#clock").textContent = new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris" });
}, 1000);

$("#theme").onclick = () => {
  const racine = document.documentElement;
  const estSombre = getComputedStyle(racine).getPropertyValue("--bg").trim() === "#121212";
  racine.dataset.theme = estSombre ? "light" : "dark";
};

/* ---------------------------------------------------------------------
   6. AVION EN PAPIER (curseur)
   Il vole vers la souris, le nez dans la direction du déplacement, et
   « atterrit » (classe CSS "land") sur les liens et boutons.
   --------------------------------------------------------------------- */
const avion = $("#pl");
const avionImage = $("#pr");
let sourisX = 0,
  sourisY = 0; // position réelle de la souris
let avionX = 0,
  avionY = 0; // position de l'avion (il suit avec un léger retard)
let angle = 0;

addEventListener("pointermove", (e) => {
  sourisX = e.clientX;
  sourisY = e.clientY;
  if (!avion.classList.contains("on")) {
    avionX = sourisX; // réapparaît directement sous la souris
    avionY = sourisY;
    avion.classList.add("on");
  }
});

// L'avion disparaît quand la souris quitte la page
const cacherAvion = () => avion.classList.remove("on");
document.addEventListener("mouseout", (e) => {
  if (!e.relatedTarget) cacherAvion();
});
addEventListener("blur", cacherAvion);

// Atterrissage sur tout ce qui est cliquable
document.addEventListener("pointerover", (e) => {
  const cliquable = e.target.closest && e.target.closest("a, button");
  avion.classList.toggle("land", !!cliquable);
});

// Boucle d'animation : une image par frame
(function voler() {
  const atterri = avion.classList.contains("land");
  const dx = sourisX - avionX;
  const dy = sourisY - avionY;
  const vitesse = atterri ? 0.45 : 0.16;
  avionX += dx * vitesse;
  avionY += dy * vitesse;

  // Cap visé : direction du déplacement (nez de l'image = en haut à gauche, d'où +135°)
  // Posé : l'avion reprend sa position de repos (0°)
  const cap = atterri ? 0 : Math.hypot(dx, dy) > 6 ? Math.atan2(dy, dx) * 57.3 + 135 : angle;
  angle += (((((cap - angle) % 360) + 540) % 360) - 180) * 0.2; // tourne par le chemin le plus court

  avion.style.transform = `translate(${avionX}px, ${avionY}px)`;
  avionImage.style.transform = `rotate(${angle}deg)`;
  requestAnimationFrame(voler);
})();
