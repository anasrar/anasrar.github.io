# My Pesonal Blog and Project

## Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Gatsby](https://www.gatsbyjs.com/) and [React](https://reactjs.org/)
- [React Helmet](https://github.com/nfl/react-helmet)
- [Hookstate](https://hookstate.js.org/)
- [Three.js](https://threejs.org/) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Framer Motion](https://www.framer.com/motion/)
- [MDX](https://mdxjs.com/)

Template : [https://github.com/jpedroschmitz/gatsby-starter-ts](https://github.com/jpedroschmitz/gatsby-starter-ts)

## Font

- [Creato](https://dribbble.com/shots/15299668-Creato-Free-Font)
- [Fungis](https://www.behance.net/gallery/119722547/FUNGIS-Free-Typeface)
- [Kharkiv Tone](https://www.behance.net/gallery/105478373/Kharkiv-Tone-Font)
- [NEUTRAL FACE](https://www.behance.net/gallery/104641293/NEUTRAL-FACE-FREE-FONT)
- [Sewaka](https://github.com/budapatrayasa/Sewaka-Typeface-Family/)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

### Zip Font Structure

```
┌── CreatoDisplay
│   └── fonts
│       ├── CreatoDisplay-Black.otf
│       ├── CreatoDisplay-BlackItalic.otf
│       ├── CreatoDisplay-Bold.otf
│       ├── CreatoDisplay-BoldItalic.otf
│       ├── CreatoDisplay-ExtraBold.otf
│       ├── CreatoDisplay-ExtraBoldItalic.otf
│       ├── CreatoDisplay-Light.otf
│       ├── CreatoDisplay-LightItalic.otf
│       ├── CreatoDisplay-Medium.otf
│       ├── CreatoDisplay-MediumItalic.otf
│       ├── CreatoDisplay-Regular.otf
│       ├── CreatoDisplay-RegularItalic.otf
│       ├── CreatoDisplay-Thin.otf
│       └── CreatoDisplay-ThinItalic.otf
├── Fungis
│   └── fonts
│       ├── FUNGIS Bold.otf
│       ├── FUNGIS Heavy.otf
│       └── FUNGIS Regular.otf
├── JetBrainsMono
│   └── fonts
│       ├── JetBrainsMono-Bold.ttf
│       ├── JetBrainsMono-BoldItalic.ttf
│       ├── JetBrainsMono-Italic.ttf
│       └── JetBrainsMono-Regular.ttf
├── KharkivTone
│   └── fonts
│       └── KharkivTone.ttf
├── NeutralFace
│   └── fonts
│       ├── NeutralFace-Bold.otf
│       └── NeutralFace.otf
└── Sewaka
    └── fonts
        ├── SewakaSans-Bold.otf
        ├── SewakaSans-BoldItalic.otf
        ├── SewakaSans-ExtraBold.otf
        ├── SewakaSans-ExtraBoldItalic.otf
        ├── SewakaSans-Italic.otf
        ├── SewakaSans-Regular.otf
        ├── SewakaSans-SemiBold.otf
        └── SewakaSans-SemiBoldItalic.otf
```

## Build

Download all font and extract like **Zip Font Structure** on `src/fonts/`

```
npm ci
```

```
npm run build
```

## Deploy In Github

Zip font folder and upload it somewhere, copy the URL of the zip file\
paste the URL on GitHub action secret `URL_ZIP_FONTS`

## Post

### Naming Convention

```
yyyy-mm-dd-slug.mdx
```

### Front Matter

```
---
title: "string"
date: yyyy-mm-dd hh:mm:ss
---
```

## FAQ

- Q : why You don't include the font file
- A : I'm just not sure about redistribute in **license**, so I just give you the font folder structure and where to download the font

## TODO

- Prevent duplicate slug post file naming convention using `ClearDateFromSlug` in `gatsby-node.ts:43`
- Post generator
- Create another project (maybe)

## License

`src/icons/*.ts` - [https://simpleicons.org/](https://simpleicons.org/)

`static/**` - [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/)

`all code` - [MIT](https://choosealicense.com/licenses/mit/)
