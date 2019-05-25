import * as THREE from 'three';
import * as OIMO from 'oimo'
import TWEEN from 'tween';

//init
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//camera
camera.position.set(0,20,50)
camera.lookAt(0,0,0)
//--------------------------------------------------------------------------
//OIMO World Setup
const world = new OIMO.World({ 
    timestep: 1/60, 
    iterations: 8, 
    broadphase: 2, 
    worldscale: 1, 
    random: true,  
    info: false,   
    gravity: [0,-9.8,0] 
})
//--------------------------------------------------------------------------
const boxGroup = new THREE.Group()
let mouse = new THREE.Vector2()
let worldMeshs = [],
    allowDrag = false, 
    mouse2 = {x: 0, y: 0, z: 0}

//Spheres
let geometry = new THREE.SphereGeometry( 1, 8, 8 )
let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
for (let i = 0; i < 100; i++) {
    let boxes = new THREE.Mesh( geometry, material )
    let cx = THREE.Math.randInt( -30, 30 )
    let cy = THREE.Math.randInt( 30, 100 )
    let cz = THREE.Math.randInt( -30, 30 )
    
    boxes.position.set(cx, cy, cz)
    worldMeshs[i] = world.add({type:'sphere', size:[1,1,1], pos:[cx,cy,cz], move:true})
    boxGroup.add( boxes )
}
scene.add( boxGroup )
console.log(worldMeshs)

//Ground Plane
let gGeometry = new THREE.BoxGeometry( 65, 1, 65 ) 
let gMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
let ground = new THREE.Mesh( gGeometry, gMaterial )
ground.position.set(0, 0, 0)
scene.add(ground)
let boxGround = world.add({
    type:'box', size:[65,1,65], pos:[0,0,0], move:false
})

//Draggable Box
let dGeometry = new THREE.BoxGeometry( 2, 6, 60 ) 
let dMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } )
let dragBox = new THREE.Mesh( dGeometry, dMaterial )
dragBox.position.set(0, 6,0)
scene.add(dragBox)
let dragBoxP = world.add({
    type:'box', size:[2,6,60], pos:[0,6,0], move:true
})

//Mouse Events
const onDocumentMouseMove = ( event ) => {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject( camera );
	let dir = vector.sub( camera.position ).normalize();
	let distance = - camera.position.z / dir.z;
    let pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
    if(allowDrag) {
        mouse2.x = pos.x
    }
    console.log(pos)
}
const onDocumentMouseDown = ( event ) => {
    allowDrag = true
}
const onDocumentMouseUp = ( event ) => {
    allowDrag = false
}
const animate = () => {
    requestAnimationFrame( animate )
    render()
}

function render() {
    world.step()
    boxGroup.children.forEach((mesh, index) => {
        mesh.position.copy(worldMeshs[index].getPosition())
    })
    dragBoxP.setPosition(mouse2)
    dragBox.position.copy(dragBoxP.getPosition())
    renderer.render( scene, camera )
}
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
animate()