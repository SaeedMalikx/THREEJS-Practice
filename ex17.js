import * as THREE from 'three';
import TWEEN from 'tween';

//init
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//camera
camera.position.set(0,0,100)
camera.lookAt(0,0,0)
//--------------------------------------------------------------------------
const alphaGroup = new THREE.Group()
const wordGroup = new THREE.Group()

const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 
                    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 
                        'Z', 'X', 'C', 'V', 'B', 'N', 'M']

const word = 'FUN'
const wordArray = word.split('')
let placedLetters = Array.from(wordArray).fill('', 0)
console.log(wordArray)
const loader = new THREE.FontLoader();

let material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
let material1 = new THREE.MeshBasicMaterial( {color: 0x0000ff} );

const planeGroup = new THREE.Group()

for (let i = 0; i < wordArray.length; i++) {
    let geometry = new THREE.PlaneGeometry( 5, 10, 1 );
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    let plane = new THREE.Mesh( geometry, material );
    plane.position.set(i * 8, 20, 0)
    planeGroup.add(plane)
    
}
scene.add(planeGroup)

loader.load( 'font/helvetiker_regular.typeface.json', font => {
    wordArray.forEach((letters, index) => {

        let geometry = new THREE.TextGeometry( letters, {
            font: font,
            size: 4,
            height: 0,
            curveSegments: 5
        } );
        let letterMesh = new THREE.Mesh(geometry, material1)  
        letterMesh.position.set(index * 5, 30, 0)
        wordGroup.add(letterMesh)
    })
    alphabet.forEach((letters, index) => {

        let geometry = new THREE.TextGeometry( letters, {
            font: font,
            size: 5,
            height: 0,
            curveSegments: 5
        } );
        let letterMesh = new THREE.Mesh(geometry, material)  
        letterMesh.position.set(THREE.Math.randInt(-50, 50 ), THREE.Math.randInt(-50, 0 ), 0)
        letterMesh.name = letters
        alphaGroup.add(letterMesh)
    })
})

scene.add(alphaGroup)
scene.add(wordGroup)
console.log(alphaGroup)
const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2()
let mouse2
let selectedAlpha
let selectedAlphaLoc = 0
let allowDrag = false

const onDocumentMouseMove = ( event ) => {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject( camera );
	let dir = vector.sub( camera.position ).normalize();
	let distance = - camera.position.z / dir.z;
    let pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
    mouse2 = pos
    allowDrag ? alphaGroup.children[selectedAlphaLoc].position.set(mouse2.x, mouse2.y, 0) : null
    
}
const onDocumentMouseDown = ( event ) => {
    allowDrag = true
    selectedAlphaLoc = alphaGroup.children.findIndex(meshloc => meshloc.uuid == selectedAlpha.object.uuid )
    //alphaGroup.children[selectedAlphaLoc].material.color.set( 0x0000ff )
   

}

const onDocumentMouseUp = ( event ) => {
    allowDrag = false
    checkPlaneAlphaIntersect(alphaGroup.children[selectedAlphaLoc])
}
const animate = () => {
    requestAnimationFrame( animate )
    render()
}
const checkPlaneAlphaIntersect = (selectedAlphaMesh) => {
	selectedAlphaMesh.geometry.computeBoundingBox();
    selectedAlphaMesh.updateMatrixWorld();
    const alphaCompare = selectedAlphaMesh.geometry.boundingBox.clone();
    alphaCompare.applyMatrix4(selectedAlphaMesh.matrixWorld);
    planeGroup.children.forEach((mesh, index) => {
        mesh.geometry.computeBoundingBox();
        mesh.updateMatrixWorld();
        const planeCompare = mesh.geometry.boundingBox.clone();
        planeCompare.applyMatrix4(mesh.matrixWorld);
        if (alphaCompare.intersectsBox(planeCompare)) {
            mesh.material.color.set( 0x0000ff )
            placedLetters.splice(index, 1, selectedAlphaMesh.name)
            console.log(placedLetters)
        }
    }) 

}

function render() {
    TWEEN.update();
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( alphaGroup.children, true );
    if  (intersects.length > 0) {selectedAlpha = intersects[ 0 ]}
    let wordCompare = placedLetters.join('')
    if (word === wordCompare) {planeGroup.children.forEach(mesh => mesh.material.color.set( 0x00ff00 ) )}
    //console.log(wordCompare)
    renderer.render( scene, camera )
}
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
animate()