class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        this.load.audio("space", "./Assets/Music/Space.mp3");
        this.load.spritesheet("rocket", "./Assets/Sprites/Rocketship.png", {frameWidth: 50, frameHeight: 76});
        this.load.spritesheet("alien", "./Assets/Sprites/Alien.png", {frameWidth: 50, frameHeight: 36});
        this.load.spritesheet("explosion", "./Assets/Sprites/Explosion.png", {frameWidth: 64, frameHeight: 64});
        this.load.image("midground", "./Assets/Sprites/Spacemidground.png");
        this.load.image("background", "./Assets/Sprites/Spacebackground.png");
        this.load.image("beam", "./Assets/Sprites/Beam.png");
        this.load.audio("laser", "./Assets/Sound/laser.mp3");
        this.load.audio("explosion1", "./Assets/Sound/explosion1.mp3");
        this.load.audio("explosion2", "./Assets/Sound/explosion2.mp3");
        this.load.audio("explosion3", "./Assets/Sound/explosion3.mp3");
        this.load.audio("explosion4", "./Assets/Sound/explosion3.mp3");
    }

    create()
    {
        this.gameOver = false;
        this.player = this.add.sprite(gameConfig.width/2, gameConfig.height - 50, "rocket", 0).setDepth(1);
        this.anims.create(
        {
            key: "flying",
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames("rocket", {start: 3, end: 4})
        });
        this.player.play("flying");

        this.anims.create(
        {
            key: "alienMoving",
            repeat: -1,
            frameRate: 4,
            frames: this.anims.generateFrameNumbers("alien", {start: 0, end: 1, first: 0})
        });

        this.anims.create(
        {
            key: "explode",
            frameRate: 60,
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
           
        });

        //Background
        this.background = this.add.tileSprite(0, 0, gameConfig.width, gameConfig.height, "background").setOrigin(0, 0);
        this.midground = this.add.tileSprite(0, 0, gameConfig.width, gameConfig.height, "midground").setOrigin(0, 0);

        //Main Menu Space Music
        let audioPlayer = this.sound.add("space", soundConfig);
        audioPlayer.play();

        //Added Ships
        this.ship01 = new Spaceship(this, game.config.width/2 + Phaser.Math.Between(0, 300), 100, "alien", 0, 30, 2 + game.settings.spaceshipSpeed, 
        "right").setOrigin(0, 0).setDepth(1);
        this.ship02 = new Spaceship(this, Phaser.Math.Between(0, 300), 200, "alien", 0, 20, 2 + game.settings.spaceshipSpeed, 
        "left").setOrigin(0, 0).setDepth(1);
        this.ship03 = new Spaceship(this, game.config.width/2 + Phaser.Math.Between(0, 300), 300, "alien", 0, 10, 2 + game.settings.spaceshipSpeed, 
        "right").setOrigin(0, 0).setDepth(1);
        this.ship04 = new Spaceship(this, Phaser.Math.Between(0, 300), 400, "alien", 0, 20, 2 + game.settings.spaceshipSpeed, 
        "left").setOrigin(0, 0).setDepth(1);
        this.ship05 = new Spaceship(this, game.config.width/2 + Phaser.Math.Between(0, 300), 500, "alien", 0, 10, 2 + game.settings.spaceshipSpeed, 
        "right").setOrigin(0, 0).setDepth(1);
        this.ship06 = new Spaceship(this, Phaser.Math.Between(0, 300), 600, "alien", 0, 20, 2 + game.settings.spaceshipSpeed, 
        "left").setOrigin(0, 0).setDepth(1);

        this.ship01.play("alienMoving");
        this.ship02.play("alienMoving");
        this.ship03.play("alienMoving");
        this.ship04.play("alienMoving");
        this.ship05.play("alienMoving");
        this.ship06.play("alienMoving");

        //Defining Keyboard Keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        menuConfig.color = "#FFFFFF";
        menuConfig.fontSize = "36px";
        
        //Player Score
        this.scoreLeft = this.add.text(32, 32, "Score:" + p1Score, menuConfig).setDepth(2);
        this.projectile;
        //Timer
        this.initTime = game.settings.gameTimer / 1000;
        this.timer = this.add.text(gameConfig.width - 350, 32, "Time: " + this.clock(this.initTime), menuConfig).setDepth(2);
        this.timedEvent = this.time.addEvent(
        {
            delay: 1000, 
            callback: this.tick, 
            callbackScope: this, 
            loop: true
        })

        //Game Over Flag
        this.time.delayedCall(game.settings.gameTimer, ()=> 
        {
            audioPlayer.stop();
            this.gameOver = true;
        });

        //Places ships in enemy group
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship01);
        this.enemies.add(this.ship02);
        this.enemies.add(this.ship03);
        this.enemies.add(this.ship04);
        this.enemies.add(this.ship05);
        this.enemies.add(this.ship06);

        this.physics.world.setBoundsCollision();

        this.projectiles = this.physics.add.group();

        //If projectiles hit ships
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
    }

    update()
    {
        this.background.tilePositionY -= 0.2;
        this.midground.tilePositionY -= 0.25;

        if(!this.gameOver)
        {
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.ship05.update();
            this.ship06.update();
        }

        if(this.gameOver)
        {
            this.scene.start("gameOverScene");
        }

        if(keyRIGHT.isDown && this.player.x < gameConfig.width - 50)
        {
            this.player.x += 5;
        }
        if(keyLEFT.isDown && this.player.x > 50)
        {
            this.player.x -= 5;
        }
        if(Phaser.Input.Keyboard.JustDown(keyF))
        {
            this.sound.play("laser");
            this.shootLaser();
        }

        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

    shootLaser() 
    {
        this.beam = new Beam(this, this.player.x, this.player.y - 32, "beam", 0);
    }

    hitEnemy(projectile, enemy) 
    {
        projectile.destroy();
        this.shipExplode(enemy);
    }

    shipExplode(ship)
    {
        ship.alpha = 0; //Sets ship to become transparent
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play("explode");
        boom.on("animationcomplete", ()=> 
        {
           ship.hit();
           ship.alpha = 1; //Ship returns
           boom.destroy(); 
        });
        p1Score += ship.points;
        this.scoreLeft.setText("Score:" + p1Score);
        let explosionType = Phaser.Math.Between(1, 4);
        if(explosionType == 1)
        {
            this.sound.play("explosion1");
        }
        if(explosionType == 2)
        {
            this.sound.play("explosion2");
        }
        if(explosionType == 3)
        {
            this.sound.play("explosion3");
        }
        if(explosionType == 4)
        {
            this.sound.play("explosion4");
        }
    }

    clock(time)
    {
        let partInSeconds = time.toString().padStart(2,"0");
        return partInSeconds;
    }

    tick()
    {
        this.initTime -= 1; //Every second
        this.timer.setText("Time: " + this.clock(this.initTime));
    }
}