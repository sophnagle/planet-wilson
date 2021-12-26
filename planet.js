const renderer = new THREE.WebGLRenderer({
    antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 1)

const sectionTag = document.querySelector("section")
sectionTag.appendChild(renderer.domElement)

const scene = new THREE.Scene()


// add some lighting 
const ambientLight = new THREE.AmbientLight(0x777777)
scene.add(ambientLight)


// add a spotlight 
const pointLight = new THREE.PointLight(0xffffff, 1, 0)
pointLight.position.set(500, 500, -2000)
scene.add(pointLight)



const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window/innerHeight, 0.1, 10000)
camera.position.z = -3000



// make planet wilson 
const makePlanet = function () {
    const geometry = new THREE.SphereGeometry(800, 128, 128)
    const material = new THREE.MeshLambertMaterial({
        color: 0x2727e6
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
}

makePlanet()






const animate = function () {

    camera.lookAt(scene.position)

    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}
animate()

// if window is resized
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera/updateProjectionMatrix()

    renderer.setSize(window.innerWidth, windwo.innerHeight)
})