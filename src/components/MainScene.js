import { h } from 'preact'
import { Scene } from 'aframe-react'

const MainScene = ({ children }) => {
  return (
    <Scene antialias={true}>
      {children}
    </Scene>
  )
}

export default MainScene
