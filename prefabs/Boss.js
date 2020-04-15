// Boss prefab
class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.bossFire = false; //track boss's firing status
      this.sfxBoss = scene.sound.add('sfx_player'); // add boss sfx
    }

    update() {
        let speed = 5;
        //move left/right
        if(!this.bossFire) {
            if(keyLEFT.isDown || keyA.isDown && this.x >= 47) {
                this.x -= speed;
            }
            else if(keyRIGHT.isDown || keyD.isDown && this.x <= 278) {
                this.x += speed;
            }
        }
        //move UP/DOWN
        if(!this.bossFire) {
            if(keyUP.isDown || keyW.isDown && this.y >= 40) {
                this.y -= speed;
            }
            else if(keyDOWN.isDown || keyS.isDown && this.y <= 500) {
                this.y += speed;
            }
        }

        // // fire button
        // if (Phaser.Input.Keyboard.JustDown(keyF) && !this.bossFire) {
        //     this.bossFire = true;
        //     this.sfxPlayer.play();  // play sfx
        // }
        // //move up when firing
        // if(this.isFiring && this.y >= 108) {
        //     this.y -= speed;
        // }
    }


    //reset player position back to start
    // reset() {
    //     this.bossFire = false;
        // this.y = 431;
    //}
}