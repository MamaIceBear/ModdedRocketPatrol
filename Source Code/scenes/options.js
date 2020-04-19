class Options extends Phaser.Scene
{
    constructor()
    {
        super("optionsScene");
    }
    preload()
    {
        this.load.image("back_button_unselected", "./Assets/Sprites/BackButtonPlain.png");
        this.load.image("back_button_selected", "./Assets/Sprites/BackButtonHighlight.png");
        this.load.image("easy_unselected", "./Assets/Sprites/EasyPlain.png");
        this.load.image("easy_selected", "./Assets/Sprites/EasyHighlight.png");
        this.load.image("hard_unselected", "./Assets/Sprites/HardPlain.png");
        this.load.image("hard_selected", "./Assets/Sprites/HardHighlight.png");
        this.load.audio("klink", "./Assets/Music/Klink.mp3");
    }
    create()
    {
        menuConfig.color = "#21A9D5";
        menuConfig.fontSize = "72px";
        this.add.text(gameConfig.width/2, 250, "Choose your difficulty", menuConfig).setOrigin(0.5);

        //Sound Effects
        let klink = this.sound.add("klink");
        
        //Easy Button
        let easyButton = this.add.image(gameConfig.width/2, gameConfig.height * 0.35, "easy_selected").setScale(1).setDepth(0);
        let hardButton = this.add.image(gameConfig.width/2, gameConfig.height * 0.45, "hard_unselected").setScale(1).setDepth(0);

        easyButton.setInteractive();
        easyButton.on("pointerup", ()=>
        {
            klink.play();
            easyButton.setTexture("easy_selected");
            hardButton.setTexture("hard_unselected");
            game.settings.spaceshipSpeed = 0;
            game.settings.gameTimer = 60000;
        })

        hardButton.setInteractive();
        hardButton.on("pointerup", ()=>
        {
            klink.play();
            easyButton.setTexture("easy_unselected");
            hardButton.setTexture("hard_selected");
            game.settings.spaceshipSpeed = 3;
            game.settings.gameTimer = 75000;
        })

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