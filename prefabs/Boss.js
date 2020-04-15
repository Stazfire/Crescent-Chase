// Boss prefab
class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        scene.add.existing(this);
        this.bossFire = false; //track boss's firing status
        this.bossSpray = false;
        this.sfxBoss = scene.sound.add('sfx_player'); // add boss sfx
        this.projectileX;
        this.projectileY;
        this.cyclone;
        this.cyclonePos;
        this.projectileSpeed = 10;
        this.radius = 150;
        this.spraySpeed = 20;
        
    }

    update(circle,bombs,startAngle,endAngle,radius) {
        
        let speed = 5;
        //move left/right
        if(keyLEFT.isDown || keyA.isDown && this.x >= 0) {
            this.x -= speed;
        }
        else if(keyRIGHT.isDown || keyD.isDown && this.x <= 278) {
            this.x += speed;
        }
        
        //move UP/DOWN
        if(keyUP.isDown || keyW.isDown && this.y >= 40) {
            this.y -= speed;
        }
        else if(keyDOWN.isDown || keyS.isDown && this.y <= 500) {
            this.y += speed;
        }
        
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyI) && !this.bossFire && !this.bossSpray) {
            this.bossFire = true;
            this.sfxBoss.play();  // play sfx
        }
        // spray button
        if (Phaser.Input.Keyboard.JustDown(keyO) && !this.bossSpray && !this.bossFire) {
            this.bossSpray = true;
            this.sfxBoss.play();  // play sfx
        }

        if(!this.bossFire && !this.bossSpray) {
            this.projectileX = this.x;
            this.projectileY = this.y;
            this.cyclonePos = Phaser.Actions.SetXY([circle], this.projectileX + 80, this.projectileY + 80);
    
                this.cyclone = Phaser.Actions.PlaceOnCircle(
                    bombs.getChildren(), 
                    circle, 
                    startAngle.getValue(), 
                    endAngle.getValue()
                );
        }

        //when firing
        if(this.bossFire && !this.bossSpray) {
            this.projectileX = this.projectileX + this.projectileSpeed;
            if(this.projectileX < 1300) {
                this.cyclonePos = Phaser.Actions.SetXY([circle], this.projectileX + 80, this.projectileY + 80);
    
                this.cyclone = Phaser.Actions.PlaceOnCircle(
                    bombs.getChildren(), 
                    circle, 
                    startAngle.getValue(), 
                    endAngle.getValue()
                );
            }
        }

        //when spraying
        if(this.bossSpray && !this.bossFire) {
            this.newCircle = new Phaser.Geom.Circle(this.projectileX + 80, this.projectileY + 80, this.radius); //<- radius of circle
            this.radius = this.radius + this.spraySpeed;
            this.cyclonePos = Phaser.Actions.SetXY([this.newCircle], this.projectileX + 80, this.projectileY + 80);

            this.cyclone = Phaser.Actions.PlaceOnCircle(
                bombs.getChildren(), 
                this.newCircle, 
            );
        }

        //reset when miss
        if(this.projectileX >= 1300 || this.radius >= 900) {
            this.reset();
        }
    }

    //reset projectile position back to boss
    reset() {
        this.bossFire = false;
        this.bossSpray = false;
        this.projectileX = this.x;
        this.projectileY = this.y;
        this.radius = 150;
        
    }
}