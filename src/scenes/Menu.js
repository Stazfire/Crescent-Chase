class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_player', './assets/rocket_shot.wav');
        this.load.image('VampyCover', 'assets/VampyStill.png');
        this.load.image('start', 'assets/start.png');
        this.load.image('single', 'assets/singlePlayer.png');
        this.load.image('multi', 'assets/multiplayer.png');
        this.load.image('control', 'assets/controls.png');
        this.load.image('controlBack', 'assets/controlsBack.png');
        this.load.image('clickToStart', 'assets/click.png');
        this.load.image('clickSingle', 'assets/clickSingle.png');
        // load images/tile sprites
        
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starySky.png');
        this.load.image('mountains', './assets/mountains.png');
        this.load.image('trees', './assets/foggyTrees.png');
        this.load.image('ball', 'assets/balls.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/trails.png', {frameWidth: 12, frameHeight: 6, startFrame: 0, endFrame: 9});
        this.load.spritesheet('moon', './assets/Moon.png', {frameWidth: 30, frameHeight: 30, startFrame: 0, endFrame: 11});
        this.load.spritesheet('Vampy', './assets/Vampy.png', {frameWidth: 171.8, frameHeight: 180, startFrame: 0, endFrame: 11});
        this.load.spritesheet('player', './assets/Echo.png',{frameWidth: 52.5, frameHeight: 60, startFrame: 0, endFrame: 10});
    }

    create() {
        this.cover = this.add.image(game.config.width/2, game.config.height/2 + 100, 'VampyCover');
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2-268, game.config.height/2-100, 'Crescent Chase', {
            fontFamily: 'Goudy',
            fontSize: '110px',
            color: '#FFFFFF'
        });
        
        

        let singlePlayer = this.add.sprite(game.config.width/2, game.config.height/2 + 180, 'single').setInteractive({ pixelPerfect: true });
        singlePlayer.setVisible(false);
        singlePlayer.on('pointerover', function () {
          this.setTint(0x00f2ff);
        });
        singlePlayer.on('pointerout', function () {
            this.setTint();
        });
        singlePlayer.on('pointerdown', function () {
          singlePlayer.setVisible(false);
          game.scale.startFullscreen();
          game.sound.play('sfx_select');
          game.scene.start("singleScene");  
        });

        let multiplayer = this.add.sprite(game.config.width/2, game.config.height/2 + 280, 'multi').setInteractive({ pixelPerfect: true });
        multiplayer.setVisible(false);
        multiplayer.on('pointerover', function () {
          this.setTint(0xCA00FF);
        });
        multiplayer.on('pointerout', function () {
            this.setTint();
        });
        multiplayer.on('pointerdown', function () {
          multiplayer.setVisible(false);
          game.scale.startFullscreen();
          game.sound.play('sfx_select');
          game.scene.start("multiScene"); 
        });


        let start = this.add.sprite(game.config.width/2, game.config.height/2 + 80, 'start').setInteractive({ pixelPerfect: true });
        start.on('pointerover', function () {
            this.setTint(0xff0000);
        });
        start.on('pointerout', function () {
            this.setTint();
        });
        start.on('pointerdown', function () {
          singlePlayer.setVisible(true);
          multiplayer.setVisible(true);
        });
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        

    }

    update() {
        
    }
}
