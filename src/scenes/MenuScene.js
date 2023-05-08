import { Scene, Input } from 'phaser'
import { CONFIG } from '../main'
import { Style } from '../utils/Style'
import { Storage } from '../utils/Storage'

export class MenuScene extends Scene {
  constructor() {
    super('menuScene')
  }

  create() {
    this.add.text(CONFIG.width / 2, 50, 'Koben', Style.title()).setOrigin(0.5, 0.5)

    this.add
      .text(
        CONFIG.width / 2,
        CONFIG.height - 50,
        'Press (Space) to Start, (H) for Highscore or (C) for Credits.',
        Style.instruction(),
      )
      .setOrigin(0.5, 0.5)

    // Input
    this.keySpace = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE)
    this.keyH = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.H)
    this.keyC = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.C)
  }

  update() {
    this._handleInput()
  }

  _handleInput() {
    if (Input.Keyboard.JustDown(this.keySpace)) {
      this.scene.start('gameScene')
    }
    if (Input.Keyboard.JustDown(this.keyH)) {
      this.scene.start('highscoreScene')
    }
    if (Input.Keyboard.JustDown(this.keyC)) {
      this.scene.start('creditScene')
    }
  }
}
