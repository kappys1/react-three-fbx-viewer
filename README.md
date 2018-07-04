# react-three-fbx-viewer

> fbx viewer with three.js for react

**Only render a fbx files**

##[Example](https://kappys1.github.io/react-three-fbx-viewer/)
## Install

```bash
npm install --save react-three-fbx-viewer
```

## Usage

```jsx
import React, { Component } from 'react';
import ReactThreeFbxViewer from 'react-three-fbx-viewer';

let fbxUrl = require('./asd.fbx');

export default class App extends Component {
  onLoad(e) {
    console.log(e);
  }

  onError(e) {
    console.log(e);
  }
  render () {
    let cameraPosition = {
      x:150,
      y:300,
      z:350
    }
    return (
      <div>
        <ReactThreeFbxViewer cameraPosition={cameraPosition} url={fbxUrl} onLoading={this.onLoad} onError={this.onError}/>
      </div>
    );
  }
}

```

## Properties

### inputs
| param        | description           | type  | default |
| ------------- | -------------------- | :-----: | ----- |
| url | url fbx to load | String | "" |
| backgroundColor | color in hex | Hex | 0x000000 |
| angle | angle of perspective camera in scene | number | 45 |
| near | near of perspective camera in scene | number | 1 |
| far | far of perspective camera in scene | number | 2000 |
| cameraPosition | camera position in scene | Object | {x: 2, y: 0, z: 10} |
| controlsPosition | control position in scene | Object | {x: 0, y: 0, z: 0} |

*In a future, you will can choice the lights (HemisphereLight,HemisphereLight,AmbientLight, ...)*
### inputs
| event        | description           | return |
| ------------- | -------------------- | :-----: |
| onError | return an error | object  error |
| onLoading | return an object with fbx is loading | object onloading |

---

## Local development

1. **clone repo , not install.**

Local development is broken into two parts.
- First, you'll run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.
```bash
npm start # runs rollup with watch flag
```
- The second part will be running the `example/` create-react-app that's linked to the local version of your module.

```bash
# (in another tab)
cd example
npm link react-three-fbx-visor # optional if using yarn
npm start # runs create-react-app dev server
```

Now, anytime you make a change to your component in `src/` or to the example app's `example/src`.

![](https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif)

*Note: if you're using yarn, there is no need to use `yarn link`, as the generated module's example includes a local-link by default.*

## License

MIT © [kappys1](https://github.com/kappys1) - Alejandro Marcos Gutierrez


2018 © TMTFactory