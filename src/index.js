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
let bubbles;
let redbubbles;
let bullets;
let bullet;
let cursors;
let bubbleCount;
let bubbleSplit = -1;

function preload() {
  this.load.image('sky', '../src/assets/sky.png');
  this.load.image('ground', '../src/assets/ground.png');
  this.load.image('bullets', '../src/assets/bullet.png');
  this.load.image('bubble', '../src/assets/bubble.png');
  this.load.image('redbubble', '../src/assets/redbubble.png');
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

  redbubbles = this.physics.add.group({
    key: 'redbubble',
    repeat: bubbleSplit
    // setXY: {
    //   x: bullet.x,
    //   y: bullet.y,
    //   stepX: 20
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

  // redbubbles.children.iterate(function(child) {
  //   child.setBounce(1);
  //   child.setVelocity(Phaser.Math.Between(-200, 200), 20);
  //   child.setCollideWorldBounds(true);
  // });

  bubbles.children.iterate(function(child) {
    child.setBounce(1);
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);
  });

  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000'
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(bubbles, platforms);
  this.physics.add.collider(redbubbles, platforms);

  this.physics.add.collider(player, bubbles, hitByBubble, null, this);
  this.physics.add.collider(player, redbubbles, hitByBubble, null, this);
  this.physics.add.collider(bullet, platforms);
  this.physics.add.overlap(bullet, bubbles, shootBubble, splitBubble, this);
  this.physics.add.overlap(bullet, redbubbles, shootBubble, null, this);
}

function update() {
  cursors = this.input.keyboard.createCursorKeys();
  console.log(bullet.x, bullet.y);

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

  // if (cursors.up.isDown && player.body.touching.down) {
  //   player.setVelocityY(-530);
  // }

  if (cursors.space.isDown) {
    fireBullet();
  }
}

function fireBullet() {
  bullet.enableBody(true, player.x, player.y);
  bullet.setVelocityY(-500);
  bullet.body.setGravityY(-500);
}

function splitBubble(bullet, bubble) {
  // if (this.physics.world.overlap(bullet, bubbles)) {
  // let x =
  //   player.x < 400
  //     ? Phaser.Math.Between(400, 800)
  //     : Phaser.Math.Between(0, 400);
  // redbubbles.children.iterate(function(child) {
  //   child.enableBody(true, Phaser.Math.Between(0, 800), 0, true, true);
  //   child.setVelocity(Phaser.Math.Between(-200, 200), 20);
  bubbleSplit = 2;
  // console.log(bubble);

  let x = player.x;
  let y = player.y - 200;
  let redbubble = redbubbles.create(x, y, 'redbubble');
  redbubble.setBounce(1);
  redbubble.setCollideWorldBounds(true);
  redbubble.setVelocity(Phaser.Math.Between(-200, 200), 20);
  // });
  // }
}

function shootBubble(bullet, bubble) {
  bubble.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);

  if (this.physics.add.overlap(bullet, bubbles)) {
    console.log(bubble.x, bubble.y);
    splitBubble();
  }

  if (bubbles.countActive(true) === 0 && redbubbles.countActive(true) === 0) {
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
}

function hitByBubble(player, bubble) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}
