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

        this.floatOffset = 0;
    }

    update() {
        this.floatOffset += 0.04;
    }

    draw(ctx) {
        const floatY = Math.sin(this.floatOffset) * 10;

        ctx.drawImage(
            this.img,
            this.x,
            this.y + floatY,
            this.width,
            this.height
        );
    }
}