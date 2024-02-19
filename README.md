# enter-mobile-analytics-microfront-monolithic

## Description
This project consists of creating a monolithic microfrontend for [ENTER](https://www.enter.co/). The main goal is to provide users with an interactive experience on the page, especially when they want to purchase a new mobile device. Key features include the ability to compare devices, view specific details for each device, and filter searches based on user preferences.

## Used technology
The project makes use of the following technologies:

- [Astro](https://astro.build/)
- [BEM (Block, Element, Modifier)](http://getbem.com/)
- [NODE.js](https://nodejs.org/en)
- [Puppeteer](https://pptr.dev/)

##  Project Structure

Inside of this ENTER project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── navbar/
│   │   ├── search-section/
│   │   ├── filters/
│   │   ├── recommended-phones-list/
│   │   ├── phone-comparison/
│   │   ├── phone-details/
│   │   ├── footer/
│   │
│   ├── layouts/
│   │   ├── Layout.astro
│   │   ├── api/
│   │
│   └── pages/
│       └── index.astro
└── package.json
```

##  File Descriptions


#### `src/components/` The directory contains the folders that represent each component of the user interface:
* `src/components/search-section` - [/search-section](/src/components/search-section/)
* `src/components/recommended-phones-list` - [../recommended-phones-list](/src/components/recommended-phones-list/)
* `src/components/phone-details` - [../phone-details](/src/components/phone-details/)
* `src/components/phone-comparison` - [../phone-comparison](/src/components/phone-comparison/)
* `src/components/navbar` - [../navbar](/src/components/navbar/)
* `src/components/footer` - [../footer](/src/components/footer/)
* `src/components/filters` - [../filters](/src/components/filters/)

 Within eachfolder, there are subfolders and files to handle the logic, the service layer, the data types specific to that component, and the Astro format user interface file (.astro) that describes the structure. of the component.

* Logic files `logic.ts` handle the logic specific to that component.
* Domain files `domain.ts` can contain interfaces or classes that define the data model or structures used by the component.
* Service files `service.ts` can contain logic related to obtaining or manipulating data for that component.
* Type files `type.ts` can contain definitions of specific types used in the component.



##  Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## AUTHORS:

- **Juan Avila [ technology leader ]**: [Github](https://github.com/JuanDAC)
- **Julian Garcia [ Frontend manager ]**: [GitHub](https://github.com/Julibeto84)
- **Ishay Junnco [ backend manager ]**: [GitHub](https://github.com/IshayJQ)
- **Harold Suarez [ devop manager ]**: [GitHub](https://github.com/HaroldS10)


# enter-mobile-analytics-microfront-monolithic
