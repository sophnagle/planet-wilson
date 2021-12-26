const renderer = new THREE.WebGLRenderer({
    antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 1)

const sectionTag = document.querySelector("section")
sectionTag.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window/innerHeight, 0.1, 10000)
camera.position.z = -3000

const animate = function () {
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