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
camera.position.set(15,15,50)
camera.lookAt(0,0,0)
controls.update()

const boxGroup = new THREE.Group()


//boxes
let xValue = 0
let zvalue = 0
for (let i = 0; i < 15; i++) {
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

/*
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
const line = new THREE.Line( geometry, material );
scene.add( line );
*/

const MAX_POINTS = 100
const geometry = new THREE.BufferGeometry()
const positions = new Float32Array( MAX_POINTS * 3 )
geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) )
let drawCount = 1
geometry.setDrawRange( 0, drawCount )
const material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 2 } )
let line = new THREE.Line( geometry,  material )
line.geometry.attributes.position.array[0] = 0
line.geometry.attributes.position.array[1] = 0
line.geometry.attributes.position.array[2] = 0
scene.add( line )

// ray
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2()

const onDocumentMouseMove = ( event ) => {

    event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
let amountClicked = 3
let pointLine
const onDocumentMouseDown = ( event ) => {

    //should be cleaner
    line.geometry.attributes.position.array[amountClicked] = pointLine.x
    amountClicked++
    line.geometry.attributes.position.array[amountClicked] = pointLine.y
    amountClicked++
    line.geometry.attributes.position.array[amountClicked] = pointLine.z
    amountClicked++
    drawCount++
}


const animate = () => {
    requestAnimationFrame( animate )
    render()
}

function render() {
    TWEEN.update();
    raycaster.setFromCamera( mouse, camera );
    line.geometry.setDrawRange( 0, drawCount );
    line.geometry.attributes.position.needsUpdate = true
	const intersects = raycaster.intersectObjects( boxGroup.children, true );
    if ( intersects.length > 0 ) {
        intersects[ 0 ].object.material.color.set( 0xff0000 );
        pointLine =  intersects[ 0 ].object.position
        
    }
    renderer.render( scene, camera )
}
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener('mousedown', onDocumentMouseDown, false);
animate()