import { Physics } from 'phaser'
import { CONFIG } from '../main'
import { Storage } from '../utils/Storage'

export class Raft extends Physics.Arcade.Sprite {
  constructor(scene) {
    // TODO make height more dynamic
    super(scene, CONFIG.width / 2, CONFIG.height - 64, 'raft')

    this.parentScene = scene
    this.parentScene.add.existing(this)
    this.parentScene.physics.add.existing(this)

    this.difficulty = Storage.difficulty

    this.setMaxVelocity(200, 0)
    this.setVelocityX(0)
    this.setVelocityY(0)
    this.setCollideWorldBounds(true)
    this.setImmovable()

    this.cursors = scene.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.cursors.left.isDown) {
      this.body.velocity.x -= this.difficulty.raftVelocity
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x += this.difficulty.raftVelocity
    }
  }
}
