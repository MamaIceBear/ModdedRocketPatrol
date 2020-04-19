class GameOver extends Phaser.Scene
{
    constructor()
    {
        super("gameOverScene");
    }
    preload()
    {
        this.load.audio("klink", "./Assets/Music/Klink.mp3");
    }
    create()
    {
        //Sound Effects
        this.klink = this.sound.add("klink");

        menuConfig.color = "#EE2400";
        menuConfig.fontSize = "50px";
        this.add.text(gameConfig.width/2, 300, "Game Over?", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "36px";
        this.add.text(gameConfig.width/2, 400, "Final Score:" + p1Score, menuConfig).setOrigin(0.5);
        this.add.text(gameConfig.width/2, 500, "Press R to restart or ENTER to go to main menu", menuConfig).setOrigin(0.5);

        //Create Keyboard Keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) 
        {
            this.klink.play();
            this.scene.start("menuScene");  
        }
        if(Phaser.Input.Keyboard.JustDown(keyR)) 
        {
            p1Score = 0;
            this.klink.play();
            this.scene.start("playScene");  
        }
    }
}