import * as THREE from 'three';
import TWEEN from 'tween';
import { OrbitControls } from 'three-orbitcontrols-ts';
//init
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//camera
camera.position.set(0,0,50)
camera.lookAt(0,0,0)



// ray
let mouse = new THREE.Vector2()
let mouse2

const onDocumentMouseMove = ( event ) => {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject( camera );
	var dir = vector.sub( camera.position ).normalize();
	var distance = - camera.position.z / dir.z;
    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
    mouse2 = pos
}

const startTween = (mesh) => {
    new TWEEN.Tween(mesh.position)
                            .to({
                                x: THREE.Math.randInt(0, 50 ), 
                                y: THREE.Math.randInt(0, 50 ), 
                                z: 0}, 2000).easing(TWEEN.Easing.Quadratic.Out)
                            .start()  
}

const onDocumentMouseDown = ( event ) => {
    
    let geometry = new THREE.BoxGeometry( 1, 1, 1)
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    let box = new THREE.Mesh( geometry, material )
    box.position.x = mouse2.x
    box.position.y = mouse2.y
    box.position.z = 0

    scene.add(box)
    startTween(box)
}


const animate = () => {
    requestAnimationFrame( animate )
    render()
}

function render() {
    TWEEN.update();
    console.log(scene.children)
    renderer.render( scene, camera )
}
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener('mousedown', onDocumentMouseDown, false);
animate()