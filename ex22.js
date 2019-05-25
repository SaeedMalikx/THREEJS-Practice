import * as THREE from 'three';
import * as OIMO from 'oimo'
import TWEEN from 'tween';
import { OrbitControls } from 'three-orbitcontrols-ts';

//init
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//camera
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0,5,30)
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

let worldMeshs = []
//boxes
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

let ggeometry = new THREE.BoxGeometry( 65, 1, 65 ) 
let gmaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
let ground = new THREE.Mesh( ggeometry, gmaterial )
ground.position.set(0, 0, 0)
scene.add(ground)
let boxGround = world.add({
    type:'box', size:[65,1,65], pos:[0,0,0], move:false
})

const animate = () => {
    requestAnimationFrame( animate )
    render()
}

function render() {
    world.step()
    boxGroup.children.forEach((mesh, index) => {
        mesh.position.copy(worldMeshs[index].getPosition())
    })
    renderer.render( scene, camera )
}
animate()