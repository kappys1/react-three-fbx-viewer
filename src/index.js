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
		cameraPosition: PropTypes.object,
		controlsPosition: PropTypes.object,
		angle: PropTypes.number,
		far: PropTypes.number,
		near: PropTypes.number,
		onError: PropTypes.func,
		onLoading: PropTypes.func
	};

	checkProps = () => {
		this.cameraPosition = this.props.cameraPosition || {x: 2, y: 0, z: 10};
		this.controlsPosition = this.props.controlsPosition || {x: 0, y: 0, z: 0};
		this.angle = this.props.angle || 45;
		this.far = this.props.far || 2000;
		this.near = this.props.near || 1;
		this.lights = this.props.ligths || null;
	}

	onWindowResize = () => {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	
	animate = () => {
		requestAnimationFrame(this.animate);
		if (this.mixers.length > 0) {
			for (var i = 0; i < this.mixers.length; i++) {
				this.mixers[ i ].update(this.clock.getDelta());
			}
		}
		this.renderer.render(this.scene, this.camera);
	}
	init = () => {
		// mixers
		this.mixers = [];
		this.clock = new THREE.Clock();

		// Camera
		this.camera = new THREE.PerspectiveCamera(this.angle, window.innerWidth / window.innerHeight, this.near, this.far);
		this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);

		// Controls
		this.controls = new OrbitControls(this.camera);
		this.controls.target.set(this.controlsPosition.x, this.controlsPosition.y, this.controlsPosition.z);
		this.controls.update();

		// Scene
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(this.props.backgroundColor || 0xffffff);
		//this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
		
		// Light
		let light = new THREE.HemisphereLight(0xffffff, 0x444444);
		light.position.set(0, 200, 0);
		this.scene.add(light);
		light = new THREE.DirectionalLight(0xffffff);
		light.position.set(0, 200, 100);
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

				object.mixer = new THREE.AnimationMixer(object);
				if (object.mixer) {
					this.mixers.push(object.mixer);
				}

				if (object.animations[ 0 ]) {
					let action = object.mixer.clipAction(object.animations[ 0 ]);
					action.play();
				}

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
			this.props.onLoading(e);
		}
	}
	
	handleError = (e) => {
		if (this.props.onError) {
			this.props.onError(e);
		}
	}

	componentDidMount() {
		this.checkProps();
		this.init();
	}

	render() {
		return (
			<div ref={(el) => { this.container = el; }} />
		);
	}
}
