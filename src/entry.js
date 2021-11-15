/* global SOME_ENV_VAR */

/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, TextureLoader, RepeatWrapping, PerspectiveCamera, PlaneBufferGeometry, WebGLRenderTarget, RGBFormat, Scene, Mesh, Vector3, MeshToonMaterial, Fog, CubeTextureLoader, ShaderMaterial, NearestFilter, Box3, Vector2, LoadingManager } from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import { Interaction } from 'three.interaction'
import style from './style.scss'

import SeedScene from './objects/Scene.js'

Vector3.prototype.perp = function () {
  return new THREE.Vector3(-this.z, 0, this.x)
}

Vector3.prototype.sign = function (vector) {
  return this.perp().dot(vector) < 0 ? -1 : 1
}

Object.defineProperty(Vector3.prototype, 'angle', {
  enumerable: true,
  configurable: true,
  get: function () {
    return Math.atan2(this.z, this.x)
  },

  set: function (value) {
    this.x = Math.cos(value) * this.length()
    this.z = Math.sin(value) * this.length()
  }
})


async function startApp () {

  const scene = new Scene()
  const camera = new PerspectiveCamera()
  const renderer = new WebGLRenderer({ antialias: false, alpha: true })

  const $wrapper = document.createElement('div')
  document.body.appendChild($wrapper)

  let seedScene

  seedScene = new SeedScene(camera)
  scene.add(seedScene)

  // renderer
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0)

  // camera
  camera.position.set(0, 0, 10);
  camera.lookAt(new Vector3(0, 0, 0));


  const renderScene = new RenderPass( scene, camera )
  const composer = new EffectComposer( renderer )
  composer.addPass( renderScene )

  // render loop
  const onAnimationFrameHandler = (timeStamp) => {
    composer.render(scene, camera)
    seedScene.update(timeStamp)
    window.requestAnimationFrame(onAnimationFrameHandler)
  }

  window.requestAnimationFrame(onAnimationFrameHandler)

  // resize
  const windowResizeHandler = () => { 
    const { innerHeight, innerWidth } = window
    renderer.setSize(innerWidth, innerHeight)
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
  }

  windowResizeHandler()
  window.addEventListener('resize', windowResizeHandler)

  // dom
  document.body.style.margin = 0
  $wrapper.appendChild( renderer.domElement )
}

startApp()