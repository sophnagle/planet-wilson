const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 1)
  
  const sectionTag = document.querySelector("section")
  sectionTag.appendChild(renderer.domElement)
  
  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.00025)
  
  // add some lighting
  const ambientLight = new THREE.AmbientLight(0x777777)
  scene.add(ambientLight)
  
  // add a spotlight
  const pointLight = new THREE.PointLight(0xffffff, 1, 0)
  pointLight.position.set(500, 500, -2000)
  scene.add(pointLight)
  
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
  camera.position.z = -3000
  
  // make a THREE.js loader
  const loader = new THREE.TextureLoader()
  
  
  // make planet wilson
  const makePlanet = function () {
    const texture = loader.load("wilson-skin.png")
    const geometry = new THREE.SphereGeometry(800, 128, 128)
    const material = new THREE.MeshLambertMaterial({
  //     color: 0x2727e6,
      map: texture
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    return mesh
  }
  
  // make a single ring
  const makeRing = function (width, color) {
    const geometry = new THREE.TorusGeometry(width, 5, 16, 100)
    const material = new THREE.MeshBasicMaterial({
      color: color
    })
    const mesh = new THREE.Mesh(geometry, material)
    
    mesh.geometry.rotateX(Math.PI / 2)
    mesh.geometry.rotateZ(Math.PI / 10)
  
    scene.add(mesh)
    return mesh
  }
  
  const makeStars = function (url, maxNum) {
    const texture = loader.load(url)
    const geometry = new THREE.Geometry()
    
    for (let i = 0; i < maxNum; i = i + 1) {
      const point = new THREE.Vector3()
      const sphericalPoint = new THREE.Spherical(
          900 + Math.random() * 900,
        2 * Math.PI * Math.random(),
        Math.PI * Math.random()
      )
      
      point.setFromSpherical(sphericalPoint)
      
      geometry.vertices.push(point)
    }
    
    const material = new THREE.PointsMaterial({
      size: 50,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false
    })
    
    const points = new THREE.Points(geometry, material)
    
    scene.add(points)
    
    return points
  }
  
  // make a curved line
  const makeLine = function () {
    const path = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(800, 0, 0),
      new THREE.Vector3(1200, 0, -1200),
      new THREE.Vector3(0, 0, -800)
    )
    
    const geometry = new THREE.TubeGeometry(path, 50, 8, 20, false)
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000
    })
    
    const mesh = new THREE.Mesh(geometry, material)
    
    scene.add(mesh)
    
    return mesh
  }
  
  
  
  
  // make a moon
  // const makeMoon = function () {
  //   const texture = loader.load("wilson-skin.png")
  //   const geometry = new THREE.SphereGeometry(100, 64, 64)
  //   const material = new THREE.MeshLambertMaterial({
  //     map: texture
  //   })
  //   const mesh = new THREE.Mesh(geometry, material)
    
  //   scene.add(mesh)
  //   return mesh
  // }
  
  const earth = makePlanet()
  const ring1 = makeRing(1100, 0xff4141)
  const ring2 = makeRing(1200, 0xffffff)
  const ring3 = makeRing(1300, 0xffdb00)
  const stars = makeStars("particle.png", 1000)
  const stars2 = makeStars("particle.png", 4000)
  // const line = makeLine()
  
  // const moon = makeMoon()
  // const moonGroup = new THREE.Group()
  // moonGroup.add(moon)
  // scene.add(moonGroup)
  // moon.translateX(-1500)
  
  // hold the camera positions
  let currentX = 0
  let currentY = 0
  let aimX = 0
  let aimY = 0
  
  const animate = function () {
    const diffX = aimX - currentX
    const diffY = aimY - currentY
    
    currentX = currentX + diffX * 0.01
    currentY = currentY + diffY * 0.01
    
    const sphere = new THREE.Spherical(
        3000,
      (currentY * 0.001) - Math.PI / 2,
      (currentX * 0.001)
    )
    
    camera.position.setFromSpherical(sphere)
    
    // camera.position.x = currentX
    // camera.position.y = currentY  
    
    camera.lookAt(scene.position)
    
    earth.rotateY(0.01)
  //   line.rotateY(0.01)
    
    // moon.rotateY(0.02)
    // moonGroup.rotateY(0.02)
    
    ring1.geometry.rotateY(0.004)
    ring2.geometry.rotateY(-0.002)
    ring3.geometry.rotateY(-0.003)
    
    renderer.render(scene, camera)
    
    requestAnimationFrame(animate)
  }
  animate()
  
  
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
  
  // variation: scroll down page
  // document.addEventListener("scroll", function () {
  //   const scrollPosition = window.pageYOffset
        //euler
  //   earth.rotation.set(0, scrollPosition / 100, 0)
  // })
  
  let isMouseDown = false
  let startX = 0
  let startY = 0
  
  document.addEventListener("mousedown", function (event) {
    isMouseDown = true
    startX = event.pageX
    startY = event.pageY
  })
  
  document.addEventListener("mouseup", function () {
    isMouseDown = false
  })
  
  document.addEventListener("mousemove", function (event) {
    if (isMouseDown) {
      // aimX = ((window.innerWidth / 2) - event.pageX) * 4
        // aimY = ((window.innerHeight / 2) - event.pageY) * 4
      aimX = aimX + ((event.pageX - startX) * 8)
      aimY = aimY + ((event.pageY - startY) * 8)
      startX = event.pageX
      startY = event.pageY
    }
  })
  
  document.addEventListener("touchmove", function (event) {
    aimX = ((window.innerWidth / 2) - event.pageX) * 4
    aimY = ((window.innerHeight / 2) - event.pageY) * 4
  })
  