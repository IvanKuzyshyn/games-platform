import { Game, Types } from 'phaser'

type GameHandlers = {
    onCompleteGame: (...results: any) => any
}

class Renderer {
    private readonly canvas: HTMLCanvasElement | null;
    private readonly config: Types.Core.GameConfig;
    private game = {} as Game;

    constructor(config: Types.Core.GameConfig) {
        this.config = config;
        this.canvas = document.querySelector('canvas');
    }

    public create(handlers?: GameHandlers): Game {
        this.game = new Game(this.config);
        // @ts-ignore
        window.Phaser.handlers = handlers;
        window.addEventListener('resize', this.resize, false);

        window.focus();
        this.resize();

        return this.game;
    }

    public destroy(): void {
        window.removeEventListener('resize', this.resize);
        // @ts-ignore
        delete window.Phaser.handlers;

        this.game.destroy(true);
    }

    private resize(): void {
        if (!this.canvas) {
            return;
        }

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const windowRatio = windowWidth / windowHeight;
        const gameRatio = Number(this.game.config.width) / Number(this.game.config.height);

        if (windowRatio < gameRatio) {
            this.canvas.style.width = windowWidth + "px";
            this.canvas.style.height = (windowWidth / gameRatio) + "px";
        } else {
            this.canvas.style.width = (windowHeight * gameRatio) + "px";
            this.canvas.style.height = windowHeight + "px";
        }
    }
}

export { Renderer }
