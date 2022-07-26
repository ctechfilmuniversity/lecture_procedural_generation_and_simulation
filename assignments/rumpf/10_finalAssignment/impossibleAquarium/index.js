/**
 * The main app method, which runs after the shaders have been loaded
 * 
 * @param {string[]} shaders
 */

 import * as THREE from 'three';
 import { OrbitControls } from 'https://unpkg.com/three@0.138.3/examples/jsm/controls/OrbitControls.js';
 import { GPUComputationRenderer } from 'https://unpkg.com/three@0.138.3/examples/jsm/misc/GPUComputationRenderer.js';
 import { GLTFLoader } from 'https://unpkg.com/three@0.138.3/examples/jsm/loaders/GLTFLoader.js';

function app(shaders) {

	///// SCENE
	const scene = new THREE.Scene();
	scene.fog = new THREE.Fog("rgb(51, 58, 66)", 1, 1000 );

	let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 3000 );
	camera.position.z = 550;

	const renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(innerWidth, innerHeight);

	document.body.appendChild(renderer.domElement);

	addEventListener("resize", () => {
		renderer.setSize(innerWidth, innerHeight);
		camera.aspect = innerWidth / innerHeight;
		camera.updateProjectionMatrix();
	});

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	controls.minDistance = 1.1;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 2.5;

	// Create White CUbe
	const boxVolume = new THREE.Mesh(new THREE.BoxGeometry(399, 399, 399), new THREE.MeshBasicMaterial( 
		{ color: "rgb(255, 255, 255)",
			side: THREE.BackSide
		 } ));

	// Create Main Box (blocking view depending on viewing angle)
	const box = new THREE.Mesh(new THREE.BoxGeometry(400, 400, 400), new THREE.ShaderMaterial({
		vertexShader: shaders[0],
		fragmentShader: shaders[1]
	}));


	// Load Text Meshes
	new GLTFLoader().load( './models/Text0.glb', function ( gltf ) {
		let object = gltf.scene;
		object.scale.set(15,15,15);
		object.rotation.set(Math.PI / 2,0,Math.PI / 2);
		object.position.set(198,80,60);
		var newMaterial = new THREE.ShaderMaterial({
			vertexShader: shaders[0],
			fragmentShader: shaders[2],
			uniforms: {
				face: {
					value: 0
				},
				color: {
					value: new THREE.Vector3(0.3, 0.3, 0.3)
				}
			}});

		object.traverse( ( child ) => {
			if ( child.isMesh ) {
				child.material = newMaterial;
			}
			});

		scene.add(object);
	});
	new GLTFLoader().load( './models/Text1.glb', function ( gltf ) {
		let object = gltf.scene;
		object.scale.set(15,15,15);
		object.rotation.set(Math.PI / 2,0,Math.PI);
		object.position.set(-60,80,198);
		var newMaterial = new THREE.ShaderMaterial({
			vertexShader: shaders[0],
			fragmentShader: shaders[2],
			uniforms: {
				face: {
					value: 1
				},
				color: {
					value: new THREE.Vector3(0.3, 0.3, 0.3)
				}
			}});

		object.traverse( ( child ) => {
			if ( child.isMesh ) {
				child.material = newMaterial;
			}
			});
		scene.add(object);
	});
	new GLTFLoader().load( './models/Text2.glb', function ( gltf ) {
		let object = gltf.scene;
		object.scale.set(15,15,15);
		object.rotation.set(Math.PI / 2,0, Math.PI + Math.PI / 2);
		object.position.set(-198,80,-60);
		var newMaterial = new THREE.ShaderMaterial({
			vertexShader: shaders[0],
			fragmentShader: shaders[2],
			uniforms: {
				face: {
					value: 2
				},
				color: {
					value: new THREE.Vector3(0.3, 0.3, 0.3)
				}
			}});

		object.traverse( ( child ) => {
			if ( child.isMesh ) {
				child.material = newMaterial;
			}
			});
		scene.add(object);
	});
	new GLTFLoader().load( './models/Text3.glb', function ( gltf ) {
		let object = gltf.scene;
		object.scale.set(15,15,15);
		object.rotation.set(Math.PI / 2,0, 0);
		object.position.set(60,80,-198);
		var newMaterial = new THREE.ShaderMaterial({
			vertexShader: shaders[0],
			fragmentShader: shaders[2],
			uniforms: {
				face: {
					value: 3
				},
				color: {
					value: new THREE.Vector3(0.3, 0.3, 0.3)
				}
			}});

		object.traverse( ( child ) => {
			if ( child.isMesh ) {
				child.material = newMaterial;
			}
			});
		scene.add(object);
	});


	// Add the objects (and camera) to the scene
	scene.add(box);
	scene.add(boxVolume);


	//// BOIDS ///////////////////////////////////////////////

	/* TEXTURE WIDTH FOR SIMULATION */
	const WIDTH = 32;

	const BOIDS = WIDTH * WIDTH;
	
	const BOUNDS = 30, BOUNDS_HALF = BOUNDS / 2;

	/* BAKE ANIMATION INTO TEXTURE and CREATE GEOMETRY FROM BASE MODEL */
	const BoidGeometry = new THREE.BufferGeometry();
	let textureAnimation, durationAnimation, indicesPerBoid;

	function nextPowerOf2( n ) {

		return Math.pow( 2, Math.ceil( Math.log( n ) / Math.log( 2 ) ) );

	}

	Math.lerp = function ( value1, value2, amount ) {

		amount = Math.max( Math.min( amount, 1 ), 0 );
		return value1 + ( value2 - value1 ) * amount;

	};

	new GLTFLoader().load( './models/FishMorph.glb', function ( gltf ) {

		const animations = gltf.animations;
		durationAnimation = Math.round( animations[ 0 ].duration * 60 );
		const boidGeo = gltf.scene.children[ 0 ].geometry;
		console.log(boidGeo);
		indicesPerBoid = boidGeo.index.count;
		const vertices = [], color = [], reference = [], indices = [];
		const totalVertices = boidGeo.getAttribute( 'position' ).count * 3 * BOIDS;
		for ( let i = 0; i < totalVertices; i ++ ) {

			const bIndex = i % ( boidGeo.getAttribute( 'position' ).count * 3 );
			vertices.push( boidGeo.getAttribute( 'position' ).array[ bIndex ] );

		}

		let r = Math.random();
		for ( let i = 0; i < boidGeo.getAttribute( 'position' ).count * BOIDS; i ++ ) {

			const bIndex = i % ( boidGeo.getAttribute( 'position' ).count );
			const boid = Math.floor( i / boidGeo.getAttribute( 'position' ).count );
			if ( bIndex == 0 ) r = Math.random();
			const j = ~ ~ boid;
			const x = ( j % WIDTH ) / WIDTH;
			const y = ~ ~ ( j / WIDTH ) / WIDTH;
			reference.push( x, y);

		}

		for ( let i = 0; i < boidGeo.index.array.length * BOIDS; i ++ ) {

			const offset = Math.floor( i / boidGeo.index.array.length ) * ( boidGeo.getAttribute( 'position' ).count );
			indices.push( boidGeo.index.array[ i % boidGeo.index.array.length ] + offset );

		}

		BoidGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
		BoidGeometry.setAttribute( 'boidColor', new THREE.BufferAttribute( new Float32Array( color ), 3 ) );
		BoidGeometry.setAttribute( 'reference', new THREE.BufferAttribute( new Float32Array( reference ), 2 ) );

		BoidGeometry.setIndex( indices );

	} );

	///// boids_0 definitions /////
	let last = performance.now();

	let gpuCompute;
	let velocityVariable;
	let positionVariable;
	let positionUniforms;
	let velocityUniforms;
	let boidUniforms;

	init();
	function init() {

		initComputeRenderer();


		const effectController = {
			separation: 20.0,
			alignment: 20.0,
			cohesion: 20.0,
			freedom: 0.75,
			count: Math.floor( BOIDS / 4 )
		};


		const valuesChanger = function () {

			velocityUniforms[ 'separationDistance' ].value = effectController.separation;
			velocityUniforms[ 'alignmentDistance' ].value = effectController.alignment;
			velocityUniforms[ 'cohesionDistance' ].value = effectController.cohesion;
			velocityUniforms[ 'freedomFactor' ].value = effectController.freedom;
		};

		valuesChanger();
		initBoids();

	}

	function initComputeRenderer() {

		gpuCompute = new GPUComputationRenderer( WIDTH, WIDTH, renderer);

		if ( renderer.capabilities.isWebGL2 === false ) {

			gpuCompute.setDataType( THREE.HalfFloatType );

		}

		//fill default texture
		const dtPosition = gpuCompute.createTexture();
		const dtVelocity = gpuCompute.createTexture();
		fillPositionTexture( dtPosition );
		fillVelocityTexture( dtVelocity );

		velocityVariable = gpuCompute.addVariable( 'textureVelocity',shaders[4], dtVelocity );
		positionVariable = gpuCompute.addVariable( 'texturePosition', shaders[3], dtPosition );

		gpuCompute.setVariableDependencies( velocityVariable, [ positionVariable, velocityVariable ] );
		gpuCompute.setVariableDependencies( positionVariable, [ positionVariable, velocityVariable ] );

		positionUniforms = positionVariable.material.uniforms;
		velocityUniforms = velocityVariable.material.uniforms;

		positionUniforms[ 'time' ] = { value: 0.0 };
		positionUniforms[ 'delta' ] = { value: 0.0 };
		velocityUniforms[ 'time' ] = { value: 1.0 };
		velocityUniforms[ 'delta' ] = { value: 0.0 };
		velocityUniforms[ 'testing' ] = { value: 1.0 };
		velocityUniforms[ 'separationDistance' ] = { value: 1.0 };
		velocityUniforms[ 'alignmentDistance' ] = { value: 1.0 };
		velocityUniforms[ 'cohesionDistance' ] = { value: 1.0 };
		velocityUniforms[ 'freedomFactor' ] = { value: 1.0 };
		velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed( 2 );

		velocityVariable.wrapS = THREE.RepeatWrapping;
		velocityVariable.wrapT = THREE.RepeatWrapping;
		positionVariable.wrapS = THREE.RepeatWrapping;
		positionVariable.wrapT = THREE.RepeatWrapping;

		const error = gpuCompute.init();

		if ( error !== null ) {

			console.error( error );

		}

	}

	function initBoids() {

		const geometry = BoidGeometry;

		// For Vertex and Fragment
		boidUniforms = {
			'color': { value: new THREE.Color( "rgb(0,255, 0)") },
			'texturePosition': { value: null },
			'textureVelocity': { value: null },
			'time': { value: 1.0 },
			'delta': { value: 0.0 },
			'face': { value: 0 },
			'size': {value: 3.0},
			'textureAnimation': { value: textureAnimation }
		};

		// THREE.ShaderMaterial
		const material = new THREE.ShaderMaterial( {
			uniforms: boidUniforms,
			vertexShader: shaders[5], //5
			fragmentShader: shaders[7], //6
			side: THREE.DoubleSide,

		} );

		const boidMesh = new THREE.Mesh( geometry, material );
		boidMesh.rotation.y = Math.PI / 2;
		boidMesh.matrixAutoUpdate = false;
		boidMesh.updateMatrix();
		scene.add( boidMesh );

	}

	function fillPositionTexture( texture ) {

		const theArray = texture.image.data;

		for ( let k = 0, kl = theArray.length; k < kl; k += 4 ) {

			// const x = Math.random() * BOUNDS - BOUNDS_HALF;
			// const y = Math.random() * BOUNDS - BOUNDS_HALF;
			// const z = Math.random() * BOUNDS - BOUNDS_HALF;
			const x = Math.random();
			const y = Math.random();
			const z = Math.random();

			theArray[ k + 0 ] = x;
			theArray[ k + 1 ] = y;
			theArray[ k + 2 ] = z;
			theArray[ k + 3 ] = 1;

		}

	}

	function fillVelocityTexture( texture ) {

		const theArray = texture.image.data;

		for ( let k = 0, kl = theArray.length; k < kl; k += 4 ) {

			const x = Math.random()  * BOUNDS - BOUNDS_HALF;
			const y = Math.random()  * BOUNDS - BOUNDS_HALF;
			const z = Math.random()  * BOUNDS - BOUNDS_HALF;

			theArray[ k + 0 ] = x * 10;
			theArray[ k + 1 ] = y * 10;
			theArray[ k + 2 ] = z * 10;
			theArray[ k + 3 ] = 1;

		}

	}


		///// boids_1 definitions /////
	
		let gpuCompute1;
		let velocityVariable1;
		let positionVariable1;
		let positionUniforms1;
		let velocityUniforms1;
		let boidUniforms1;
	
		init1();
		function init1() {
	
			initComputeRenderer1();
	
	
			const effectController = {
				separation: 20.0,
				alignment: 50.0,
				cohesion: 20.0,
				freedom: 0.1
			};
	
	
			const valuesChanger = function () {
	
				velocityUniforms1[ 'separationDistance' ].value = effectController.separation;
				velocityUniforms1[ 'alignmentDistance' ].value = effectController.alignment;
				velocityUniforms1[ 'cohesionDistance' ].value = effectController.cohesion;
				velocityUniforms1[ 'freedomFactor' ].value = effectController.freedom;
	
			};
	
			valuesChanger();
	
			initBoids1();
	
		}
	
		function initComputeRenderer1() {
	
			gpuCompute1 = new GPUComputationRenderer( WIDTH, WIDTH, renderer);
	
			if ( renderer.capabilities.isWebGL2 === false ) {
	
				gpuCompute1.setDataType( THREE.HalfFloatType );
	
			}
	
			const dtPosition = gpuCompute1.createTexture();
			const dtVelocity = gpuCompute1.createTexture();
			fillPositionTexture( dtPosition );
			fillVelocityTexture( dtVelocity );
	
			velocityVariable1 = gpuCompute1.addVariable( 'textureVelocity',shaders[4], dtVelocity );
			positionVariable1 = gpuCompute1.addVariable( 'texturePosition', shaders[3], dtPosition );
	
			gpuCompute1.setVariableDependencies( velocityVariable1, [ positionVariable1, velocityVariable1 ] );
			gpuCompute1.setVariableDependencies( positionVariable1, [ positionVariable1, velocityVariable1 ] );
	
			positionUniforms1 = positionVariable1.material.uniforms;
			velocityUniforms1 = velocityVariable1.material.uniforms;
	
			positionUniforms1[ 'time' ] = { value: 0.0 };
			positionUniforms1[ 'delta' ] = { value: 0.0 };
			velocityUniforms1[ 'time' ] = { value: 1.0 };
			velocityUniforms1[ 'delta' ] = { value: 0.0 };
			velocityUniforms1[ 'testing' ] = { value: 1.0 };
			velocityUniforms1[ 'separationDistance' ] = { value: 1.0 };
			velocityUniforms1[ 'alignmentDistance' ] = { value: 1.0 };
			velocityUniforms1[ 'cohesionDistance' ] = { value: 1.0 };
			velocityUniforms1[ 'freedomFactor' ] = { value: 1.0 };
			velocityVariable1.material.defines.BOUNDS = BOUNDS.toFixed( 2 );
	
			velocityVariable1.wrapS = THREE.RepeatWrapping;
			velocityVariable1.wrapT = THREE.RepeatWrapping;
			positionVariable1.wrapS = THREE.RepeatWrapping;
			positionVariable1.wrapT = THREE.RepeatWrapping;
	
			const error = gpuCompute1.init();
	
			if ( error !== null ) {
	
				console.error( error );
	
			}
	
		}
	
		function initBoids1() {
	
		const geometry = BoidGeometry;
	
			// For Vertex and Fragment
			boidUniforms1 = {
				'color': { value: new THREE.Color("rgb(255, 0, 0)") },
				'texturePosition': { value: null },
				'textureVelocity': { value: null },
				'time': { value: 1.0 },
				'delta': { value: 0.0 },
				'face': { value: 1 },
				'size': {value: 3.0}
			};
	
			// THREE.ShaderMaterial
			const material = new THREE.ShaderMaterial( {
				uniforms: boidUniforms1,
				vertexShader: shaders[5], //5
				fragmentShader: shaders[7], //6
				side: THREE.DoubleSide,
	
			} );
	
			const boidMesh = new THREE.Mesh( geometry, material );
			boidMesh.rotation.y = Math.PI / 2;
			boidMesh.matrixAutoUpdate = false;
			boidMesh.updateMatrix();
			scene.add( boidMesh );
	
		}
	


	///// boids_2 definitions /////
		
	let gpuCompute2;
	let velocityVariable2;
	let positionVariable2;
	let positionUniforms2;
	let velocityUniforms2;
	let boidUniforms2;

	init2();
	function init2() {

		initComputeRenderer2();


		const effectController = {
			separation: 1.0,
			alignment: 1.0,
			cohesion: 1.0,
			freedom: 0.0
		};


		const valuesChanger = function () {

			velocityUniforms2[ 'separationDistance' ].value = effectController.separation;
			velocityUniforms2[ 'alignmentDistance' ].value = effectController.alignment;
			velocityUniforms2[ 'cohesionDistance' ].value = effectController.cohesion;
			velocityUniforms2[ 'freedomFactor' ].value = effectController.freedom;

		};

		valuesChanger();

		initBoids2();

	}

	function initComputeRenderer2() {

		gpuCompute2 = new GPUComputationRenderer( WIDTH, WIDTH, renderer);

		if ( renderer.capabilities.isWebGL2 === false ) {

			gpuCompute2.setDataType( THREE.HalfFloatType );

		}

		const dtPosition = gpuCompute2.createTexture();
		const dtVelocity = gpuCompute2.createTexture();
		fillPositionTexture( dtPosition );
		fillVelocityTexture( dtVelocity );

		velocityVariable2 = gpuCompute2.addVariable( 'textureVelocity',shaders[4], dtVelocity );
		positionVariable2 = gpuCompute2.addVariable( 'texturePosition', shaders[3], dtPosition );

		gpuCompute2.setVariableDependencies( velocityVariable2, [ positionVariable2, velocityVariable2 ] );
		gpuCompute2.setVariableDependencies( positionVariable2, [ positionVariable2, velocityVariable2 ] );

		positionUniforms2 = positionVariable2.material.uniforms;
		velocityUniforms2 = velocityVariable2.material.uniforms;

		positionUniforms2[ 'time' ] = { value: 0.0 };
		positionUniforms2[ 'delta' ] = { value: 0.0 };
		velocityUniforms2[ 'time' ] = { value: 1.0 };
		velocityUniforms2[ 'delta' ] = { value: 0.0 };
		velocityUniforms2[ 'testing' ] = { value: 1.0 };
		velocityUniforms2[ 'separationDistance' ] = { value: 1.0 };
		velocityUniforms2[ 'alignmentDistance' ] = { value: 1.0 };
		velocityUniforms2[ 'cohesionDistance' ] = { value: 1.0 };
		velocityUniforms2[ 'freedomFactor' ] = { value: 1.0 };
		velocityVariable2.material.defines.BOUNDS = BOUNDS.toFixed( 2 );

		velocityVariable2.wrapS = THREE.RepeatWrapping;
		velocityVariable2.wrapT = THREE.RepeatWrapping;
		positionVariable2.wrapS = THREE.RepeatWrapping;
		positionVariable2.wrapT = THREE.RepeatWrapping;

		const error = gpuCompute2.init();

		if ( error !== null ) {

			console.error( error );

		}

	}

	function initBoids2() {

		const geometry = BoidGeometry;

		// For Vertex and Fragment
		boidUniforms2 = {
			'color': { value: new THREE.Color("rgb(255, 0, 255)") },
			'texturePosition': { value: null },
			'textureVelocity': { value: null },
			'time': { value: 1.0 },
			'delta': { value: 0.0 },
			'face': { value: 2 },
			'size': {value: 3.0}
		};

		// THREE.ShaderMaterial
		const material = new THREE.ShaderMaterial( {
			uniforms: boidUniforms2,
			vertexShader: shaders[5], //5
			fragmentShader: shaders[7], //6
			side: THREE.DoubleSide,

		} );

		const boidMesh = new THREE.Mesh( geometry, material );
		boidMesh.rotation.y = Math.PI / 2;
		boidMesh.matrixAutoUpdate = false;
		boidMesh.updateMatrix();
		scene.add( boidMesh );

	}	

	///// boids_3 definitions /////
	
	let gpuCompute3;
	let velocityVariable3;
	let positionVariable3;
	let positionUniforms3;
	let velocityUniforms3;
	let boidUniforms3;

	init3();
	function init3() {

		initComputeRenderer3();


		const effectController = {
			separation: 10.0,
			alignment: 0.0,
			cohesion: 130.0,
			freedom: 0.0
		};


		const valuesChanger = function () {

			velocityUniforms3[ 'separationDistance' ].value = effectController.separation;
			velocityUniforms3[ 'alignmentDistance' ].value = effectController.alignment;
			velocityUniforms3[ 'cohesionDistance' ].value = effectController.cohesion;
			velocityUniforms3[ 'freedomFactor' ].value = effectController.freedom;

		};

		valuesChanger();

		initBoids3();

	}

	function initComputeRenderer3() {

		gpuCompute3 = new GPUComputationRenderer( WIDTH, WIDTH, renderer);

		if ( renderer.capabilities.isWebGL2 === false ) {

			gpuCompute3.setDataType( THREE.HalfFloatType );

		}

		const dtPosition = gpuCompute3.createTexture();
		const dtVelocity = gpuCompute3.createTexture();
		fillPositionTexture( dtPosition );
		fillVelocityTexture( dtVelocity );

		velocityVariable3 = gpuCompute3.addVariable( 'textureVelocity',shaders[4], dtVelocity );
		positionVariable3 = gpuCompute3.addVariable( 'texturePosition', shaders[3], dtPosition );

		gpuCompute3.setVariableDependencies( velocityVariable3, [ positionVariable3, velocityVariable3 ] );
		gpuCompute3.setVariableDependencies( positionVariable3, [ positionVariable3, velocityVariable3 ] );

		positionUniforms3 = positionVariable3.material.uniforms;
		velocityUniforms3 = velocityVariable3.material.uniforms;

		positionUniforms3[ 'time' ] = { value: 0.0 };
		positionUniforms3[ 'delta' ] = { value: 0.0 };
		velocityUniforms3[ 'time' ] = { value: 1.0 };
		velocityUniforms3[ 'delta' ] = { value: 0.0 };
		velocityUniforms3[ 'testing' ] = { value: 1.0 };
		velocityUniforms3[ 'separationDistance' ] = { value: 1.0 };
		velocityUniforms3[ 'alignmentDistance' ] = { value: 1.0 };
		velocityUniforms3[ 'cohesionDistance' ] = { value: 1.0 };
		velocityUniforms3[ 'freedomFactor' ] = { value: 1.0 };
		velocityVariable3.material.defines.BOUNDS = BOUNDS.toFixed( 2 );

		velocityVariable3.wrapS = THREE.RepeatWrapping;
		velocityVariable3.wrapT = THREE.RepeatWrapping;
		positionVariable3.wrapS = THREE.RepeatWrapping;
		positionVariable3.wrapT = THREE.RepeatWrapping;

		const error = gpuCompute3.init();

		if ( error !== null ) {

			console.error( error );

		}

	}

	function initBoids3() {

		const geometry = BoidGeometry;

		// For Vertex and Fragment
		boidUniforms3 = {
			'color': { value: new THREE.Color("rgb(255, 255, 255)") },
			'texturePosition': { value: null },
			'textureVelocity': { value: null },
			'time': { value: 1.0 },
			'delta': { value: 0.0 },
			'face': { value: 3 },
			'size': {value: 3.0}
		};

		// THREE.ShaderMaterial
		const material = new THREE.ShaderMaterial( {
			uniforms: boidUniforms3,
			vertexShader: shaders[5], //5
			fragmentShader: shaders[7], //6
			side: THREE.DoubleSide,

		} );

		const boidMesh = new THREE.Mesh( geometry, material );
		boidMesh.rotation.y = Math.PI / 2;
		boidMesh.matrixAutoUpdate = false;
		boidMesh.updateMatrix();
		scene.add( boidMesh );

	}	




	/**
	 * The method responsible for updated the objects, and rendering the scene.
	 * Is called once per animation frame.
	 */
	function render() {


		////// boids update
		const now = performance.now();
		let delta = ( now - last ) / 1000;

		if ( delta > 1 ) delta = 1; // safety cap on large deltas
		last = now;

		// boids 0
		positionUniforms[ 'time' ].value = now;
		positionUniforms[ 'delta' ].value = delta;
		velocityUniforms[ 'time' ].value = now;
		velocityUniforms[ 'delta' ].value = delta;
		boidUniforms[ 'time' ].value = now;
		boidUniforms[ 'delta' ].value = delta;

		// boids 1
		positionUniforms1[ 'time' ].value = now;
		positionUniforms1[ 'delta' ].value = delta;
		velocityUniforms1[ 'time' ].value = now;
		velocityUniforms1[ 'delta' ].value = delta;
		boidUniforms1[ 'time' ].value = now;
		boidUniforms1[ 'delta' ].value = delta;


		// boids 2
		positionUniforms2[ 'time' ].value = now;
		positionUniforms2[ 'delta' ].value = delta;
		velocityUniforms2[ 'time' ].value = now;
		velocityUniforms2[ 'delta' ].value = delta;
		boidUniforms2[ 'time' ].value = now;
		boidUniforms2[ 'delta' ].value = delta;


		// boids 3
		positionUniforms3[ 'time' ].value = now;
		positionUniforms3[ 'delta' ].value = delta;
		velocityUniforms3[ 'time' ].value = now;
		velocityUniforms3[ 'delta' ].value = delta;
		boidUniforms3[ 'time' ].value = now;
		boidUniforms3[ 'delta' ].value = delta;


		gpuCompute.compute();
		gpuCompute1.compute();
		gpuCompute2.compute();
		gpuCompute3.compute();

		boidUniforms[ 'texturePosition' ].value = gpuCompute.getCurrentRenderTarget( positionVariable ).texture;
		boidUniforms[ 'textureVelocity' ].value = gpuCompute.getCurrentRenderTarget( velocityVariable ).texture;
		boidUniforms1[ 'texturePosition' ].value = gpuCompute1.getCurrentRenderTarget( positionVariable1 ).texture;
		boidUniforms1[ 'textureVelocity' ].value = gpuCompute1.getCurrentRenderTarget( velocityVariable1 ).texture;
		boidUniforms2[ 'texturePosition' ].value = gpuCompute2.getCurrentRenderTarget( positionVariable2 ).texture;
		boidUniforms2[ 'textureVelocity' ].value = gpuCompute2.getCurrentRenderTarget( velocityVariable2 ).texture;
		boidUniforms3[ 'texturePosition' ].value = gpuCompute3.getCurrentRenderTarget( positionVariable3 ).texture;
		boidUniforms3[ 'textureVelocity' ].value = gpuCompute3.getCurrentRenderTarget( velocityVariable3 ).texture;


		// Update the scene
		renderer.render(scene, camera);

		requestAnimationFrame(render);

		controls.update();
	}

	requestAnimationFrame(render);
}

// Load the shaders as text then start the app //TODO: Remove: boid_frag (never used)
Promise.all([ fetch("./shaders/vertex.glsl"), fetch("./shaders/outer_fragment.glsl"), fetch("./shaders/inner_fragment.glsl"), fetch("./shaders/boid_frag_position.glsl"), fetch("./shaders/boid_frag_velocity.glsl"), fetch("./shaders/boid_vert.glsl") , fetch("./shaders/boid_frag.glsl"), fetch("./shaders/boid_inner_fragment.glsl")]) // fetch all the shaders
.then(requests => Promise.all(requests.map(request => request.text()))) // convert the fetch responses to strings
.then(app);