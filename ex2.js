import * as THREE from 'three';
import TWEEN from 'tween';


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
                renderer.setSize(window.innerWidth, window.innerHeight)
                document.body.appendChild(renderer.domElement)



const planeGroup = new THREE.Group()

for (let i = 0; i < 100; i++) {
    let geometry = new THREE.PlaneGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    let plane = new THREE.Mesh( geometry, material );
    plane.position.x = Math.random() * 40
    plane.position.z = Math.random() * 200
    plane.position.y = Math.random() * 40
    planeGroup.add(plane)
    
}
scene.add(planeGroup)


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2()

camera.position.set(1,20,200)

const onDocumentMouseMove = ( event ) => {

    event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    console.log(mouse)
}



const animate = () => {
    requestAnimationFrame( animate )
    render()
}
function render() {
    TWEEN.update();
    camera.updateMatrixWorld();
    raycaster.setFromCamera( mouse, camera );

    //intersect USE [0] and check length
	const intersects = raycaster.intersectObjects( planeGroup.children, true );
    if ( intersects.length > 0 ) {
        intersects[ 0 ].object.material.color.set( 0xff0000 );
        camera.lookAt(intersects[0].object.position)
        const moveCamera = new TWEEN.Tween(camera.position)
                            .to(intersects[0].object.position , 10000)
                            .easing(TWEEN.Easing.Quadratic.Out).start();
    }
    renderer.render( scene, camera )
}
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
animate()