import React from 'react'
import * as THREE from 'three'

import model from './model'
import fallback from './fallback.png'

export class Panda extends React.Component {
  constructor() {
    super()

    this.clock = new THREE.Clock()
    this.mousePosition = new THREE.Vector2()
    this.canvasCenter = new THREE.Vector2()
    this.scrollPosition = new THREE.Vector2()
  }

  componentDidMount() {
    document.addEventListener('mouseout', this.handleMouseOut)
    document.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('deviceorientation', this.handleDeviceOrientation)
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)

    this.handleResize()
    this.initCanvas()
    this.animate()
  }

  componentWillUnmount() {
    document.removeEventListener('mouseout', this.handleMouseOut)
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
    loader.parse(model, puppet => {
      const center = new THREE.Vector3()
      new THREE.Box3().setFromObject(puppet).getCenter(center)
      scene.position.y = center.y
      scene.add(puppet)
    })

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(this.props.size, this.props.size)

    this.camera = camera
    this.renderer = renderer
    this.scene = scene
  }

  animate = () => {
    this.animationFrame = requestAnimationFrame(this.animate)
    this.renderScene()
  }

  renderScene = () => {
    const delta = this.clock.getDelta()
    const sceneY = this.scene.position.y
    const { x: newX, y: newY } = this.cameraPosition
    const { x: oldX, y: oldY } = this.camera.position

    this.camera.position.x += ((-newX) - oldX) * 15 * delta
    this.camera.position.y += ((newY + sceneY) - oldY) * 15 * delta
    this.camera.position.z = 50

    this.camera.lookAt(this.scene.position)
    this.renderer.render(this.scene, this.camera)
  }

  handleScroll = event => {
    this.scrollPosition.setY(3 * window.scrollY)
    this.updateCoordinate()
  }

  handleMouseOut = event => {
    this.inside = false
    this.mousePosition = new THREE.Vector2()
    this.updateCoordinate()
  }

  handleMouseMove = event => {
    this.inside = true
    this.mousePosition = new THREE.Vector2(event.clientX, event.clientY)
    this.updateCoordinate()
  }

  updateCoordinate = () => {
    this.cameraPosition = new THREE.Vector2()
    if (this.inside) {
      this.cameraPosition
        .add(this.mousePosition)
        .add(this.scrollPosition)
        .sub(this.canvasCenter)
        .divideScalar(30)
    }
  }

  handleResize = event => {
    const rect = this.canvas.getBoundingClientRect()
    this.canvasCenter = new THREE.Vector2(rect.x + rect.width / 2, rect.y + rect.height / 2)
    this.updateCoordinate()
  }

  handleDeviceOrientation = event => {
    this.mousePosition = new THREE.Vector2(event.gamma, event.beta)
      .clampLength(0, 50)
    this.updateCoordinate()
  }

  render() {
    return (
      <canvas ref={e => (this.canvas = e)}>
        <img
          src={fallback}
          alt="Panda"
          width={this.props.size}
          height={this.props.size}
        />
      </canvas>
    )
  }
}

export default Panda
