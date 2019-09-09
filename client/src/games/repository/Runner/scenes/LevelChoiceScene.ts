import { Scene, GameObjects } from 'phaser'

class LevelChoiceScene extends Scene {
    private readonly GRADATION = ['easy', 'medium', 'hard'];
    private levels: { [level: string]: GameObjects.Image } = {};
    private readonly SIZES: { width: number, height: number } = {
      width: 210,
      height: 70,
    };
    private chosenLevel: string;

    static readonly SCENE_NAME: string = 'LevelChoiceScene';

    constructor() {
        super(LevelChoiceScene.SCENE_NAME);
    }

    public create() {
        const { width, height } = this.game.config;

        this.chosenLevel = '';
        // @ts-ignore
        this.add.tileSprite(0, 0, width, height, 'bg');
        this.configureLevelButtons();
    }

    private configureLevelButtons(): void {
        this.GRADATION.forEach((name: string, index: number) => {
            const x = this.getLevelButtonXBasis();
            const y = this.getLevelButtonYBasisByIndex(index);

            this.levels[name] = this.add.sprite(
                x,
                y,
                `level-${name}`).setInteractive().setSize(this.SIZES.width, this.SIZES.height);

            this.levels[name].on('pointerover', this.buttonOnPointerOver);
            this.levels[name].on('pointerout', this.buttonOnPointerOut);
            this.levels[name].on('pointerdown', () => this.onChooseLevel(name));
        });
    }

    private getLevelButtonYBasisByIndex(index: number): number {
        const { height } = this.game.config;

        if (index === 0) {
            return Number(height) / 4;
        }

        return (Number(height) / 4) + (this.SIZES.height + 20) * index;
    }

    private getLevelButtonXBasis(): number {
        const { width } = this.game.config;

        return (Number(width) / 2) - (this.SIZES.width / 2);
    }

    private buttonOnPointerOver(): void {
        // @ts-ignore
        this.setTint(0xe5e6e8);
    }

    private buttonOnPointerOut(): void {
        // @ts-ignore
        this.clearTint();
    }

    private onChooseLevel(name: string): void {
        this.chosenLevel = name;

        this.goToCompetitionScene();
    }

    private goToCompetitionScene(): void {
        this.scene.start("CompetitionScene", { level: this.chosenLevel });
    }
}

export { LevelChoiceScene }
