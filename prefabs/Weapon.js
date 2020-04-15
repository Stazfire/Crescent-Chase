//Weapon prefab
class Weapon extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene);
        scene.add.existing(this); //add existing scene, displayList, updateList
    }

    update() {
        
    }

    cyclone(circle,boss,bombs,startAngle,endAngle) {
        Phaser.Actions.SetXY([circle], boss.x + 80, boss.y + 70);

        Phaser.Actions.PlaceOnCircle(
            bombs.getChildren(), 
            circle, 
            startAngle.getValue(), 
            endAngle.getValue()
        );
    }
}