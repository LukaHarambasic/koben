import { Scene, Input } from 'phaser'
import { CONFIG } from '../main'
import { Style } from '../utils/Style'

export class StoryScene extends Scene {
  constructor() {
    super('storyScene')
  }

  create() {
    this.add.text(CONFIG.width / 2, 50, 'Story', Style.title()).setOrigin(0.5, 0.5)

    this.add.text(CONFIG.width / 2, CONFIG.height - 50, 'Press (M) for Menu.', Style.instruction()).setOrigin(0.5, 0.5)

    // TODO tell the story and add some pictures
    // TODO tell why koben is called koben

    // Input
    this.keyM = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.M)
  }

  update() {
    this._handleInput()
  }

  _handleInput() {
    if (Input.Keyboard.JustDown(this.keyM)) {
      this.scene.start('menuScene')
    }
  }
}
