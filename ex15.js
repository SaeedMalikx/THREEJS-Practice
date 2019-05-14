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
camera.position.set(25,0,55)
camera.lookAt(30,0,0)
controls.update()
//--------------------------------------------------------------------------
const alphaGroup = new THREE.Group()

const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 
                    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 
                        'Z', 'X', 'C', 'V', 'B', 'N', 'M']


const loader = new THREE.FontLoader();

loader.load( 'font/helvetiker_regular.typeface.json', font => {
    alphabet.forEach((letters, index) => {

        let geometry = new THREE.TextGeometry( letters, {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 5,
            bevelEnabled: false,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } );
        let material = new THREE.MeshBasicMaterial( {color: 0xff0000 , side: THREE.DoubleSide} );
        let letterMesh = new THREE.Mesh(geometry, material)  
        letterMesh.position.set(index * 2, index, 0)
        alphaGroup.add(letterMesh)
})} )


scene.add(alphaGroup)

const onDocumentKeyDown = ( event ) => {
    if (alphabet.includes(event.key)){
        let letterIndex = alphabet.findIndex(letter => letter === event.key)
        alphaGroup.children[letterIndex].material.color.set(0x00FF00)
    }
}


const animate = () => {
    requestAnimationFrame( animate )
    render()
}


function render() {
    TWEEN.update();
    renderer.render( scene, camera )
}
document.addEventListener('keydown', onDocumentKeyDown)
animate()
