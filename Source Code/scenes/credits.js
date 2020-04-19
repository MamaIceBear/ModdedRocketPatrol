class Credits extends Phaser.Scene
{
    constructor()
    {
        super("creditsScene");
    }
    preload()
    {
        this.load.image("back_button_unselected", "./Assets/Sprites/BackButtonPlain.png");
        this.load.image("back_button_selected", "./Assets/Sprites/BackButtonHighlight.png");
        this.load.audio("klink", "./Assets/Music/Klink.mp3");
    }
    create()
    {
        menuConfig.color = "#00FF00";
        this.add.text(gameConfig.width/2, 50, "Sprites and Programming by", menuConfig).setOrigin(0.5);
        menuConfig.color = "#0000FF";
        this.add.text(gameConfig.width/2, 100, "Sam Nguyen", menuConfig).setOrigin(0.5);
        menuConfig.color = "#00FF00";
        this.add.text(gameConfig.width/2, 200, "Sound effects obtained from", menuConfig).setOrigin(0.5);
        menuConfig.color = "#0000FF";
        this.add.text(gameConfig.width/2, 250, "https://www.zapsplat.com", menuConfig).setOrigin(0.5);
        menuConfig.color = "#00FF00";
        this.add.text(gameConfig.width/2, 350, "Music from", menuConfig).setOrigin(0.5);
        menuConfig.color = "#0000FF";
        this.add.text(gameConfig.width/2, 400, "https//www.serpentsoundstudios.com", menuConfig).setOrigin(0.5);
        this.add.text(gameConfig.width/2, 450, "Made By Alexander Nakarada", menuConfig).setOrigin(0.5);
        menuConfig.color = "#00FF00";
        this.add.text(gameConfig.width/2, 550, "Advanced Coding Techniques", menuConfig).setOrigin(0.5);
        menuConfig.color = "#0000FF";
        this.add.text(gameConfig.width/2, 600, "Phaser 3 Documentation", menuConfig).setOrigin(0.5);

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