import Phaser from 'phaser';
// import config from './config';
let platforms;
let score = 0;
let level = 1;
let scoreText;
let levelText;
let gameOverText;
let player;
let player2;
let largebubbles;
let mediumbubbles;
let smallbubbles;
let bambu;
let bambu2;
let cursors;
let bubbleCount;
let keys;
let gameOver;
let hitByBubble;
let shootBubble;
let shootMediumBubble;
let shootSmallestBubble;
let fireBambu;
let fireBambu2;

class MultiPlayer extends Phaser.Scene {
  constructor() {
    super({
      key: 'MultiPlayer'
    });
  }

  preload() {
    this.load.image('bricks', require('./assets/bricks.png'));
    this.load.image('ground', require('./assets/ground.png'));
    this.load.image('bambu', require('./assets/bambu.png'));
    this.load.image('largebubble', require('./assets/largebubble.png'));
    this.load.image('mediumbubble', require('./assets/mediumbubble.png'));
    this.load.image('smallbubble', require('./assets/smallbubble.png'));
    this.load.audio('music', require('./assets/retro.mp3'));
    this.load.spritesheet('panda', require('./assets/panda.png'), {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet('panda2', require('./assets/panda2.png'), {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    this.add.image(400, 300, 'bricks');
    this.sound.play('music');

    platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, 'ground')
      .setScale(2)
      .refreshBody();

    // Player one
    player = this.physics.add.sprite(600, 450, 'panda');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);

    // Player two
    player2 = this.physics.add.sprite(100, 450, 'panda2');
    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);
    player2.body.setGravityY(300);

    bambu = this.physics.add.sprite(player.x, player.y, 'bambu');
    bambu2 = this.physics.add.sprite(player2.x, player2.y, 'bambu');

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('panda', {
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
          key: 'panda',
          frame: 4
        }
      ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('panda', {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left2',
      frames: this.anims.generateFrameNumbers('panda2', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn2',
      frames: [
        {
          key: 'panda2',
          frame: 4
        }
      ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right2',
      frames: this.anims.generateFrameNumbers('panda2', {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    largebubbles = this.physics.add.group({
      key: 'largebubble',
      repeat: bubbleCount
    });

    mediumbubbles = this.physics.add.group({});

    smallbubbles = this.physics.add.group({});

    largebubbles.children.iterate(function(child) {
      child.setBounce(1);
      child.setVelocity(Phaser.Math.Between(-200, 200), 20);
      child.setCollideWorldBounds(true);
    });
    mediumbubbles.children.iterate(function(child) {
      child.setBounce(1);
      child.setVelocity(Phaser.Math.Between(-200, 200), 20);
      child.setCollideWorldBounds(true);
    });
    smallbubbles.children.iterate(function(child) {
      child.setBounce(1);
      child.setVelocity(Phaser.Math.Between(-200, 200), 20);
      child.setCollideWorldBounds(true);
    });

    scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#000'
    });

    levelText = this.add.text(16, 40, 'Level: 0', {
      fontSize: '32px',
      fill: '#000'
    });

    this.gameOverText = this.add.text(250, 250, 'Game Over', {
      fontSize: '64px',
      fill: '#000'

    });
    this.gameOverText.visible = false;

    //player one
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bambu, platforms);

    //player two
    this.physics.add.collider(player2, platforms);
    this.physics.add.overlap(bambu2, largebubbles, shootBubble, null, this);
    this.physics.add.overlap(
      bambu2,
      mediumbubbles,
      shootMediumBubble,
      null,
      this
    );
    this.physics.add.overlap(
      bambu2,
      smallbubbles,
      shootSmallestBubble,
      null,
      this
    );
    this.physics.add.collider(bambu2, platforms);

    this.physics.add.collider(largebubbles, platforms);
    this.physics.add.collider(mediumbubbles, platforms);
    this.physics.add.collider(smallbubbles, platforms);

    this.physics.add.collider(player, largebubbles, hitByBubble, null, this);
    this.physics.add.collider(player2, largebubbles, hitByBubble, null, this);
    this.physics.add.collider(player, mediumbubbles, hitByBubble, null, this);
    this.physics.add.collider(player2, mediumbubbles, hitByBubble, null, this);
    this.physics.add.collider(player, smallbubbles, hitByBubble, null, this);
    this.physics.add.collider(player2, smallbubbles, hitByBubble, null, this);
    this.physics.add.overlap(bambu, largebubbles, shootBubble, null, this);

    this.physics.add.overlap(
      bambu,
      mediumbubbles,
      shootMediumBubble,
      null,
      this
    );
    this.physics.add.overlap(
      bambu,
      smallbubbles,
      shootSmallestBubble,
      null,
      this
    );
  }

  update() {
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys('A,D,TAB');

    //player one keyboard
    if (cursors.left.isDown) {
      player.setVelocityX(-200);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(200);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.space.isDown) {
      fireBambu();
    }

    //player two keyboard
    if (keys.A.isDown) {
      player2.setVelocityX(-200);

      player2.anims.play('left2', true);
    } else if (keys.D.isDown) {
      player2.setVelocityX(200);

      player2.anims.play('right2', true);
    } else {
      player2.setVelocityX(0);

      player2.anims.play('turn2');
    }

    if (keys.TAB.isDown) {
      fireBambu2();
    }
  }
}

function fireBambu() {
  bambu.enableBody(true, player.x, player.y, true, true);
  bambu.setVelocityY(-500);
  bambu.body.setGravityY(-500);
}

function fireBambu2() {
  bambu2.enableBody(true, player2.x, player2.y, true, true);
  bambu2.setVelocityY(-500);
  bambu2.body.setGravityY(-500);
}

function shootSmallestBubble(bambu, smallbubble) {
  smallbubble.disableBody(true, true);
  bambu.disableBody(true, true);

  score += 50;
  scoreText.setText('Score: ' + score);
  if (
    largebubbles.countActive(true) === 0 &&
    mediumbubbles.countActive(true) === 0 &&
    smallbubbles.countActive(true) === 0
  ) {
    bubbleCount += 1;
    level += 1;
    levelText.setText('Level: ' + level);
    setTimeout(() => {
      largebubbles.children.iterate(function(child) {
        child.enableBody(true, Phaser.Math.Between(0, 800), 0, true, true);
        child.setVelocity(Phaser.Math.Between(-200, 200), 20);
      });

      let x = player.x < 400;
      player2.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
      let largebubble = largebubbles.create(x, 16, 'largebubble');
      largebubble.setBounce(1);
      largebubble.setCollideWorldBounds(true);
      largebubble.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }, 1000);
  }
}

// Player one
function shootMediumBubble(bambu, mediumbubble) {
  mediumbubble.disableBody(true, true);
  bambu.disableBody(true, true);

  score += 30;
  scoreText.setText('Score: ' + score);

  if (this.physics.add.overlap(bambu, mediumbubbles)) {
    let x = mediumbubble.x;
    let y = mediumbubble.y;
    for (let i = 0; i <= 1; i++) {
      let smallbubble = smallbubbles.create(x, y, 'smallbubble');
      smallbubble.enableBody(true, x, y, true, true);
      smallbubble.setBounce(1);
      smallbubble.setCollideWorldBounds(true);
      smallbubble.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }
}

function shootBubble(bambu, largebubble) {
  largebubble.disableBody(true, true);
  bambu.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);

  if (this.physics.add.overlap(bambu, largebubbles)) {
    console.log(largebubbles);
    let x = largebubble.x;
    let y = largebubble.y;
    for (let i = 0; i <= 1; i++) {
      let mediumbubble = mediumbubbles.create(x, y, 'mediumbubble');
      mediumbubble.enableBody(true, x, y, true, true);
      mediumbubble.setBounce(1);
      mediumbubble.setCollideWorldBounds(true);
      mediumbubble.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }
}

function hitByBubble(player, player2, bubble) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
  this.sound.destroy('music');
  this.gameOverText.visible = true;
}

export default MultiPlayer;
