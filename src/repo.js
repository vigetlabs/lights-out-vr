/**
 * All repo relate configuration lives within this file. Add domains,
 * effects, and configure any repo startup behavior here.
 */

import Microcosm from 'microcosm'
import Game from './domains/game'
import Timer from './effects/timer'

export default class Repo extends Microcosm {
  setup() {
    this.addDomain('game', Game)
    this.addEffect(Timer)
  }
}
