var scene, camera, renderer;
var totalGeometryMesh;

var spaceInvaderPixelCoordinates = [
    [-2, -3, 0],
    [-1, -3, 0],
    [1, -3, 0],
    [2, -3, 0],

    [-5, -2, 0],
    [-3, -2, 0],
    [3, -2, 0],
    [5, -2, 0],

    [-5, -1, 0],
    [-3, -1, 0],
    [-2, -1, 0],
    [-1, -1, 0],
    [0, -1, 0],
    [1, -1, 0],
    [2, -1, 0],
    [3, -1, 0],
    [5, -1, 0],

    [-5, 0, 0],
    [-4, 0, 0],
    [-3, 0, 0],
    [-2, 0, 0],
    [-1, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [2, 0, 0],
    [3, 0, 0],
    [4, 0, 0],
    [5, 0, 0],

    [-4, 1, 0],
    [-3, 1, 0],
    [-1, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
    [3, 1, 0],
    [4, 1, 0],

    [-3, 2, 0],
    [-2, 2, 0],
    [-1, 2, 0],
    [0, 2, 0],
    [1, 2, 0],
    [2, 2, 0],
    [3, 2, 0],

    [-2, 3, 0],
    [2, 3, 0],

    [-3, 4, 0],
    [3, 4, 0],
];

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 30;

    var totalGeometry = new THREE.Geometry();
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    var material = new THREE.MeshLambertMaterial({color: 0xff00ff});

    spaceInvaderPixelCoordinates.forEach(function (coordinates) {
        var pixelMesh = new THREE.Mesh(geometry, material);
        pixelMesh.position.set(coordinates[0], coordinates[1], coordinates[2]);
        pixelMesh.updateMatrix();
        totalGeometry.merge(pixelMesh.geometry, pixelMesh.matrix);
    });

    totalGeometryMesh = new THREE.Mesh(totalGeometry, material);
    scene.add(totalGeometryMesh);

    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 0, 1000);
    scene.add(light);

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

document.addEventListener('mousemove', function (event) {
    var cursorXPercentFromCenter = (event.x / window.innerWidth - 0.5) * 2;
    var cursorYPercentFromCenter = (event.y / window.innerHeight - 0.5) * 2;

    totalGeometryMesh.position.x = 5 * cursorXPercentFromCenter;
    totalGeometryMesh.position.y = 3 * -cursorYPercentFromCenter;

    totalGeometryMesh.rotation.x = (Math.PI / 8) * cursorYPercentFromCenter;
    totalGeometryMesh.rotation.y = (Math.PI / 8) * cursorXPercentFromCenter;
});
