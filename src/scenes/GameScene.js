import { Scene } from 'phaser'
import { CONFIG } from '../main'
import { Raft } from '../prefabs/Raft'

export class GameScene extends Scene {
  constructor() {
    super('gameScene')
  }

  create() {
    this.canal = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'canal').setOrigin(0, 0)
    this.physics.world.setBounds(64, 0, CONFIG.width - 64 * 2, CONFIG.height)

    this.raft = new Raft(this)
    // paddle.setCollideWorldBounds(true)
    // paddle.setBounce(0.5)
    // paddle.setImmovable()
    // paddle.setMaxVelocity(0, 600)
    // paddle.setDragY(200)
    // paddle.setDepth(1) // ensures that paddle z-depth remains above shadow paddles
    // paddle.destroyed = false // custom property to track paddle life
    // paddle.setBlendMode('SCREEN') // set a WebGL blend mode
  }

  update() {
    this.raft.update()
  }
}
