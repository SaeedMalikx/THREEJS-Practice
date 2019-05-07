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
camera.position.set(0,0,100)
camera.lookAt(0,0,0)
controls.update()

const spiralGroup = new THREE.Group()

/*
for (let i = 0; i < 100; i++) {
    let geometry = new THREE.PlaneGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    let plane = new THREE.Mesh( geometry, material );
    plane.position.x = 0
    plane.position.z = 0
    plane.position.y = 0
    spiralGroup.add(plane)
    
}
scene.add(spiralGroup)


*/



const animate = () => {
    requestAnimationFrame( animate )
    render()
}
console.log(spiralGroup)

function render() {
    TWEEN.update();
    let i = THREE.Math.randInt(  0, 1000 )
    let geometry = new THREE.PlaneGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    let plane = new THREE.Mesh( geometry, material );
    plane.position.x = 0
    plane.position.z = 0
    plane.position.y = 0
    scene.add(plane)
    new TWEEN.Tween(plane.position).to({
                                x: Math.sin(i) * i,
                                y: Math.cos(i) * i,
                                z: Math.PI * i
                            }, 4000)
                            .easing(TWEEN.Easing.Quadratic.Out).start()
    renderer.render( scene, camera )
}
animate()