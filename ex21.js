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
camera.position.set(0,5,10)
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

//Box 0
let bgeometry = new THREE.BoxGeometry( 1, 1, 1 ) 
let bmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
let boxe = new THREE.Mesh( bgeometry, bmaterial )
boxe.position.set(0, 8, 0)
scene.add(boxe)

//Box 1
let boxe1 = new THREE.Mesh( bgeometry, bmaterial )
boxe1.position.set(.5, 9, 0)
scene.add(boxe1)

//Ground
let ggeometry = new THREE.BoxGeometry( 10, 5, 10 ) 
let gmaterial = new THREE.MeshBasicMaterial( { wireframe: true} )
let ground = new THREE.Mesh( ggeometry, gmaterial )
ground.position.set(0, 5, 0)
scene.add(ground)

// Oimo World Additions
let box0 = world.add({
    type:'box', size:[1,1,1], pos:[0,8,0], move:true
})
let box1 = world.add({
    type:'box', size:[1,1,1], pos:[.5,9,0], move:true
})
let boxGround = world.add({
    type:'box', size:[10,5,10], pos:[0,0,0], move:false
})

const animate = () => {
    requestAnimationFrame( animate )
    render()
}

function render() {
    world.step();
    boxe.position.copy( box0.getPosition() )
    boxe1.position.copy( box1.getPosition() )
    ground.position.copy( boxGround.getPosition() )
    renderer.render( scene, camera )
}
animate()