# Carte de visite NFC — Design Spec

**Date :** 2026-06-02
**Projet :** nfc-card
**Statut :** Approuvé

---

## Contexte

Application web statique de carte de visite numérique NFC pour Filipe Taveira (FT Solutions). La puce NFC NTAG215 collée derrière un iPhone pointe vers l'URL du profil. Profil unique, données hardcodées dans un fichier de config central.

---

## Stack technique

| Élément | Choix |
|---|---|
| Framework | Next.js 15 App Router |
| Langage | TypeScript |
| Style | Tailwind CSS |
| Animations | Framer Motion |
| Icônes | Lucide Icons |
| QR Code | qrcode.react (`<QRCodeCanvas>` uniquement) |
| Output | `output: 'export'` (statique pur) |
| Deploy | GitHub Actions → GitHub Pages |
| Backend | Aucun |
| Base de données | Aucune |

---

## Design visuel

- **Style :** Apple/Popl — fond blanc pur `#FFFFFF`, très épuré
- **Couleurs :**
  - Primary : `#111111`
  - Secondary : `#FFFFFF`
  - Accent : `#0066FF`
  - Background : `#F7F7F7`
- **Typographie :** Inter (Google Fonts)
- **Mobile First**, responsive iPhone / Android / tablette / desktop
- Coins arrondis, ombres douces, contraste élevé
- Photo profil alignée à gauche (style CV digital), accent bleu vif

---

## Configuration centrale

Fichier unique : `config/profile.ts`

Contient :
- Nom, prénom, titre, entreprise
- Description courte
- Téléphone `[À COMPLÉTER]`, email `[À COMPLÉTER]`, URL site web `[À COMPLÉTER]`
- URL LinkedIn `[À COMPLÉTER]`, Instagram `[À COMPLÉTER]`, Facebook `[À COMPLÉTER]`, WhatsApp `[À COMPLÉTER]`
- URL du profil complet (ex: `https://username.github.io/nfc-card`) `[À COMPLÉTER]`
- Texte "À propos de l'entreprise"

Toute modification de contenu se fait exclusivement dans ce fichier.

---

## Structure du projet

```
nfc-card/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions deploy
├── config/
│   └── profile.ts              ← config centrale unique
├── app/
│   ├── layout.tsx              ← metadata SEO, Open Graph, JSON-LD
│   ├── page.tsx                ← composition des composants
│   └── globals.css
├── components/
│   ├── NfcDetectedOverlay.tsx  ← animation "✓ Carte détectée" (1s, conditionnelle)
│   ├── ProfileHeader.tsx       ← bannière dégradée + photo profil ronde
│   ├── ProfileInfo.tsx         ← nom, titre, entreprise, description
│   ├── ActionButtons.tsx       ← Appeler / Email / Site / LinkedIn
│   ├── AddContactButton.tsx    ← bouton vCard download
│   ├── CompanySection.tsx      ← carte "À propos de l'entreprise"
│   ├── SocialGrid.tsx          ← LinkedIn, Instagram, Facebook, WhatsApp
│   └── QrCodeSection.tsx       ← QR code + bouton télécharger PNG
├── lib/
│   └── vcard.ts                ← génération du fichier .vcf
├── public/
│   ├── logo.png                ← logo entreprise (à fournir)
│   └── photo.jpg               ← photo de profil (à fournir)
└── next.config.ts              ← output: 'export', basePath, assetPrefix, unoptimized
```

---

## Composants — comportements

### NfcDetectedOverlay
- Overlay plein écran au chargement de la page
- Affiche "✓ Carte détectée" avec animation pulse (Framer Motion)
- Disparaît automatiquement après 1 seconde (fade-out)
- **Conditionnel** : s'affiche uniquement si l'URL contient `?src=nfc` (la puce NFC doit pointer vers `https://…/nfc-card?src=nfc`). Sans ce paramètre, l'overlay ne s'affiche pas — évite les faux positifs pour les visiteurs arrivant via un lien partagé ou Google.

### ProfileHeader
- Bannière dégradée (noir → bleu accent) en haut de page
- Logo entreprise dans la bannière
- Photo de profil ronde alignée à **gauche**, qui déborde légèrement sur le contenu en dessous (`-mt-8` ou équivalent), avec bordure blanche
- Photo : `public/photo.jpg` — utiliser `<img>` standard (pas `next/image`) car `output: 'export'` requiert `unoptimized: true` ; pour simplifier, `<img>` est préférable ici

