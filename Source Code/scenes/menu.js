class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }
    preload()
    {
        this.load.image("play_button_unselected", "./Assets/Sprites/PlayButtonPlain.png");
        this.load.image("play_button_selected", "./Assets/Sprites/PlayButtonHighlight.png");
        this.load.image("controls_button_unselected", "./Assets/Sprites/ControlsButtonPlain.png");
        this.load.image("controls_button_selected", "./Assets/Sprites/ControlsButtonHighlight.png");
        this.load.image("options_button_unselected", "./Assets/Sprites/OptionsButtonPlain.png");
        this.load.image("options_button_selected", "./Assets/Sprites/OptionsButtonHighlight.png");
        this.load.image("credits_button_unselected", "./Assets/Sprites/CreditsButtonPlain.png");
        this.load.image("credits_button_selected", "./Assets/Sprites/CreditsButtonHighlight.png");
        this.load.audio("klink", "./Assets/Music/Klink.mp3");
        this.load.spritesheet("rocket", "./Assets/Sprites/Rocketship.png", {frameWidth: 50, frameHeight: 76});
    }

    create()
    {

        //Sprite Animations
        let rocket = this.add.sprite(gameConfig.width/2 + 16, gameConfig.height/2 - 46, "rocket", 0).setDepth(1);
        rocket.alpha = 0;

        this.anims.create(
        {
            key: "startup",
            frameRate: 5,
            frames: this.anims.generateFrameNames("rocket", {start: 0, end: 4})
        });

        this.anims.create(
        {
            key: "flying",
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames("rocket", {start: 3, end: 4})
        });
        menuConfig.color = "#EEB80F";
        menuConfig.fontSize = "100px";
        //Show the text menu
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;

        this.add.text(centerX, centerY - 288, "Rocket Patrol", menuConfig).setOrigin(0.5);
        
        //Sound Effects
        let klink = this.sound.add("klink");

        //Play Button
        let playButton = this.add.image(gameConfig.width/2, gameConfig.height * 0.45, "play_button_unselected").setScale(1).setDepth(0);
        playButton.setInteractive();
        playButton.on("pointerover", ()=>
        {
            playButton.setTexture("play_button_selected");
        })
        playButton.on("pointerout", ()=>
        {
            playButton.setTexture("play_button_unselected");
        })
        playButton.on("pointerup", ()=>
        {
            klink.play();
            this.time.addEvent(
            {
                delay: 100,
                callback: ()=>
                {
                    rocket.alpha += 0.1;
                },
                repeat: 10,
            });
            this.time.addEvent(
            {
                delay: 1000,
                callback: ()=>
                {
                    rocket.play("startup");
                    rocket.play("flying");
                },
            });
            this.time.addEvent(
            {
                delay: 3000,
                callback: ()=>
                {
                    this.scene.start("playScene");
                },
            });
        })

        //Controls Button
        let controlsButton = this.add.image(gameConfig.width/2, gameConfig.height * 0.55, "controls_button_unselected").setScale(1).setDepth(0);
        controlsButton.setInteractive();
        controlsButton.on("pointerover", ()=>
        {
            controlsButton.setTexture("controls_button_selected");
        })
        controlsButton.on("pointerout", ()=>
        {
            controlsButton.setTexture("controls_button_unselected");
        })
        controlsButton.on("pointerup", ()=>
        {
            klink.play();
            this.scene.start("controlsScene");
        })
        
        //Options Button
        let optionsButton = this.add.image(gameConfig.width/2, gameConfig.height * 0.65, "options_button_unselected").setScale(1).setDepth(0);
        optionsButton.setInteractive();
        optionsButton.on("pointerover", ()=>
        {
            optionsButton.setTexture("options_button_selected");
        })
        optionsButton.on("pointerout", ()=>
        {
            optionsButton.setTexture("options_button_unselected");
        })
        optionsButton.on("pointerup", ()=>
        {
            klink.play();
            this.scene.start("optionsScene");
        })
        
        //Credits Button
        let creditsButton = this.add.image(gameConfig.width/2, gameConfig.height * 0.75, "credits_button_unselected").setScale(1).setDepth(0);
        creditsButton.setInteractive();
        creditsButton.on("pointerover", ()=>
        {
            creditsButton.setTexture("credits_button_selected");
        })
        creditsButton.on("pointerout", ()=>
        {
            creditsButton.setTexture("credits_button_unselected");
        })
        creditsButton.on("pointerup", ()=>
        {
            klink.play();
            this.scene.start("creditsScene");
        })

        /*
        //Debug Info About Screen Resolution
        console.log(window.innerWidth);
        console.log(window.innerHeight);
        
        //Coordinates
        cursors = this.input.keyboard.createCursorKeys();
        text = this.add.text(10, gameConfig.height - 60, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);
        */
    }
    /*
    update()
    {
        text.setText(
        [
            'world x: ' + this.input.mousePointer.worldX,
            'world y: ' + this.input.mousePointer.worldY
        ]);
    }
    */
}