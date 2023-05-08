export class Storage {
  static set difficulty(difficultyLevel) {
    let difficulty
    switch (difficultyLevel) {
      case 'medium':
        difficulty = {
          speed: 6,
          shipVelocity: 60,
          shipMaxVelocity: 60,
        }
        break
      case 'hard':
        difficulty = {
          speed: 3,
          shipVelocity: 60,
          shipMaxVelocity: 60,
        }
        break
      case 'student':
        difficulty = {
          speed: 1,
          shipVelocity: 60,
          shipMaxVelocity: 60,
        }
        break
      default: // easy
        difficulty = {
          raftVelocity: 10,
          shipVelocity: 100,
          shipMaxVelocity: 150,
        }
    }
    localStorage.setItem('difficulty', JSON.stringify(difficulty))
  }

  static get difficulty() {
    const difficulty = JSON.parse(localStorage.getItem('difficulty'))
    if (!difficulty) {
      throw new Error('Difficulty not set')
    }
    return difficulty
  }

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
