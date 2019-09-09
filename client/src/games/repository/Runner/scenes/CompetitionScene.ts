import { Scene, Types, GameObjects, Math, Physics } from 'phaser'
import {LevelChoiceSceneData} from "../types/scenes-transition-data";

const GAME_GLOBAL_OPTIONS = {
    platformSpeedRange: [300, 300],
    spawnRange: [80, 300],
    platformSizeRange: [90, 300],
    platformHeightRange: [-5, 5],
    platformHeighScale: 20,
    platformVerticalLimit: [0.4, 0.8],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2,
    coinPercent: 75
};

class CompetitionScene extends Scene {
    private addedPlatformsCount: number = 0;
    private jumpsCount: number = 0;
    private nextPlatformDistance: number = 0;

    private scoreLabel: GameObjects.Text;
    private score: GameObjects.Text;
    private coinsLabel: GameObjects.Text;
    private coins: GameObjects.Text;

    private platformGroup: GameObjects.Group;
    private platformPool: GameObjects.Group;
    private coinGroup: GameObjects.Group;
    private coinPool: GameObjects.Group;

    private background: any;

    private player: Physics.Arcade.Sprite;

    static readonly SCENE_NAME: string = 'CompetitionScene';

    constructor() {
        super(CompetitionScene.SCENE_NAME);
    }

    public create(data: LevelChoiceSceneData) {
        const { width, height } = this.game.config;

        this.setupSceneEnvironment();
        this.setCounters();

        this.addPlatform(
            Number(width),
            Number(width) / 2,
            Number(height) * GAME_GLOBAL_OPTIONS.platformVerticalLimit[1]
        );
        this.player = this.physics.add.sprite(
            GAME_GLOBAL_OPTIONS.playerStartPosition,
            Number(height) * 0.7,
            "cat"
        );
        this.player.setGravityY(GAME_GLOBAL_OPTIONS.playerGravity);

        this.physics.add.collider(this.player, this.platformGroup, () => {

            // play "run" animation if the player is on a platform
            if(!this.player.anims.isPlaying){
                this.player.anims.play("run");
            }
        }, undefined, this);

        this.physics.add.overlap(this.player, this.coinGroup, (player, coin) => {
            // @ts-ignore
            this.tweens.add({
                targets: coin,
                // @ts-ignore
                y: coin.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                // @ts-ignore
                callbackScope: this,
                onComplete: () => {
                    this.updateCoinsCounter();
                    this.coinGroup.killAndHide(coin);
                    this.coinGroup.remove(coin);
                }
            });
        }, undefined, this);

        this.input.on("pointerdown", this.jump, this);
        window.addEventListener('keyup', this.handleButtonKeyUpEvent.bind(this));
        this.startScoreCounter();
    }

    public destroy(): void {
        window.removeEventListener('keyup', this.handleButtonKeyUpEvent);
    }

