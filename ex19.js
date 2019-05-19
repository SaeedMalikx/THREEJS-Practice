import * as THREE from 'three';
import TWEEN from 'tween';

//init
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//camera
camera.position.set(0,0,50)
camera.lookAt(0,0,0)
//--------------------------------------------------------------------------

let geometry = new THREE.BoxGeometry( 10, 10, 10 )
let material = new THREE.MeshPhongMaterial( { color: 0x00ff00, shininess: 150 } )
let cube = new THREE.Mesh( geometry, material )
scene.add(cube)


const lightGroup = new THREE.Group()
const randomColors = [
    0x15B7DD ,0xDD8ABE ,0xE29AD7 ,0xED4CD8 ,0x2CF778 ,0xB6E6E4 ,0x5E424C ,
    0xC0BE06 ,0x69948A ,0x6EA532 ,0x037F22 ,0xE390E0 ,0x3A92FB ,0x3DBD74 ,
    0x1DF82A ,0xA5B8A4 ,0xBB6D4C ,0xBEAFF4 ,0x4853F7 ,0xD774F4 ,0x3474F3 ,
    0xA5EACC ,0xB54866 ,0x967C54 ,0xE72183 ,0xD7A2C5 ,0xDBC2DB ,0xE4B138 ,
    0xE444CE ,0x2C9A3D
]
const sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
randomColors.forEach(color => {
    let light = new THREE.PointLight( color, 2, 50, 2 )
    light.add( new THREE.Mesh( sphere, new THREE.MeshPhongMaterial( { color: color } ) ) );
    light.position.set( 0, 0, 0 )
    lightGroup.add(light)
    new TWEEN.Tween(light.position)
                            .to({
                                x: THREE.Math.randInt(-20, 20 ), 
                                y: THREE.Math.randInt( -20, 20 ), 
                                z: THREE.Math.randInt( -20, 20 )}, 3000).easing(TWEEN.Easing.Quadratic.Out)
                            .start() 
})
scene.add(lightGroup)

const onDocumentKeyDown = ( event ) => {
    lightGroup.children.forEach(light => {
        new TWEEN.Tween(light.position)
                                .to({
                                    x: THREE.Math.randInt(-20, 20 ), 
                                    y: THREE.Math.randInt( -20, 20 ), 
                                    z: THREE.Math.randInt( -20, 20 )}, 3000).easing(TWEEN.Easing.Quadratic.Out)
                                .start() 
    })
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