let level1;
function initLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss(),
        ],
        [
            new Cloud(),
        ],
        
        [
            new BackgroundObject('img/5_background/layers/air.png', -720),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 720),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

            new BackgroundObject('img/5_background/layers/air.png', 1440),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1440),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1440),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1440),
            new BackgroundObject('img/5_background/layers/air.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3),
        ],
        [
            new SalsaBottle('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 300, 335),
            new SalsaBottle('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 400, 335),
            new SalsaBottle('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 800, 335),
            new SalsaBottle('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 900, 335),
            new SalsaBottle('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 1300, 335),
            new SalsaBottle('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 1400, 335),
            new SalsaBottle('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 1600, 335),
            new SalsaBottle('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 2000, 335),
        ],
        [
            new Coin('img/8_coin/coin_1.png', 500, 335),
            new Coin('img/8_coin/coin_1.png', 1000, 335),
            new Coin('img/8_coin/coin_1.png', 1500, 335),
            new Coin('img/8_coin/coin_1.png', 1700, 335),
            new Coin('img/8_coin/coin_1.png', 2100, 335),
            new Coin('img/8_coin/coin_1.png', 2200, 335),
        ],
        
    );
}