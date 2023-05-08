export class Storage {
  static setDifficulty({
    difficultyChangeRate,
    raftVelocity,
    shipVelocity,
    shipVelocityInitial,
    shipVelocityIncreaseFactor,
    shipSpawnRate,
    shipSpawnRateIncreaseFactor,
  }) {
    const difficulty = {
      difficultyChangeRate: difficultyChangeRate || 10000,
      raftVelocity: raftVelocity || 13,
      shipVelocity: shipVelocity || 100,
      shipVelocityInitial: shipVelocityInitial || 100,
      shipVelocityIncreaseFactor: shipVelocityIncreaseFactor || 1.25,
      shipSpawnRate: shipSpawnRate || 2000,
      shipSpawnRateIncreaseFactor: shipSpawnRateIncreaseFactor || 0.9,
    }
    localStorage.setItem('difficulty', JSON.stringify(difficulty))
  }

  static get difficulty() {
    const difficulty = JSON.parse(localStorage.getItem('difficulty'))
    if (!difficulty) {
      this.setDifficulty({})
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
