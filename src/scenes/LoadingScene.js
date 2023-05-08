import { Scene } from 'phaser'
import { Storage } from '../utils/Storage'

export class LoadingScene extends Scene {
  constructor() {
    super('loadingScene')
  }

  preload() {
    // global asset loading
    this.load.image('canal', './graphics/canal.png')
    this.load.image('raft', './graphics/raft.png')
    this.load.image('boat', './graphics/boat.png')
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
    // loading bar
    // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
    let loadingBar = this.add.graphics()
    this.load.on('progress', (value) => {
      loadingBar.clear() // reset fill/line style
      loadingBar.fillStyle(0xffffff, 1) // (color, alpha)
      // TODO fix
      // loadingBar.fillRect(0, centerY, w * value, 5) // (x, y, w, h)
    })
    this.load.on('complete', () => {
      loadingBar.destroy()
    })
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
    //TODO remove later
    Storage.setDifficulty({})
    this.scene.start('menuScene')
  }
}
