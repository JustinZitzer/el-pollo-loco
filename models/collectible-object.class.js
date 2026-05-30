class CollectibleObject extends MovableObject {
    height = 100; 
    width = 100;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 335;
    }

}