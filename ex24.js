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
camera.position.set(0,50,100)
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
let worldMeshs = []
//--------------------------------------------------------------------------
const splashGroup = new THREE.Group()
let easeDone = false

let fireworkGeometry = new THREE.SphereGeometry( 1, 8, 8 )
let fireworkMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
for (let i = 0; i < 20; i++) {
    let sphere = new THREE.Mesh( fireworkGeometry, fireworkMaterial )
    let cx = THREE.Math.randInt( -30, 30 )
    let cy = THREE.Math.randInt( 30, 60 )
    let cz = THREE.Math.randInt( -30, 30 )
    sphere.position.set(0, 30, 0)
    new TWEEN.Tween(sphere.position)
                            .to({
                                x: cx , y: cy, z: cz }, 2000)
                            .easing(TWEEN.Easing.Quadratic.Out).onComplete(() => {
                                easeDone = true
                                worldMeshs[i] = world.add({type:'sphere', size:[1,1,1], pos:[cx,cy,cz], move:true})
                                }).start()
    splashGroup.add(sphere)
    
}
scene.add(splashGroup)

let gGeometry = new THREE.BoxGeometry( 65, 1, 65 ) 
let gMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
let ground = new THREE.Mesh( gGeometry, gMaterial )
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
    TWEEN.update()
    world.step()
    if (easeDone) {splashGroup.children.forEach((mesh, index) => {
        mesh.position.copy(worldMeshs[index].getPosition())
    })}
    renderer.render( scene, camera )
}
animate()