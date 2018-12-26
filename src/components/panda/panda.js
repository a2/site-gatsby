import React from 'react'
import bowser from 'bowser'
import * as THREE from 'three'

import model from './model'
import fallback from './fallback.jpg'

export class Panda extends React.Component {
  constructor() {
    super()

    this.state = {}

    this.clock = new THREE.Clock()
    this.mousePosition = new THREE.Vector2()
    this.canvasCenter = new THREE.Vector2()
    this.scrollPosition = new THREE.Vector2()
  }

  componentDidMount() {
    if (bowser.getParser(window.navigator.userAgent).isPlatform('desktop')) {
      new THREE.ObjectLoader().parse(model, puppet => {
        this.setState({ puppet })
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.animationFrame || !this.state.puppet || prevState.puppet) {
      return
    }

    document.addEventListener('mouseout', this.handleMouseOut)
    document.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    this.initCanvas()
    this.animate()
  }

  componentWillUnmount() {
    document.removeEventListener('mouseout', this.handleMouseOut)
    document.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)

    cancelAnimationFrame(this.animationFrame)
    this.animationFrame = null
  }

  initCanvas() {
    const { puppet } = this.state

    const center = new THREE.Vector3()
    new THREE.Box3().setFromObject(puppet).getCenter(center)
    puppet.position.y = -center.y

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    scene.add(puppet)

    const camera = new THREE.PerspectiveCamera()
    camera.position.setY(center.y).setZ(50)
    camera.updateProjectionMatrix()
    scene.add(camera)

    const ambientLight = new THREE.AmbientLight(0x555555, 1)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.75)
    pointLight.position.set(0, 26.95, 57.68)
    camera.add(pointLight)

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
    const { x: newX, y: newY } = this.newCameraPosition()
    const { x: oldX, y: oldY } = this.camera.position

    this.camera.position.x += (-newX - oldX) * 15 * delta
    this.camera.position.y += (newY - oldY) * 15 * delta

    this.camera.lookAt(this.scene.position)
    this.renderer.render(this.scene, this.camera)
  }

  handleScroll = event => {
    this.scrollPosition.y = 3 * window.scrollY
  }

  handleMouseOut = event => {
    this.inside = false
    this.mousePosition = new THREE.Vector2()
  }

  handleMouseMove = event => {
    this.inside = true
    this.mousePosition = new THREE.Vector2(event.clientX, event.clientY)
  }

  newCameraPosition = () => {
    if (this.inside) {
      return new THREE.Vector2()
        .add(this.mousePosition)
        .add(this.scrollPosition)
        .sub(this.canvasCenter)
        .divideScalar(30)
        .clampLength(0, 30)
    } else {
      return new THREE.Vector2()
    }
  }

  handleResize = event => {
    const rect = this.canvas.getBoundingClientRect()
    this.canvasCenter = new THREE.Vector2(rect.x, rect.y)
    this.canvasCenter.addScalar(this.props.size / 2)
  }

  render() {
    const image = (
      <img
        src={fallback}
        alt="Panda"
        width={this.props.size}
        height={this.props.size}
        style={{ marginBottom: 0 }}
      />
    )

    if (this.state.puppet) {
      return <canvas ref={ref => (this.canvas = ref)}>{image}</canvas>
    } else {
      return image
    }
  }
}

export default Panda
