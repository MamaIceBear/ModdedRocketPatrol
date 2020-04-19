class Controls extends Phaser.Scene
{
    constructor()
    {
        super("controlsScene");
    }
    preload()
    {
        this.load.image("back_button_unselected", "./Assets/Sprites/BackButtonPlain.png");
        this.load.image("back_button_selected", "./Assets/Sprites/BackButtonHighlight.png");
        this.load.audio("klink", "./Assets/Music/Klink.mp3");
    }
    create()
    {
        menuConfig.color = "#FF00FF";
        menuConfig.fontSize = "72px";
        this.add.text(gameConfig.width/2, 200, "Arrows keys <- and -> for movement", menuConfig).setOrigin(0.5);
        this.add.text(gameConfig.width/2, 300, "F to use blaster", menuConfig).setOrigin(0.5);
        this.add.text(gameConfig.width/2, 400, "Be sure to position yourself to hit your targets", menuConfig).setOrigin(0.5);

        //Sound Effects
        let klink = this.sound.add("klink");
        
        //Back Button
        let backButton = this.add.image(gameConfig.width/2, gameConfig.height * 0.85, "back_button_unselected").setScale(1).setDepth(0);
        backButton.setInteractive();
        backButton.on("pointerover", ()=>
        {
            backButton.setTexture("back_button_selected");
        })
        backButton.on("pointerout", ()=>
        {
            backButton.setTexture("back_button_unselected");
        })
        backButton.on("pointerup", ()=>
        {
            klink.play();
            this.scene.start("menuScene");
        })
    }
}