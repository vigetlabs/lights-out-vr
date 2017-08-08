import { flick, ready, reset, tickTimer } from '../actions/game'
import {
  createRandomMatrix,
  createTextureMatrix,
  verifyCompletion,
  computeNewMatrix
} from '../helpers'

const Game = {
  getInitialState() {
    return {
      games: 0,
      hasWon: false,
      lights: createRandomMatrix(5, 'EASY'),
      mode: 'EASY',
      moves: 0,
      ready: false,
      showInfo: false,
      showSettings: false,
      textures: createTextureMatrix(5),
      timeElapsed: 0
    }
  },

  register() {
    return {
      [flick]: this.compute,
      [ready]: this.gameReady,
      [reset]: this.resetGame,
      [tickTimer]: this.tick
    }
  },

  compute(state, payload) {
    const { y, x } = payload
    const computedMatrix = computeNewMatrix(state.lights, { y, x })

    return {
      ...state,
      hasWon: verifyCompletion(computedMatrix),
      lights: computedMatrix,
      moves: state.moves + 1
    }
  },

  gameReady(state) {
    return {
      ...state,
      ready: true
    }
  },

  resetGame(state) {
    return {
      ...state,
      games: state.games + 1,
      moves: 0,
      hasWon: false,
      lights: createRandomMatrix(5, '!EASY'),
      textures: createTextureMatrix(5),
      timeElapsed: 0
    }
  },

  tick(state) {
    return {
      ...state,
      timeElapsed: state.timeElapsed + 1
    }
  }
}

export default Game
