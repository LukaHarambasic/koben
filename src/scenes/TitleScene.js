import { Scene } from 'phaser'
import { THEME } from '../main'

export class TitleScene extends Scene {
  constructor() {
    super('titleScene')
  }

  preload() {
    // global asset loading
    // this.load.image('background', './graphics/background.png')
    // this.load.image('tap', './graphics/tap.png')
    // this.load.image('counter', './graphics/counter.png')
    // this.load.image('bretzel', './graphics/bretzel.png')
    // this.load.atlas('beer', './graphics/spritesheet.png', './graphics/sprites.json')
    // this.load.audio('sfx1', './audio/sfx1.wav')
    // this.load.audio('sfx2', './audio/sfx2.wav')
    // this.load.audio('sfx3', './audio/sfx3.wav')
    // this.load.audio('sfx4', './audio/sfx4.wav')
    // this.load.audio('sfx_background', './audio/background.mp3')
  }

  create() {
    console.log('titleScene')
    // this.anims.create({
    //   key: 'empty',
    //   frames: this.anims.generateFrameNames('beer', {
    //     prefix: 'beer_empty_',
    //     start: 0,
    //     end: 3,
    //   }),
    //   frameRate: 3,
    //   repeat: -1,
    // })

    this.input.keyboard.on(
      'keydown',
      () => {
        const randomNumber = Math.floor(Math.random() * 4) + 1
        this.sound.play(`sfx${randomNumber}`)
        this.scene.start('menuScene')
      },
      this,
    )
  }
}
