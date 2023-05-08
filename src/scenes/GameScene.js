import { Scene, Actions, Input, Math as PMath } from 'phaser'
import { CONFIG } from '../main'
import { Raft } from '../prefabs/Raft'
import { Ship } from '../prefabs/Ship'
import { Storage } from '../utils/Storage'
import { formatTime } from '../utils/Helpers'
import { Style } from '../utils/Style'

export class GameScene extends Scene {
  constructor() {
    super('gameScene')
  }

  create() {
    console.log('create game scene')
    this.startTime = 0
    this.isGameOver = false
    this.startTime = this.time.now

    // Background
    this.canal = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'canal').setOrigin(0, 0)
    this.physics.world.setBounds(64, 0, CONFIG.playableArea, CONFIG.height)

    // Raft
    this.raft = new Raft(this)

    this._handleSpawning()
    this._handleScore()
    this._handleDifficulty()

    // Input
    this.keyH = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.H)
    this.keyM = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.M)
    this.keyR = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.R)
  }

  update() {
    if (this.isGameOver) {
      this._gameOverInput()
      return
    }
    this._updateScore()
    this.raft.update()
    this.physics.world.collide(this.raft, this.shipGroup, this._setGameOver, null, this)
    this._gameOverInput()
  }

  _handleSpawning() {
    this.shipGroup = this.add.group({
      runChildUpdate: true,
    })
    this._startSpawning()
  }

  _startSpawning() {
    if (this.isGameOver) return
    this.time.delayedCall(Storage.difficulty.shipSpawnRate, this._spawnShips, [], this)
  }

  _spawnShips() {
    if (this.isGameOver) return
    // I hate this sip spwan x position, works for now, might change later
    const ship = new Ship(
      this,
      PMath.Between(CONFIG.canal + CONFIG.shipWidth / 2, CONFIG.playableArea + CONFIG.canal - CONFIG.shipWidth / 2),
      'boat',
    )
    this.shipGroup.add(ship)
    this._randomShipSpawn(10)
    this._randomShipSpawn(10)
    this._randomShipSpawn(10)
    this._startSpawning()
  }

  _randomShipSpawn(chance) {
    if (this.isGameOver) return
    const random = PMath.Between(1, 100)
    if (random <= chance) {
      const ship = new Ship(
        this,
        PMath.Between(CONFIG.canal + CONFIG.shipWidth / 2, CONFIG.playableArea + CONFIG.canal - CONFIG.shipWidth / 2),
        'boat',
      )
      this.shipGroup.add(ship)
    }
  }

  _handleScore() {
    this.scoreText = this.add.text(10, 10, '', { font: '24px Arial', fill: '#ffffff' })
    this.scoreTimer = this.time.addEvent({
      delay: 10,
      callback: this._updateScore,
      callbackScope: this,
      loop: true,
    })
  }

  _updateScore() {
    if (this.isGameOver) return
    const elapsed = this._getCurrentScore()
    this.scoreText.setText(formatTime(elapsed))
  }

  _handleDifficulty() {
    Storage.setDifficulty({ shipVelocity: Storage.difficulty.shipVelocityInitial })
    this.time.addEvent({
      delay: Storage.difficulty.difficultyChangeRate,
      callback: this._increaseDifficulty,
      callbackScope: this,
      loop: true,
    })
    this.textDifficultyIncrease = this.add
      .text(CONFIG.width / 2, 40, 'FASTER', { font: '24px Arial', fill: '#ffffff' })
      .setOrigin(0.5, 0.5)
      .setDepth(1)
      .setAlpha(0)
  }

  _increaseDifficulty() {
    if (this.isGameOver) return
    Storage.setDifficulty({
      shipVelocity: Storage.difficulty.shipVelocity * Storage.difficulty.shipVelocityIncreaseFactor,
      shipSpawnRate: Storage.difficulty.shipSpawnRate * Storage.difficulty.shipSpawnRateIncreaseFactor,
    })
    this.textDifficultyIncrease.setAlpha(1)
    this.time.delayedCall(
      2000,
      () => {
        this.tweens.add({
          targets: this.textDifficultyIncrease,
          alpha: 0,
          duration: 1000,
          ease: 'Linear',
          onComplete: () => {},
        })
      },
      [],
      this,
    )
  }

  _setGameOver() {
    this.isGameOver = true
    Actions.Call(this.shipGroup.getChildren(), (ship) => ship.stop(), this)
    this.raft.stop()
    this.score = this._getCurrentScore()
    Storage.currentScore = this.score
    Storage.tryHighscore(this.score)
    this._showGameOver()
    // TODO add animation, sound and other effects
  }

  _showGameOver() {
    console.log('show game over')
    const group = this.add.group()
    const overlay = this.add.rectangle(0, 0, CONFIG.width, CONFIG.height, '0x000000', 0.6).setOrigin(0, 0)

    const title = this.add.text(CONFIG.width / 2, 200, 'Game Over', Style.title()).setOrigin(0.5, 0.5)

    const scoreText = this.add.text(CONFIG.width / 2, 260, 'YOUR SCORE', Style.subtitle()).setOrigin(0.5, 0.5)
    const scoreValue = this.add
      .text(CONFIG.width / 2, 290, formatTime(this.score), Style.subtitle())
      .setOrigin(0.5, 0.5)

    const navigationText = this.add
      .text(
        CONFIG.width / 2,
        CONFIG.height - 50,
        'Press (R) to restart, (M) for Menu or (H) for Highscore.',
        Style.instruction(),
      )
      .setOrigin(0.5, 0.5)

    group.addMultiple([overlay, title, scoreText, scoreValue, navigationText])
    group.setDepth(100)
  }

  _getCurrentScore() {
    return this.time.now - this.startTime
  }

  _gameOverInput() {
    if (!this.isGameOver) return
    if (Input.Keyboard.JustDown(this.keyH)) {
      this.scene.start('highscoreScene')
    }
    if (Input.Keyboard.JustDown(this.keyM)) {
      this.scene.start('menuScene')
    }
    if (Input.Keyboard.JustDown(this.keyR)) {
      this.scene.restart()
    }
  }
}
