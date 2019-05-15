import * as THREE from 'three';
import TWEEN from 'tween';

//init
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//camera
camera.position.set(0,0,55)
camera.lookAt(0,0,0)
//--------------------------------------------------------------------------
const alphaGroup = new THREE.Group()
const loader = new THREE.FontLoader();

scene.add(alphaGroup)

const onDocumentKeyDown = ( event ) => {
    loader.load( 'font/helvetiker_regular.typeface.json', font => {
    

        let geometry = new THREE.TextGeometry( event.key, {
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
        
        let letterMesh = new THREE.Mesh(geometry, material)  
        const material = new THREE.MeshBasicMaterial( { wireframe: true, 
                                                        vertexColors: THREE.FaceColors } );
        letterMesh.position.set(THREE.Math.randInt(-50, 50 ), 
                                20, 
                                0)
        alphaGroup.add(letterMesh)
        new TWEEN.Tween(letterMesh.position)
                            .to({
                                x: letterMesh.position.x , y: -100, z: 0 }, 10000)
                            .easing(TWEEN.Easing.Quadratic.Out).start()  
    } )
}


const animate = () => {
    requestAnimationFrame( animate )
    render()
}


function render() {
    TWEEN.update();
    //alphaGroup.position.y -=.08
    renderer.render( scene, camera )
}
document.addEventListener('keydown', onDocumentKeyDown)
animate()