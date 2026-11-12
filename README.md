# Parlons !

Application de pratique orale du français : 1400 phrases courantes à écouter, répéter et
enregistrer, avec un objectif de 20 phrases par jour et des succès à débloquer.

Quatorze thèmes de 100 phrases, rangés en quatre familles sur l'accueil :

| Famille | Thèmes |
|---|---|
| Au quotidien | Vie quotidienne, Se faire des amis, Exprimer ses émotions au quotidien |
| Au travail | Small talk au bureau, Entretien d'embauche, Convaincre & Négocier, Travailler en start-up |
| Métiers et secteurs | Travail de vendeuse, Gérer une exposition d'art, Le secteur de la finance – contrôle de gestion, Le secteur du luxe – retail |
| Mieux s'exprimer | Les connecteurs logiques, Raconter une histoire, Les expressions françaises |

Chaque famille affiche sa progression et se replie d'un appui sur son titre ; l'application
retient les familles repliées.

Chaque phrase est affichée avec sa traduction en anglais. Deux modes tirent les phrases au
hasard dans tous les thèmes : le **mode rapide** (5 phrases) et le **mode illimité** (sans fin).

Aucun serveur, aucun compte : la progression de chaque étudiant reste sur son appareil.
L'application s'installe sur téléphone (iPhone et Android), fonctionne hors connexion et se met
à jour toute seule.

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'application : phrases, styles, programme. |
| `manifest.webmanifest`, `icons/` | Nom et icônes de l'application installée. |
| `sw.js` | Fonctionnement hors connexion, mises à jour, rappel quotidien. |

## Publier sur GitHub Pages

1. Sur github.com, créer un dépôt **public** (par exemple `parlons`).
2. Y déposer **tous les fichiers** du projet, dossier `icons` compris (bouton *Add file › Upload
   files*, glisser les fichiers et le dossier, puis *Commit changes*).
3. Dans *Settings › Pages* : *Source* = **Deploy from a branch**, *Branch* = **main**, dossier **/ (root)**, puis *Save*.
4. Une minute plus tard, l'application est en ligne à l'adresse
   `https://<votre-compte>.github.io/parlons/`. C'est ce lien qu'il faut donner aux étudiants.

Le micro, l'installation et les notifications exigent HTTPS : GitHub Pages le fournit d'office.

## Installer l'application sur téléphone

L'application s'installe depuis le lien, sans passer par l'App Store ni Google Play :

- **Android** (Chrome) : bouton **Installer** affiché sur l'accueil et dans *Réglages*, ou menu
  ⋮ › « Installer l'application ».
- **iPhone, iPad** (Safari) : bouton Partager, puis « Sur l'écran d'accueil ».

