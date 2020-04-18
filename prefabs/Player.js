// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);

      
    }

    update() {
        
    }


    //reset player position back to start
    reset() {
        console.log("You dead");
        // this.y = 431;
    }
}