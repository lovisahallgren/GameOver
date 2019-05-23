import Phaser from 'phaser';
// import config from './config';
let platforms;
let score = 0;
let scoreText;
let player;
let player2;
let largebubbles;
let mediumbubbles;
let smallbubbles;
let bullets;
let bullet;
let bullet2;
let cursors;
let bubbleCount;
let bubbleSplit;
let keys;
let gameOver;

let shootBubble2;
let shootMediumBubble2;
let shootSmallestBubble2;
let hitByBubble;
let shootBubble;
let shootMediumBubble;
let shootSmallestBubble;
let fireBullet;
let fireBullet2;


class MultiPlayer extends Phaser.Scene {
    constructor(){
        super({
            key: 'MultiPlayer'

      });
    }

  preload() {
  this.load.image('field', require('./assets/field.jpg'));
  this.load.image('ground', require('./assets/ground.png'));
  this.load.image('bullets', require('./assets/bullet.png'));
  this.load.image('largebubble', require('./assets/largebubble.png'));
  this.load.image('mediumbubble', require('./assets/mediumbubble.png'));
  this.load.image('smallbubble', require('./assets/smallbubble.png'));
  this.load.spritesheet('dude', require('./assets/dude.png'), {
    frameWidth: 32,
    frameHeight: 48
  });

}

