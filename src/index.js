/**
 * @class ExampleComponent
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
let OrbitControls = require('three-orbit-controls')(THREE);
let FBXLoader = require('three-fbxloader-offical');

export default class ReactThreeVisor extends Component {
	static propTypes = {
		url: PropTypes.string,
		backgroundColor: PropTypes.string,
		onError: PropTypes.func,
		onLoad: PropTypes.func
	};

	progress = 0;

	onWindowResize = () => {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	
	animate = () => {
		requestAnimationFrame(this.animate);
		this.renderer.render(this.scene, this.camera);
	}
	init = () => {
		// Camera
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
		this.camera.position.set(2, 0, 10);

		// Controls
		this.controls = new OrbitControls(this.camera);
		this.controls.target.set(0, 0, 0);
		this.controls.update();

		// Scene
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(this.props.backgroundColor || 0xffffff);
		this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

		// Light
		let light = new THREE.HemisphereLight(0xffffff, 0x444444);
		light.position.set(0, 100, 0);
		this.scene.add(light);
		light = new THREE.DirectionalLight(0xffffff);
		light.position.set(0, 100, 100);
		light.castShadow = true;
		light.shadow.camera.top = 180;
		light.shadow.camera.bottom = -100;
		light.shadow.camera.left = -120;
		light.shadow.camera.right = 120;
		light = new THREE.DirectionalLight(0xffffff);
		this.scene.add(light);
		light = new THREE.AmbientLight(0x222222);
		this.scene.add(light);

		// model
		if (this.props.url) {
			let loader = new FBXLoader();
			loader.load(this.props.url, (object) => {
				object.traverse(function(child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				this.scene.add(object);
			}, (s) => {
				this.handleLoad(s);
			}, (error) => {
				this.handleError(error);
			});
		}

		// Renderer
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.shadowMap.enabled = true;
		this.container.appendChild(this.renderer.domElement);
		window.addEventListener('resize', this.onWindowResize.bind(this), false);
		this.animate();
	}

	handleLoad = (e) => {
		if (this.props.onLoad) {
			this.props.onLoad(e);
		}
	}
	
	handleError = (e) => {
		if (this.props.onError) {
			this.props.onError(e);
		}
	}

	componentDidMount() {
		this.init();
	}

	render() {
		return (
			<div ref={(el) => { this.container = el; }} />
		);
	}
}
