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
| backgroundColor | url fbx to load | String |

### inputs
| event        | description           | return |
| ------------- | -------------------- | :-----: |
| onError | return an error | object  error |
| onLoad | return an object with fbx is loading | object onloading |

## License
MIT © [kappys1](https://github.com/kappys1)
