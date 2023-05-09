import { Physics, Math } from 'phaser'
import { CONFIG } from '../main'
import { Storage } from '../utils/Storage'

export class Ship extends Physics.Arcade.Sprite {
  constructor(scene, x = CONFIG.width / 2, texture = 'ship_pink') {
    super(scene, x, -64, texture)

    this.parentScene = scene
    this.parentScene.add.existing(this)
    this.parentScene.physics.add.existing(this)

    this.difficulty = Storage.difficulty

    this.isGameOver = false

    this.body.setSize(22, 50)
    this.body.setOffset(1, 2)

    this.setAngle(180)
    const speedVariance = Math.Between(0, 100)
    this.velocity = this.difficulty.shipVelocity + speedVariance
    this.setVelocityY(this.velocity)
    this.setImmovable()

    this.cursors = scene.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.isGameOver) return
    if (this.y > CONFIG.height + 64) {
      this.destroy()
    }
  }

  stop() {
    this.isGameOver = true
    this.setVelocityY(0)
  }
}
