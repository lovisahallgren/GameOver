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

class Desc extends Phaser.Scene {
  constructor() {
    super(
      {
        key: 'Desc',
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
    let button = this.add.image(500, 550,'button');


    this.add.text(280, 80, 'How to play', {
      fill: '#000000',
      fontSize: '40px'
    });

    var desc1 =
      this.add.text(320, 200, 'One Player', {
        fill: '#000000',
        fontSize: '30px'
      });

      var keys =
        this.add.text(250, 300, 'Move with left and right key', {
          fill: '#000000',
          fontSize: '20px'
        });

        var shoot =
          this.add.text(300, 400, 'Shoot with space key', {
            fill: '#000000',
            fontSize: '20px'
          });


    // desc1.setInteractive().on('pointerdown', () => {
    //   this.scene.stop('Desc');
    //   this.scene.start('OnePlayer', {});
    // });

    button.setInteractive().on('pointerdown', () => {
      this.scene.stop('Desc');
      this.scene.start('OnePlayer', {});
    });

  }
}
export default Desc;
