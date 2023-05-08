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
        90,
        'Welcome to your raft adventure in Copenhagen. You are the captain of the infamous raft called "Koben". You built in with your seven friends in less than a day. And now you are enyoing life. But the canals of Copenhagen are dangerous. Mayn tourists drive reckless with their rented boat. Not to forget about the police which requires you to have life vests on board. And the huge ferries crossing the canal from one side to another. So I hope your are prepared to protect your friends. To survice. Good luck! You will need it.',
        Style.bodyLong(),
      )
      .setOrigin(0.5, 0)

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
