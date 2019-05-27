# GameOver

Game built in [Phaser3](https://phaser.io/)
Made by [Lovisa Hallgren](https://github.com/lovisahallgren) & [Rebecca Klaening](https://github.com/RebeccaKlaening)

Live here: [bubbletrouble.netlify.com/](https://bubbletrouble.netlify.com/)

## Installation

Clone the repo

- `$ git clone https://github.com/lovisahallgren/GameOver.git`

Install packages

- `$ npm install`

Start the game

- `$ npm run start`

## Testers

- [Charmaine Wang](https://github.com/charmaine-wang)
- [Erik Arvidsson](https://github.com/erikarvidsson)
- [Izabella Larsson](https://github.com/izabellalarsson)
- [Nils Nathorst-Windahl](https://github.com/nilsnathorst)
- Robin Hallgren
- Isabella Bengtson
- David Klaening
- Mikael Klaening

## Pull requests

- [#1 Game structure](https://github.com/lovisahallgren/GameOver/pull/1)
- [#2 Added bubbles to game](https://github.com/lovisahallgren/GameOver/pull/2)
- [#3 Added bullet to game](https://github.com/lovisahallgren/GameOver/pull/3)
- [#4 Shooting bullet from player](https://github.com/lovisahallgren/GameOver/pull/4)
- [#5 Random velocity and position of bubbles](https://github.com/lovisahallgren/GameOver/pull/5)
- [#6 Reset bullet from player](https://github.com/lovisahallgren/GameOver/pull/6)
- [#7 Game over on bubble hit](https://github.com/lovisahallgren/GameOver/pull/7)
- [#8 Bubble split on bullet hit](https://github.com/lovisahallgren/GameOver/pull/8)
- [#9 Added bigger bubbles](https://github.com/lovisahallgren/GameOver/pull/9)
- [#10 Added multiplayer](https://github.com/lovisahallgren/GameOver/pull/10)
- [#11 Shooting function for player two](https://github.com/lovisahallgren/GameOver/pull/11)
- [#12 Merge conflict](https://github.com/lovisahallgren/GameOver/pull/12)
- [#13 Added new sprites for players and bullets](https://github.com/lovisahallgren/GameOver/pull/13)
- [#14 Added start scene](https://github.com/lovisahallgren/GameOver/pull/14)
- [#15 Merge conflict](https://github.com/lovisahallgren/GameOver/pull/15)
- [#16 Removed duplicated code](https://github.com/lovisahallgren/GameOver/pull/16)
- [#17 Added parcel instead of webpack](https://github.com/lovisahallgren/GameOver/pull/17)
- [#18 Added music to game](https://github.com/lovisahallgren/GameOver/pull/18)
- [#19 Added description scene](https://github.com/lovisahallgren/GameOver/pull/19)
- [#20 Added game over scene](https://github.com/lovisahallgren/GameOver/pull/20)

## Feedback
[Pull request]() with feedback to [Sofia Garcia Rashid](https://github.com/sof1agarc1a) and [Vincent Lidebo Kjellman](https://github.com/VincentLideboKjellman)
 
<hr />
By [Elias Johansson](https://github.com/eliasjohansson) & [Per Baltzar](https://github.com/perbaltzar)

Unused variables, variables gets defined once more inside the class. Game works without these variables.
- StartGame.js - [L3](https://github.com/lovisahallgren/GameOver/blob/c2d90bec5c841e61adc6759a2cc8f91233b79af2/src/StartGame.js#L3) 
- Desc.js - [L3](https://github.com/lovisahallgren/GameOver/blob/c2d90bec5c841e61adc6759a2cc8f91233b79af2/src/Desc.js#L3)
<hr />

Preferably use let or const.
-  StartGame.js - [L47](https://github.com/lovisahallgren/GameOver/blob/c2d90bec5c841e61adc6759a2cc8f91233b79af2/src/StartGame.js#L47)
- Desc.js - [L47](https://github.com/lovisahallgren/GameOver/blob/c2d90bec5c841e61adc6759a2cc8f91233b79af2/src/Desc.js#L46)
<hr />

Use class constructor to define properties instead of defining them outside the class as variables.
- OnePlayer.js - [L3](https://github.com/lovisahallgren/GameOver/blob/c2d90bec5c841e61adc6759a2cc8f91233b79af2/src/OnePlayer.js#L3)
- Multiplayer - [L3](https://github.com/lovisahallgren/GameOver/blob/c2d90bec5c841e61adc6759a2cc8f91233b79af2/src/MultiPlayer.js#L3)
> This is probably why you had problems seperating code and using classes.
<hr />

Put bubbles, players and bamboos in groups so you can add colliders more easily. Currently there is alot of repetition.
- Multiplayer.js - [L182](https://github.com/lovisahallgren/GameOver/blob/c2d90bec5c841e61adc6759a2cc8f91233b79af2/src/MultiPlayer.js#L182)
-OnePlayer.js - [L140](https://github.com/lovisahallgren/GameOver/blob/c2d90bec5c841e61adc6759a2cc8f91233b79af2/src/OnePlayer.js#L140)
<hr />

Assets already loaded in 'StartGame.js'.
- OnePlayer.js - [L35](https://github.com/lovisahallgren/GameOver/blob/79dd3ee9db55161db4f1a689ff10edf53bec2926/src/OnePlayer.js#L35)
- Multiplayer.js - [L35](https://github.com/lovisahallgren/GameOver/blob/79dd3ee9db55161db4f1a689ff10edf53bec2926/src/MultiPlayer.js#L35)

These are not necessary for the game and can be erased
- Desc.js - [L22](https://github.com/lovisahallgren/GameOver/blob/067ec4595701d9b93994b80392808cfadb2098b8/src/Desc.js#L22)
- Desc2.js - [L21](https://github.com/lovisahallgren/GameOver/blob/067ec4595701d9b93994b80392808cfadb2098b8/src/Desc.js#L21)

Overall
This is a great and very fun game to play. The code is well structed through out the whole project. Variable and function names are consistent, and easily understood. 

You've put good use of seperating into functions, therefore the main game loop is clean.

For an even better structure, you should seperate gameobjects into their own class. Then you wont have to repeat yourselves as much in the 2 different scenes, single-player & multiplayer.
