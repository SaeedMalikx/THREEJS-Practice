import * as THREE from 'three';
import TWEEN from 'tween';

//init
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//camera
camera.position.set(2,4,10)
camera.lookAt(2,0,0)
//--------------------------------------------------------------------------
const keyGroup = new THREE.Group()
const boxGroup = new THREE.Group()

for (let i = 0; i < 3; i++) {
    let geometry = new THREE.BoxGeometry( 1, 1, 1)
    let material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
    let box = new THREE.Mesh( geometry, material )
    box.position.set(i * 2, 1, THREE.Math.randInt(-50, -5 ))
    boxGroup.add(box)
    new TWEEN.Tween(box.position)
                            .to({
                                x: box.position.x, 
                                y: box.position.y, 
                                z: 20}, 20000).easing(TWEEN.Easing.Quadratic.Out)
                            .start()
    
}
scene.add(boxGroup)

//invidual key planes
let geometry = new THREE.PlaneGeometry( 1, 1, 1 );
let Qmaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
let Qplane = new THREE.Mesh( geometry, Qmaterial );
Qplane.position.set(0, 0, 0)
scene.add(Qplane)
let Wmaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
let Wplane = new THREE.Mesh( geometry, Wmaterial );
Wplane.position.set(2, 0, 0)
scene.add(Wplane)
let Ematerial = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
let Eplane = new THREE.Mesh( geometry, Ematerial );
Eplane.position.set(4, 0, 0)
scene.add(Eplane)


scene.add(keyGroup)

//indiviual keypress
const onDocumentKeyDown = ( event ) => {
    if(event.key === 'q') {
        Qplane.position.set(0, 1, 0)
        checkPlaneAlphaIntersect(Qplane)
    }
    if(event.key === 'w'){
        Wplane.position.set(2, 1, 0)
        checkPlaneAlphaIntersect(Wplane)
    }
    if(event.key === 'e'){
        Eplane.position.set(4, 1, 0)
        checkPlaneAlphaIntersect(Eplane)
    }
}

const onDocumentKeyUp = ( event ) => {
    if(event.key === 'q') {
        Qplane.position.set(0, 0, 0)
    }
    if(event.key === 'w'){
        Wplane.position.set(2, 0, 0)
    }
    if(event.key === 'e'){
        Eplane.position.set(4, 0, 0)
    }
}

const checkPlaneAlphaIntersect = (selectedKeyMesh) => {
	selectedKeyMesh.geometry.computeBoundingBox();
    selectedKeyMesh.updateMatrixWorld();
    const alphaCompare = selectedKeyMesh.geometry.boundingBox.clone();
    alphaCompare.applyMatrix4(selectedKeyMesh.matrixWorld);
    boxGroup.children.forEach((mesh, index) => {
        mesh.geometry.computeBoundingBox();
        mesh.updateMatrixWorld();
        const planeCompare = mesh.geometry.boundingBox.clone();
        planeCompare.applyMatrix4(mesh.matrixWorld);
        if (alphaCompare.intersectsBox(planeCompare)) {
            mesh.material.color.set( 0x00ffff )
        }
    }) 

}

const animate = () => {
    requestAnimationFrame( animate )
    render()
}


function render() {
    TWEEN.update()
    renderer.render( scene, camera )
}
document.addEventListener('keydown', onDocumentKeyDown)
document.addEventListener('keyup', onDocumentKeyUp)
animate()