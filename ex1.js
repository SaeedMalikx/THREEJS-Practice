import * as THREE from 'three';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
                renderer.setSize(window.innerWidth, window.innerHeight)
                document.body.appendChild(renderer.domElement)

const CubegroupS = new THREE.Group()


// Horizontal Straight Lines
let sCor = [
    {xmin: 0, xmax: 20, ycor: 50},
    {xmin: 0, xmax: 20, ycor: 40},
    {xmin: 0, xmax: 20, ycor: 30},
    {xmin: 30, xmax: 50, ycor: 50},
    {xmin: 30, xmax: 50, ycor: 40},
    {xmin: 60, xmax: 80, ycor: 50},
    {xmin: 60, xmax: 80, ycor: 40},
    {xmin: 60, xmax: 80, ycor: 30},
    {xmin: 90, xmax: 110, ycor: 50},
    {xmin: 90, xmax: 110, ycor: 40},
    {xmin: 90, xmax: 110, ycor: 30},
    {xmin: 120, xmax: 132, ycor: 50},
    {xmin: 120, xmax: 132, ycor: 30},
    {xmin: 132, xmax: 136, ycor: 49},
    {xmin: 132, xmax: 136, ycor: 31},
]

for (var i = 0; i < sCor.length; i ++) { 
    for ( var c = 0; c < 150; c ++ ) {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 )
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
        let cube = new THREE.Mesh( geometry, material )
        cube.position.x = Math.floor(Math.random() * (sCor[i].xmax - sCor[i].xmin + 1)) + sCor[i].xmin
        cube.position.z = Math.random() * 20
        cube.position.y = sCor[i].ycor
        CubegroupS.add( cube )
    }
  }

// Vertical Side Lines 
let vCor = [
    {ymin: 40, ymax: 50, xcor: 0},
    {ymin: 30, ymax: 40, xcor: 20},
    {ymin: 30, ymax: 50, xcor: 30},
    {ymin: 30, ymax: 50, xcor: 50},
    {ymin: 30, ymax: 50, xcor: 60},
    {ymin: 30, ymax: 50, xcor: 90},
    {ymin: 30, ymax: 50, xcor: 120},
    {ymin: 32, ymax: 48, xcor: 138},
    {ymin: 37, ymax: 42, xcor: 140},
]


for (var i = 0; i < vCor.length; i ++) { 
    for ( var c = 0; c < 150; c ++ ) {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 )
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
        let cube = new THREE.Mesh( geometry, material )
        cube.position.x = vCor[i].xcor
        cube.position.z = Math.random() * 20
        cube.position.y = Math.floor(Math.random() * (vCor[i].ymax - vCor[i].ymin + 1)) + vCor[i].ymin
        CubegroupS.add( cube )
    }
  }




scene.add( CubegroupS )
console.log(CubegroupS.children)
camera.position.set(70,40,300)
camera.lookAt(70,40,0)

const animate = () => {
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
}

animate()