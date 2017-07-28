import { h } from 'preact'
import { Entity } from 'aframe-react'

import vertexShader from 'raw-loader!../shaders/skybient.vert'
import fragmentShader from 'raw-loader!../shaders/skybient.frag'

AFRAME.registerShader('skybient', {
  schema: {
    topColor: { type: 'vec3', default: '255 0 0', is: 'uniform' },
    bottomColor: { type: 'vec3', default: '0 0 255', is: 'uniform' },
    offset: { type: 'float', default: '400', is: 'uniform' },
    exponent: { type: 'float', default: '0.6', is: 'uniform' }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
})

AFRAME.registerPrimitive('a-skybient', {
  defaultComponents: {
    geometry: {
      primitive: 'sphere',
      radius: 5000,
      segmentsWidth: 64,
      segmentsHeight: 20
    },
    material: {
      shader: 'skybient'
    },
    scale: '-1 1 1'
  },

  mappings: {
    topColor: 'material.topColor',
    bottomColor: 'material.bottomColor',
    offset: 'material.offset',
    exponent: 'material.exponent'
  }
})

const Sky = ({ topColor, bottomColor, exponent, offset }) => {
  return (
    <Entity
      primitive="a-skybient"
      material={{ shader: 'skybient', topColor, bottomColor, exponent, offset }}
    />
  )
}

export default Sky
