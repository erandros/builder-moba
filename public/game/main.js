var mesh, renderer, scene, camera, controls;
document.addEventListener("DOMContentLoaded", function (event) {
    init();
    render();
});
function init() {
    var info = document.createElement('div');
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
    document.body.appendChild(info);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var d = 20;
    camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(20, 20, 20);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.noZoom = true;
    controls.noPan = true;
    controls.maxPolarAngle = Math.PI / 2;
    scene.add(new THREE.AmbientLight(0x444444));
    var light = new THREE.PointLight(0xffffff, 0.8);
    light.position.set(0, 50, 50);
    scene.add(light);
    scene.add(new THREE.AxisHelper(40));
    var geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    var material = new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.5, transparent: true });
    var grid = new THREE.Mesh(geometry, material);
    grid.rotation.order = 'YXZ';
    grid.rotation.y = -Math.PI / 2;
    grid.rotation.x = -Math.PI / 2;
    scene.add(grid);
    var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    var meshNormalMaterial = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(boxGeometry, meshNormalMaterial);
    scene.add(mesh);
}
function render() {
    renderer.render(scene, camera);
}
//# sourceMappingURL=main.js.map