//Name: Victor Chung
//Points Breakdown:
//  Implement a simultaneous two-player mode (50) [2p mode]
//  Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50) [Vampires]
//  If (one of those don't count^):
//      Create and implement a new weapon (w/ new behavior and graphics) (25) [yes]
//      Implement mouse control for player movement and mouse click to fire (25) [though mouse click is to slow down, not fire :c]
//      Implement a new timing/scoring mechanism that adds time to the clock for successful hits (25) [health system instead of scoring]
//      Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25) [I drew everything using photoshop, piskel to help me put all the art into a spritesheet]
//      Implement an alternating two-player mode (25) [there is a 2p mode, I hope this count if the S-tier one doesn't]
//      Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (25) [Echo is fast as lightning]

//Comments:
//  The music and sound buffers after replaying the game a few time. (after 5th replays)
//  This isn't a problem if you restart the page but I really don't know how to fix it.
//
//Dev Notes:
//  The single player mode is easier than it look - maybe too easy
//  For multiplayer, Echo is broken when you know how to dodge all of Vampy's moves
//  Vampy does a lot of damage but is a bit predictable
//  
//  I had a lot of fun making this, I hope you enjoy it, and thank you for playing :)


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