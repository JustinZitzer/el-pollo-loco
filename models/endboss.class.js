class Endboss extends MovableObject {
    width = 200;
    height = 200;
    y = 240;
    IMAGES_SPAWNING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    offset = {
        top: 40,
        left: 10,
        right: 10,
        bottom: 10,
    };
    hadFirstContact = false;

    constructor() {
        super().loadImage(this.IMAGES_SPAWNING[0]);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1800;
        this.animate();
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (i < 10) {
                this.playAnimation(this.IMAGES_SPAWNING);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
            i++;

            if (world.character.x > 1300 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
                console.log(world.character.x); // not working yet
            }
        }, 200);
    }


}