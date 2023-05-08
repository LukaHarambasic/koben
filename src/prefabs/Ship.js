import { Physics, Math } from 'phaser'
import { CONFIG } from '../main'
import { Storage } from '../utils/Storage'

export class Ship extends Physics.Arcade.Sprite {
  constructor(scene, x = CONFIG.width / 2, texture) {
    super(scene, x, 50, texture)
    console.log('Ship')

    this.parentScene = scene
    this.parentScene.add.existing(this)
    this.parentScene.physics.add.existing(this)

    this.difficulty = Storage.difficulty

    this.setMaxVelocity(0, this.difficulty.shipMaxVelocityY)
    const speedVariance = Math.Between(0, 50)
    this.setAngle(180)
    this.velocity = this.difficulty.shipVelocity + speedVariance
    this.setVelocityY(this.velocity)
    this.setCollideWorldBounds(true)
  }

  update() {
    console.log('update ship')
    this.body.velocity.y += this.velocity
  }
}
