import { CompetitionSceneOptions } from "../types/scene-options";

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

const notChangableOptions = {
    playerStartPosition: 200,
    jumpForce: 400,
    playerGravity: 900,
};

export function getOptionsByLevel(name: string): CompetitionSceneOptions {
    return {

    }
}
