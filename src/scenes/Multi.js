class Multi extends Phaser.Scene {
    constructor() {
        super("multiScene");
        this.posX = 0;
        this.posY = 0;
        this.radius = 150;
        this.single = false; //:c
        this.timer = 0;

    }

    preload() {

    }

    create() {

        this.setKey();
        this.BGM = game.sound.add('bgm');
        this.BGM.loop = true;
        this.BGM.play();
        // place tile sprite
        this.starySky = this.add.tileSprite(0, 0, 1100, 680, 'starfield').setScale(2, 2).setOrigin(0, 0);
        this.mountain = this.add.tileSprite(0, 0, 1100, 680, 'mountains').setScale(2, 2).setOrigin(0, 0);

        // add player (p1)
        this.player = this.physics.add.sprite(game.config.width - 100, game.config.height/2 + 100, 'player');
        this.playerHitbox = this.physics.add.sprite(game.config.width - 100, game.config.height/2 + 100, 'ball');
        this.playerHitbox.setVisible(false);

        this.playerHP = new PlayerHealth(this, 1095, 0);
        
        this.vampyAnims = this.anims.create({
            key: 'hair',
            frames: this.anims.generateFrameNumbers('Vampy', { start: 0, end: 11, first: 0}),
            frameRate: 5,
            repeat: 10000
        });

        this.echoAnims = this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10, first: 0}),
            frameRate: 40,
            repeat: 10000
        });

        this.bossB = new Boss(this, 0, game.config.height/2 - 50, 'Vampy').setScale(1, 1).setOrigin(0,0);
        this.bossHitbox = this.physics.add.sprite(100, game.config.height/2 + 10, 'bossHitbox');
        this.bossHitbox.setVisible(false);

        this.bossB.anims.play('hair');
        this.player.anims.play('fly');

        this.bossHP = new BossHealth(this, 0, 0);


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
            visible: true,
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

        //player bullet
        this.bullets = this.physics.add.group({
            active: false,
            visible: false,
            key:'bullet',
            frameQuantity: 2,
            collideWorldBounds: false,
            classType: Bullet
        });

        this.bullet = this.bullets.get();

        this.physics.add.overlap(this.bossHitbox, this.bullet, () => {
            this.bullet.setFiring();
            this.sound.play('sfx_explosion');
            if(this.bossHP.decrease(4)) {
                this.gameOver = true;
                console.log('You Win');
            }

        });


        this.bombs.playAnimation('spin');
        this.bombs2.playAnimation('spin');
        this.bombs3.playAnimation('spin');
        
        this.createCircle();

        this.physics.add.overlap(this.playerHitbox, this.bombsHitbox, () => {
            this.sound.play('sfx_explosion');
            if(this.playerHP.decrease(80)) {
                this.gameOver = true;
                console.log('You Lose');
            }
        });
        this.physics.add.overlap(this.playerHitbox, this.bombsHitbox2, () => {
            this.sound.play('sfx_explosion');
            if(this.playerHP.decrease(80)) {
                this.gameOver = true;
                console.log('You Lose');
            }
        });
        this.physics.add.overlap(this.playerHitbox, this.bombsHitbox3, () => {
            this.sound.play('sfx_explosion');
            if(this.playerHP.decrease(80)) {
                this.gameOver = true;
                console.log('You Lose');
            }
        });
        
        
        

        // timer display
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeRight = this.add.text(game.config.width/2 - 50, 0, this.timer, timerConfig);


        this.addEvent();
        
        let controlsBack = this.add.sprite(540, 350, 'controlBack').setScale(2,2).setInteractive({ pixelPerfect: true });
        let vampyDisplay = this.add.sprite(game.config.width/2 - 240, game.config.height/2 + 50, 'Vampy').setScale(2,2).setTint(0x000000);
        vampyDisplay.anims.play('hair');
        let echoDisplay = this.add.sprite(game.config.width/2 + 240, game.config.height/2 - 30, 'player').setScale(4,4).setTint(0x000000);
        echoDisplay.anims.play('fly');
        let controls = this.add.sprite(540, 350, 'control').setInteractive({ pixelPerfect: true });
        let click = this.add.sprite(game.config.width - 150, game.config.height - 20, 'clickToStart').setScale(0.5,0.5).setInteractive({ pixelPerfect: true });

        controlsBack.depth = 101;
        vampyDisplay.depth = 102;
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
            vampyDisplay.setVisible(false);
            echoDisplay.setVisible(false);
        });
        click.on('pointerdown', function () {
            controlsBack.setVisible(false);
            controls.setVisible(false);
            click.setVisible(false);
            vampyDisplay.setVisible(false);
            echoDisplay.setVisible(false);
        });
        controls.on('pointerdown', function () {
            controlsBack.setVisible(false);
            controls.setVisible(false);
            click.setVisible(false);
            vampyDisplay.setVisible(false);
            echoDisplay.setVisible(false);
        });
        echoDisplay.on('pointerdown', function () {
            controlsBack.setVisible(false);
            controls.setVisible(false);
            click.setVisible(false);
            vampyDisplay.setVisible(false);
            echoDisplay.setVisible(false);
        });
        vampyDisplay.on('pointerdown', function () {
            controlsBack.setVisible(false);
            controls.setVisible(false);
            click.setVisible(false);
            vampyDisplay.setVisible(false);
            echoDisplay.setVisible(false);
        });

    }

    addEvent() {
        if(!this.gameOver) {
            this.time.addEvent({ delay: 1000, callback: () => { 
                this.timer++;
            }, callbackScope: this, loop: true });


                game.input.mouse.requestPointerLock();


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
        else {
            game.input.mouse.releasePointerLock();
        }
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
            
            this.bullet.update(this.player.x,this.player.y);

            this.bossB.update(this.bombs,this.bombs2,this.bombs3,this.startAngle,this.endAngle,this.bombsHitbox,this.bombsHitbox2,this.bombsHitbox3,this.single,this.playerHitbox,this.bossHitbox);
            
        } 
        else {
            this.gameOver = false;
            this.timer = 0;
            this.BGM.loop = false;
            this.BGM.stop();
            game.input.mouse.releasePointerLock();
            this.scene.start("menuScene");
        }

        if (this.checkCollision(this.player, this.ship03)) {
            this.shipExplode(this.ship03);
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
