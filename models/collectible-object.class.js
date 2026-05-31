class CollectibleObject extends MovableObject {
    height = 100; 
    width = 100;

    constructor(type, x) {
        super();
        this.type = type;
        this.x = x;
        this.y = 335;

        this.loadImage(this.getImage());
    }

    getImage() {
    const images = {
        coin: 'img/8_coin/coin_1.png',
        bottle: 'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'
    };

    return images[this.type];
}

}