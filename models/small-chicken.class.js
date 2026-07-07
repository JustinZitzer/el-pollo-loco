class SmallChicken extends MovableObject {
    height = 80;
    width = 90;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    energy = 25;

    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 300;
        this.speed = 0.5;

        this.y = this.groundY - this.height;

        this.applyGravity();
        this.animate();
    }

    animate() {
        // Bewegung
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();

                // RANDOM JUMP (sauber)
                if (Math.random() < 0.003) {
                    this.jump(15);
                }
            }
        }, 1000 / 60);

        // Animation
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }
}