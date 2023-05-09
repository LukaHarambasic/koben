// Title: Koben
// Author: Luka Harambasic
// Hours: 0.5 + 3 + 2 -
// Game logic and scenes were down after a few hours, got lost in creating the graphics
// Mods: see README.md
// Sources: see README.md

import { Game, WEBGL } from 'phaser'
import { LoadingScene } from './scenes/LoadingScene'
import { MenuScene } from './scenes/MenuScene'
import { GameScene } from './scenes/GameScene'
import { HighscoreScene } from './scenes/HighscoreScene'
import { CreditScene } from './scenes/CreditScene'
import { StoryScene } from './scenes/StoryScene'
import './style.css'

const canvasElement = document.getElementById('game')

export const CONFIG = {
  type: WEBGL,
  width: 640,
  height: 720,
  canal: 64,
  playableArea: 640 - 64 * 2,
  shipWidth: 24,
  canvas: canvasElement,
  backgroundColor: '#4488aa',
  // Maybe enable if needed, but centering with CSS seems to work better
  // scale: {
  //   autoCenter: Scale.CENTER_BOTH,
  // },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  scene: [LoadingScene, MenuScene, GameScene, HighscoreScene, CreditScene, StoryScene],
}

new Game(CONFIG)
