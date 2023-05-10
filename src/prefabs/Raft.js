import { Physics, Input } from 'phaser'
import { CONFIG } from '../main'
import { Storage } from '../utils/Storage'

export class Raft extends Physics.Arcade.Sprite {
  constructor(scene) {
    // TODO make height more dynamic
    super(scene, CONFIG.width / 2, CONFIG.height - 48, 'raft', 'raft_0')

    this.parentScene = scene
    this.parentScene.add.existing(this)
    this.parentScene.physics.add.existing(this)

    this.difficulty = Storage.difficulty

    this.isGameOver = false
    this.isAnimationPlayed = false

    // Physics
    this.body.setSize(60, 52)
    this.body.setOffset(2, 2)
    this.setMaxVelocity(200, 0)
    this.setVelocityX(0)
    this.setVelocityY(0)
    this.setCollideWorldBounds(true)
    this.setImmovable()

    // Input
    this.cursors = scene.input.keyboard.createCursorKeys()
    console.log(this.cursors)
  }

  update() {
    if (this.isGameOver) return
    // Needed to trigger the animation only once
    if (Input.Keyboard.JustDown(this.cursors.right)) {
      this.play('raft_side')
      this.setFlipX(false)
    } else if (Input.Keyboard.JustDown(this.cursors.left)) {
      this.play('raft_side')
      this.setFlipX(true)
    }
    // Idle
    if (this.body.velocity.x === 0) {
      this.setFlipX(true)
      this.setTexture('raft', 'raft_0')
    }
    // Move
    if (this.cursors.left.isDown) {
      this.body.velocity.x -= this.difficulty.raftVelocity
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x += this.difficulty.raftVelocity
    }
  }

  stop() {
    this.isGameOver = true
    this.setVelocityX(0)
  }
}
