import * as THREE from 'three';
import TWEEN from 'tween';
//init
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//camera
camera.position.set(0,20,50)
camera.lookAt(0,20,0)


const planeGroup = new THREE.Group()

for (let i = 0; i < 10; i++) {
    let geometry = new THREE.PlaneGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    let plane = new THREE.Mesh( geometry, material );
    plane.position.x = Math.random() * 40
    plane.position.z = 0
    plane.position.y = Math.random() * 40
    planeGroup.add(plane)
    
}
scene.add(planeGroup)



const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2()
let mouse2
let selectedPlane
let selectedPlaneLoc = 0

let allowDrag = false

const onDocumentMouseMove = ( event ) => {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject( camera );
	let dir = vector.sub( camera.position ).normalize();
	let distance = - camera.position.z / dir.z;
    let pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
    mouse2 = pos
    allowDrag ? planeGroup.children[selectedPlaneLoc].position.set(mouse2.x, mouse2.y, 0) : null
    
}

const onDocumentMouseDown = ( event ) => {
    console.log(selectedPlane)
    selectedPlane.object.material.color.set( 0xff0000 );
    allowDrag = true
    selectedPlaneLoc = planeGroup.children.findIndex(meshloc => meshloc.uuid == selectedPlane.object.uuid )
    console.log(selectedPlaneLoc)

}

const onDocumentMouseUp = ( event ) => {
    allowDrag = false

}

const animate = () => {
    requestAnimationFrame( animate )
    render()
}

function render() {
    TWEEN.update();
    raycaster.setFromCamera( mouse, camera );

   //intersect USE [0] and check length
	const intersects = raycaster.intersectObjects( planeGroup.children, true );
    intersects.length > 0 ? selectedPlane = intersects[ 0 ] : selectedPlane = null
    
    renderer.render( scene, camera )

}
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
animate()