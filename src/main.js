// Title: Koben
// Author: Luka Harambasic
// Hours: 0.5 +
// Mods: see README.md
// Sources: see README.md

import { Game, AUTO, Scale } from 'phaser'
import { LoadingScene } from './scenes/LoadingScene'
import { MenuScene } from './scenes/MenuScene'
import { GameScene } from './scenes/GameScene'
import { HighscoreScene } from './scenes/HighscoreScene'
import { CreditScene } from './scenes/CreditScene'
import './style.css'

const canvasElement = document.getElementById('game')

export const CONFIG = {
  type: AUTO,
  width: 640,
  height: window.innerHeight,
  canvas: canvasElement,
  scale: {
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      //debug: true,
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  // scene: [LoadingScene, MenuScene, GameScene, HighscoreScene, CreditScene],
  scene: [GameScene],
}

new Game(CONFIG)
