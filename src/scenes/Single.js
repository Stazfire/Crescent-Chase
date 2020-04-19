class Single extends Phaser.Scene {
    constructor() {
        super("singleScene");
        this.posX = 0;
        this.posY = 0;
        this.radius = 150;
        this.single = true; //:C
        this.startFiring = 0;
        this.timer = 0;
    }

    preload() {

    }

    create() {

        this.setKey();

        // place tile sprite
        this.starySky = this.add.tileSprite(0, 0, 1100, 680, 'starfield').setScale(2, 2).setOrigin(0, 0);
        this.mountain = this.add.tileSprite(0, 0, 1100, 680, 'mountains').setScale(2, 2).setOrigin(0, 0);

        // add player (p1)
        this.player = this.physics.add.sprite(game.config.width - 100, game.config.height/2, 'player');
        this.playerHitbox = this.physics.add.sprite(game.config.width - 100, game.config.height/2, 'ball');
        this.playerHitbox.setVisible(false);
        
        this.vampyAnims = this.anims.create({
            key: 'hair',
            frames: this.anims.generateFrameNumbers('Vampy', { start: 0, end: 11, first: 0}),
            frameRate: 5,
            repeat: 100
        });

        this.echoAnims = this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10, first: 0}),
            frameRate: 40,
            repeat: 10000
        });

        this.bossB = new Boss(this, 0, game.config.height/2 - 50, 'Vampy').setScale(1, 1).setOrigin(0,0);
        this.bossB.anims.play('hair');
        this.player.anims.play('fly');
        

        // add spaceships (x3)
        this.ship03 = new Spaceship(this, this.player.x, this.player.y, 'spaceship', 0).setOrigin(0,0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.moon = this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('moon', { start: 0, end: 11, first: 0}),
            frameRate: 5,
            repeat: 300
        });

        //energy balls
        this.bombs = this.physics.add.group({
            active: true,
            visible: false,
            key:'moon',
            frameQuantity: 8,
            collideWorldBounds: false,
            classType: Boss
        });
        //hitbox
        this.bombsHitbox = this.physics.add.group({
            active: true,
            visible: false,
            key:'ball',
            frameQuantity: 8,
            collideWorldBounds: false,
            classType: Boss
        });
        //energy balls
        this.bombs2 = this.physics.add.group({
            active: true,
            visible: false,
            key:'moon',
            frameQuantity: 44,
            collideWorldBounds: false,
            classType: Boss
        });
        //hitbox
        this.bombsHitbox2 = this.physics.add.group({
            active: true,
            visible: false,
            key:'ball',
            frameQuantity: 44,
            collideWorldBounds: false,
            classType: Boss
        });
        //energy balls
        this.bombs3 = this.physics.add.group({
            active: true,
            visible: false,
            key:'moon',
            frameQuantity: 50,
            collideWorldBounds: false,
            classType: Boss
        });
        //hitbox
        this.bombsHitbox3 = this.physics.add.group({
            active: true,
            visible: false,
            key:'ball',
            frameQuantity: 50,
            collideWorldBounds: false,
            classType: Boss
        });

        

        this.bombs.playAnimation('spin');
        this.bombs2.playAnimation('spin');
        this.bombs3.playAnimation('spin');
        
        this.createCircle();

        this.physics.add.overlap(this.playerHitbox, this.bombsHitbox, () => {
            this.sound.play('sfx_explosion');
        });
        this.physics.add.overlap(this.playerHitbox, this.bombsHitbox2, () => {
            this.sound.play('sfx_explosion');
        });
        this.physics.add.overlap(this.playerHitbox, this.bombsHitbox3, () => {
            this.sound.play('sfx_explosion');
        });
        
        
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

        HPConfig.fixedWidth = 0;

        this.addEvent();

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.path = new Phaser.Curves.Path(120, 280); //move path
        this.path.circleTo(100, false, 90);
        this.path.moveTo(120, 280); //move the path
        this.path.circleTo(100, true, 270);

        this.tweens.add({
            targets: this.follower,
            t: 1,
            ease: 'Linear',
            duration: 4000,
            repeat: -1
        });

        
        this.time.addEvent({ delay: 3000, callback: () => {
            this.startFiring++;
        }, callbackScope: this, loop: true });

        let controlsBack = this.add.sprite(540, 350, 'controlBack').setScale(2,2).setInteractive({ pixelPerfect: true });
        let echoDisplay = this.add.sprite(game.config.width/2, game.config.height/2 - 30, 'player').setScale(4,4).setTint(0x000000);
        echoDisplay.anims.play('fly');
        let controls = this.add.sprite(540, 350, 'clickSingle').setInteractive({ pixelPerfect: true });
        let click = this.add.sprite(game.config.width - 150, game.config.height - 20, 'clickToStart').setScale(0.5,0.5).setInteractive({ pixelPerfect: true });
        
        controlsBack.depth = 101;
        echoDisplay.depth = 103;
        controls.depth = 104;
        click.depth = 105;

        click.on('pointerover', function () {
          this.setTint(0x00f2ff);
        });
        click.on('pointerout', function () {
            this.setTint();
        });
        controlsBack.on('pointerdown', function () {
            controlsBack.setVisible(false);
            controls.setVisible(false);
            click.setVisible(false);
            echoDisplay.setVisible(false);
            this.gameStart = true;
        });
        click.on('pointerdown', function () {
            controlsBack.setVisible(false);
            controls.setVisible(false);
            click.setVisible(false);
            echoDisplay.setVisible(false);
            this.gameStart = true;
        });
        controls.on('pointerdown', function () {
            controlsBack.setVisible(false);
            controls.setVisible(false);
            click.setVisible(false);
            echoDisplay.setVisible(false);
            this.gameStart = true;
        });
        echoDisplay.on('pointerdown', function () {
            controlsBack.setVisible(false);
            controls.setVisible(false);
            click.setVisible(false);
            echoDisplay.setVisible(false);
            this.gameStart = true;
        });
    }

    addEvent() {

        this.time.addEvent({ delay: 1000, callback: () => { 
                this.timer++;
        }, callbackScope: this, loop: true });

        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        this.slow = 1;
        //  Input events
        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked) {
                this.player.x += pointer.movementX/this.slow;
                this.playerHitbox.x += pointer.movementX/this.slow;
                this.player.y += pointer.movementY/this.slow;
                this.playerHitbox.y += pointer.movementY/this.slow;
                //  Keep the player within the game
                this.player.x  = Phaser.Math.Clamp(this.player.x , 10, 1090);
                this.playerHitbox.x  = Phaser.Math.Clamp(this.playerHitbox.x , 10, 1090);
                this.player.y  = Phaser.Math.Clamp(this.player.y , 20, 660);
                this.playerHitbox.y  = Phaser.Math.Clamp(this.playerHitbox.y , 20, 660);
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

        this.path.getPoint(this.follower.t, this.follower.vec);
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

        this.mountain.tilePositionX -= 4;
        this.starySky.tilePositionX -= 0.1;
        if (!this.gameOver) {              
            this.player.update();         // update player sprite
            if(this.startFiring >=3) {
                this.bombs.getChildren().forEach(function() {
                    this.bombs.setVisible(true);
                }, this);
                this.bossB.update(this.bombs,this.bombs2,this.bombs3,this.startAngle,this.endAngle,this.bombsHitbox,this.bombsHitbox2,this.bombsHitbox3,this.single,this.playerHitbox);
            }
        } 

        if (this.checkCollision(this.player, this.ship03)) {
            this.shipExplode(this.ship03);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }

    checkCollision(player, bombs) {
        // simple AABB checking
        if (player.x < bombs.x + bombs.width && 
            player.x + player.width > bombs.x && 
            player.y < bombs.y + bombs.height &&
            player.height + player.y > bombs. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x - 5, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset(this.player);                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        this.player.depth = 100;
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
