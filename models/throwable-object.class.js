class ThrowableObect extends MovableObject {

    IMAGES_SALSA_BOTTLE = [

    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        //this.loadImages(this.IMAGES_SALSA_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 60;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }



}