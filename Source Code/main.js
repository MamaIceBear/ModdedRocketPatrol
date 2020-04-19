/*
Rocket Patrol Modified by Sam Nguyen

List of Modifications Added
Create new title screen: 15
Added copyright-free music: 10
Parallax scrolling: 15
Create a new scrolling tile sprite for the background: 10
Make menu buttons highlight when hovered over: 5
Implement sound when menu button is pressed: 5
Create new artwork for all of the in-game assets (rocket, spaceships, explosion): 25
Created new animated sprite for Spaceship enemies: 15
High score that persists across scenes: 10
Can fire multiple times while moving: 10

Total Points: 120
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
    render: //Removes sharpening 
    {
        pixelArt: true
    },
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
    fontFamily: "Arcade",
    fontSize: "50px",
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