    public update(): void {
        const { height, width } = this.game.config;

        if (this.player.y > height) {
            this.goToSummaryScene();
        }

        this.player.x = GAME_GLOBAL_OPTIONS.playerStartPosition;
        let minDistance = width;
        let rightmostPlatformHeight = 0;
        this.platformGroup.getChildren().forEach(function(platform: any){
            let platformDistance = Number(width) - platform.x - platform.displayWidth / 2;
            if(platformDistance < minDistance){
                minDistance = platformDistance;
                rightmostPlatformHeight = platform.y;
            }
            if(platform.x < - platform.displayWidth / 2){
                // @ts-ignore
                this.platformGroup.killAndHide(platform);
                // @ts-ignore
                this.platformGroup.remove(platform);
            }
        }, this);

        this.coinGroup.getChildren().forEach(function(coin: any){
            if(coin.x < - coin.displayWidth / 2){
                // @ts-ignore
                this.coinGroup.killAndHide(coin);
                // @ts-ignore
                this.coinGroup.remove(coin);
            }
        }, this);

        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Math.Between(
                GAME_GLOBAL_OPTIONS.platformSizeRange[0],
                GAME_GLOBAL_OPTIONS.platformSizeRange[1]
            );
            let platformRandomHeight = GAME_GLOBAL_OPTIONS.platformHeighScale * Math.Between(
                GAME_GLOBAL_OPTIONS.platformHeightRange[0], GAME_GLOBAL_OPTIONS.platformHeightRange[1]
            );
            let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
            let minPlatformHeight = Number(height) * GAME_GLOBAL_OPTIONS.platformVerticalLimit[0];
            let maxPlatformHeight = Number(height) * GAME_GLOBAL_OPTIONS.platformVerticalLimit[1];
            let nextPlatformHeight = Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
            this.addPlatform(nextPlatformWidth, Number(width) + nextPlatformWidth / 2, nextPlatformHeight);
        }
    }

    private setupSceneEnvironment(): void {
        this.platformGroup = this.add.group({
            removeCallback(platform) {
                // @ts-ignore
                platform.scene.platformPool.add(platform);
            }
        });
        this.platformPool = this.add.group({
            removeCallback(platform){
                // @ts-ignore
                platform.scene.platformGroup.add(platform);
            }
        });
        this.coinGroup = this.add.group({
            removeCallback(coin){
                // @ts-ignore
                coin.scene.coinPool.add(coin);
            }
        });
        this.coinPool = this.add.group({
            removeCallback(coin){
                // @ts-ignore
                coin.scene.coinGroup.add(coin);
            }
        });
    }

    private addPlatform(width: number, posX: number, posY: number): void {
        this.addedPlatformsCount++;
        let platform;

        if (this.platformPool && this.platformPool.getLength()) {
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.y = posY;
            platform.active = true;
            platform.visible = true;

            this.platformPool.remove(platform);

            let newRatio =  width / platform.displayWidth;
            platform.displayWidth = width;
            platform.tileScaleX = 1 / platform.scaleX;
        } else {
            platform = this.add.tileSprite(posX, posY, width, 32, "ground");
            this.physics.add.existing(platform);
            // @ts-ignore
            platform.body.setImmovable(true);
            // @ts-ignore
            platform.body.setVelocityX(
                Math.Between(
                    GAME_GLOBAL_OPTIONS.platformSpeedRange[0],
                    GAME_GLOBAL_OPTIONS.platformSpeedRange[1]) * -1
            );

            this.platformGroup && this.platformGroup.add(platform);
        }

        this.nextPlatformDistance = Math.Between(
            GAME_GLOBAL_OPTIONS.spawnRange[0],
            GAME_GLOBAL_OPTIONS.spawnRange[1]
        );

        if (this.addedPlatformsCount > 1) {
            if (Math.Between(1, 100) <= GAME_GLOBAL_OPTIONS.coinPercent){
                if(this.coinPool && this.coinPool.getLength()){
                    let coin = this.coinPool.getFirst();
                    coin.x = posX;
                    coin.y = posY - 96;
                    coin.alpha = 1;
                    coin.active = true;
                    coin.visible = true;
                    this.coinPool.remove(coin);
                    // coin.anims.play("rotate");
                }
                else{
                    let coin = this.physics.add.sprite(posX, posY - 96, "coin");
                    coin.setImmovable(true);
                    coin.setVelocityX(platform.body.velocity.x);
                    coin.anims.play("rotate");

                    this.coinGroup && this.coinGroup.add(coin);
                }
            }
        }
    }

    private setBackground(): void {
        const { width, height } = this.game.config;

        this.background = this.add.tileSprite(0, 0, Number(width), Number(height), 'bg');
    }

    private updateBackground(): void {

    }

    private goToSummaryScene(): void {
        this.scene.start('SummaryScene', {
            scores: this.score.text,
            coins: this.coins.text,
        });
    }

    private startScoreCounter(): void {
        this.time.addEvent({
            delay: 300,
            callback: this.updateScoreCounter.bind(this),
            loop: true,
        });
    }

    private updateScoreCounter(): void {
        this.score.text = String(Number(this.score.text) + 1);
        this.score.updateText();
    }

    private updateCoinsCounter(): void {
        this.coins.text = String(Number(this.coins.text) + 1);
        this.coins.updateText();
    }

    private setCounters(): void {
        const { width } = this.game.config;
        const styleConfig = {
            fontSize: 24,
            fill: "#ffffff",
        };
        const x = Number(width) - 200;
        const y = 60;


        this.scoreLabel = this.add.text(x, y, "Score: ", styleConfig);
        this.score = this.add.text(x + 100, y, "0", styleConfig);
        this.coinsLabel = this.add.text(x, y + 40, "Coins:", styleConfig);
        this.coins = this.add.text(x + 100, y + 40, "0", styleConfig);
    }

    private handleButtonKeyUpEvent(event: KeyboardEvent): void {
        const { code } = event;

        if (code.toLowerCase() === 'space') {
            this.jump();
        }
    }

    private jump(): void {
        if(this.player.body.touching.down || (this.jumpsCount > 0 && this.jumpsCount< GAME_GLOBAL_OPTIONS.jumps)){
            if(this.player.body.touching.down){
                this.jumpsCount = 0;
            }
            this.player.setVelocityY(GAME_GLOBAL_OPTIONS.jumpForce * -1);
            this.jumpsCount ++;

            // stops animation
            this.player.anims.stop();
        }
    }
}

export { CompetitionScene }
