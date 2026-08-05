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
    lastThrow = 0;
    lastHit = 0;
    hitCooldown = 500;
    MAX_COINS = 6;
    MAX_SALSA_BOTTLES = 8;
    collisionLocked = false;
    endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    gap = 65;

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
        const loop = () => {

            this.collisionLocked = false;

            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.checkEndbossTrigger();
            this.moveEndboss();
            this.checkCollectibleCoin();
            this.checkCollectibleSalsaBottle();

            requestAnimationFrame(loop);
        };

        loop();
    }

    moveEndboss() {
        if (!this.endbossTriggered || !this.endboss || this.endboss.isDead()) {
            return;
        }

        let distance = this.character.x - this.endboss.x;


        if (Math.abs(distance) > this.gap) {

            if (distance > 0) {
                this.endboss.x += this.endboss.speed;
                this.endboss.otherDirection = true;

            } else {
                this.endboss.x -= this.endboss.speed;
                this.endboss.otherDirection = false;
            }

        }
    }

    checkEndbossTrigger() {
        if (this.character.x > 1300 && !this.endbossTriggered) {
            this.endbossTriggered = true;

            this.statusBarEndboss = new StatusBar("endboss");
            this.statusBarEndboss.x = 500;
            this.statusBarEndboss.y = 10;

        }
    }

    updateStatusBars() {
        this.statusBarCoin.setPercentage(
            (this.character.coinCount / this.MAX_COINS) * 100
        );

        this.statusBarBottle.setPercentage(
            (this.character.salsaBottleCount / this.MAX_SALSA_BOTTLES) * 100
        );

        this.statusBarHealth.setPercentage(
            this.character.energy
        );


        if (this.statusBarEndboss && this.endboss) {
            this.statusBarEndboss.setPercentage(this.endboss.energy);
        }

        if (this.endboss.isDead()) {
            this.statusBarEndboss = null;
        }
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

        if (
            this.keyboard.D &&
            this.character.salsaBottleCount > 0 &&
            now - this.lastThrow > 500
        ) {
            this.lastThrow = now;

            let bottle = new ThrowableObject(
                this.character.x + 100,
                this.character.y + 100,
                this.character.otherDirection,
                this.character
            );

            this.throwableObjects.push(bottle);

            this.character.salsaBottleCount--;

            this.updateStatusBars();
        }
    }


    checkCollisions() {
        const now = Date.now();

        this.level.enemies.forEach(enemy => {

            if (enemy.isDead()) {
                return;
            }


            if (this.character.isStomping(enemy) && !enemy.isHurt()) {
                enemy.hit();
                if (enemy instanceof Endboss) {
                    this.updateStatusBars();
                }
                this.collisionLocked = true;

                return;
            }
            else if (this.character.isColliding(enemy)) {

                if (now - this.lastHit > this.hitCooldown) {
                    this.lastHit = now;
                    this.character.hit();
                }
            }
        });
    }



    checkBottleCollisions() {
        this.throwableObjects = this.throwableObjects.filter(
            bottle => !bottle.markedForDeletion
        );

        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {

                if (bottle.isColliding(enemy) && !enemy.isDead()) {
                    enemy.hit();
                    if (enemy instanceof Endboss) {
                        this.updateStatusBars();
                    }
                    bottle.markedForDeletion = true;
                }

            });
        });
    }

    checkCollectibleCoin() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.coinCount++;
                this.updateStatusBars();
                return false;
            }
            return true;
        });
    }

    checkCollectibleSalsaBottle() {
        this.level.salsaBottles = this.level.salsaBottles.filter((bottle) => {

            if (this.character.isColliding(bottle)) {
                this.character.salsaBottleCount++;
                this.updateStatusBars();
                return false;
            }

            return true;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();

        // Welt mit Kamera
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.restore();


        // feste HUD Elemente
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);

        if (this.statusBarEndboss) {
            this.addToMap(this.statusBarEndboss);
        }


        requestAnimationFrame(() => {
            this.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(movableObject) {
        if (movableObject.update) {
            movableObject.update();
        }
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
