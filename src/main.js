// Title: Beer Patrol
// Author: Luka Harambasic
// Hours: 14
// Mods: see README.md
// Sources: see README.md

import { TitleScene } from './scenes/TitleScene'
import { MenuScene } from './scenes/MenuScene'
import { GameScene } from './scenes/GameScene'
import { HighscoreScene } from './scenes/HighscoreScene'
import './style.css'
import { Game, CANVAS } from 'phaser'

const canvasElement = document.getElementById('game')

const config = {
  type: CANVAS,
  width: 640,
  height: 480,
  canvas: canvasElement,
  scene: [TitleScene, MenuScene, GameScene, HighscoreScene],
}

new Game(config)