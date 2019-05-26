import Phaser from 'phaser';
import MultiPlayer from './MultiPlayer';
import StartGame from './StartGame';
import OnePlayer from './OnePlayer';
import Desc from './Desc';
import Desc2 from './Desc2';

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
  scene: [Desc,Desc2, StartGame, OnePlayer, MultiPlayer]
};

let game = new Phaser.Game(config);
