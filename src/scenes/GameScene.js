import { Scene } from 'phaser'

export class GameScene extends Scene {
  constructor() {
    super('gameScene')
  }

  create() {
    this.leftBarrier = this.physics.add.sprite(32, centerY, 'paddle').setOrigin(0.5)
    this.rightBarrier = this.physics.add.sprite(32, centerY, 'paddle').setOrigin(0.5)
    // paddle.setCollideWorldBounds(true)
    // paddle.setBounce(0.5)
    // paddle.setImmovable()
    // paddle.setMaxVelocity(0, 600)
    // paddle.setDragY(200)
    // paddle.setDepth(1) // ensures that paddle z-depth remains above shadow paddles
    // paddle.destroyed = false // custom property to track paddle life
    // paddle.setBlendMode('SCREEN') // set a WebGL blend mode
  }

  update() {}
}
