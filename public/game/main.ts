//three.js - Isometric Projection using an Orthographic Camera

var mesh, renderer, scene, camera, controls;

init();
render();

function init() {

    // info
    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '30px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.style.color = '#fff';
    info.style.fontWeight = 'bold';
    info.style.backgroundColor = 'transparent';
    info.style.zIndex = '1';
    info.style.fontFamily = 'Monospace';
    info.innerHTML = 'three.js - Isometric Projection<br/>drag mouse to rotate camera';
    document.body.appendChild( info );

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();

    // camera
    var aspect = window.innerWidth / window.innerHeight;
    var d = 20;
    camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );

    // /////////////////////////////////////////////////////////////////////////

    // method 1 - use lookAt
        //camera.position.set( 20, 20, 20 );
        //camera.lookAt( scene.position );

    // method 2 - set the x-component of rotation
        camera.position.set( 20, 20, 20 );
        camera.rotation.order = 'YXZ';
        camera.rotation.y = - Math.PI / 4;
        camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );

    // /////////////////////////////////////////////////////////////////////////

    // controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.noZoom = true;
    controls.noPan = true;
    controls.maxPolarAngle = Math.PI / 2;
    //controls.zoomSpeed = 0.1;

    // ambient
    scene.add( new THREE.AmbientLight( 0x444444 ) );

    // light
    var light = new THREE.PointLight( 0xffffff, 0.8 );
    light.position.set( 0, 50, 50 );
    scene.add( light );

    // axes
    scene.add( new THREE.AxisHelper( 40 ) );

    // grid
    var geometry = new THREE.PlaneGeometry( 100, 100, 10, 10 );
    var material = new THREE.MeshBasicMaterial( { wireframe: true, opacity: 0.5, transparent: true } );
    var grid = new THREE.Mesh( geometry, material );
    grid.rotation.order = 'YXZ';
    grid.rotation.y = - Math.PI / 2;
    grid.rotation.x = - Math.PI / 2;
    scene.add( grid );

    // geometry
    var geometry = new THREE.BoxGeometry( 10, 10, 10 );

    // material
    var meshNormalMaterial = new THREE.MeshNormalMaterial();

    // mesh
    mesh = new THREE.Mesh( geometry, meshNormalMaterial );
    scene.add( mesh );

}

function render() {

    renderer.render( scene, camera );

}
