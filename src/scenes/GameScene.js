import { Scene, Actions, Input, Math as PMath } from 'phaser'
import { CONFIG } from '../main'
import { Raft } from '../prefabs/Raft'
import { Ship } from '../prefabs/Ship'
import { Storage } from '../utils/Storage'
import { formatTime } from '../utils/Helpers'

export class GameScene extends Scene {
  constructor() {
    super('gameScene')

    this.startTime = 0
    this.isGameOver = false
  }

  create() {
    // Important if user plays multiple matches
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
    this.time.delayedCall(Storage.difficulty.shipSpawnRate, this._spawnShip, [], this)
  }

  _spawnShip() {
    console.log('spawn ship')
    const ship = new Ship(this, PMath.Between(64, CONFIG.playableArea), 'boat').setOrigin(0, 0)
    this.shipGroup.add(ship)
    this._randomShipSpawn(10)
    this._randomShipSpawn(10)
    this._randomShipSpawn(10)
    this._startSpawning()
  }

  _randomShipSpawn(chance) {
    const random = PMath.Between(1, 100)
    if (random <= chance) {
      const ship = new Ship(this, PMath.Between(64, CONFIG.playableArea), 'boat').setOrigin(0, 0)
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
    this.dificultyTimer = this.time.addEvent({
      delay: Storage.difficulty.difficultyChangeRate,
      callback: this._updateDifficulty,
      callbackScope: this,
      loop: true,
    })
  }

  _updateDifficulty() {
    if (this.isGameOver) return
    console.log('increase difficulty', Storage.difficulty.shipSpawnRate, Storage.difficulty.shipSpawnRateIncreaseFactor)
    Storage.setDifficulty({
      shipVelocity: Storage.difficulty.shipVelocity * Storage.difficulty.shipVelocityIncreaseFactor,
      shipSpawnRate: Storage.difficulty.shipSpawnRate * Storage.difficulty.shipSpawnRateIncreaseFactor,
    })
  }

  _setGameOver() {
    console.log('game over')
    this.isGameOver = true
    Actions.Call(this.shipGroup.getChildren(), (ship) => ship.stop(), this)
    this.raft.stop()
    this.score = this._getCurrentScore()
    this._showGameOver()
    // TODO add animation, sound and other effects
  }

  _showGameOver() {
    console.log('show game over')
    const group = this.add.group()
    const overlay = this.add.rectangle(0, 0, CONFIG.width, CONFIG.height, '0x000000', 0.6).setOrigin(0, 0)

    // TODO get text style form helper
    // TODO add restart button
    const xPosition = 100
    const margin = 10
    const title = this.add
      .text(CONFIG.width / 2, xPosition, 'Game Over', {
        font: '48px Arial',
        fill: '#ffffff',
      })
      .setOrigin(0.5, 0.5)

    const scoreText = this.add
      .text(CONFIG.width / 2, xPosition + margin + title.height, 'SCORE', {
        font: '24px Arial',
        fill: '#ffffff',
      })
      .setOrigin(0.5, 0.5)
    const scoreValue = this.add
      .text(CONFIG.width / 2, xPosition + margin + title.height + 2 + scoreText.height, formatTime(this.score), {
        font: '24px Arial',
        fill: '#ffffff',
      })
      .setOrigin(0.5, 0.5)

    group.addMultiple([overlay, title, scoreText, scoreValue])
    group.setDepth(1)
  }

  _getCurrentScore() {
    return this.time.now - this.startTime
  }

  _gameOverInput() {
    if (!this.isGameOver) return
    console.log('game over input')
    if (Input.Keyboard.JustDown(this.keyH)) {
      this.scene.start('highscoreScene')
    }
    if (Input.Keyboard.JustDown(this.keyM)) {
      this.scene.start('menuScene')
    }
  }
}
