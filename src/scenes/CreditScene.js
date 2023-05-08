import { Scene, Input } from 'phaser'
import { CONFIG } from '../main'
import { Style } from '../utils/Style'

export class CreditScene extends Scene {
  constructor() {
    super('creditScene')
  }

  create() {
    this.add.text(CONFIG.width / 2, 50, 'Credits', Style.title()).setOrigin(0.5, 0.5)

    this.add.text(CONFIG.width / 2, CONFIG.height - 50, 'Press (M) for Menu.', Style.instruction()).setOrigin(0.5, 0.5)

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
