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
camera.position.set(1,-30,15)

//--------------------------------------------------------------------------
const rightGroup = new THREE.Group()
const leftGroup = new THREE.Group()
const camGroup = new THREE.Group()


for (let i = 0; i < 420; i++) {
    let geometry = new THREE.BoxGeometry( 2, 1, 1 );
    let material = new THREE.MeshNormalMaterial();
    let car = new THREE.Mesh( geometry, material );
    car.position.x = THREE.Math.randInt( -400, 400 )
    car.position.z = Math.floor(Math.random() * 4)
    i > 110 ? car.position.y = 30 : car.position.y = 20
    rightGroup.add(car)
    
}


for (let i = 0; i < 420; i++) {
    let geometry = new THREE.BoxGeometry( 2, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    let car = new THREE.Mesh( geometry, material );
    car.position.x = THREE.Math.randInt( -400, 400 )
    car.position.z = THREE.Math.randInt( 6, 10 );
    i > 120 ? car.position.y = 30 : car.position.y = 20
    leftGroup.add(car)
    
}


scene.add(rightGroup)
scene.add(leftGroup)

let followTraffic = false
let cargeometry = new THREE.BoxGeometry( 2, 1, 1 );
let carmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
let cameraCar = new THREE.Mesh( cargeometry, carmaterial );
cameraCar.position.set(-50,30,8)
scene.add(cameraCar)

let geometry = new THREE.BoxGeometry( 40, 60, 10 );
    let material = new THREE.MeshBasicMaterial( { color: 0x5858a7 } )
    let building = new THREE.Mesh( geometry, material );
    building.position.set(1, 1, 22)
    let building1 = new THREE.Mesh( geometry, material );
    building1.position.set(1, 1, -22)
scene.add(building)
scene.add(building1)

const moveCamera = new TWEEN.Tween(cameraCar.position)
                            .to(camera.position , 8000)
                            .easing(TWEEN.Easing.Quadratic.Out).onComplete(() => 
                                cameraCar.position.z = 20
                                )


const moveTraffic = new TWEEN.Tween(camera.position)
                            .to({
                                x: 50 , y: 30, z: 8 }, 10000)
                            .easing(TWEEN.Easing.Quadratic.Out).onComplete(() => followTraffic = true)

                            
moveCamera.chain(moveTraffic)
moveCamera.start()

const animate = () => {
    requestAnimationFrame( animate )
    render()
}
function render() {
    TWEEN.update();
    camera.updateMatrixWorld();
    followTraffic == true ? camera.position.x -= .1 : null
    followTraffic == true ? camera.lookAt(-400, 30, 8) : camera.lookAt(1, 30, 8)
    rightGroup.position.x += .1
    leftGroup.position.x -= .1
    renderer.render( scene, camera )
}
animate()