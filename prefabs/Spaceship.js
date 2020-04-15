//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add existing scene, displayList, updateList
    }

    update(speed, player) {
        //move left
        this.x -= speed;

        //wraparound from left to right edge
        if(this.x <= 0 - this. width) {
            this.x = player.x;
            this.y = player.y;
        }
    }

    reset(player) {
        this.x = player.x;
        this.y = player.y;
    }
}