  create() {
  this.add.image(400, 300, 'field');

  platforms = this.physics.add.staticGroup();

  platforms
    .create(400, 568, 'ground')
    .setScale(2)
    .refreshBody();

  // Player one
  player = this.physics.add.sprite(600, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(300);

  // Player two
  player2 = this.physics.add.sprite(100, 450, 'dude');
  player2.setBounce(0.2);
  player2.setCollideWorldBounds(true);
  player2.body.setGravityY(300);

  bullet = this.physics.add.sprite(player.x, player.y, 'bullets');
  bullet2 = this.physics.add.sprite(player2.x, player2.y, 'bullets');

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

  this.anims.create({
    key: 'left2',
    frames: this.anims.generateFrameNumbers('dude', {
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
        key: 'dude',
        frame: 4
      }
    ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right2',
    frames: this.anims.generateFrameNumbers('dude', {
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

  mediumbubbles = this.physics.add.group({
    // key: 'mediumbubble'
    // repeat: bubbleCount
    // setXY: {
    //   x: 12,
    //   y: 0,
    //   stepX: 70
    // }
  });

  smallbubbles = this.physics.add.group({
    // key: 'smallbubble'
    // repeat: bubbleSplit
    // setXY: {
    //   x: bullet.x,
    //   y: bullet.y,
    //   stepX: 20
    // }
  });

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

  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000'
  });

  //player one
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(bullet, platforms);

  //player two
  this.physics.add.collider(player2, platforms);
  this.physics.add.overlap(bullet2, largebubbles, shootBubble2, null, this);

  this.physics.add.overlap(
    bullet2,
    mediumbubbles,
    shootMediumBubble2,
    null,
    this
  );
  this.physics.add.overlap(
    bullet2,
    smallbubbles,
    shootSmallestBubble2,
    null,
    this
  );
  this.physics.add.collider(bullet2, platforms);

  this.physics.add.collider(largebubbles, platforms);
  this.physics.add.collider(mediumbubbles, platforms);
  this.physics.add.collider(smallbubbles, platforms);

  this.physics.add.collider(player, largebubbles, hitByBubble, null, this);
  this.physics.add.collider(player2, largebubbles, hitByBubble, null, this);
  this.physics.add.collider(player, mediumbubbles, hitByBubble, null, this);
  this.physics.add.collider(player2, mediumbubbles, hitByBubble, null, this);
  this.physics.add.collider(player, smallbubbles, hitByBubble, null, this);
  this.physics.add.collider(player2, smallbubbles, hitByBubble, null, this);
  this.physics.add.overlap(bullet, largebubbles, shootBubble, null, this);

  this.physics.add.overlap(
    bullet,
    mediumbubbles,
    shootMediumBubble,
    null,
    this
  );
  this.physics.add.overlap(
    bullet,
    smallbubbles,
    shootSmallestBubble,
    null,
    this
  );
}

  update() {
  cursors = this.input.keyboard.createCursorKeys();
  keys = this.input.keyboard.addKeys('W,S,A,D');

  //player one keyboard
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

  //player two keyboard
  if (keys.A.isDown) {
    player2.setVelocityX(-160);

    player2.anims.play('left2', true);
  } else if (keys.D.isDown) {
    player2.setVelocityX(160);

    player2.anims.play('right2', true);
  } else {
    player2.setVelocityX(0);

    player2.anims.play('turn2');
  }

  if (keys.W.isDown) {
    fireBullet2();
    }
  }
}

  function fireBullet() {
   bullet.enableBody(true, player.x, player.y, true, true);
   bullet.setVelocityY(-500);
   bullet.body.setGravityY(-500);
 }

  function fireBullet2() {
   bullet2.enableBody(true, player2.x, player2.y, true, true);
   bullet2.setVelocityY(-500);
   bullet2.body.setGravityY(-500);
 }

  function shootSmallestBubble(bullet, smallbubble) {
   smallbubble.disableBody(true, true);
   // smallbubble.disableBody(true, true);
   bullet.disableBody(true, true);

   score += 10;
   scoreText.setText('Score: ' + score);
   if (
     largebubbles.countActive(true) === 0 &&
     mediumbubbles.countActive(true) === 0 &&
     smallbubbles.countActive(true) === 0
   ) {
     bubbleCount += 1;
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
   // redbubble.enableBody(true, 0, 0, false, false);
 }

 // Player two
 function shootSmallestBubble2(bullet2, smallbubble) {
   smallbubble.disableBody(true, true);
   console.log(redbubbles.countActive(true));
   if (
     largebubbles.countActive(true) === 0 &&
     mediumbubbles.countActive(true) === 0 &&
     smallbubbles.countActive(true) === 0
   ) {
     bubbleCount += 1;
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
 function shootMediumBubble(bullet, mediumbubble) {
   mediumbubble.disableBody(true, true);
   // mediumbubble.disableBody(true, true);
   bullet.disableBody(true, true);

   score += 10;
   scoreText.setText('Score: ' + score);

   if (this.physics.add.overlap(bullet, mediumbubbles)) {
     // mediumbubble.disableBody(true, true);
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
   // if (this.physics.add.overlap(bullet, mediumbubbles)) {
   //   // mediumbubble.disableBody(true, true);
   //   let x = mediumbubble.x;
   //   let y = mediumbubble.y;
   //   for (let i = 0; i <= 1; i++) {
   //     let smallbubble = smallbubbles.create(x, y, 'smallbubble');
   //     smallbubble.enableBody(true, x, y, true, true);
   //     smallbubble.setBounce(1);
   //     smallbubble.setCollideWorldBounds(true);
   //     smallbubble.setVelocity(Phaser.Math.Between(-200, 200), 20);
   //   }
   // }
 }
 function shootMediumBubble2(bullet2, mediumbubble) {
   mediumbubble.disableBody(true, true);
   // mediumbubble.disableBody(true, true);
   bullet2.disableBody(true, true);

   score += 10;
   scoreText.setText('Score: ' + score);

   if (this.physics.add.overlap(bullet2, mediumbubbles)) {
     // mediumbubble.disableBody(true, true);
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

 function shootBubble(bullet, largebubble) {
   largebubble.disableBody(true, true);
   bullet.disableBody(true, true);

   score += 10;
   scoreText.setText('Score: ' + score);

   if (this.physics.add.overlap(bullet, largebubbles)) {
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

 // Player two

 function shootBubble2(bullet2, largebubble) {
   largebubble.disableBody(true, true);
   bullet2.disableBody(true, true);

   score += 10;
   scoreText.setText('Score: ' + score);

   if (this.physics.add.overlap(bullet2, largebubbles)) {
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
}

export default MultiPlayer;
