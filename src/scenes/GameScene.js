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
    new Ship(this, Math.Between(0, CONFIG.playableArea), 'boat')

    // Ships
    this.shipGroup = this.add.group({
      runChildUpdate: true,
    })
    this.time.delayedCall(2500, () => {
      console.log('delaycall')
      const ship = new Ship(this, Math.Between(0, CONFIG.playableArea), 'boat')
      this.shipGroup.add(ship)
    })
  }

  update() {
    this.raft.update()
  }
}
