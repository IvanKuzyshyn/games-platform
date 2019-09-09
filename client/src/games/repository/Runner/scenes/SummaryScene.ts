import { GameObjects, Scene } from 'phaser'

import { CompetitionSceneData } from "../types/scenes-transition-data";

class SummaryScene extends Scene {
    private scoreResultLabel: GameObjects.Text;
    private scoreResult: GameObjects.Text;
    private coinsResultLabel: GameObjects.Text;
    private coinsResult: GameObjects.Text;

    private playAgainButton : GameObjects.Image;

    static readonly SCENE_NAME: string = 'SummaryScene';

    constructor() {
        super(SummaryScene.SCENE_NAME);
    }

    public create(data: CompetitionSceneData) {
        // @ts-ignore
        if (window.Phaser.handlers) {
            // @ts-ignore
            window.Phaser.handlers.onCompleteGame(data);
        }
        this.setCountersResults(data);
        this.setActionButtons();
    }

    private setCountersResults(data: CompetitionSceneData): void {
        const { width } = this.game.config;
        const styleConfig = {
            fontSize: 48,
            fill: "#ffffff",
        };
        const x = Number(width) / 2 - 200;
        const y = 150;

        this.scoreResultLabel = this.add.text(x, y, "Score: ", styleConfig);
        this.scoreResult = this.add.text(x + 180, y, data.scores, styleConfig);
        this.coinsResultLabel = this.add.text(x, y + 60, "Coins: ", styleConfig);
        this.coinsResult = this.add.text(x + 180, y + 60, data.coins, styleConfig);
    }

    private setActionButtons(): void {
        const { width, height } = this.game.config;
        const x = Number(width) / 2 - 54;
        const y = Number(height) - 100;

        this.playAgainButton = this.add.sprite(x, y, 'replay').setInteractive().setSize(108, 108);
        this.playAgainButton.on('pointerover', this.buttonOnPointerOver);
        this.playAgainButton.on('pointerout', this.buttonOnPointerOut);
        this.playAgainButton.on('pointerdown', this.goToCompetitionScene.bind(this));
    }

    private goToCompetitionScene(): void {
        this.scene.start('CompetitionScene');
    }

    private buttonOnPointerOver(): void {
        // @ts-ignore
        this.setTint(0xe5e6e8);
    }

    private buttonOnPointerOut(): void {
        // @ts-ignore
        this.clearTint();
    }
}

export { SummaryScene }
