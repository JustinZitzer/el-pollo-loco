class Coin extends CollectibleObject {
    width = 100;
    height = 100;
    offset = {
        top: 64,
        bottom: 64,
        left: 64,
        right: 64,
    }

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}