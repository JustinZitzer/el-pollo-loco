class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObect) {
            return true;
        } else {
            return this.y < 220;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }

    isColliding(movableObject, offset) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left && // Right -> Left        (from enemy to character)
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top && // Top -> Bottom 
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right && // L -> R
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom; // B -> T 
    }

    hit() {
        this.energy -= 25;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;

        return timePassed < 1;
    }

}
