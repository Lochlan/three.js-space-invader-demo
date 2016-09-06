var scene, camera, renderer;
var geometry, material;

var allMeshes;

var spaceInvaderPixelCoordinates = [
    [3, 0, 0],
    [4, 0, 0],
    [6, 0, 0],
    [7, 0, 0],

    [0, 1, 0],
    [2, 1, 0],
    [8, 1, 0],
    [10, 1, 0],

    [0, 2, 0],
    [2, 2, 0],
    [3, 2, 0],
    [4, 2, 0],
    [5, 2, 0],
    [6, 2, 0],
    [7, 2, 0],
    [8, 2, 0],
    [10, 2, 0],

    [0, 3, 0],
    [1, 3, 0],
    [2, 3, 0],
    [3, 3, 0],
    [4, 3, 0],
    [5, 3, 0],
    [6, 3, 0],
    [7, 3, 0],
    [8, 3, 0],
    [9, 3, 0],
    [10, 3, 0],

    [1, 4, 0],
    [2, 4, 0],
    [4, 4, 0],
    [5, 4, 0],
    [6, 4, 0],
    [8, 4, 0],
    [9, 4, 0],

    [2, 5, 0],
    [3, 5, 0],
    [4, 5, 0],
    [5, 5, 0],
    [6, 5, 0],
    [7, 5, 0],
    [8, 5, 0],

    [3, 6, 0],
    [7, 6, 0],

    [2, 7, 0],
    [8, 7, 0],
];

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = 5;
    camera.position.y = 4;
    camera.position.z = 10;

    allMeshes = [];

    geometry = new THREE.BoxGeometry(1, 1, 1);

    material = new THREE.MeshBasicMaterial({color: 0xff00ff});
    spaceInvaderPixelCoordinates.forEach(function (coordinates) {
        var pixelMesh = new THREE.Mesh(geometry, material);
        pixelMesh.position.set(coordinates[0], coordinates[1], coordinates[2]);
        scene.add(pixelMesh);
        allMeshes.push(pixelMesh);
    });

    material2 = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
    spaceInvaderPixelCoordinates.forEach(function (coordinates) {
        var pixelMesh = new THREE.Mesh(geometry, material2);
        pixelMesh.position.set(coordinates[0], coordinates[1], coordinates[2]);
        scene.add(pixelMesh);
        allMeshes.push(pixelMesh);
    });

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
