import { Scene, Math } from 'phaser'
import { CONFIG } from '../main'
import { Raft } from '../prefabs/Raft'
import { Ship } from '../prefabs/Ship'
import { Storage } from '../utils/Storage'

export class GameScene extends Scene {
  constructor() {
    super('gameScene')

    this.difficulty = Storage.difficulty
  }

  create() {
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
    this.timer = this.time.addEvent({
      delay: 3000,
      callback: this._spawnShip,
      callbackScope: this,
      loop: true,
    })
  }

  update() {
    this.raft.update()
    this.physics.world.collide(this.raft, this.shipGroup, this._gameOver, null, this)
  }

  _spawnShip() {
    console.log('spawn ship')
    const ship = new Ship(this, Math.Between(64, CONFIG.playableArea), 'boat')
    this.shipGroup.add(ship)
  }

  _gameOver() {
    console.log('game over')
    // TODO add animation, sound and other effects
    this.scene.start('highscoreScene')
  }
}
