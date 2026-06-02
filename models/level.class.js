class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectibleObjects;
    level_end_x = 2200;
    coins;
    salsaBottles;

    constructor(enemies, clouds, backgroundObjects, collectibleObjects, coins, salsaBottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectibleObjects = collectibleObjects;
        this.coins = [];
        this.salsaBottles = [];
    }
}