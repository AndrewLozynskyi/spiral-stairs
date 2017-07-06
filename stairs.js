var canvas = document.getElementById('content');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.z = 250;

var renderer = new THREE.WebGLRenderer();

var inputContainer = document.getElementById('input-container');

renderer.setSize( 800, 800 );
renderer.setClearColor( 0x494949, 1 );
camera.position.z = 5;

canvas.appendChild( renderer.domElement );

dirLightTop = new THREE.DirectionalLight( 0xffffff, 1 );
dirLightTop.color.setHSL( 0.1, 1, 0.95 );
dirLightTop.position.set( -100, 175, 100 );
dirLightTop.position.multiplyScalar( 50 );
scene.add( dirLightTop );

dirLightBottom = new THREE.DirectionalLight( 0xffffff, 1 );
dirLightBottom.color.setHSL( 0.1, 1, 0.95 );
dirLightBottom.position.set( -100, -175, 100 );
dirLightBottom.position.multiplyScalar( 50 );
scene.add( dirLightBottom );

//helper
var axisHelper = new THREE.AxisHelper( 50 );
scene.add( axisHelper )

var controls = new OrbitControls(camera);

// add event listener 
canvas.addEventListener('click', function() { 
    controls.enabled = true;
}, false);

inputContainer.addEventListener( 'click', function() {
    controls.enabled = false;
}, false );
// 

var drawStairs = function () {

    var selected = scene.getObjectByName("stairs");
    
    if ( selected != undefined ) { 

        scene.remove( selected );

    }

    var defaultMat = new THREE.MeshPhongMaterial( { color: 0x6c0507, specular: 0xea4335, shininess: 1, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading, side: THREE.DoubleSide } );

    var rMin = +document.getElementById( 'minRadius' ).value;
    var rMax = +document.getElementById( 'maxRadius' ).value;
    var stairsStep = +document.getElementById( 'stairHeightInput' ).value;
    var periods = +document.getElementById( 'stairsTurns' ).value;
    var N = +document.getElementById( 'stairNumbers' ).value;

    var spiral = new ThreeJSStairs( N, periods, rMin, rMax, stairsStep );

    var stairs = new THREE.Object3D();
    var base = new THREE.Mesh(spiral.bufferGeometry, defaultMat);
    base.name = "base";

    stairs.add(base);

    stairs.name = "stairs";
    scene.add( stairs );

    window.stair = stairs;

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;

    camera.position.x += (mouseX - camera.position.x);
    camera.position.y += (-mouseY - camera.position.y);

    camera.position = stairs.position;

    camera.lookAt(scene.position);

    animate();

};

function animate() {

    requestAnimationFrame(animate);
    render();

};

function render() {
    
    renderer.render(scene, camera);

};
