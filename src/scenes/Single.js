class Single extends Phaser.Scene {
    constructor() {
        super("singleScene");

        this.group1;
        this.group2;
        this.group3;
        this.group4;
        this.posX = 0;
        this.posY = 0;
        this.radius = 150;
    }

    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/player.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('boss', './assets/Vampy.png');
        this.load.image('ball', 'assets/balls.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('Vampy', './assets/Vampy_Spritesheet.png', {frameWidth: 171.8, frameHeight: 180, startFrame: 0, endFrame: 11});
    }

    create() {

        this.setKey();

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 1100, 680, 'starfield').setScale(1, 1).setOrigin(0, 0);
        
        // add player (p1)
        this.player = new Player(this, game.config.width - 100, game.config.height/2, 'player').setScale(1, 1).setOrigin(0, 0);

        this.vampyAnims = this.anims.create({
            key: 'hair',
            frames: this.anims.generateFrameNumbers('Vampy', { start: 0, end: 11, first: 0}),
            frameRate: 5,
            repeat: 100
        });
        
        this.bossB = new Boss_single(this, 0, game.config.height/2 - 50, 'Vampy').setScale(1, 1).setOrigin(0,0);

        this.bossB.anims.play('hair');

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, this.player.x, this.player.y, 'spaceship', 0).setOrigin(0,0);
        this.ship02 = new Spaceship(this, this.player.x, this.player.y, 'spaceship', 0).setOrigin(0,0);
        this.ship03 = new Spaceship(this, this.player.x, this.player.y, 'spaceship', 0).setOrigin(0,0);

        // animation config
        this.explodeAnims = this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        

        //energy balls
        this.bombs = this.physics.add.group({
            active: true,
            visible: true,
            key:'ball',
            frameQuantity: 8,
            classType: Boss
        });
        //energy balls
        this.bombs2 = this.physics.add.group({
            active: false,
            visible: false,
            key:'ball',
            frameQuantity: 44,
            classType: Boss
        });
        //energy balls
        this.bombs3 = this.physics.add.group({
            active: false,
            visible: false,
            key:'ball',
            frameQuantity: 50,
            classType: Boss
        });
    
        this.createCircle();

        // score
        this.bossHP = 100000;
        // score display
        let HPConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.bossHP, HPConfig);

        // timer
        this.timer = 60;
        // timer display
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeRight = this.add.text(400, 54, this.timer, timerConfig);

        // 60-second play clock
        HPConfig.fixedWidth = 0;

        this.addEvent(HPConfig);

        //this.graphics = this.add.graphics(); //set path visble

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };

        this.path = new Phaser.Curves.Path(120, 280); //move path

        this.path.circleTo(100, false, 90);

        this.path.moveTo(120, 280); //move the path

        //  Rotate this circle so it completes the loop
        this.path.circleTo(100, true, 270);

        this.tweens.add({
            targets: this.follower,
            t: 1,
            ease: 'Linear',
            duration: 4000,
            repeat: -1
        });

    }

    addEvent(HPConfig) {
        // game over flag
        let gameOver = false;
        let x = 10;
        let timer = 60;
        this.time.addEvent({ delay: x, callback: () => {
            this.ship01.update(60,this.player);           // update spaceships (x3)
        }, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 1000, callback: () => { 
            if(timer>=1) {
                timer--;
            }
            else {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', HPConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', HPConfig).setOrigin(0.5);
                this.gameOver = true;
            }
        }, callbackScope: this, loop: true });

        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        this.slow = 1;
        //  Input events
        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked) {
                
                this.player.x += pointer.movementX/this.slow;
                this.player.y += pointer.movementY/this.slow;
                //  Keep the player within the game
                this.player.x  = Phaser.Math.Clamp(this.player.x , 0, 960);
                this.player.y  = Phaser.Math.Clamp(this.player.y , 40, 580);
            }
        }, this);
    }

    setKey() {
        // define keys
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

 

    update() {
        //this.graphics.clear();
        //this.graphics.lineStyle(2, 0xffffff, 1);

        //this.path.draw(this.graphics);

        this.path.getPoint(this.follower.t, this.follower.vec);

        //this.graphics.fillStyle(0xff0000, 1);
        this.bossB.x = this.follower.vec.x;
        this.bossB.y = this.follower.vec.y;

        let pointer = this.input.activePointer;
        if(pointer.isDown) {
            this.slow = 10;
        }
        else {
            this.slow = 3;
        }

        this.timeRight.text = this.timer;
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyI)) {
            this.scene.restart(this.p1Score);
        }

        this.starfield.tilePositionX -= 8;
        if (!this.gameOver) {              
            this.player.update();         // update player sprite
            
        } 

        // check collisions
        // if(this.checkCollision(this.player, this.bombs)) {
        //     console.log("gameee");
        //     this.player.reset();
        // }
        if (this.checkCollision(this.player, this.ship01)) {
            //this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.player, this.ship02)) {
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.player, this.ship03)) {
            this.shipExplode(this.ship03);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }

    checkCollision(player, ship) {
        // simple AABB checking
        if (player.x < ship.x + ship.width && 
            player.x + player.width > ship.x && 
            player.y < ship.y + ship.height &&
            player.height + player.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset(this.player);                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        
    }

    createCircle() {
        this.startAngle = this.tweens.addCounter({
            from: 0,
            to: 6.28,
            duration: 8000, //speed of rotation higher = slower
            repeat: -1
        })
    
        this.endAngle = this.tweens.addCounter({
            from: 6.28,
            to: 12.56,
            duration: 8000, //speed of rotation higher = slowerd
            repeat: -1
        })
    }
}