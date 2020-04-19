/*
Rocket Patrol Modified by Sam Nguyen

List of Modifications Added

Implement sound when menu button is pressed: 5
Added copyright-free music: 10
Randomize ship movements on each play: 10
Create a new scrolling tile sprite for the background: 10
Make menu buttons highlight when hovered over: 10
Parallax scrolling: 15
4 new explosion fx and are randomized: 15
Display time remaining in seconds on screen: 15
Create new title screen: 15
Created new animated sprite for Spaceship enemies: 15
Create new artwork for all of the in-game assets (rocket, spaceships, explosion): 25
Create and implement a new weapon: 25

Total Points: 170
*/

//Game Window Config Settings
let gameConfig = 
{
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: //Centers the game in the middle
    {
        mode: Phaser.Scale.EXACT_FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Menu, Play, Controls, Options, Credits, GameOver],
    pixelArt: true,
    physics: 
    {
        default: "arcade",
        arcade:
        {
            debug: false,
            debugShowVelocity: false
        }
    }
};

//Menu Config Settings
let menuConfig = 
{
    fontFamily: "Brushstroke, fantasy",
    fontSize: "100px",
    backgroundColor: null,
    color: "#EEB80F",
    align: "right",
    padding: 
    {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}

//Sound Config Settings
let soundConfig =
{
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
};

let cursors, text, keyF, keyLEFT, keyRIGHT, keyENTER, keyR, p1Score = 0;
let game = new Phaser.Game(gameConfig);

game.settings = 
{
    spaceshipSpeed: 0,
    gameTimer: 60000
}
