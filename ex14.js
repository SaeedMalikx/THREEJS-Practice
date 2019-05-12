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
camera.position.set(10,5,30)
camera.lookAt(10,5,0)


const pixelGroup = new THREE.Group()
const colorGroup = new THREE.Group()


// Pixels

for (let i = 0; i < 25; i++) {
    for (let o = 0; o < 20; o++) {
        let geometry = new THREE.PlaneGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        let pixel = new THREE.Mesh( geometry, material );
        pixel.position.z = 0
        pixel.position.x = o
        pixel.position.y = i
        pixelGroup.add(pixel)
        
    }  
}
scene.add(pixelGroup)

// Color Select

let colors = [0xff0000, 0x00FF00, 0x0000FF, 0x00FFFF]
for (let i = 0; i < colors.length; i++) {
    let geometry = new THREE.PlaneGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( {color: colors[i], side: THREE.DoubleSide} ); 
    let pixelColor = new THREE.Mesh(geometry, material)  
    pixelColor.position.set(i * i, -10, 0)    
    colorGroup.add(pixelColor)                                
}
scene.add(colorGroup)

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2()
const onDocumentMouseMove = ( event ) => {

    event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


let selectedPlane
let selectedColorPlane = 0xff0000
const onDocumentMouseDown = ( event ) => {
    selectedPlane.object.material.color.set( selectedColorPlane );
}

const animate = () => {
    requestAnimationFrame( animate )
    render()
}

function render() {
    TWEEN.update();
    raycaster.setFromCamera( mouse, camera );
    //pixel intersect
	const intersects = raycaster.intersectObjects( pixelGroup.children, true );
    if ( intersects.length > 0 ) {
        selectedPlane = intersects[ 0 ]
    }

    //color select
    const intersectsColor = raycaster.intersectObjects( colorGroup.children, true );
    if ( intersectsColor.length > 0 ) {
        selectedColorPlane = intersectsColor[ 0 ].object.material.color
    }
    renderer.render( scene, camera )
}
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
animate()