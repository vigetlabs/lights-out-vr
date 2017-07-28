import { h } from 'preact'
import { Entity } from 'aframe-react'
import { Presenter } from 'microcosm-preact'
import {
  flick,
  ready,
  reset,
  startTimer,
  stopTimer,
  toggleSettings
} from '../actions/game'
import config from '../config.js'

import Assets from './Assets'
import MainScene from './MainScene'
import Moves from './Moves'
import Particles from './Particles'
import Sky from './Sky'
import Timer from './Timer'

export default class Game extends Presenter {
  componentDidMount() {
    document.querySelector('a-assets').addEventListener('loaded', () => {
      // this.repo.push(ready)
    })
  }

  getModel() {
    return {
      games: state => state.game.games,
      hasWon: state => state.game.hasWon,
      lights: state => state.game.lights,
      ready: state => state.game.ready,
      moves: state => state.game.moves,
      textures: state => state.game.textures,
      timeElapsed: state => state.game.timeElapsed
    }
  }

  handleClick = e => {
    // We wanna trigger a rotation on the target object here.
    // Seems to be disconnected from the AFRAME instance.
    // e.target.sceneEl.object3D.rotation.set(50, 90, 180)

    if (this.model.moves === 0) {
      this.repo.push(startTimer)
    }

    const payload = {
      x: parseInt(e.target.attributes[0].value),
      y: parseInt(e.target.attributes[1].value)
    }

    this.repo.push(flick, payload)
  }

  startGame = () => {
    this.repo.push(ready)
  }

  resetGame = () => {
    this.repo.push(reset)
  }

  showSettings = () => {
    this.repo.push(toggleSettings)
  }

  getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min
  }

  render(props, state, model) {
    const { games, hasWon, lights, moves, ready, textures, timeElapsed } = model
    const randWidth = this.getRandomArbitrary(1, 3)

    if (hasWon) {
      this.repo.push(stopTimer)
    }

    return (
      <MainScene>
        <Assets />

        <Sky
          topColor="17 17 25"
          bottomColor="24 17 17"
          exponent="1.5"
          offset="1500.0"
        />

        <Particles />

        <Entity
          primitive="a-light"
          type="point"
          intensity="2"
          position="2 6 4"
        />

        {ready
          ? <Entity>
              {lights.map((row, y) =>
                row.map((col, x) =>
                  <Entity
                    x={x}
                    y={y}
                    class={hasWon ? '' : 'clickable'}
                    primitive="a-plane"
                    height="1"
                    width="1"
                    src={`#${textures[y][x]}`}
                    material={{
                      color: col === 1 ? 'white' : '#111111',
                      opacity: moves || games ? 0.75 : 0
                    }}
                    position={{
                      x: x * config.SCALE + config.X_OFFSET,
                      y: y * config.SCALE + config.Y_OFFSET,
                      z: 0
                    }}
                    sound={{
                      on: 'click',
                      src: '#toggleSound',
                      poolSize: 3,
                      volume: 4
                    }}
                    events={{
                      click: this.handleClick,
                      mouseenter: this.playHoverSound
                    }}
                    event-set__1="_event: mouseenter; material.opacity: 0.99"
                    event-set__2="_event: mouseleave; material.opacity: 0.75"
                    animation__rotate="property: rotation; dur: 1000;
                      easing: linear; loop: false; to: 360 0 0"
                    animation__opacity="property: material.opacity; dur: 1500;
                      easing: easeInSine; loop: false; from: 0; to: 0.75"
                  />
                )
              )}

              <Moves val={moves.toString()} />
              <Timer time={timeElapsed} />
            </Entity>
          : <Entity
              class="clickable"
              geometry={{ primitive: 'plane', width: 3, height: 2 }}
              material={{ color: 'white', opacity: 0 }}
              position={{ x: 2, y: 2, z: -2 }}
              text={{
                value: 'START',
                align: 'center',
                anchor: 'align',
                baseline: 'center',
                width: 15,
                letterSpacing: 5
              }}
              events={{
                click: this.startGame
              }}
            />}

        {!ready
          ? <Entity
              primitive="a-plane"
              height="2"
              width="8"
              src="#logo"
              material={{
                color: 'white',
                opacity: 0.95
              }}
              position={{
                x: 2,
                y: 5,
                z: 0
              }}
            />
          : <Entity />}

        {!ready
          ? <Entity>
              {lights.map((row, y) =>
                <Entity
                  primitive="a-plane"
                  height={randWidth}
                  width={randWidth}
                  src={`#${textures[y][1]}`}
                  material={{
                    color: 'white',
                    opacity: Math.random()
                  }}
                  position={{
                    x: -5 + Math.floor(Math.random() * 15),
                    y: -2.5 + Math.floor(Math.random() * 15),
                    z: Math.floor(Math.random() * 4)
                  }}
                />
              )}
            </Entity>
          : <Entity />}

        {hasWon
          ? <Entity class="clickable">
              <Entity
                primitive="a-plane"
                height="2"
                width="8"
                src="#winner"
                material={{
                  color: 'white',
                  opacity: 0.95
                }}
                position={{
                  x: 2,
                  y: 5,
                  z: 1
                }}
              />
              <Entity
                class="clickable"
                geometry={{ primitive: 'plane', width: 3, height: 2 }}
                material={{ color: 'white', opacity: 0 }}
                position={{ x: 2, y: 2, z: 1.5 }}
                text={{
                  value: 'NEW GAME',
                  align: 'center',
                  anchor: 'align',
                  baseline: 'center',
                  width: 15,
                  letterSpacing: 5
                }}
                events={{
                  click: this.resetGame
                }}
              />
            </Entity>
          : <Entity />}

        <Entity position={{ x: 2, y: 3, z: 10 }}>
          <Entity primitive="a-camera" wasd-controls-enabled={false}>
            <Entity
              primitive="a-cursor"
              cursor={{
                color: 'white',
                fuse: false,
                fuseTimeout: 500
              }}
              material={{
                color: 'white',
                shader: 'flat'
              }}
              event-set__1="_event: mouseenter; color: black"
              event-set__2="_event: mouseleave; color: white"
              raycaster="objects: .clickable"
            />
          </Entity>
        </Entity>
      </MainScene>
    )
  }
}
