//Rocket prefab
class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //Adds rocket to the scene
        scene.physics.world.enableBody(this); //Physics enabled
        scene.projectiles.add(this); //Adds to projectile group
    }
    
    update()
    {
        if(this.y < gameConfig.height)
        {
            this.y -= 10;
        }
        //If the rocket reaches a certain pixel height
        if(this.y >= gameConfig.height)
        {
            this.destroy();
        }
    }
}