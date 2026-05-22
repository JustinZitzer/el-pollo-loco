class DrawableObject {
    x = 60;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Error loading image', error);
            console.log('Could not load image', this.img.scr);
            
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }

    drawRedFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'red';
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom
        );
        ctx.stroke();
        }
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png']
     */

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}