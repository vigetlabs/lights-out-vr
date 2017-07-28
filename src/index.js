import 'aframe'
import 'aframe-template-component'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'aframe-event-set-component'
import { h, render } from 'preact'
import './style'

import Game from './components/Game'
import Repo from './repo'

const repo = new Repo()

let root
function init() {
  root = render(<Game repo={repo} />, document.body, root)
}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

// in development, set up HMR:
if (module.hot) {
  //require('preact/devtools');   // turn this on if you want to enable React DevTools!
  module.hot.accept('./components/Game', () => requestAnimationFrame(init))
}

init()