### ProfileInfo
- Nom complet (large, bold)
- Titre en bleu accent
- Nom entreprise
- Description courte (texte gris)
- Animations Framer Motion : fade-in + slide-up

### ActionButtons
- 4 boutons full-width empilés verticalement (valeurs issues de `config/profile.ts`) :
  1. **Appeler** → `tel:{profile.phone}` (icône Phone)
  2. **Email** → `mailto:{profile.email}` (icône Mail)
  3. **Site web** → `{profile.website}` lien externe (icône Globe)
  4. **LinkedIn** → `{profile.linkedin}` lien externe (icône Linkedin)
- Apparition en cascade (stagger 80ms, Framer Motion)
- Style : fond `#111` avec icône + label, hover bleu accent

### AddContactButton
- Bouton principal proéminent : "Ajouter à mes contacts"
- Fond `#0066FF`, texte blanc, full-width, coins très arrondis
- Au clic : génère un blob `.vcf` via `lib/vcard.ts` et déclenche le téléchargement
- vCard format v3.0, compatible iPhone (ouvre Contacts) et Android

### CompanySection
- Carte avec fond blanc, ombre douce, coins arrondis
- Titre : "À propos de l'entreprise"
- Texte descriptif
- Bouton "Découvrir notre site" → lien externe

### SocialGrid
- Grille 2×2 d'icônes réseaux sociaux
- LinkedIn, Instagram, Facebook, WhatsApp
- Icônes avec couleurs de marque, fond subtil, liens externes `target="_blank"`

### QrCodeSection
- QR code généré client-side via `<QRCodeCanvas>` de `qrcode.react` avec l'URL du profil
- Bouton "Télécharger le QR code" → export PNG via `canvasRef.current.toDataURL('image/png')`
- **Utiliser `<QRCodeCanvas>` (pas `<QRCodeSVG>`) car `toDataURL()` nécessite un canvas**

---

## vCard (lib/vcard.ts)

Format VCF v3.0 (photo omise volontairement pour garder le fichier léger) :

```
BEGIN:VCARD
VERSION:3.0
FN:<nom>
ORG:<entreprise>
TITLE:<titre>
TEL:<téléphone>
EMAIL:<email>
URL:<site web>
END:VCARD
```

---

## SEO (app/layout.tsx)

- `<title>` : `{nom} — {titre} | {entreprise}`
- `<meta name="description">` : description courte du profil
- Open Graph :
  - `og:title`, `og:description`, `og:url`
  - `og:image` : URL absolue construite comme `${NEXT_PUBLIC_SITE_URL}/photo.jpg` (inclut le basePath dans `NEXT_PUBLIC_SITE_URL`)
- Twitter Card : `summary_large_image`
- JSON-LD `Person` : nom, jobTitle, email, telephone, url, worksFor
- Favicon : dérivé du logo
- `<meta name="viewport">` optimisé mobile
- Cible Lighthouse : >95 sur tous les axes

---

## GitHub Pages Deploy

### next.config.ts
```ts
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'nfc-card'  // ← doit correspondre exactement au nom du repo GitHub

export default {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: { unoptimized: true },  // ← requis pour output: 'export'
}
```

### .github/workflows/deploy.yml
- Trigger : push sur `main`
- Steps : checkout → Node 20 → `npm ci` → `npm run build` → deploy `out/` sur branche `gh-pages`
- Utilise `actions/deploy-pages@v4`
- Variable `NEXT_PUBLIC_SITE_URL` exposée dans le job via `env: NEXT_PUBLIC_SITE_URL: ${{ vars.NEXT_PUBLIC_SITE_URL }}`

### Variable d'environnement
- `NEXT_PUBLIC_SITE_URL` : URL complète incluant le basePath (ex: `https://username.github.io/nfc-card`)
- **Non sensible — à définir dans `Settings → Variables → Actions` (pas Secrets)**
- Exposée dans le workflow YAML : `env: NEXT_PUBLIC_SITE_URL: ${{ vars.NEXT_PUBLIC_SITE_URL }}`
- Utilisée pour : QR code, balise `og:image`, JSON-LD url

### Note sur le basePath
- La valeur `repoName = 'nfc-card'` dans `next.config.ts` doit correspondre exactement au nom du repo GitHub
- Si le repo s'appelle différemment, modifier cette valeur en conséquence

---

## Hors scope

- Analytics / Supabase
- API routes
- Multi-profil / authentification
- Dashboard d'administration
- Mode édition en ligne
