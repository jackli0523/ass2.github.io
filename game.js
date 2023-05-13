class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50, 50, "Adventure awaits!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('logo'));
        });
    }
}
class Logo extends Phaser.Scene {
    constructor() {
        super('logo')
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("logo", "logo.png");
    }
    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);

        let logo = this.add.image(
            game.canvas.width / 2, -300,
            "logo"
        );

        this.tweens.add({
            targets: logo,
            y: game.canvas.height / 2 - 50,
            alpha: 1,
            delay: 1000,
            duration: 2000,
            ease: "Linear",
            repeat: 0
        });

        this.tweens.add({
            targets: logo,
            y: game.canvas.height + 300,
            alpha: 1,
            delay: 5000,
            duration: 2000,
            ease: "Linear",
            repeat: 0,
            onComplete: () => this.scene.start('start')
        });
        // setTimeout(() => {
        //     this.cameras.main.fade(500, 0, 0, 0);
        //     this.time.delayedCall(500, () => 
        // }, 7000);
    }
}
class Start extends AdventureScene {
    constructor() {
        super("start", "You are in a forest, try to escape!");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("startBG", "avenue-815297_960_720.jpg");
    }
    onEnter() {
        new Background(this, "startBG")
        let left = this.add.text(this.w * 0.2, this.h * 0.7, "Go left")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("unknow area"))
            .on('pointerdown', () => {
                this.showMessage("Go left!");
                this.tweens.add({
                    targets: left,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
                this.gotoScene('wolf');
            });
        let right = this.add.text(this.w * 0.5, this.h * 0.7, "Go right")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("unknow area"))
            .on('pointerdown', () => {
                this.showMessage("Go right!");
                this.tweens.add({
                    targets: right,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
                this.gotoScene('monkey');
            });
        // let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => this.showMessage("Metal, bent."))
        //     .on('pointerdown', () => {
        //         this.showMessage("No touching!");
        //         this.tweens.add({
        //             targets: clip,
        //             x: '+=' + this.s,
        //             repeat: 2,
        //             yoyo: true,
        //             ease: 'Sine.inOut',
        //             duration: 100
        //         });
        //     });

        // let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage("It's a nice key.")
        //     })
        //     .on('pointerdown', () => {
        //         this.showMessage("You pick up the key.");
        //         this.gainItem('key');
        //         this.tweens.add({
        //             targets: key,
        //             y: `-=${2 * this.s}`,
        //             alpha: { from: 1, to: 0 },
        //             duration: 500,
        //             onComplete: () => key.destroy()
        //         });
        //     })

        // let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         if (this.hasItem("key")) {
        //             this.showMessage("You've got the key for this door.");
        //         } else {
        //             this.showMessage("It's locked. Can you find a key?");
        //         }
        //     })
        //     .on('pointerdown', () => {
        //         if (this.hasItem("key")) {
        //             this.loseItem("key");
        //             this.showMessage("*squeak*");
        //             door.setText("🚪 unlocked door");
        //             this.gotoScene('demo2');
        //         }
        //     })

    }
}
class Wolf extends AdventureScene {
    constructor() {
        super("wolf", "You run into a scary Wolf that doesn't seem to talk that well…");
    }
    preload() {
        this.load.path = "./assets/Animal Basic Asset Pack/Timber Wolf/";
        this.load.spritesheet('wolf', 'TimberWolfIdleSide.png', { frameWidth: 16, frameHeight: 16 });
    }
    onEnter() {
        new Aseprite(this, this.w * 0.375, this.h / 2, 'wolf', 5);
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => { this.showMessage("You've got no other choice, really."); })
            .on('pointerdown', () => { this.gotoScene('start'); });
    }
}
class Monkey extends AdventureScene {
    constructor() {
        super("monkey", "Although the Monkey looks scary, it appears to have a weakness");
    }
    preload() {
        this.load.path = "./assets/Animal Basic Asset Pack/Curious Monkey/";
        this.load.spritesheet('monkey', 'CuriousMonkeyIdleSide.png', { frameWidth: 15.7, frameHeight: 16, trim: true });
    }
    onEnter() {
        new Aseprite(this, this.w * 0.375, this.h / 2, 'monkey', 20);
        this.add.text(this.w * 0.3, this.w * 0.4, "Keep moving forward")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => { this.showMessage("You've got no other choice, really."); })
            .on('pointerdown', () => { this.gotoScene('path'); });
    }
}
class Path extends AdventureScene {
    constructor() {
        super("path", "There looks to be a bright light here, indeed the right path, and you decide...");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("path", "road-1072823__340.jpg");
    }
    onEnter() {
        new Background(this, "path")
        let left = this.add.text(this.w * 0.1, this.h * 0.8, "Stay here a little bit")
            .setFontSize(this.s * 3.5)
            .setWordWrapWidth(this.w * 0.2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Stay here a little bit"))
            .on('pointerdown', () => {
                left.visible = false;
            });


        this.add.text(this.w * 0.5, this.h * 0.8, "Go forward")
            .setFontSize(this.s * 3.5)
            .setInteractive()
            .on('pointerover', () => { this.showMessage("Go forward."); })
            .on('pointerdown', () => { this.gotoScene('deer'); });
    }
}
class Deer extends AdventureScene {
    constructor() {
        super("deer", "A deer runs up to remind you that the exit is ahead!");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("deer", "deer-1367217__340.jpg");
    }
    onEnter() {
        new Background(this, "deer")
        this.add.text(this.w * 0.1, this.w * 0.4, "just go back")
            .setFontSize(this.s * 4)
            .setInteractive()
            .on('pointerover', () => { this.showMessage("You've got no other choice, really."); })
            .on('pointerdown', () => { this.gotoScene('path'); });

        this.add.text(this.w * 0.5, this.h * 0.7, "Go forward")
            .setFontSize(this.s * 4)
            .setInteractive()
            .on('pointerover', () => { this.showMessage("Go forward."); })
            .on('pointerdown', () => { this.gotoScene('stick'); });
    }
}
class Stick extends AdventureScene {
    constructor() {
        super("stick", "You see a Goat and you choose:");
    }
    preload() {
        this.load.path = "./assets/Animal Basic Asset Pack/Nibbling Goat/";
        this.load.spritesheet('goat', 'NibblingGoatIdleSide.png', { frameWidth: 16, frameHeight: 16 });
        this.load.path = "./assets/";
        this.load.image("stick", "istockphoto-1404232268-170667a.png");
    }
    onEnter() {
        const image = this.add.image(this.w * 0.2, this.h * 0.85, "stick")
            .setScale(2)
            .setInteractive()
            .on('pointerover', () => { this.showMessage("This stick may have some effect ...."); })
            .on('pointerdown', () => { this.gainItem('stick'); this.gotoScene('goat1'); });;
        // image.setDisplaySize(this.w * .75, this.h)
        new Aseprite(this, this.w * 0.375, this.h / 2, 'goat', 5);

        this.add.text(this.w * 0.05, this.h * 0.65, "Pick up the stick")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => { this.showMessage("This stick may have some effect ...."); })
            .on('pointerdown', () => { this.gainItem('stick'); this.gotoScene('goat1'); });
        this.add.text(this.w * 0.5, this.w * 0.4, "Stand still and stare")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => { this.showMessage("Stand still and stare"); })
            .on('pointerdown', () => { this.gotoScene('goat2'); });
    }
}
class Goat1 extends AdventureScene {
    constructor() {
        super("goat1", "The goat saw your stick, felt the fear, and quickly left.You followed the bright light all the way and soon found the place to escape.");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("big_goat", "goat.jpg");
    }
    onEnter() {
        new Background(this, "big_goat")
        this.add.text(this.w * 0.4, this.h * 0.7, "Go forward")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => { this.showMessage("Go forward."); })
            .on('pointerdown', () => { this.gotoScene('outro'); });
    }
}
class Goat2 extends AdventureScene {
    constructor() {
        super("goat2", "The goat is not hostile to you, it stands there to let you pass smoothly, and soon you follow the bright light to find a place to escape.");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("big_goat", "goat.jpg");
    }
    onEnter() {
        new Background(this, "big_goat")
        this.add.text(this.w * 0.55, this.h * 0.7, "Escape")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => { this.showMessage(""); })
            .on('pointerdown', () => { this.gotoScene('outro'); });
    }
}
class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("win", "sun-rays-511029__340.jpg");
    }
    create() {
        let win = this.add.image(game.canvas.width / 2, game.canvas.height / 2, "win");
        win.setDisplaySize(game.canvas.width, game.canvas.height);
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, "You Win!").setFontSize(150).setOrigin(.5, .5);
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    // scene: [Intro, Logo, Start, Wolf, Monkey, Demo2, Outro],
    scene: [Intro, Logo, Start, Wolf, Monkey, Path, Deer, Stick, Goat1, Goat2, Outro],
    title: "Adventure Game",
});

