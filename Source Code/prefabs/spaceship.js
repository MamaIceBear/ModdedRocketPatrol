//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue, speed, direction)
    {
        super(scene, x, y, texture, frame, direction);
        scene.add.existing(this); //Adds spaceship to scene
        this.points = pointValue;
        this.speed = speed;
        this.initHeight = y;
        this.initSpeed = speed;
        this.movement = direction;
    }

    update()
    {
        //Move spaceship left
        if(this.movement == "right")
        {
            this.x -= this.speed;
            if(this.x <= 0)
            {
                this.rightReset();
            }
        }
        if(this.movement == "left")
        {
            this.x += this.speed;
            if(this.x >= gameConfig.width)
            {
                this.leftReset();
            }
        }
    }
    hit()
    {
        if(this.movement == "right")
        {
            this.rightReset();
        }
        if(this.movement == "left")
        {
            this.leftReset();
        }
    }
    rightReset()
    {
        this.x = game.config.width;
        this.y = this.initHeight - Phaser.Math.Between(0, 150);
        this.speed = this.initSpeed + Phaser.Math.Between(0, 3);
    }
    leftReset()
    {
        this.x = 0;
        this.y = this.initHeight - Phaser.Math.Between(0, 150);
        this.speed = this.initSpeed + Phaser.Math.Between(0, 3);
    }
}