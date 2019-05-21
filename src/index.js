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
let yellowbubbles;
let redbubbles;
let bullets;
let bullet;
let cursors;
let bubbleCount;
let bubbleSplit;

function preload() {
  this.load.image('sky', '../src/assets/sky.png');
  this.load.image('ground', '../src/assets/ground.png');
  this.load.image('bullets', '../src/assets/bullet.png');
  this.load.image('yellowbubble', '../src/assets/bubble.png');
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

  yellowbubbles = this.physics.add.group({
    key: 'yellowbubble',
    repeat: bubbleCount
    // setXY: {
    //   x: 12,
    //   y: 0,
    //   stepX: 70
    // }
  });

  redbubbles = this.physics.add.group({
    // key: 'redbubble'
    // repeat: bubbleSplit
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

  yellowbubbles.children.iterate(function(child) {
    child.setBounce(1);
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);
  });
  redbubbles.children.iterate(function(child) {
    child.setBounce(1);
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);
  });

  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000'
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(bullet, platforms);
  this.physics.add.collider(yellowbubbles, platforms);
  this.physics.add.collider(redbubbles, platforms);

  this.physics.add.collider(player, yellowbubbles, hitByBubble, null, this);
  this.physics.add.collider(player, redbubbles, hitByBubble, null, this);
  this.physics.add.overlap(bullet, yellowbubbles, shootBubble, null, this);
  this.physics.add.overlap(bullet, redbubbles, shootSmallestBubble, null, this);
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

  if (cursors.space.isDown) {
    fireBullet();
  }
}

function fireBullet() {
  bullet.enableBody(true, player.x, player.y, true, true);
  bullet.setVelocityY(-500);
  bullet.body.setGravityY(-500);
}

function shootSmallestBubble(bullet, redbubble) {
  redbubble.disableBody(true, true);
  console.log(redbubbles.countActive(true));
  if (
    yellowbubbles.countActive(true) === 0 &&
    redbubbles.countActive(true) === 0
  ) {
    bubbleCount += 1;
    setTimeout(() => {
      yellowbubbles.children.iterate(function(child) {
        child.enableBody(true, Phaser.Math.Between(0, 800), 0, true, true);
        child.setVelocity(Phaser.Math.Between(-200, 200), 20);
      });

      let x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);
      let yellowbubble = yellowbubbles.create(x, 16, 'yellowbubble');
      yellowbubble.setBounce(1);
      yellowbubble.setCollideWorldBounds(true);
      yellowbubble.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }, 1000);
  }
  // redbubble.enableBody(true, 0, 0, false, false);
}

function shootBubble(bullet, yellowbubble) {
  yellowbubble.disableBody(true, true);
  bullet.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);

  if (this.physics.add.overlap(bullet, yellowbubbles)) {
    let x = yellowbubble.x;
    let y = yellowbubble.y;
    for (let i = 0; i <= 1; i++) {
      let redbubble = redbubbles.create(x, y, 'redbubble');
      redbubble.enableBody(true, x, y, true, true);
      redbubble.setBounce(1);
      redbubble.setCollideWorldBounds(true);
      redbubble.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }
}

function hitByBubble(player, bubble) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}
