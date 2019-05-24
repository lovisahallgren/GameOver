import Phaser from 'phaser';

let desc1;
let desc2;
let keys;
let keys2;
let keys3;
let shoot;
let shoot2;
let shoot3;


class Desc2 extends Phaser.Scene {
  constructor() {
    super(
      {
        key: 'Desc2',
        active: true
      },

      { frame: [{ key: ['desc1', 'desc2', 'keys', 'keys2', 'keys3','shoot', 'shoot2','shoot3'] }] }
    );
  }

  init(){

}
  preload() {

    this.load.image('bricks', require('./assets/bricks.png'));
  }

  create() {
    this.add.image(400, 300, 'bricks');


    this.add.text(280, 80, 'How to play', {
      fill: '#000000',
      fontSize: '40px'
    });

          var desc2 =
            this.add.text(320, 200, 'Multiplayer', {
              fill: '#000000',
              fontSize: '30px'
            });

            var keys2 =
              this.add.text(250, 300, 'Player 1: Move with A and D key', {
                fill: '#000000',
                fontSize: '18px'
              });

              var shoot3 =
                this.add.text(250, 350, 'Shoot with Tab key', {
                  fill: '#000000',
                  fontSize: '18px'
                });

              var keys3 =
                this.add.text(250, 450, 'Player 2: Move Left and Right key', {
                  fill: '#000000',
                  fontSize: '18px'
                });

                var shoot2 =
                  this.add.text(250, 500, 'Shoot with Space key', {
                    fill: '#000000',
                    fontSize: '18px'
                  });

    desc2.setInteractive().on('pointerdown', () => {
      this.scene.stop('Desc');
      this.scene.start('MultiPlayer', {});
    });

  }
}
export default Desc2;
