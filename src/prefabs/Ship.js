import { Physics, Math } from 'phaser'
import { CONFIG } from '../main'
import { Storage } from '../utils/Storage'

export class Ship extends Physics.Arcade.Sprite {
  constructor(scene, x = CONFIG.width / 2, texture) {
    super(scene, x, -64, texture)
    console.log('Ship')

    this.parentScene = scene
    this.parentScene.add.existing(this)
    this.parentScene.physics.add.existing(this)

    this.difficulty = Storage.difficulty

    this.isGameOver = false

    // TODO something is off here, ships aren't moving - works without which is fine for now
    // this.setMaxVelocity(0, this.difficulty.shipMaxVelocityY)
    const speedVariance = Math.Between(0, 100)
    this.setAngle(180)
    this.velocity = this.difficulty.shipVelocity + speedVariance
    this.setVelocityY(this.velocity)
    this.setImmovable()

    this.cursors = scene.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.isGameOver) return
    if (this.y > CONFIG.height + 64) {
      console.log('destroy')
      this.destroy()
    }
  }

  stop() {
    this.isGameOver = true
    this.setVelocityY(0)
  }
}
