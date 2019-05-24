import Phaser from 'phaser';

let player;
let multiplayer;
let multiplayer2;

class StartGame extends Phaser.Scene {
  constructor() {
    super(
      {
        key: 'StartGame',
        active: true
      },

      { frame: [{ key: ['player1', 'multiplayer'] }] }
    );
  }

  init(){

}
  preload() {
    // this.load.audio('gameMusic', require('./assets/'))
    this.load.image('bricks', require('./assets/bricks.png'));

    this.load.spritesheet('player1', require('./assets/panda.png'), {
      frameWidth: 32,
      frameHeight: 48
    });

    this.load.spritesheet('multiplayer', require('./assets/panda2.png'), {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    this.add.image(400, 300, 'bricks');


    this.add.text(280, 80, 'Start Game', {
      fill: '#000000',
      fontSize: '40px'
    });

    var player = this.add.sprite(
      280,
      450,
      'player1',
      this.add.text(200, 500, 'One Player', {
        fill: '#000000',
        fontSize: '30px'
      })
    );

    var multiplayer = this.add.sprite(
      510,
      450,
      'multiplayer',
      this.add.text(450, 500, 'Multiplayer', {
        fill: '#000000',
        fontSize: '30px'
      })
    );

    var multiplayer2 = this.add.sprite(
      560,
      450,
      'multiplayer',
      this.add.text(450, 500, 'Multiplayer', {
        fill: '#000000',
        fontSize: '30px'
      })
    );

    player.setInteractive().on('pointerdown', () => {
      this.scene.stop('StartGame');
        this.scene.stop('Desc2');
      this.scene.start('Desc', {});
    });

    multiplayer.setInteractive().on('pointerdown', () => {
      this.scene.stop('StartGame');
      this.scene.stop('Desc');
      this.scene.start('Desc2', {});
    });

    multiplayer2.setInteractive().on('pointerdown', () => {
      this.scene.stop('StartGame');
        this.scene.stop('Desc');
      this.scene.start('Desc2', {});
    });
  }
}
export default StartGame;
