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
        // let speed = 5;
        // fire button
        // if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
        //     this.isFiring = true;
        //     this.sfxPlayer.play();  // play sfx
        // }
        // //move up when firing
        // if(this.isFiring && this.y >= 108) {
        //     this.y -= speed;
        // }
        //reset when miss
        // if(this.y <= 108) {
        //     this.reset();
        // }
    }


    //reset player position back to start
    reset() {
        console.log("You dead");
        // this.y = 431;
    }
}