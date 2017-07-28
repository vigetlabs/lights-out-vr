import { startTimer, stopTimer, tickTimer } from '../actions/game'

class TimerEffect {
  setup() {
    this.interval = null
  }

  register() {
    return {
      [startTimer]: this.startTimer,
      [stopTimer]: this.stopTimer
    }
  }

  startTimer(repo) {
    this.interval = setInterval(() => {
      repo.push(tickTimer)
    }, 1000)
  }

  stopTimer(repo) {
    clearInterval(this.interval)
  }
}

export default TimerEffect
