import React from 'react'
import * as THREE from 'three'

import panda from '../puppets/panda'
import pandaFallback from '../puppets/panda_fallback.png'

class Panda extends React.Component {
  constructor() {
    super()

    this.mousePosition = new THREE.Vector2()
    this.canvasCenter = new THREE.Vector2()
    this.scrollPosition = new THREE.Vector2()
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('deviceorientation', this.handleDeviceOrientation)
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)

    this.handleResize()
    this.initCanvas()
    this.animate()
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('deviceorientation', this.handleDeviceOrientation)
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleScroll)

    window.cancelAnimationFrame(this.animationFrame)
  }

  initCanvas = () => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const camera = new THREE.PerspectiveCamera()
    camera.updateProjectionMatrix()
    scene.add(camera)

    const ambientLight = new THREE.AmbientLight(0x555555, 1)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.75)
    pointLight.position.set(0, 26.95, 57.68)
    camera.add(pointLight)

    const loader = new THREE.ObjectLoader()
    loader.parse(panda, (puppet) => {
      const center = new THREE.Vector3()
      new THREE.Box3().setFromObject(puppet).getCenter(center)
      scene.position.y = center.y
      scene.add(puppet)
    })

    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(250, 250)

    this.camera = camera
    this.renderer = renderer
    this.scene = scene
  }

  animate = () => {
    this.animationFrame = requestAnimationFrame(this.animate);
    this.renderScene();
  }

  renderScene = () => {
    const { x, y } = this.cameraPosition
    this.camera.position.set(-x, y + this.scene.position.y, 50);
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

  handleScroll = (event) => {
    this.scrollPosition.setY(3 * window.scrollY)
    this.updateCoordinate()
  }

  handleMouseMove = (event) => {
    this.mousePosition = new THREE.Vector2(event.clientX, event.clientY)
    this.updateCoordinate()
  }

  updateCoordinate = () => {
    this.cameraPosition = new THREE.Vector2()
      .add(this.mousePosition)
      .add(this.scrollPosition)
      .sub(this.canvasCenter)
      .divideScalar(30)
  }

  handleResize = (event) => {
    const rect = this.canvas.getBoundingClientRect()
    this.canvasCenter = new THREE.Vector2(rect.x + rect.width / 2, rect.y + rect.height / 2)
    this.updateCoordinate()
  }

  handleDeviceOrientation = (event) => {
    this.mousePosition = new THREE.Vector2(event.gamma, event.beta)
      .clampLength(0, 50)
    this.updateCoordinate()
  }

  render() {
    return (
      <div>
        <canvas ref={e => this.canvas = e}>
          <img src={pandaFallback} alt="Panda" width="250" height="250" />
        </canvas>
      </div>
    )
  }
}

export default Panda
