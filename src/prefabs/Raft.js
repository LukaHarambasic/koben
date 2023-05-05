import { Physics } from 'phaser'
import { CONFIG } from '../main'
import { Storage } from '../utils/Storage'

export class Raft extends Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, CONFIG.width / 2, 0, 'raft')

    this.parentScene = scene

    this.parentScene.add.existing(this)
    this.parentScene.physics.add.existing(this)
    this.setVelocityX(Storage.difficulty())
    this.setImmovable()
  }
}
