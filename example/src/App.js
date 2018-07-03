import React, { Component } from 'react';

import ReactThreeVisor from 'react-three-fbx-visor';
let fbxUrl = require('./Busto.fbx');

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
				<ReactThreeVisor url={fbxUrl} onLoad={this.onLoad} onError={this.onError}/>
			</div>
		);
	}
}
