# react-three-fbx-visor

> visor for threejs with react

**Only render a fbx files**

## Install
1. [Set up SSH KEY](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html) key in your Computer, **don't forget to Add the public key to your Bitbucket settings *(step 4 for macOS/Linux,step 5 for windows, step)* .**

2. install
```bash
npm install --save react-three-fbx-visor
```

## Usage

```jsx
import React, { Component } from 'react';

import ReactThreeVisor from 'react-three-visor';
let fbxUrl = require('./Busto.fbx'); // this is a fbx to load or route to load.


export default class App extends Component {
  onLoad(e) {
    console.log(e);
  }

  onError(e) {
    console.log(e);
  }
  render () {
    return (
      <div>
        <ReactThreeVisor object={fbxUrl} onLoad={this.onLoad} onError={this.onError}/>
      </div>
    );
  }
}

```
## Properties

### inputs
| param        | description           | type  |
| ------------- | -------------------- | :-----:
| url | url fbx to load | String |
| backgroundColor | color in hex -> Default : 0x000000| Hex |

### inputs
| event        | description           | return |
| ------------- | -------------------- | :-----: |
| onError | return an error | object  error |
| onLoad | return an object with fbx is loading | object onloading |

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