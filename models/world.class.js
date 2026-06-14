class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    level = level1;
    camera_x = 0;
    statusBarHealth = new StatusBar("health");
    statusBarBottle = new StatusBar("bottle");
    statusBarCoin = new StatusBar("coin");
    statusBarEndboss = null;
    endbossTriggered = false;
    throwableObjects = [];
    salsaBottleCount = 0;
    coinCount = 0;
    lastThrow = 0;

    constructor(canvas, keyboard, hud) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.initStatusBars();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.checkEndbossTrigger();
        }, 200);
        this.updateCollectibleStatusBars();
        this.checkCollectibleObjects();

    }

    checkEndbossTrigger() {
        if (this.character.x > 1300 && !this.bossTriggered) {
            this.endbossTriggered = true;

            this.statusBarEndboss = new StatusBar("endboss");
            this.statusBarEndboss.x = 500;
            this.statusBarEndboss.y = 10;

            console.log("Boss aktiviert");
        }
    }

    updateCollectibleStatusBars() {

        setInterval(() => {
            this.statusBarCoin.setCollectibleObjectPercentage(this.character.coinCount);
            this.statusBarBottle.setCollectibleObjectPercentage(this.character.salsaBottleCount);
        }, 200);
    }

    initStatusBars() {
        this.setPostionStatusBars();
        this.test();

    }

    setPostionStatusBars() {
        this.statusBarHealth.x = 20;
        this.statusBarHealth.y = 5;

        this.statusBarCoin.x = 20;
        this.statusBarCoin.y = 50;

        this.statusBarBottle.x = 20;
        this.statusBarBottle.y = 100;


    }


    test() {
    }

    checkThrowObjects() {
        let now = Date.now();

        if (this.keyboard.D && this.character.salsaBottleCount > 0 && now - this.lastThrow > 500) {
            this.lastThrow = now;

            let bottle = new ThrowableObject(
                this.character.x + 100,
                this.character.y + 100,
                this.character.otherDirection,
                this.character
            );

            this.throwableObjects.push(bottle);
            this.character.salsaBottleCount--;
        }
    }



    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    checkBottleCollisions() {
        this.throwableObjects = this.throwableObjects.filter(
            bottle => !bottle.markedForDeletion
        );
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {

                if (bottle.isColliding(enemy)) {
                    bottle.markedForDeletion = true;

                }

            });
        });
    }

    checkCollectibleObjects() {
        setInterval(() => {
            this.checkCollectibleCoin();
            this.checkCollectibleSalsaBottle();
        }, 1000 / 60);


    }

    checkCollectibleCoin() {
        this.level.coins.forEach((coin, index) => {
            coin.update();
            if (this.character.isColliding(coin)) { // continue here
                this.character.coinCount++;
                this.level.coins.splice(index, 1);
                this.statusBarCoin.setCollectibleObjectPercentage(this.character.coinCount);

            }
        });
    }

    checkCollectibleSalsaBottle() {
        this.level.salsaBottles.forEach((bottle, index) => {
            bottle.update();
            if (this.character.isColliding(bottle)) {
                this.character.salsaBottleCount++;
                this.level.salsaBottles.splice(index, 1);
                this.statusBarBottle.setCollectibleObjectPercentage(this.character.salsaBottleCount);

            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);


        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);


        this.ctx.translate(-this.camera_x, 0);
        // ------ space for fixed objects ------

        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        if (this.statusBarEndboss) {
            this.addToMap(this.statusBarEndboss);
        }
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.level.coins);

        this.addObjectsToMap(this.throwableObjects);


        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        // movableObject.drawFrame(this.ctx);
        movableObject.drawRedFrame(this.ctx);
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }

    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}
