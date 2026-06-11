class ThrowableObject extends MovableObject {


    IMAGES_SALSA_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    constructor(x, y, direction, character) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_SALSA_BOTTLE);
        this.x = x - 60;
        this.y = y - 30;
        this.height = 100;
        this.width = 60;
        this.direction = direction;
        this.character = character;
        this.markedForDeletion = false;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.handleBottleDirection();
            if (this.isAboveGround() === false) {
                this.markedForDeletion = true;
            }
        }, 25);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SALSA_BOTTLE);
        }, 100);

    }

    handleBottleDirection() {
        if (this.direction) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
    }



}