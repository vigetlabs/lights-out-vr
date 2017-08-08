import { h } from 'preact'
import { Scene } from 'aframe-react'

import '../lib/EffectComposer'

import '../lib/RenderPass'
import '../lib/ShaderPass'
import '../lib/DotScreenPass'
import '../lib/BloomBlendPass'

import '../lib/CopyShader'
import '../lib/StaticShader'
import '../lib/ConvolutionShader'
import '../lib/DotScreenShader'
import '../lib/HorizontalBlurShader'
import '../lib/VerticalBlurShader'

const { RenderPass, ShaderPass, EffectComposer } = THREE

let bloomPass = new THREE.BloomBlendPass(
  1.0, // the amount of blur
  0.75, // interpolation(0.0 ~ 1.0) original image and bloomed image
  new THREE.Vector2(2048, 2048)
)

let staticPass = new ShaderPass(THREE.StaticShader)
staticPass.uniforms['amount'].value = 0.02
staticPass.uniforms['size'].value = 1.0
staticPass.uniforms['time'].value = Math.random() * 2

/**
 * Configures a THREE.EffectComposer on the current A-Frame scene.
 */
AFRAME.registerSystem('effects', {
  /**
   * Configure composer with a few arbitrary passes.
   */
  init: function() {
    const sceneEl = this.sceneEl

    if (!sceneEl.hasLoaded) {
      sceneEl.addEventListener('render-target-loaded', this.init.bind(this))
      return
    }

    const scene = sceneEl.object3D
    const renderer = sceneEl.renderer
    renderer.setPixelRatio(window.devicePixelRatio)
    const camera = sceneEl.camera

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(bloomPass)
    composer.addPass(staticPass)
    staticPass.renderToScreen = true

    this.composer = composer
    this.t = 0
    this.dt = 0

    this.bind()
  },

  /**
   * Record the timestamp for the current frame.
   * @param {number} t
   * @param {number} dt
   */
  tick: function(t, dt) {
    this.t = t
    this.dt = dt

    staticPass.uniforms['time'].value += 0.01
  },

  /**
   * Binds the EffectComposer to the A-Frame render loop.
   * (This is the hacky bit.)
   */
  bind: function() {
    const renderer = this.sceneEl.renderer
    const render = renderer.render
    const system = this
    let isDigest = false

    renderer.render = function() {
      if (isDigest) {
        render.apply(this, arguments)
      } else {
        isDigest = true
        system.composer.render(system.dt)
        isDigest = false
      }
    }
  }
})

const MainScene = ({ children }) => {
  return (
    <Scene effects antialias={true}>
      {children}
    </Scene>
  )
}

export default MainScene
