import { Scene, Actions, Math as PMath } from 'phaser'
import { CONFIG } from '../main'
import { Raft } from '../prefabs/Raft'
import { Ship } from '../prefabs/Ship'
import { Storage } from '../utils/Storage'

export class GameScene extends Scene {
  constructor() {
    super('gameScene')

    this.difficulty = Storage.difficulty
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

    // Ships
    this.shipGroup = this.add.group({
      runChildUpdate: true,
    })
    this._spawnShip()
    this.spanTimer = this.time.addEvent({
      delay: 3000,
      callback: this._spawnShip,
      callbackScope: this,
      loop: true,
    })

    // Score
    this.scoreText = this.add.text(10, 10, '', { font: '24px Arial', fill: '#ffffff' })
    this.scoreTimer = this.time.addEvent({
      delay: 10,
      callback: this._updateScore,
      callbackScope: this,
      loop: true,
    })
  }

  update() {
    if (this.isGameOver) return
    this._updateScore()
    this.raft.update()
    this.physics.world.collide(this.raft, this.shipGroup, this._gameOver, null, this)
  }

  _spawnShip() {
    if (this.isGameOver) return
    console.log('spawn ship')
    const ship = new Ship(this, PMath.Between(64, CONFIG.playableArea), 'boat')
    this.shipGroup.add(ship)
  }

  _gameOver() {
    console.log('game over')
    this.isGameOver = true
    Actions.Call(this.shipGroup.getChildren(), (ship) => ship.stop(), this)
    this.raft.stop()
    // TODO add animation, sound and other effects
    // this.isGameOver
    // this.scene.start('highscoreScene')
  }

  _updateScore() {
    console.log('update timer')
    if (this.isGameOver) return
    const elapsed = this.time.now - this.startTime
    const seconds = Math.floor(elapsed / 1000)
    const secondsPadding = seconds < 10 ? seconds.toString().padStart(1, '0') : seconds
    const milliseconds = Math.floor(elapsed % 100)
    const millisecondsPadding = milliseconds < 10 ? milliseconds.toString().padStart(1, '0') : milliseconds
    this.scoreText.setText(`${secondsPadding}.${millisecondsPadding}`)
  }
}
