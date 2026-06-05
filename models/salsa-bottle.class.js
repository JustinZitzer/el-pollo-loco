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

        this.wobbleOffset = 0;
    }

    update() {
        this.wobbleOffset += 0.05;
    }

    draw(ctx) {
        const wobble = Math.sin(this.wobbleOffset) * 0.05;

        ctx.save();

        ctx.translate(
            this.x + this.width / 2,
            this.y + this.height / 2
        );

        ctx.rotate(wobble);

        ctx.drawImage(
            this.img,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.restore();
    }
}
