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
camera.position.set(0,0,100)
camera.lookAt(0,0,0)
controls.update()



let spiderWeb = []
for (let i = 0; i < 100; i++) {
    let x = Math.sin(i) * i
    let y = Math.cos(i) * i
    spiderWeb.push(new THREE.Vector2( x, y))
}
const curve = new THREE.SplineCurve(spiderWeb);
let points = curve.getPoints( 200 );
let geometry = new THREE.BufferGeometry().setFromPoints( points );
let material = new THREE.LineDashedMaterial( {
	color: 0xffffff,
	linewidth: 10,
	scale: 5,
	dashSize: 10,
	gapSize: 5,
} );
const splineObject = new THREE.Line( geometry, material );
scene.add(splineObject)

let numSin = THREE.Math.randInt( 1, 100 )
let spidergeometry = new THREE.BoxGeometry( 5, 5, 1 )
let spidermaterial = new THREE.MeshBasicMaterial( { color: 0x00FF00 } )
let spiderCube = new THREE.Mesh( spidergeometry, spidermaterial )
spiderCube.position.set(0,0,0)
scene.add(spiderCube)


let foodnumSin = THREE.Math.randInt( 20, 100 )
let foodgeometry = new THREE.BoxGeometry( 2, 2, 2 )
let foodmaterial = new THREE.MeshBasicMaterial( { color: 0x0000FF } )
let foodCube = new THREE.Mesh( foodgeometry, foodmaterial )
foodCube.position.z = 0
foodCube.position.x = Math.sin(foodnumSin) * foodnumSin
foodCube.position.y = Math.cos(foodnumSin) * foodnumSin
scene.add(foodCube)



const resetFood = () => {
    let numSin = THREE.Math.randInt( 20, 80 )
    foodCube.position.z = 0
    foodCube.position.x = Math.sin(numSin) * numSin
    foodCube.position.y = Math.cos(numSin) * numSin
    spiderCube.scale.x += .01
    spiderCube.scale.y += .01
    moveSpider.start()
}
const moveSpider = new TWEEN.Tween(spiderCube.position)
                            .to(foodCube.position , 4000)
                            .easing(TWEEN.Easing.Quadratic.Out).onComplete(() => resetFood())
moveSpider.start()
//const clock = new THREE.Clock()
//clock.start()


const animate = () => {
    requestAnimationFrame( animate )
    render()
}


function render() {
    TWEEN.update();
    //camera.updateMatrixWorld();
    Math.random() > .50 ? splineObject.scale.x +=.001 : splineObject.scale.x -=.001
    Math.random() > .50 ? splineObject.scale.y +=.001 : splineObject.scale.y -=.001
    renderer.render( scene, camera )
}
animate()