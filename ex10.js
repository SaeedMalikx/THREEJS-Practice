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
camera.position.set(0,0,50)
camera.lookAt(0,0,0)
controls.update()

const boxGroup = new THREE.Group()


//boxes
for (let i = 0; i < 100; i++) {
    let geometry = new THREE.BoxGeometry( .5, 1, .5 ) //half length boxes to avoid calculation below
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    let boxes = new THREE.Mesh( geometry, material )
    boxes.position.z = THREE.Math.randInt( 0, 30 )
    boxes.position.x = THREE.Math.randInt( 0, 30 )
    boxes.position.y = THREE.Math.randInt( 0, 30 )
    boxes.rotation.y = Math.random() * Math.PI * 2
    boxGroup.add( boxes )
}
scene.add( boxGroup )


const animate = () => {
    requestAnimationFrame( animate )
    render()
}

function render() {
    TWEEN.update();
    for ( var i = 0; i < boxGroup.children.length; i ++ ) {
        let mesh = boxGroup.children[i]
        mesh.material.color.setHex( Math.random() * 0xffffff )
        //Math.random() > .50 ? mesh.position.x += Math.random() * i : mesh.position.x -= Math.random() * i
    }
    renderer.render( scene, camera )
}
animate()