import { Game, AUTO, Scene, Types } from 'phaser'

import { LevelChoiceScene } from "./scenes/LevelChoiceScene";
import { PreloadScene } from "./scenes/PreloadScene";
import { CompetitionScene } from "./scenes/CompetitionScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { Renderer } from "../../core/Renderer";

const RunnerGameConfig: Types.Core.GameConfig = {
    type: AUTO,
    width: 1334,
    height: 750,
    // @ts-ignore
    scene: [
        PreloadScene,
        LevelChoiceScene,
        CompetitionScene,
        SummaryScene
    ],
    backgroundColor: 0x0c88c7,
    physics: {
        default: "arcade"
    },
};

const RunnerRenderer = new Renderer(RunnerGameConfig);

export { RunnerRenderer }
