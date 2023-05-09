import { Scene, Input, Math as PMath } from 'phaser'
import { CONFIG } from '../main'
import { Style } from '../utils/Style'

export class CreditScene extends Scene {
  constructor() {
    super('creditScene')
  }

  create() {
    this.water = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'water').setOrigin(0, 0)

    this.add.text(CONFIG.width / 2, 50, 'Credits', Style.title()).setOrigin(0.5, 0.5)

    this.add.text(CONFIG.width / 2, CONFIG.height - 50, 'Press (M) for Menu.', Style.instruction()).setOrigin(0.5, 0.5)

    const credits = [
      {
        title: 'Gentle ocean waves birdsong and gull',
        author: 'jackmichaelking',
        link: 'https://pixabay.com/sound-effects/gentle-ocean-waves-birdsong-and-gull-7109/',
        file: 'background.mp3',
      },
      {
        title: 'Fish flapping',
        author: 'Mixkit',
        link: 'https://mixkit.co/free-sound-effects/splash/',
        file: 'fish_flapping.wav',
      },
      {
        title: 'Sea water splash',
        author: 'Mixkit',
        link: 'https://mixkit.co/free-sound-effects/splash/',
        file: 'sea_water_splash.wav',
      },
      {
        title: 'Water splash',
        author: 'Mixkit',
        link: 'https://mixkit.co/free-sound-effects/splash/',
        file: 'water_splash.wav',
      },
      {
        title: 'SPLASH (by blaukreuz)',
        author: 'qubodup',
        link: 'https://pixabay.com/sound-effects/splash-by-blaukreuz-6261/',
        file: 'fish_flapping.wav',
      },
      {
        title: 'large crash with cat.aiff',
        author: 'bevibeldesign',
        link: 'https://pixabay.com/sound-effects/large-crash-with-cataiff-14490/',
        file: 'crash_with_cat.mp3',
      },
    ]

    // Input
    this.keyM = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.M)
  }

  update() {
    this._handleInput()
  }

  _handleInput() {
    const splashs = ['audio_splash1', 'audio_splash2', 'audio_splash3', 'audio_splash4']
    const randomSplash = splashs[PMath.Between(0, splashs.length - 1)]
    if (Input.Keyboard.JustDown(this.keyM)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('menuScene')
    }
  }
}
