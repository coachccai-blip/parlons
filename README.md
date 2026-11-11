# Parlons !

Application de pratique orale du français : 600 phrases courantes à écouter, répéter et
enregistrer, avec un objectif de 20 phrases par jour et des succès à débloquer.

Six thèmes de 100 phrases : Vie quotidienne, Se faire des amis, Travail de vendeuse, Gérer une
exposition d'art, Small talk au bureau, Entretien d'embauche.

Tout tient dans **un seul fichier**, `index.html` : aucune installation, aucun serveur, aucun
compte. La progression de chaque étudiant reste dans son navigateur.

## Publier sur GitHub Pages

1. Sur github.com, créer un dépôt **public** (par exemple `parlons`).
2. Y déposer `index.html` (bouton *Add file › Upload files*, puis *Commit changes*).
3. Dans *Settings › Pages* : *Source* = **Deploy from a branch**, *Branch* = **main**, dossier **/ (root)**, puis *Save*.
4. Une minute plus tard, l'application est en ligne à l'adresse
   `https://<votre-compte>.github.io/parlons/`. C'est ce lien qu'il faut donner aux étudiants.

Le micro n'est accessible qu'en HTTPS : GitHub Pages le fournit d'office.

## Comment ça marche pour l'étudiant

1. **Écouter** la phrase (vitesse normale ou lente).
2. **S'enregistrer** en la disant.
3. **Réessayer** jusqu'à ce que ce soit bien, puis passer à la suivante.

### Premier lancement

À la première ouverture, une présentation en trois écrans demande le prénom, fait **choisir
la voix** (chaque voix s'écoute avant d'être choisie), puis montre la prise en main et
comment **installer l'application sur le téléphone** :

- iPhone, iPad : dans Safari, bouton Partager, puis « Sur l'écran d'accueil » ;
- Android : dans Chrome, menu ⋮, puis « Ajouter à l'écran d'accueil ».

Elle se rouvre à tout moment depuis *Réglages › Présentation*.

### La voix du modèle

L'application propose les voix françaises installées dans le navigateur de l'étudiant, les
**voix HD en tête de liste**, et présélectionne la plus naturelle :

| Navigateur | Voix proposées | Qualité |
|---|---|---|
| **Microsoft Edge** (ordinateur) | **Vivienne**, Denise, Henri, Eloise, Rémy (voix « Natural » en ligne), plus les voix standard | HD : liaisons et intonation naturelles |
| Chrome | Google français, plus les voix du système | correcte |
| Safari, iPhone, iPad | voix « améliorée » ou « premium » si elle est installée, sinon la voix standard | variable |
| Autres | voix de base du système | robotique |

**Conseillez Microsoft Edge à vos étudiants** : c'est le seul navigateur qui donne Vivienne et
les autres voix HD de Microsoft. Une page autonome ne peut pas apporter ses propres voix : elle
utilise celles de l'appareil. La voix se change ensuite dans *Réglages*.

### La vérification de la prononciation

| | Vérification automatique | Auto-évaluation |
|---|---|---|
| Navigateurs | Chrome, Edge, Safari | Firefox, ou si l'étudiant la préfère |
| Principe | Le navigateur transcrit ce qu'il a compris ; l'application compare avec la phrase et souligne les mots à retravailler. Validé à partir de 80 % de ressemblance, 1 à 3 étoiles. | L'étudiant réécoute sa voix, la compare au modèle, et décide : « C'est bon » ou « Réessayer ». |
| Données | La voix est envoyée au service de reconnaissance du navigateur (Google, Apple ou Microsoft). | Rien ne quitte l'appareil. |

La vérification automatique mesure si la phrase est **comprise**, pas la finesse de l'accent :
c'est un bon signal d'intelligibilité, pas un jugement phonétique. Elle se désactive dans
*Réglages*.

## Données

- Progression, succès, réglages : `localStorage` du navigateur (clé `parlons.v1`).
- Dernier enregistrement validé de chaque phrase : IndexedDB, sur l'appareil.
- *Réglages › Exporter ma progression* produit un fichier `.json` que l'étudiant peut garder,
  transférer sur un autre appareil, ou envoyer à son professeur.

Vider les données de navigation, ou utiliser la navigation privée, efface la progression.

## Modifier les phrases

Dans `index.html`, chercher `const CATS` : chaque thème a un nom, une icône, une couleur et sa
liste de phrases, **une par ligne**. Ajouter les nouvelles phrases **à la fin** d'un thème —
l'identifiant d'une phrase est sa position, en insérer au milieu décalerait la progression
déjà enregistrée. Écrire les nombres en toutes lettres.
