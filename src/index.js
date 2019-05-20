import Phaser from 'phaser';
// import config from './config';

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
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let game = new Phaser.Game(config);
let platforms;
let score = 0;
let scoreText;
let player;
// let stars;
let bubbles;
let bullets;
let bullet;
let cursors;
let bubbleCount;

function preload() {
  this.load.image('sky', '../src/assets/sky.png');
  this.load.image('ground', '../src/assets/platform.png');
  // this.load.image('star', '../src/assets/star.png');
  this.load.image('bullets', '../src/assets/bullet.png');
  this.load.image('bubble', '../src/assets/bubble.png');
  this.load.spritesheet('dude', '../src/assets/dude.png', {
    frameWidth: 32,
    frameHeight: 48
  });
}

function create() {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms
    .create(400, 568, 'ground')
    .setScale(2)
    .refreshBody();

  // platforms.create(600, 400, 'ground');
  // platforms.create(50, 250, 'ground');
  // platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(300);
  bullet = this.physics.add.sprite(player.x, player.y, 'bullets');

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [
      {
        key: 'dude',
        frame: 4
      }
    ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  });

  bubbles = this.physics.add.group({
    key: 'bubble',
    repeat: bubbleCount
    // setXY: {
    //   x: 12,
    //   y: 0,
    //   stepX: 70
    // }
  });

  // bullet = this.physics.add.sprite({
  //     key: 'bullets',
  //     frames: [
  //         {
  //           key: 'bullets',
  //           frame: 0
  //         }
  //       ],
  //     frameRate: 10,
  //     repeat: 20
  //   });

  bubbles.children.iterate(function(child) {
    child.setBounce(1);
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);
  });

  this.physics.add.collider(player, platforms);
  // this.physics.add.collider(bubbles, platforms);

  // this.physics.add.overlap(player, bubbles, collectStar, null, this);

  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000'
  });

  this.physics.add.collider(bubbles, platforms);

  this.physics.add.collider(player, bubbles, hitBomb, null, this);
  this.physics.add.collider(bullet, platforms);
}

function update() {
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-530);
  }

  if (cursors.space.isDown) {
    fireBullet();
  }
}

function fireBullet() {
  bullet.setVelocityY(-500);
  bullet.setCollideWorldBounds(true);
  bullet.body.setGravityY(-500);
}

function hitBomb(player, bubble) {
  bubble.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);

  if (bubbles.countActive(true) === 0) {
    bubbleCount += 1;
    setTimeout(() => {
      bubbles.children.iterate(function(child) {
        child.enableBody(true, Phaser.Math.Between(0, 800), 0, true, true);
        child.setVelocity(Phaser.Math.Between(-200, 200), 20);
      });

      let x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);
      let bubble = bubbles.create(x, 16, 'bubble');
      bubble.setBounce(1);
      bubble.setCollideWorldBounds(true);
      bubble.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }, 1000);
  }

  // if (bubbles.countActive(true) === 0) {
  //   bubbles.children.iterate(function(child) {
  //     // bubbles.addMultiple(bubble, true);
  //     child.enableBody(true, child.x, 0, true, true);
  //     return bubbleCount++;
  //   });
  // }

  // if (bubbles.countActive(true) === 0) {
  //   bubbles.children.iterate(function(child) {
  //     child.enableBody(true, child.x, 0, true, true);
  //   });
  // }
}

// function hitBomb(player, bomb) {
//   this.physics.pause();

//   player.setTint(0xff0000);

//   player.anims.play('turn');

//   gameOver = true;
// }
