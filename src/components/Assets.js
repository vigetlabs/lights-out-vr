import { h } from 'preact'

import logo from '../assets/img/logo.png'
import settings from '../assets/img/settings.png'
import winner from '../assets/img/winner.png'
import x from '../assets/img/x.png'
import step from '../assets/img/step.png'
import circle from '../assets/img/circle.png'
import fcircle from '../assets/img/fcircle.png'
import rect from '../assets/img/rect.png'
import frect from '../assets/img/frect.png'
import dstrips from '../assets/img/dstrips.png'
import hstrips from '../assets/img/hstrips.png'
import vstrips from '../assets/img/vstrips.png'
import dots from '../assets/img/dots.png'
import waves from '../assets/img/waves.png'
// import glowSound from '../assets/audio/glow.ogg'
import toggleSound from '../assets/audio/click.ogg'

// <audio crossOrigin id="glowSound" src={glowSound} />

const Assets = () => {
  return (
    <a-assets>
      <img crossOrigin id="logo" src={logo} />
      <img crossOrigin id="settings" src={settings} />
      <img crossOrigin id="winner" src={winner} />
      <img crossOrigin id="x" src={x} />
      <img crossOrigin id="step" src={step} />
      <img crossOrigin id="circle" src={circle} />
      <img crossOrigin id="fcircle" src={fcircle} />
      <img crossOrigin id="rect" src={rect} />
      <img crossOrigin id="frect" src={frect} />
      <img crossOrigin id="dstrips" src={dstrips} />
      <img crossOrigin id="hstrips" src={hstrips} />
      <img crossOrigin id="vstrips" src={vstrips} />
      <img crossOrigin id="dots" src={dots} />
      <audio crossOrigin id="toggleSound" src={toggleSound} />
    </a-assets>
  )
}

export default Assets
