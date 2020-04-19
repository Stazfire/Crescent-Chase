// PlayerHealth prefab
class PlayerHealth extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.value = -500;
        this.p = -440 / -500;

        this.draw();

        scene.add.existing(this.bar);
        
    }

    decrease (amount) {
        this.value += amount;
        if (this.value > 0) {
            this.value = 0;
        }
        this.draw();
        return (this.value === 0);
    }
    draw () {
        this.bar.clear();
        //  BG
        // this.bar.fillStyle(0x000000);
        // this.bar.fillRect(this.x, this.y, 604, 16);
        //  Health
        // this.bar.fillStyle(0xffffff);
        // this.bar.fillRect(this.x + 2, this.y + 2, 300, 12);

        if (this.value > -80) {
            this.bar.fillStyle(0xff0000);
        }
        else {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);
        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }

}