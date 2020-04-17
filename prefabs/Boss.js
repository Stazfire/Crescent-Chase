// Boss prefab
class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        scene.add.existing(this);
        this.bossFire = false; //track boss's firing status
        this.bossSpray = false;
        this.bossLockOn = false;
        this.sfxBoss = scene.sound.add('sfx_player'); // add boss sfx
        this.projectileX;
        this.projectileY;
        this.projectileX2;
        this.projectileY2;
        this.projectileX3;
        this.projectileY3;
        this.cyclone;
        this.cyclonePos;
        this.cyclone2;
        this.cyclonePos2;
        this.cyclone3;
        this.cyclonePos3;
        this.projectileSpeed = 20;
        this.radius = 150;
        this.radius2 = 150;
        this.radius3 = 150;
        this.spraySpeed = 10;
        this.distanceX;
        this.distanceY;
        this.speed = 1;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.boxClone;
        this.boxClone2;
        this.boxClone3;
        this.boxCyclonePos;
        this.boxCyclonePos2;
        this.boxCyclonePos3;
        
    }

    update(bombs,bombs2,bombs3,startAngle,endAngle,hitBox,hitBox2,hitBox3,time,delta) {
        
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
        // lockon button
        if (Phaser.Input.Keyboard.JustDown(keyP) && !this.bossSpray && !this.bossFire && !this.bossLockOn) {
            this.bossLockOn = true;
            this.sfxBoss.play();  // play sfx
        }

        if(!this.bossFire && !this.bossSpray && !this.bossLockOn) {
            this.circle = new Phaser.Geom.Circle(this.projectileX + 80, this.projectileY + 80, this.radius); //<- radius of circle
            this.projectileX = this.x;
            this.projectileY = this.y;
            this.projectileX2 = this.x;
            this.projectileY2 = this.y;
            this.projectileX3 = this.x;
            this.projectileY3 = this.y;

            this.cyclonePos = Phaser.Actions.SetXY([this.circle], this.projectileX + 80, this.projectileY + 80);

            this.cyclone = Phaser.Actions.PlaceOnCircle(
                bombs.getChildren(), 
                this.circle, 
                startAngle.getValue(), 
                endAngle.getValue()
            );
            this.boxClone = Phaser.Actions.PlaceOnCircle(
                hitBox.getChildren(), 
                this.circle, 
                startAngle.getValue(), 
                endAngle.getValue()
            );
        }

        //when firing
        if(this.bossFire && !this.bossSpray && !this.bossLockOn) {
            this.circle = new Phaser.Geom.Circle(this.projectileX + 80, this.projectileY + 80, this.radius); //<- radius of circle
            this.projectileX = this.projectileX + this.projectileSpeed;
            if(this.projectileX < 1300) {
                this.cyclonePos = Phaser.Actions.SetXY([this.circle], this.projectileX + 80, this.projectileY + 80);
    
                this.cyclone = Phaser.Actions.PlaceOnCircle(
                    bombs.getChildren(), 
                    this.circle, 
                    startAngle.getValue(), 
                    endAngle.getValue()
                );
                this.boxClone = Phaser.Actions.PlaceOnCircle(
                    hitBox.getChildren(), 
                    this.circle, 
                    startAngle.getValue(), 
                    endAngle.getValue()
                );
            }
        }

        //when spraying
        if(this.bossSpray && !this.bossFire && !this.bossLockOn) {
            this.newCircle = new Phaser.Geom.Circle(this.projectileX + 80, this.projectileY + 80, this.radius); //<- radius of circle
            this.newCircle2 = new Phaser.Geom.Circle(this.projectileX2 + 80, this.projectileY2 + 80, this.radius2); //<- radius of circle
            this.newCircle3 = new Phaser.Geom.Circle(this.projectileX3 + 80, this.projectileY3 + 80, this.radius3); //<- radius of circle
            this.radius = this.radius + this.spraySpeed;
            
            this.cyclonePos = Phaser.Actions.SetXY([this.newCircle], this.projectileX + 80, this.projectileY + 80);

            this.cyclone = Phaser.Actions.PlaceOnCircle(
                bombs.getChildren(), 
                this.newCircle, 
            );
            this.boxClone = Phaser.Actions.PlaceOnCircle(
                hitBox.getChildren(), 
                this.newCircle, 
            );

            if(this.radius >= 300) {
                bombs2.getChildren().forEach(function() {
                    bombs2.setVisible(true);
                }, this);
                if(this.radius == 300) {
                    this.projectileX2 = this.x;
                    this.projectileY2 = this.y;
                }
                this.radius2 = this.radius2 + this.spraySpeed;
                this.cyclonePos2 = Phaser.Actions.SetXY([this.newCircle2], this.projectileX2 + 80, this.projectileY2 + 80);

                this.cyclone2 = Phaser.Actions.PlaceOnCircle(
                    bombs2.getChildren(), 
                    this.newCircle2, 
                );
                this.boxClone2 = Phaser.Actions.PlaceOnCircle(
                    hitBox2.getChildren(), 
                    this.newCircle2, 
                );
            }
            if(this.radius2 >= 300) {
                bombs3.getChildren().forEach(function() {
                    bombs3.setVisible(true);
                }, this);
                if(this.radius2 == 300) {
                    this.projectileX3 = this.x;
                    this.projectileY3 = this.y;
                }
                this.radius3 = this.radius3 + this.spraySpeed;
                this.cyclonePos3 = Phaser.Actions.SetXY([this.newCircle3], this.projectileX3 + 80, this.projectileY3 + 80);

                this.cyclone3 = Phaser.Actions.PlaceOnCircle(
                    bombs3.getChildren(), 
                    this.newCircle3, 
                );
                this.boxClone3 = Phaser.Actions.PlaceOnCircle(
                    hitBox3.getChildren(), 
                    this.newCircle3, 
                );
            }
        }

        //when lockon
        if(this.bossLockOn && !this.bossSpray && !this.bossFire) {
            console.log("locking on");
            this.reset();
        }

        //reset when miss
        if(this.projectileX >= 1300) { 
            this.reset();
        }
        if(this.radius >= 1100 && this.radius2 >= 1100 && this.radius3 >= 1210) {
            this.reset();
        }
    }

    //reset projectile position back to boss
    reset() {
        this.bossFire = false;
        this.bossSpray = false;
        this.bossLockOn = false;
        this.projectileX = this.x;
        this.projectileY = this.y;
        this.projectileX2 = this.x;
        this.projectileY2 = this.y;
        this.projectileX3 = this.x;
        this.projectileY3 = this.y;
        this.radius = 150;
        this.radius2 = 150;
        this.radius3 = 150;
        
    }
}