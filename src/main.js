console.log("testing");
let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1100,
        height: 680,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0}
        }
    },
    scene: [ Menu, Multi, Single ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyI, keyO, keyP, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyW, keyA, keyS, keyD;