class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    level = level1;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    salsaBottleCount = 0;
    coinCount = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
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
        }, 200);
        this.checkCollectibleObjects();

    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
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
            if (this.character.isColliding(coin)) { // continue here
                this.character.coinCount++;
                this.level.coins.splice(index, 1);
                console.log('COINS:', this.character.coinCount);
                
            }
        });
    }

    checkCollectibleSalsaBottle() {
        this.level.salsaBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {

                this.character.salsaBottleCount++;

                this.level.salsaBottles.splice(index, 1);
                console.log('BOTTLES:', this.character.salsaBottleCount);

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

        this.addToMap(this.statusBar);
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
        movableObject.drawFrame(this.ctx);
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