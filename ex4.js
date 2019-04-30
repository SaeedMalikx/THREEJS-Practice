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
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(3,2,15)
camera.lookAt(3,1,1)
controls.update();

//--------------------------------------------------------------------------



//NP = Not Picked Up
const boxesNPGroup = new THREE.Group()
const boxWithCrane = new THREE.Group()

//boxes
let xValue = 0
let zvalue = 0
for (let i = 0; i < 25; i++) {
    let geometry = new THREE.BoxGeometry( .5, 1, .5 ) //half length boxes to avoid calculation below
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    let boxes = new THREE.Mesh( geometry, material )
    if (i % 5 === 0 ) {
        xValue++  
        zvalue = 0 }
    boxes.position.z = zvalue++
    boxes.position.x = xValue
    boxes.position.y = 0
    boxesNPGroup.add( boxes )
}
scene.add( boxesNPGroup )

//crane
let craneGeometry = new THREE.CylinderGeometry( .5, .5, 3, 16 );
let craneMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
let crane = new THREE.Mesh( craneGeometry, craneMaterial )
crane.position.set(6, 5, 3)

scene.add(crane)

                                


const target = Math.floor(Math.random() * 25)

const moveCraneSideways = new TWEEN.Tween(crane.position)
                            .to({ 
                                x: boxesNPGroup.children[target].position.x , 
                                y: 5 , z: boxesNPGroup.children[target].position.z 
                                }, 4000)
                            .easing(TWEEN.Easing.Quadratic.Out)
const moveCraneDown = new TWEEN.Tween(crane.position)
                            .to({
                                x: boxesNPGroup.children[target].position.x, 
                                y: boxesNPGroup.children[target].position.y + 2  , 
                                z: boxesNPGroup.children[target].position.z   }, 2000)
                            .easing(TWEEN.Easing.Quadratic.Out)

//Join box and crane
boxWithCrane.add(boxesNPGroup.children[target])
boxWithCrane.add(crane)
scene.add(boxWithCrane)

const moveCraneBack = new TWEEN.Tween(boxWithCrane.position)
                            .to({
                                x: boxWithCrane.position.x, 
                                y: 5  , 
                                z: boxWithCrane.position.z   }, 3000)
                            .easing(TWEEN.Easing.Quadratic.Out)     
const moveCraneBackSideways = new TWEEN.Tween(boxWithCrane.position)
                            .to({
                                x:-5, y: 5, z: 5 }, 4000)
                            .easing(TWEEN.Easing.Quadratic.Out)  

moveCraneSideways.chain(moveCraneDown);
moveCraneDown.chain(moveCraneBack)
moveCraneBack.chain(moveCraneBackSideways)
moveCraneSideways.start();


const animate = () => {
    requestAnimationFrame( animate )
    render()
}
function render() {
    TWEEN.update();
    //camera.updateMatrixWorld();

    
    renderer.render( scene, camera )
}
animate()