// Player prefab
class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'moon');
      this.firing = false;
    }

    update(x,y) {
      if(!this.firing) {
        this.setPosition(x, y);
        this.firing = true;
      }
      else {
        this.x -= 100;
        this.setActive(true);
        this.setVisible(true);
        if (this.x < -50)
        {
            this.setActive(false);
            this.setVisible(false);
            this.firing = false;
        }
      }
    }
    setFiring() {
      this.firing = false;
      this.setActive(false);
      this.setVisible(false);
    }
}