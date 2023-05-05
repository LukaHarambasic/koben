export class Storage {

  static set currentScore(value) {
    localStorage.setItem('currentScore', value)
  }

  static get currentScore() {
    return parseInt(localStorage.getItem('currentScore')) || 0
  }

  static tryHighscore(value) {
    const highscore = JSON.parse(JSON.stringify(this.highscore))
    highscore.push(value)
    highscore.sort((a, b) => b - a)
    highscore.pop()
    this.highscore = highscore
    return highscore.indexOf(value)
  }

  static set highscore(value) {
    localStorage.setItem('highscore', JSON.stringify(value))
  }

  static get highscore() {
    return JSON.parse(localStorage.getItem('highscore')) || [0, 0, 0, 0, 0]
  }
}
