import { Scene, Input } from 'phaser'
import { Storage } from '../utils/Storage'
import { CONFIG } from '../main'
import { Style } from '../utils/Style'

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

    // loading bar
    // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
    let loadingBar = this.add.graphics()
    this.load.on('progress', (value) => {
      loadingBar.clear()
      loadingBar.fillStyle(0xffffff, 1)
      loadingBar.fillRect(0, 0, CONFIG.width * value, 5)
    })
  }

  create() {
    this.add.text(CONFIG.width / 2, 50, 'Koben', Style.title()).setOrigin(0.5, 0.5)
    this.add.text(CONFIG.width / 2, 90, 'Rafting in Copenhagen', Style.subtitle()).setOrigin(0.5, 0.5)

    this.add
      .text(
        CONFIG.width / 2,
        130,
        'Welcome to your raft adventure in Copenhagen. You are the captain of the infamous raft called "Koben". You built in with your seven friends in less than a day. And now you are enyoing life. But the canals of Copenhagen are dangerous. Mayn tourists drive reckless with their rented boat. Not to forget about the police which requires you to have life vests on board. And the huge ferries crossing the canal from one side to another. So I hope your are prepared to protect your friends. To survice. Good luck! You will need it.',
        Style.bodyLong(),
      )
      .setOrigin(0.5, 0)

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

    this.add
      .text(CONFIG.width / 2, CONFIG.height - 50, 'Press (Space) to continue.', Style.instruction())
      .setOrigin(0.5, 0.5)

    // Input
    this.keySpace = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE)
  }

  update() {
    this._handleInput()
  }

  _handleInput() {
    if (Input.Keyboard.JustDown(this.keySpace)) {
      this.scene.start('menuScene')
    }
  }
}
