// Title: Koben
// Author: Luka Harambasic
// Hours: 16
//     Game logic and scenes were done after 6-7 hours, but than I got lost in creating the pixel art (love it)
// Technical tilt:
//     My static classes Storage & Style.
//     I also like that the logic in GameScene.js is well encapsuled in functions and therefore very readble.
//     Not to forget the whole set up with Vite and a GitHub action for deployment.
// Style tilt:
//     I love the raft and boat PixelArt I created, not happy with the background and the animations.
//     Another highlight is that it is based on a raft I built with my friends in Copenhagen.
//     The wooly controlls, as it really behaves like a raft on the water.

import { Game, WEBGL } from 'phaser'
import { LoadingScene } from './scenes/LoadingScene'
import { MenuScene } from './scenes/MenuScene'
import { GameScene } from './scenes/GameScene'
import { HighscoreScene } from './scenes/HighscoreScene'
import { CreditScene } from './scenes/CreditScene'
import { StoryScene } from './scenes/StoryScene'
import { Style } from './utils/Style'
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
  backgroundColor: Style.dark,
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