Elle apparaît ensuite avec les autres applications, s'ouvre en plein écran et fonctionne sans
connexion (la vérification automatique de la prononciation, elle, a besoin d'Internet).

Sur iPhone, l'application installée a sa propre progression, distincte de celle de Safari : un
étudiant qui a déjà commencé dans Safari exporte sa progression (*Réglages*), puis l'importe
dans l'application installée.

## Mises à jour

Il suffit de publier la nouvelle version sur GitHub (branche `main`). Chaque étudiant la reçoit
automatiquement, sans rien réinstaller :

- au lancement, l'application charge la dernière version publiée ;
- si elle est restée ouverte, elle vérifie régulièrement et se recharge d'elle-même dès que
  cela ne dérange pas (jamais pendant un enregistrement) ;
- sans connexion, elle utilise la dernière version reçue.

GitHub Pages peut mettre une dizaine de minutes à diffuser une nouvelle version.

**La progression n'est jamais touchée par une mise à jour** : elle est enregistrée à part, sur
l'appareil. Deux règles pour qu'elle reste valable d'une version à l'autre :

- ajouter les nouvelles phrases **à la fin** d'un thème, et ne jamais changer l'identifiant
  (`id`) d'un thème existant ;
- ne pas changer la clé `parlons.v1`.

## Rappel quotidien

Dans *Réglages › Rappel quotidien* (ou depuis la carte proposée sur l'accueil), l'étudiant
autorise les notifications et choisit une heure. Les jours où son objectif n'est pas encore
atteint à cette heure-là, il reçoit une notification ; un seul rappel par jour, aucun si
l'objectif est atteint.

Limite à connaître : l'application n'a pas de serveur, et un téléphone ne laisse pas une
application web se réveiller seule à heure fixe.

| Appareil | Quand le rappel arrive |
|---|---|
| Android, application installée | Même application fermée, mais à l'heure choisie ou plus tard : c'est le téléphone qui décide du moment, et il peut sauter un jour. |
| iPhone, application installée (iOS 16.4 ou plus récent) | Seulement si l'application est restée ouverte en arrière-plan. |
| Ordinateur | Tant que l'application est ouverte dans le navigateur. |

Un rappel fiable sur tous les téléphones, application fermée, demande un petit serveur d'envoi
de notifications (« Web Push ») : il n'est pas inclus.

## Comment ça marche pour l'étudiant

1. **Écouter** la phrase (vitesse normale ou lente).
2. **S'enregistrer** en la disant.
3. **Réessayer** jusqu'à ce que ce soit bien, puis passer à la suivante.

### Modes au hasard

Sur l'accueil, sous l'objectif du jour :

- **Mode rapide** : 5 phrases tirées au hasard, puis un bilan (phrases validées, étoiles).
- **Mode illimité** : des phrases au hasard les unes après les autres, sans répétition, jusqu'à
  ce que l'étudiant appuie sur « Terminer ».

Une phrase validée dans ces modes compte comme dans son thème : progression, objectif du jour
et succès.

### Premier lancement

À la première ouverture, une présentation en trois écrans demande le prénom, fait **choisir
la voix** (chaque voix s'écoute avant d'être choisie), puis montre la prise en main et
comment **installer l'application sur le téléphone** (voir plus haut).

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
| Principe | Le navigateur transcrit ce qu'il a compris ; l'application compare avec la phrase et souligne les mots à retravailler. Validé à partir de 50 % de ressemblance : 1 étoile dès 50 %, 2 étoiles dès 66 %, 3 étoiles dès 85 %. La ponctuation, les majuscules, les accents, les homophones (et / est, ces / ses…) et les nombres écrits en chiffres ne comptent pas comme des erreurs. | L'étudiant réécoute sa voix, la compare au modèle, et décide : « C'est bon » ou « Réessayer ». |
| Données | La voix est envoyée au service de reconnaissance du navigateur (Google, Apple ou Microsoft). | Rien ne quitte l'appareil. |

La vérification automatique mesure si la phrase est **comprise**, pas la finesse de l'accent :
c'est un bon signal d'intelligibilité, pas un jugement phonétique. Elle se désactive dans
*Réglages*.

## Données

- Progression, succès, réglages : `localStorage` du navigateur (clé `parlons.v1`).
- L'application demande au navigateur de conserver ces données même quand l'appareil manque
  de place.
- Dernier enregistrement validé de chaque phrase : IndexedDB, sur l'appareil.
- *Réglages › Exporter ma progression* produit un fichier `.json` que l'étudiant peut garder,
  transférer sur un autre appareil, ou envoyer à son professeur.

Vider les données de navigation, ou utiliser la navigation privée, efface la progression.

## Modifier les phrases

Dans `index.html`, chercher `const CATS` : chaque thème a un identifiant, un nom, une icône, une
couleur et sa liste de phrases, **une par ligne** : la phrase en français, une barre `|`, puis
sa traduction en anglais.

```
Un café, s'il vous plaît. | A coffee, please.
```

Ajouter les nouvelles phrases **à la fin** d'un thème — l'identifiant d'une phrase est sa
position, en insérer au milieu décalerait la progression déjà enregistrée. Écrire les nombres
en toutes lettres dans la phrase française. Corriger une traduction ne change rien à la
progression.

Pour ajouter un thème, copier un bloc existant, lui donner un nouvel identifiant de deux
lettres et indiquer sa famille avec `group` (`quotidien`, `travail`, `metiers` ou
`expression`). Les familles sont définies juste au-dessus, dans `const GROUPS` : on peut en
renommer une, en ajouter une, ou déplacer un thème en changeant son `group`, sans toucher à la
progression. Une fois le fichier publié, les étudiants reçoivent la nouvelle version
automatiquement.
