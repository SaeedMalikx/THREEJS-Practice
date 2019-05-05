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
camera.position.set(0,10,150)
camera.lookAt(0,10,0)
controls.update()
// -----------------


const toxicGroup = new THREE.Group()

let geometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );
let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
let cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );

let topGeometry = new THREE.CylinderBufferGeometry( 1, 1, 6, 12 );
let topMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
let cylinderTop = new THREE.Mesh( topGeometry, topMaterial );
cylinderTop.position.set(0, 12, 0)
scene.add( cylinderTop );

for (let i = 0; i < 100; i++) {
    let geometry = new THREE.BoxGeometry( 1, 1, 1 )
    let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
    let toxicCube = new THREE.Mesh( geometry, material )
    toxicCube.position.set(0,10,0)
    toxicGroup.add(toxicCube)
}
scene.add(toxicGroup)

const coneGeometry = new THREE.ConeGeometry( 5, 20, 32 );
const coneMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh( coneGeometry, coneMaterial );
cone.position.set(25, 70, 0)
scene.add( cone );


const pressTop = new TWEEN.Tween(cylinderTop.position)
                            .to({x: 0, y: 9, z: 0} , 2000)
                            .easing(TWEEN.Easing.Quadratic.Out).onComplete(()=> releaseToxins(toxicGroup))




const releaseToxins = (toxGroup) => {
    toxGroup.children.forEach(mesh => {
        new TWEEN.Tween(mesh.position)
                            .to({
                                x: THREE.Math.randInt(10, 50 ), 
                                y: THREE.Math.randInt(  10, 50 ), 
                                z: THREE.Math.randInt( -10, 10 )}, 2000).easing(TWEEN.Easing.Quadratic.Out)
                            .start()                                        
    })
}

const gatherToxins = (toxGroup) => {
    toxGroup.children.forEach(mesh => {
        new TWEEN.Tween(mesh.position)
                            .to(cone.position, 4000).easing(TWEEN.Easing.Quadratic.Out)
                            .start()                                        
    })

}

const releaseTop = new TWEEN.Tween(cylinderTop.position)
                            .to({x: 0, y: 12, z: 0} , 3000)
                            .easing(TWEEN.Easing.Quadratic.Out).onComplete(()=> gatherToxins(toxicGroup))
pressTop.chain(releaseTop)
pressTop.start()




/*
const makeToxins = () => {
    for (let i = 0; i < 100; i++) {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 )
        let material = new THREE.MeshBasicMaterial( { color: col } )
        let toxicCube = new THREE.Mesh( geometry, material )
        toxicCube.position.set(0,10,0)
        toxicGroup.add(toxicCube)
    }
    scene.add(toxicGroup)

}

*/

const animate = () => {
    requestAnimationFrame( animate )
    render()
}


function render() {
    TWEEN.update();
    renderer.render( scene, camera )
}
animate()