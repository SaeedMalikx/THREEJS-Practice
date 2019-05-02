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
camera.position.set(0,50,150)
camera.lookAt(0,0,0)

//--------------------------------------------------------------------------
const fireGroup = new THREE.Group()
const fireGroup1 = new THREE.Group()
const fireGroup2 = new THREE.Group()
const fireGroup3 = new THREE.Group()


const makeFirework = (gr, col, xcor) => {
    for (let i = 0; i < 100; i++) {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 )
        let material = new THREE.MeshBasicMaterial( { color: col } )
        let fireCube = new THREE.Mesh( geometry, material )
        fireCube.position.set(xcor,0,0)
        gr.add(fireCube)
    }
    scene.add(gr)
    new TWEEN.Tween(gr.position)
                            .to({
                                x:0, y: 50, z: 0 }, 4000)
                            .easing(TWEEN.Easing.Quadratic.Out).onComplete(() => {
                                ignite(gr, xcor)
                            }).start()
}

makeFirework(fireGroup1, 0x0000FF, 20)
makeFirework(fireGroup2, 0x00FF00, 40)
makeFirework(fireGroup3, 0xFF0000, 60)

const ignite = (expGroup, xcor) => {
    expGroup.children.forEach(mesh => {
        new TWEEN.Tween(mesh.position)
                            .to({
                                x: THREE.Math.randInt(xcor - 50, xcor + 50 ), 
                                y: THREE.Math.randInt(  0, 100 ), 
                                z: THREE.Math.randInt( -50, 50 )}, 5000).easing(TWEEN.Easing.Quadratic.Out)
                            .onComplete(() => {
                                mesh.position.set(xcor,-50,0)
                            }).start()                                        
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
animate()







