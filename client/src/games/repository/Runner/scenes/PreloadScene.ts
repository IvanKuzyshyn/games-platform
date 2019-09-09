import { Scene } from 'phaser'

class PreloadScene extends Scene {

    static readonly SCENE_NAME: string = 'PreloadScene';

    constructor() {
        super(PreloadScene.SCENE_NAME);
    }

    public preload(): void {
        this.load.spritesheet("cat", "/game-assets/Runner/images/cat.png", {
            frameWidth: 100,
            frameHeight: 51,
        });
        this.load.image("platform", "/game-assets/Runner/images/platform.png");
        this.load.image("ground", "/game-assets/Runner/images/ground.png");
        this.load.spritesheet("coin", "/game-assets/Runner/images/coin.png", {
            frameWidth: 20,
            frameHeight: 20
        });
        this.load.image('level-easy', "/game-assets/Runner/images/level-easy.png");
        this.load.image('level-medium', "/game-assets/Runner/images/level-medium.png");
        this.load.image('level-hard', "/game-assets/Runner/images/level-hard.png");
        this.load.image("replay", "/game-assets/Runner/images/replay.png");
        this.load.image("bg", "/game-assets/Runner/images/bg.png");
    }

    public create(): void {
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("cat", {
                start: 0,
                end: 12
            }),
            frameRate: 30,
            repeat: -1,
        });

        // setting coin animation
        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 5
            }),
            frameRate: 15,
            yoyo: true,
            repeat: -1
        });

        this.scene.start("LevelChoiceScene");
    }
}

export { PreloadScene }
