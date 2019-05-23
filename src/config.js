import Phaser from 'phaser';
import MultiPlayer from './MultiPlayer';
import StartGame from './StartGame';
import OnePlayer from './OnePlayer';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  scene: [StartGame, OnePlayer, MultiPlayer]
};

let game = new Phaser.Game(config);
