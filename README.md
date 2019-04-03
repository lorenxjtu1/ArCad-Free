# Intro
ArCad is a Editor and a Viewer for your 3D Models!

This project still in development, if you find any bugs or erros, please, open a issue.

## The Marker

The marker that the viewer use is the Hiro Marker.

![Hiro Marker](https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg "Hiro Marker")

## Updates
- March 2019: Alpha Release
-  
-
-

## Milestones
| Date       |      features                |  state |
|------------|:----------------------------:|:-----:|
| March 2019 | Alpha Release                |  100% |
| -          | -                |  -    |

## Architecture


# Development Guidelines
## Running local instance
```npm
cd ./app/
npm install 
npm start
```

## Building
```npm
npm run build
```

## Architecture
```js
/app/
    src/
        .babelrc /*babel compile configuration*/
        index.js /*main entry point*/
        config.json /* all high-level info */
        views/ /*all .html and .css*/
            css/
        commons/ /*all generic algorithms*/

    dist/ /*compiled version of the code*/

```

## React Components
* Menu
* Viewer3D
* AnimationMenu

# Milestones
* integrate with react

## Credits / OpenSource attribuitons

Site template: https://github.com/xiaogliu/pure_full_page

### Icons and other visual Assets
- all icons used in this project come from ![theNounProject](https://thenounproject.com)
- 
