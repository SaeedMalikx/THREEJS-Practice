import * as THREE from 'three';
import TWEEN from 'tween';


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const trackGroup = new THREE.Group()
const buildingGroup = new THREE.Group()
const trainGroup = new THREE.Group()


//Tracks
for (let i = 0; i < 800; i++) {
    let geometry = new THREE.BoxGeometry( 2, .2, .2 )
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    let tracks = new THREE.Mesh( geometry, material )
    tracks.position.z = i
    tracks.position.x = 2
    tracks.position.y = 0
    trackGroup.add( tracks )
}
scene.add( trackGroup )

//Side Track Left and Right
    let geometry = new THREE.BoxGeometry( .2, .2, 800 )
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    let longTrack1 = new THREE.Mesh( geometry, material )
    let longTrack2 = new THREE.Mesh( geometry, material )
    longTrack1.position.x = 1
    longTrack2.position.x = 3
    scene.add(longTrack1)
    scene.add(longTrack2)


//Buildings
for (let i = 0; i < 100; i++) {
    let geometry = new THREE.BoxGeometry( 4, 4, 4 )
    let material = new THREE.MeshBasicMaterial( { color: 0x5858a7 } )
    let building = new THREE.Mesh( geometry, material )
    building.position.z = Math.random() * 600
    building.position.x = Math.floor(Math.random() * (30 - 10 + 1)) + 10
    building.position.y = 2
    buildingGroup.add( building )
}
scene.add( buildingGroup )

//Train 
let trainSpace = 0
for (let i = 0; i < 6; i++) {
    let geometry = new THREE.BoxGeometry( 1, 1, 8 )
    let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
    let train = new THREE.Mesh( geometry, material )
    train.position.z = trainSpace
    train.position.x = 2
    train.position.y = .5
    trainGroup.add( train )
    //trainspace hooks
    let spaceGeometry = new THREE.BoxGeometry( .2, .2, 1 )
    let spaceMaterial = new THREE.MeshBasicMaterial( { color: 0x0080ff } )
    let trackSpace = new THREE.Mesh( spaceGeometry, spaceMaterial )
    trackSpace.position.z = trainSpace +4.5
    trackSpace.position.x = 2
    trackSpace.position.y = .5
    trainGroup.add( trackSpace )
    trainSpace += 9
}

//Train Head
let theadGeometry = new THREE.BoxGeometry( 1, 2, 8 )
let theadMaterial = new THREE.MeshBasicMaterial( { color: 0xff7f00 } )
let trainHead = new THREE.Mesh( theadGeometry, theadMaterial )
trainHead.position.set(2, 1, 54)
trainGroup.add( trainHead )

scene.add( trainGroup )
console.log(trainGroup)

camera.position.set(-5,3,0)
camera.lookAt(0,1,50)

const animate = () => {
    requestAnimationFrame( animate )
    render()
}
function render() {
    camera.updateMatrixWorld();

    
    camera.position.z +=.2
    camera.lookAt(0,1,50)
    trainGroup.position.z +=.08
    renderer.render( scene, camera )
}
animate()