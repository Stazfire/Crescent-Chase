// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false; //track player's firing status
      this.sfxPlayer = scene.sound.add('sfx_player'); // add player sfx
    }

    update() {

    }


    //reset player position back to start
    reset() {
        console.log("You dead");
        // this.y = 431;
    }
}