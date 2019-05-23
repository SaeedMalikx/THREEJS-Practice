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
camera.position.set(0,10,15)
camera.lookAt(0,0,0)
//--------------------------------------------------------------------------

let amplitude = .5

let clock = new THREE.Clock()


let geometry = new THREE.PlaneBufferGeometry( 33, 33, 52, 52 );
let material = new THREE.MeshBasicMaterial( {wireframe: true, side: THREE.DoubleSide} );
let plane = new THREE.Mesh( geometry, material );
plane.rotation.x = Math.PI * -.5
scene.add( plane )

const position = geometry.attributes.position;
position.dynamic = true
console.log(plane)

const animate = () => {
    requestAnimationFrame( animate )
    render()
}
// Change Z(SetZ) since plane rotated


function render() {
    TWEEN.update()
    const delta = clock.getDelta()
	const time = clock.getElapsedTime() * 10
    const position = geometry.attributes.position
    for ( let i = 0; i < position.count; i +=2 ) {
        let y = amplitude * Math.sin( i / 5 + ( time + i ) / 7 )
        position.setZ( i, y )
    }
    position.needsUpdate = true
    renderer.render( scene, camera )
}
//document.addEventListener('keydown', onDocumentKeyDown)
animate()