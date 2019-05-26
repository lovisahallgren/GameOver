import Phaser from 'phaser';

let desc1;
let desc2;
let keys;
let keys2;
let keys3;
let shoot;
let shoot2;
let shoot3;
let button;

class Desc2 extends Phaser.Scene {
  constructor() {
    super(
      {
        key: 'Desc2',
        active: true
      },

      { frame: [{ key: ['desc1', 'desc2', 'keys', 'keys2', 'keys3','shoot', 'shoot2','shoot3', 'button'] }] }
    );
  }

  init(){

}
  preload() {

    this.load.image('bricks', require('./assets/bricks.png'));
    this.load.image('button', require('./assets/playbutton.png'));
  }

  create() {
    this.add.image(400, 300, 'bricks');
    let button = this.add.image(500, 570,'button');

    this.add.text(280, 80, 'How to play', {
      fill: '#000000',
      fontSize: '40px'
    });

          let desc2 =
            this.add.text(320, 200, 'Multiplayer', {
              fill: '#000000',
              fontSize: '30px'
            });

            let keys2 =
              this.add.text(250, 250, 'Player 1: Move with A and D key', {
                fill: '#000000',
                fontSize: '18px'
              });

              let shoot3 =
                this.add.text(250, 300, 'Shoot with Tab key', {
                  fill: '#000000',
                  fontSize: '18px'
                });

              let keys3 =
                this.add.text(250, 400, 'Player 2: Move Left and Right key', {
                  fill: '#000000',
                  fontSize: '18px'
                });

                let shoot2 =
                  this.add.text(250, 450, 'Shoot with Space key', {
                    fill: '#000000',
                    fontSize: '18px'
                  });

    button.setInteractive().on('pointerdown', () => {
      this.scene.stop('Desc');
      this.scene.start('MultiPlayer', {});
    });

  }
}
export default Desc2;
