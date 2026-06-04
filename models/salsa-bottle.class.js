class SalsaBottle extends CollectibleObject {
    width = 100;
    height = 100;
    offset = {
        top: 88,
        left: 40,
        right: 40,
        bottom: 85,
    }

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}